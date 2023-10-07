import { getTypeFromRoute, stringToEnum } from "@/app/helpers/converters";
import { RealEstateType } from "@prisma/client";
import React from "react";
import RealItem from "../RealItem";
interface Props {
  params: {
    id: string;
  };
}
const page = async ({ params: { id } }: Props) => {
  return <RealItem id={id} />;
};

export default page;
