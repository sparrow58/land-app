import React, { ChangeEvent, useContext, useRef, useState } from "react";
import { FormContext } from "./FormStepper";
import Image from "next/image";
import api from "@/app/helpers/api";
import { AxiosProgressEvent } from "axios";
import Button from "@/app/components/Button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Compressor from "compressorjs";
interface Dimensions {
  width: number;
  height: number;
}
interface FileProps {
  url: string;
  progress: number | undefined;
  file: File;
  isDone: boolean;
}

const FormStep3 = () => {
  const [images, setImages] = useState<FileProps[]>([]);
  const { activeStepIndex, setActiveStepIndex, formData, setFormData, itemId } =
    useContext(FormContext) || {};
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const toastIds = useRef<string[]>([]);

  const isFinishedUploading = images.every((image) => image.isDone);

  const isAnyImage = images.length > 0;

  const readFilesAsync = async (fileList: FileList) => {
    const files: FileProps[] = [];

    for (let index = 0; index < fileList.length; index++) {
      const file = fileList[index];

      const fileUrl = await readFileAsync(file);

      const dimensions = await getImagePropsAsync(fileUrl);

      const newFile = await compressImage(file, dimensions);

      const image = {
        file: newFile as File,
        isDone: false,
        progress: 0.1,
        url: fileUrl,
      };

      files.push(image);
    }

    return files;
  };

  function getImagePropsAsync(url: string): Promise<Dimensions> {
    return new Promise((resolve, reject) => {
      const img = document.createElement("img");
      img.src = url;

      img.onload = () => {
        const width = img.width;
        const height = img.height;

        resolve({ width, height });
      };
    });
  }
  function compressImage(
    file: File | Blob,
    dimensions: Dimensions
  ): Promise<File | Blob> {
    const WIDTH = 800;
    const ratio = WIDTH / dimensions.width;
    return new Promise((resolve, reject) => {
      new Compressor(file, {
        quality: 0.6,
        maxWidth: WIDTH,
        maxHeight: dimensions.height * ratio,
        success(result) {
          resolve(result);
        },
        error(err) {
          console.error(err.message);
          toast.error("Error occured while compressing data");
          reject(err);
        },
      });
    });
  }

  const showToast = (file: FileProps) => {
    const toastId = toast.success(`Uploading ${file.file.name} in Progress`, {
      progress: file.progress,
      toastId: file.file.name,
      icon: false,
    });
    toastIds.current.push(toastId.toString());
  };
  const updateToast = (file: FileProps) => {
    const toastId = toastIds.current.find((id) => id === file.file.name);

    if (toastId) {
      toast.update(toastId, { progress: file.progress });
    } else showToast(file);
  };

  const readFileAsync = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const url = event?.target?.result as string;
        resolve(url);
      };
      reader.readAsDataURL(file);
    });
  };

  async function uploadImages(images: FileProps[]) {
    for (let i = 0; i < images.length; i++) {
      uploadImage({
        selectedFile: images[i].file,
        onUplading: ({ name, progress }) => {
          setImages((prev) => {
            const uploadedImages = prev?.map((image) => {
              const newImage = { ...image, progress: progress };
              updateToast(newImage);

              return image.file.name === name ? newImage : image;
            });

            return uploadedImages;
          });
        },
        onSuccess: ({ name, response }) => {
          const toastId = toastIds.current.find((id) => id === name);
          if (toastId) toast.update(toastId, { icon: true });
          if (toastId) toast.dismiss(toastId);
          else toast.error("toast undefiend");

          setImages((prev) =>
            prev.map((image) => ({ ...image, isDone: true, progress: 1 }))
          );
        },
        onFailure: (error) => {},
      });
    }
  }
  const handleImageChanged = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const readImages = await toast.promise(readFilesAsync(files), {
        pending: "Compressing images",
        error: "Error while compressing images",
      });

      setImages((prev) => {
        // Create a Set of unique URLs from the existing images
        const existingUrls = new Set(prev.map((image) => image.url));

        // Filter out images from readImages that have URLs not present in prev
        const filteredImages = readImages.filter((newImage) => {
          const isNew = !existingUrls.has(newImage.url);
          if (!isNew) {
            toast.error("Image " + newImage.file.name + " Already selected");
          } else {
            showToast(newImage);
          }
          return isNew;
        });

        // Combine the filtered images with the existing images
        const combinedImages = [...prev, ...filteredImages];
        if (combinedImages.length > 6) {
          toast.error("you can't upload more than 6 images", {
            autoClose: 5000,
          });

          return prev;
        }

        uploadImages(filteredImages);

        return combinedImages;
      });
    }
  };
  interface uploadImageProps {
    selectedFile: File | Blob;
    onUplading: ({
      name,
      progress,
    }: {
      progress: number | undefined;
      name: string;
    }) => void;
    onSuccess: ({ name, response }: { name: string; response: any }) => void;
    onFailure: ({ name, error }: { name: string; error: any }) => void;
  }
  const uploadImage = async ({
    selectedFile,
    onUplading,
    onSuccess: onSuccess,
    onFailure,
  }: uploadImageProps) => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("image", selectedFile, selectedFile.name);
    try {
      const response = await api.patchForm(
        `/realEstates/images/${itemId}`,
        formData,
        {
          onUploadProgress: (progressEvent: AxiosProgressEvent) => {
            const percentCompleted =
              progressEvent.total &&
              Math.round(progressEvent.loaded / progressEvent.total);

            onUplading({
              progress: percentCompleted && percentCompleted - 0.01,
              name: selectedFile.name,
            });
          },
        }
      );
      onSuccess({ name: selectedFile.name, response: response.data });
    } catch (error) {
      onFailure({ name: selectedFile.name, error: error });
    }
  };
  return (
    <>
      <div className="max-w-3xl mx-auto  px-6 text-center pb-1 md:pb-1 ">
        <h4 className="h4 mb-0">Upload up to 6 images</h4>
        <h6 className="h6 c text-green-600 mb-0">
          Total Selected {images.length}{" "}
        </h6>
        <div className="max-w-6xl mt-8 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {images?.map((image, index) => {
            return (
              <div className="w-full " key={index}>
                <div className="w-full bg-gray-200 rounded-t-full dark:bg-gray-700">
                  <div
                    className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-t-full"
                    style={{
                      width: `${image.progress && image.progress * 100}%`,
                    }}
                  >
                    {image.progress && image.progress * 100}%
                  </div>
                </div>

                <Image
                  className={`${
                    image.isDone ? "" : "opacity-50"
                  }  w-full h-24 sm:h-48 object-cover`}
                  src={image.url}
                  width={200}
                  height={400}
                  alt="image"
                />
              </div>
            );
          })}
        </div>
      </div>

      <input
        type="file"
        multiple
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }} // Hide the default input
        onChange={handleImageChanged}
      />

      <div className="flex justify-center gap-6 ">
        {/* <Button text="Back" onClick={() => {}} /> */}
        <Button
          text="Upload"
          onClick={() => {
            if (fileInputRef.current) {
              fileInputRef.current.click();
            }
          }}
        />
        {isFinishedUploading && isAnyImage && (
          <Button
            text="Continue"
            onClick={() => {
              if (isAnyImage) {
                toast.success("we are cool");
              } else if (isFinishedUploading) {
                toast("all finished uploading");
              } else {
                toast.error("wait for images to finish upload");
              }
            }}
            disabled={false}
          />
        )}
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        // autoClose={false}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default FormStep3;
