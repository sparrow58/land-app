import React, { ChangeEvent, useContext, useState } from "react";
import { FormContext } from "./FormStepper";
import Image from "next/image";
import api from "@/app/helpers/api";
import { AxiosProgressEvent } from "axios";
import SubmitButton from "@/app/components/SubmitButton";
interface FileProps {
  url: string;
  progress: number | undefined;
  file: File;
}
const FormStep3 = () => {
  const [images, setImages] = useState<FileProps[]>([]);
  const { activeStepIndex, setActiveStepIndex, formData, setFormData, itemId } =
    useContext(FormContext) || {};

  const readFilesAsync = async (fileList: FileList) => {
    const urlArray: FileProps[] = [];

    for (let index = 0; index < fileList.length; index++) {
      const file = fileList[index];

      const dataURL = await readFileAsync(file);

      urlArray.push({
        file,
        url: dataURL,
        progress: 0,
      });
    }

    return urlArray;
  };

  const readFileAsync = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataURL = event?.target?.result;
        resolve(dataURL as string);
      };
      reader.readAsDataURL(file);
    });
  };
  function uploadFiles(images: FileProps[]) {
    for (let i = 0; i < images.length; i++) {
      uploadImage(images[i].file, ({ name, progress }) => {
        setImages((prev) => {
          const uploadedImages = prev?.map((image) => {
            console.log();
            if (image.file.name === name) {
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
        uploadFiles(filteredImages);
        const combinedImages = [...prev, ...filteredImages];

        return combinedImages;
      });
    }
  };

  const uploadImage = async (
    selectedFile: File,
    onUplading: ({
      name,
      progress,
    }: {
      progress: number | undefined;
      name: string;
    }) => void
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
