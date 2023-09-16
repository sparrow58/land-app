import { RealEstate } from "@prisma/client";
import Image from "next/image";
import React from "react";

interface Props {
  realEstate: RealEstate;
}
const RealEstateCard = ({ realEstate }: Props) => {
  console.log("apartment in component", realEstate);

  return (
    <div className="bg-white rounded overflow-hidden shadow relative">
      <Image
        src="/land.jpeg"
        width={600}
        height={100}
        quality={100}
        alt={realEstate.title}
        className="w-full h-23 sm:h-48 object-cover"
      />
      <div className="m-4">
        <h3 className="font-bold">{realEstate.title}</h3>

        <span className="block text-gray-500 text-sm">
          {realEstate.size} Labna
        </span>

        <span className="block text-gray-500 text-sm">
          {/* {realEstate.created_at.toString()} */}
        </span>
      </div>
      <div className="bg-secondary-100  text-xs uppercase font-bold rounded-full p-2 absolute top-0 ml-2 mt-2">
        <span>Verified</span>
      </div>
      <div className="bg-blue-300 text-gray-500  text-xs uppercase font-bold rounded-bl-md p-2 absolute top-0 right-0">
        <span>{realEstate.price} YR</span>
      </div>
    </div>
  );
};

export default RealEstateCard;
