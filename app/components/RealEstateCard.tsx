import { RealEstate } from "@prisma/client";
import Image from "next/image";
import React from "react";
import { ImImages } from "react-icons/im";
import { PiBathtub } from "react-icons/pi";
import { SlSizeFullscreen } from "react-icons/sl";
import { MdOutlineBedroomParent } from "react-icons/md";
import { GrLocation } from "react-icons/gr";
import { Details } from "@/app/dataObjects/RealEstateFormData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LandImage from "@/public/images/land.jpeg";

interface Props {
  data: RealEstate;
  verified: string;
  YR: string;
}
const RealEstateCard = ({ data, verified, YR }: Props) => {
  const details: Details = data.details
    ? JSON.parse(data.details as string)
    : {};

  return (
    <Card className=" rounded overflow-hidden shadow">
      <CardContent className="relative p-0">
        <Image
          src={data.images.length !== 0 ? data.images[0] : LandImage}
          width={600}
          height={200}
          quality={100}
          alt={data.title}
          className="w-full h-28 sm:h-48 object-cover"
        />
        <div className="bg-gray-100 text-xs uppercase font-bold rounded-full p-2 absolute left-0 top-0 ml-2 mt-2 opacity-70">
          <span>{verified}</span>
        </div>
        <div className="bg-black text-gray-100 text-xs uppercase font-bold rounded-bl-md p-2 absolute top-0 right-0 opacity-70">
          <span>
            {data.price.toLocaleString()} {YR}
          </span>
        </div>
        <div className="absolute items-center bottom-0 right-0 gap-1 bg-black opacity-50 rounded flex align-bottom text-gray-100 px-1 text-sm mr-1">
          <span>{data.images.length}</span>
          <ImImages />
        </div>
      </CardContent>
      <CardHeader className="">
        <CardTitle>{data.title}</CardTitle>
        <div className="flex items-center gap-1 text-muted-foreground text-sm mt-3">
          <GrLocation />
          <span className="block">{"Sana'a, Bab Alyemen"}</span>
        </div>
        <div className="flex items-center gap-6 pt-2">
          <div className="flex items-center gap-1 text-muted-foreground text-sm">
            <span className="block">{data.size} m&#178;</span>
            <SlSizeFullscreen />
          </div>
          {details.numberOfBathRooms && (
            <div className="flex items-center gap-1 text-gray-500 text-sm">
              <span className="block">{details.numberOfBathRooms}</span>
              <PiBathtub />
            </div>
          )}
          {details.numberOfRooms && (
            <div className="flex items-center gap-1 text-gray-500 text-sm">
              <span className="block">{details.numberOfRooms}</span>
              <MdOutlineBedroomParent />
            </div>
          )}
        </div>
        <span className="block text-gray-500 text-sm">
          {data.createdAt.toString()}
        </span>
      </CardHeader>
    </Card>
  );
};

export default RealEstateCard;
