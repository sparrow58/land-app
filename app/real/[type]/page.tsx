import { getTypeFromRoute, stringToEnum } from "@/app/helpers/converters";
import { RealEstateType } from "@prisma/client";
import React from "react";
import RealList from "./RealList";
interface Props {
  params: {
    type: string;
  };
}
const page = ({ params: { type } }: Props) => {
  const realType = stringToEnum(RealEstateType, getTypeFromRoute(type));
  if (realType) return <RealList type={realType} />;
};

export default page;
