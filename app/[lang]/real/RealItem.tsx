import Image from "next/image";
import React from "react";
import { getRealEstate } from "@/app/services/reatState/getService";
import ImageSlider from "@/app/components/realEstate/ImageSlider";
import RealEstateDetails from "@/app/components/realEstate/RealEstateDetails";
import InfoAlert from "@/app/components/InfoAlert";
import LandImage from "@/public/images/land.jpeg";

interface Props {
  id: string;
}
const RealItem = async ({ id }: Props) => {
  const data = await getRealEstate(id);
  if (data == null) return null; //<NotFound />;
  return (
    <div className="relative">
      <Image
        src={data.images.length !== 0 ? data.images[0] : LandImage}
        width={600}
        height={100}
        quality={20}
        alt={data.title}
        className="w-full relative h-0 sm:h-1 md:h-48 object-cover blur-sm  md:blur-sm"
      />
      <div className="w-full absolute top-0 h-0 md:h-20  hidden md:flex md:grow opacity-50"></div>

      <div className="w-full  mx-8 py-10 flex flex-col md:flex-row shadow rounded">
        <div className="flex-[3] px-4">
          {data.status === "UNDER_REVIEW" && (
            <InfoAlert
              message={`Your ${data.type.toLocaleLowerCase()} is under review`}
            />
          )}
          <ImageSlider id={data.id} slides={data.images} />
          <div className="mx-1 my-5">
            <h5 className="h4"> {"Description"}</h5>
            <p>{data.description}</p>
          </div>
        </div>
        <div className="flex-1 px-4">
          <RealEstateDetails
            {...data}
            details={data.details ? JSON.parse(data.details.toString()) : {}}
          />
        </div>
      </div>
    </div>
  );
};

export default RealItem;
