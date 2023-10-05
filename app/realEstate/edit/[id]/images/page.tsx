import FormStep3 from "@/app/realEstate/create/FormStep3";
import React from "react";
import EditImages from "./EditImages";
import getImagesService from "@/app/services/reatState/getImagesService";
import { FileProps } from "@/app/Props/CommonProps";

interface Props {
  params: {
    id: string;
  };
}
const page = async ({ params }: Props) => {
  const data = await getImagesService(params.id);
  const files: FileProps[] =
    data?.images.map((image) => {
      const file: FileProps = {
        url: image,
        isDone: true,
        progress: 1,
        file: null,
      };
      return file;
    }) || [];
  return <EditImages realEstateId={params.id} exImages={files} />;
};

export default page;
