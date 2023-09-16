import React, { ChangeEvent, useContext, useState } from "react";
import { FormContext } from "./FormStepper";
import Image from "next/image";
import api from "@/app/helpers/api";
import { AxiosProgressEvent } from "axios";
import SubmitButton from "@/app/components/SubmitButton";
interface ImageProps {
  url: string;
  progress: number | undefined;
  name: string;
}
const FormStep3 = () => {
  const [images, setImages] = useState<ImageProps[]>([]);
  const { activeStepIndex, setActiveStepIndex, formData, setFormData, itemId } =
    useContext(FormContext) || {};
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const startReadingFile = (
    fileList: FileList,
    index: number,
    urlArray: ImageProps[],
    onFinish: (urlArray: ImageProps[]) => void
  ) => {
    if (index < fileList.length) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataURL = event?.target?.result;
        urlArray.push({
          name: fileList[index].name,
          url: dataURL as string,
          progress: 0,
        });
        startReadingFile(fileList, index + 1, urlArray, onFinish);
      };
      reader.readAsDataURL(fileList[index]);
    } else {
      return onFinish(urlArray);
    }
  };
  const handleImageChanged = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setCurrentIndex(0);
      startReadingFile(files, 0, [], (readImages) => {
        const existingFiles = new Set(images.map((image) => image.name));

        setImages((prev) => {
          // Create a Set of unique URLs from the existing images
          const existingUrls = new Set(prev.map((image) => image.url));

          // Filter out images from readImages that have URLs not present in prev
          const filteredImages = readImages.filter(
            (newImage) => !existingUrls.has(newImage.url)
          );

          // Combine the filtered images with the existing images
          const combinedImages = [...prev, ...filteredImages];

          return combinedImages;
          // const combinedImages = [
          //   ...(prev as ImageProps[]),
          //   ...(readImages as ImageProps[]),
          // ];

          // return combinedImages;
        });
        for (let i = 0; i < files.length; i++) {
          if (
            Array.from(existingFiles).some((existingName) =>
              files[i].name.includes(existingName)
            )
          ) {
            continue; // continue the loop if a match is found
          }
          uploadImage(files[i], ({ name, progress }) => {
            setImages((prev) => {
              const uploadedImages = prev?.map((image) => {
                console.log();
                if (image.name === name) {
                  return { ...image, progress: progress };
                } else {
                  //console.log("no match ", image.name, name);
                  return image;
                }
              });

              return uploadedImages;
            });
          });
        }
      });
    }
  };
  interface UploadProps {
    progress: number | undefined;
    name: string;
  }
  const uploadImage = async (
    selectedFile: File,
    onUplading: ({ name, progress }: UploadProps) => void
  ) => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("image", selectedFile);
    try {
      const response = await api.patchForm(
        `/realEstates/images/clmjifrqf0005aco4w7c9mwxj`,
        formData,
        {
          onUploadProgress: (progressEvent: AxiosProgressEvent) => {
            const percentCompleted =
              progressEvent.total &&
              Math.round((progressEvent.loaded * 100) / progressEvent.total);
            console.log("uploading ", percentCompleted);
            onUplading({ progress: percentCompleted, name: selectedFile.name });
          },
        }
      );

      // console.log("Image uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  return (
    <div>
      <div className="flex gap-6">
        {images?.map((image, index) => {
          return (
            <div key={index}>
              {<progress value={image.progress} max="100" />}
              <Image src={image.url} width={200} height={400} alt="image" />
            </div>
          );
        })}
      </div>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageChanged}
      />
      <div className="flex gap-6 ">
        <SubmitButton text="Continue" disabled={false} />
      </div>
    </div>
  );
};

export default FormStep3;
