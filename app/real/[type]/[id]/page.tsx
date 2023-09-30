import { getTypeFromRoute, stringToEnum } from "@/app/helpers/converters";
import { getRealEstate } from "@/app/services/reatState/getService";
import { RealEstateType } from "@prisma/client";
import React from "react";
import RealItem from "../../RealItem";
interface Props {
  params: {
    id: string;
    type: string;
  };
}
const page = async ({ params: { id, type } }: Props) => {
  const realType = stringToEnum(RealEstateType, getTypeFromRoute(type));
  if (realType) return <RealItem id={id} type={realType} />;
};

export default page;
