import Image from "next/image";
import React from "react";
import { RealEstateType } from "@prisma/client";
import { getRealEstate } from "../services/reatState/getService";
import ImageSlider from "../components/realEstate/ImageSlider";
import RealEstateDetails from "../components/realEstate/RealEstateDetails";

interface Props {
  type: RealEstateType;
  id: string;
}
const RealItem = async ({ type, id }: Props) => {
  const data = await getRealEstate(id, type);
  if (data == null) return null; //<NotFound />;
  return (
    <div className="relative">
      <Image
        src={data.images.length !== 0 ? data.images[0] : "/land.jpeg"}
        width={600}
        height={100}
        quality={20}
        alt={data.title}
        className="w-full relative h-0 sm:h-1 md:h-48 object-cover blur-sm  md:blur-sm"
      />
      <div className="w-full absolute h-0 md:h-20  hidden md:flex md:grow bg-slate-200 opacity-50"></div>

      <div className="w-full  mt-8 py-10 flex flex-col md:flex-row shadow rounded">
        <div className="flex-[3] px-4">
          <ImageSlider slides={data.images} />
          <div className="mx-1 my-5">
            <h5 className="h4"> {"Description"}</h5>
            <p>{data.description}</p>
          </div>
        </div>
        <div className="flex-1 px-4">
          <RealEstateDetails
            {...data}
            details={data.details ? JSON.parse(data.details!.toString()) : {}}
          />
        </div>
      </div>
    </div>
  );
};

export default RealItem;
