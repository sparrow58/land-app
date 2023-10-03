"use client";
import React, { ChangeEvent, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Button from "@/app/components/Button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import uploadImageService from "@/app/services/reatState/uploadImageService";
import { showToast, updateToast } from "./ToastHelpers";
import { readFileAsync } from "@/app/helpers/fileHelper";
import useRealEstateImages from "@/app/hooks/useRealStateImages";
import api from "@/app/helpers/api";
import ProgressBar from "@/app/components/ProgressBar";
import { compressImage } from "@/app/helpers/compressionHelper";
import { Dimensions, FileProps, ApiEvents } from "@/app/Props/CommonProps";
import { AiTwotoneDelete } from "react-icons/ai";
import ConfirmationDialog from "@/app/components/ConfirmationDialog";

interface Props {
  realEstateId: string;
}

const EditImages = ({ realEstateId }: Props) => {
  console.log("id", realEstateId);
  const [images, setImages] = useState<FileProps[]>([]);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const toastIds = useRef<string[]>([]);

  const isFinishedUploading = images.every((image) => image.isDone);

  const isAnyImage = images.length > 0;

  const { data, error, isLoading, refetch } = useRealEstateImages(realEstateId);
  console.log("data", data);
  console.log("error", error);

  const allImages = useMemo<FileProps[]>(() => {
    return [...data, ...images];
  }, [images, data]);
  //   useEffect(() => {
  //     setImages((prev) => [...prev, ...fetchedImages]);
  //   }, [fetchedImages]);
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
        progress: 0.01,
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

  const handleCloseConfirmation = () => {
    setPopupOpen(false);
  };

  const handleConfirm = () => {
    // Handle confirmation logic here
    // For example, delete an item
    console.log("Confirmed");
    deleteImage(realEstateId, selectedUrl, {
      onSuccess: (respose) => {
        if (respose.status === 200) {
          //setImages((prev) => prev.filter((i) => i.url !== url));
          handleCloseConfirmation();

          refetch();
        } else {
          toast.error(respose.status + " " + respose.data);
        }
      },
      onFailure: (error) => {
        toast.error(error);
      },
    });
  };
  function deleteImage(
    id: string,
    url: string,
    { onSuccess, onFailure }: ApiEvents
  ) {
    api
      .delete(`/realEstates/${id}/images`, {
        params: { url: url },
      })
      .then((respose) => {
        console.log("ok", respose.status);
        onSuccess(respose);
      })
      .catch((error) => {
        onFailure(error);
      });
  }

  function handleDeleteImage(url: string) {
    console.log("deleting url");
    setSelectedUrl(url);
    setPopupOpen(true);
  }
  async function uploadImages(images: FileProps[]) {
    for (let i = 0; i < images.length; i++) {
      uploadImageService({
        id: realEstateId,
        selectedFile: images[i].file as File,
        onUplading: ({ name, progress }) => {
          setImages((prev) => {
            const uploadedImages = prev?.map((image) => {
              const newImage = { ...image, progress: progress };
              updateToast(newImage, toastIds);

              return image.file?.name === name ? newImage : image;
            });

            return uploadedImages;
          });
        },
        onSuccess: ({ name, response }) => {
          const toastId = toastIds.current.find((id) => id === name);
          if (toastId) toast.update(toastId, { icon: true });
          if (toastId) toast.dismiss(toastId);
          else toast.error("toast undefiend");
          console.log("response", response);
          setImages([]);
          refetch();
        },
        onFailure: (error) => {},
      });
    }
  }
  const handleImageChanged = async (e: ChangeEvent<HTMLInputElement>) => {
    console.log("uploading");
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
            if (newImage.file)
              toast.error("Image " + newImage.file.name + " Already selected");
          } else {
            showToast(newImage, toastIds);
          }
          return isNew;
        });

        // Combine the filtered images with the existing images
        const combinedImages = [...prev, ...filteredImages];
        if (combinedImages.length + allImages.length > 6) {
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

  return (
    <>
      <ConfirmationDialog
        isOpen={isPopupOpen}
        onClose={handleCloseConfirmation}
        onConfirm={handleConfirm}
        message="Are you sure you want to perform this action?"
      />
      <div className="max-w-3xl mx-auto  px-6 text-center pb-1 md:pb-1 pt-20 ">
        <h4 className="h4 mb-0">Upload up to 6 images</h4>
        <h6 className="h6 c text-green-600 mb-0">
          Total Selected {allImages?.length}{" "}
        </h6>
        <div className="relative max-w-6xl mt-8 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {allImages &&
            allImages?.map((image, index) => {
              //const percentage = image.progress && image.progress * 100;
              return (
                <div className="w-full border rounded " key={index}>
                  {image.file && image.progress && !image.isDone && (
                    <ProgressBar progress={image.progress} />
                  )}

                  <Image
                    className={`${
                      image.isDone ? "" : "opacity-50"
                    } w-full h-24 sm:h-48 object-cover`}
                    src={image.url}
                    width={300}
                    height={400}
                    alt="image"
                  />
                  {index !== 0 && (
                    <div className="w-full">
                      <button onClick={() => handleDeleteImage(image.url)}>
                        <AiTwotoneDelete size={30} />
                      </button>
                    </div>
                  )}
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

export default EditImages;
