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

      console.log("size before", file.size);

      const newFile = await compressImage(file, dimensions);

      console.log("size after", newFile);
      files.push({
        file: newFile as File,
        isDone: false,
        progress: 0,
        url: fileUrl,
      });
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
          console.log(err.message);
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
      // if (file.progress === 1) {
      //   toast.update(toastId);
      //   toast.dismiss(toastId);
      //   toast.success(`Finished ${file.file.name}`);
      // }
    } else showToast(file);
  };
  const removeToast = (imageFileName: string) => {
    const toastId = toastIds.current.find((id) => id === imageFileName);

    if (toastId) toast.dismiss(toastId);
    // const toastIdIndex = toastIds.current.findIndex(
    //   (id) => id === imageFileName
    // );

    // if (toastIdIndex !== -1) {
    //   //toastIds.current.splice(toastIdIndex, 1);
    // }
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

          setImages((prev) =>
            prev.map((image) => ({ ...image, isDone: true }))
          );

          removeToast(name);
          // toast.success(`Finished ${name}`);
        },
        onFailure: (error) => {},
      });
    }
  }
  const handleImageChanged = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const readImages = await readFilesAsync(files);

      setImages((prev) => {
        // Create a Set of unique URLs from the existing images
        const existingUrls = new Set(prev.map((image) => image.url));

        // Filter out images from readImages that have URLs not present in prev
        const filteredImages = readImages.filter(
          (newImage) => !existingUrls.has(newImage.url)
        );

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
        `/realEstates/images/clmjifrqf0005aco4w7c9mwxj`,
        formData,
        {
          onUploadProgress: (progressEvent: AxiosProgressEvent) => {
            const percentCompleted =
              progressEvent.total &&
              Math.round(progressEvent.loaded / progressEvent.total);
            console.log("uploading ", percentCompleted);

            onUplading({
              progress: percentCompleted,
              name: selectedFile.name,
            });
          },
        }
      );
      onSuccess({ name: selectedFile.name, response: response.data });
      // console.log("Image uploaded successfully:", response.data);
    } catch (error) {
      onFailure({ name: selectedFile.name, error: error });
    }
  };
  return (
    <div>
      <div className="max-w-3xl mx-auto text-center pb-1 md:pb-1">
        <h4 className="h4 mb-0">Upload up to 6 images</h4>
      </div>
      <div className="max-w-6xl min-w-fit mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images?.map((image, index) => {
          return (
            <div className="" key={index}>
              {
                <progress
                  className="w-full h-23"
                  value={image.progress}
                  max="1"
                />
              }
              <Image
                className={`${
                  image.isDone ? "" : "opacity-50"
                }  w-full h-23 sm:h-48 object-cover`}
                src={image.url}
                width={200}
                height={400}
                alt="image"
              />
            </div>
          );
        })}
      </div>

      <input
        type="file"
        multiple
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }} // Hide the default input
        onChange={handleImageChanged}
      />

      <div className="flex justify-between gap-6 ">
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
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default FormStep3;
