import { RealEstate } from "@prisma/client";
import Image from "next/image";
import React from "react";

interface Props {
  land: RealEstate;
}
const LandCard = ({ land }: Props, key: string) => {
  return (
    <div key={key} className="card">
      <Image
        src="/land.jpeg"
        width={600}
        height={100}
        quality={100}
        alt={land.title}
        className="w-full h-23 sm:h-48 object-cover"
      />
      <div className="m-4">
        <h3 className="font-bold">{land.title}</h3>

        <span className="block text-gray-500 text-sm">{land.size} Labna</span>

        <span className="block text-gray-500 text-sm">
          {land.createdAt.toString()}
        </span>
      </div>
      {/* <div className="badge">
        <span>{land.endowment ? "Endowed" : "FreeLand"}</span>
      </div> */}
      <div className="bg-blue-300 text-gray-500  text-xs uppercase font-bold rounded-bl-md p-2 absolute top-0 right-0">
        <span>{land.price} YR</span>
      </div>
    </div>
  );
};

export default LandCard;
