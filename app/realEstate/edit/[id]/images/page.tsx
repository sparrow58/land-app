import FormStep3 from "@/app/realEstate/create/FormStep3";
import React from "react";
import EditImages from "./EditImages";

interface Props {
  params: {
    id: string;
  };
}
const page = ({ params }: Props) => {
  return <EditImages realEstateId={params.id} />;
};

export default page;
