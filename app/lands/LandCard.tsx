import Image from "next/image";
import React from "react";
import { Land } from "./LandList";

interface Props {
  land: Land;
}
const LandCard = ({ land }: Props, key: string) => {
  return (
    <div key={key} className="card">
      <Image
        src="/land.jpeg"
        width={600}
        height={100}
        quality={100}
        alt={land.name}
        className="w-full h-23 sm:h-48 object-cover"
      />
      <div className="m-4">
        <h3 className="font-bold">{land.name}</h3>

        <span className="block text-gray-500 text-sm">
          {land.land_size} Labna
        </span>

        <span className="block text-gray-500 text-sm">
          {land.created_at.toString()}
        </span>
      </div>
      <div className="badge">
        <span>{land.endowment ? "Endowed" : "FreeLand"}</span>
      </div>
      <div className="bg-blue-300 text-gray-500  text-xs uppercase font-bold rounded-bl-md p-2 absolute top-0 right-0">
        <span>{land.land_price} YR</span>
      </div>
    </div>
  );
};

export default LandCard;
