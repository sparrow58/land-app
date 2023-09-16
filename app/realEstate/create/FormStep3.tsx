import React, { ChangeEvent, useContext, useState } from "react";
import { FormContext } from "./FormStepper";
import Image from "next/image";
import api from "@/app/helpers/api";
import { AxiosProgressEvent } from "axios";

const FormStep3 = () => {
  const [selectedFiles, setSelectedFiles] = useState<FileList>();
  const [progress, setProgress] = useState<number | undefined>(0);
  const [uploading, setUploading] = useState<boolean>(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const { activeStepIndex, setActiveStepIndex, formData, setFormData, itemId } =
    useContext(FormContext) || {};
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const startReadingFile = (
    fileList: FileList,
    index: number,
    urlArray: string[]
  ) => {
    if (index < fileList.length) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataURL = event?.target?.result;
        urlArray.push(dataURL as string);
        startReadingFile(fileList, index + 1, urlArray);
      };
      reader.readAsDataURL(fileList[index]);
    } else {
      setImageUrls((prev) => {
        const combinedUrls = [...prev, ...urlArray];
        const uniqueUrls = Array.from(new Set(combinedUrls));

        return uniqueUrls;
      });
    }
  };
  const handleImageChanged = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFiles(files);
      setCurrentIndex(0);
      startReadingFile(files, 0, []);
      for (let index = 0; index < files.length; index++) {
        uploadImage(files[index]);
      }
    }
  };
  const uploadImage = async (selectedFile: File) => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("image", selectedFile);
    try {
      console.log("uploading image for id", itemId);
      const response = await api.patchForm(
        `/realEstates/images/${itemId}`,
        formData,
        {
          onUploadProgress: (progressEvent: AxiosProgressEvent) => {
            const percentCompleted =
              progressEvent.total &&
              Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setProgress(percentCompleted);
          },
        }
      );

      console.log("Image uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  return (
    <div>
      <div className="flex gap-6 ">
        {imageUrls.map((item, index) => {
          return (
            <div key={index}>
              {uploading && <progress value={progress} max="100" />}
              <Image src={item} width={200} height={400} alt="image" />
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
    </div>
  );
};

export default FormStep3;
