import RealEstateCard from "@/app/components/RealEstateCard";
import ImageSlider from "@/app/components/realEstate/ImageSlider";
import RealEstateDetails from "@/app/components/realEstate/RealEstateDetails";
import NotFound from "@/app/not-found";
import { getAppartment } from "@/app/services/reatState/apartmentService";
import Image from "next/image";
import React from "react";
import { json } from "stream/consumers";

const page = async ({ params }: any) => {
  const data = await getAppartment(params.id);
  if (data == null) return <NotFound />;
  return (
    <>
      <Image
        src={data.images.length !== 0 ? data.images[0] : "/land.jpeg"}
        width={600}
        height={100}
        quality={100}
        alt={data.title}
        className="w-full h-0 md:h-48 object-cover  md:blur-sm"
      />

      <div className="max-w-6xl pt-8 mt-8 flex flex-col md:flex-row shadow rounded">
        <div className="flex-[3] px-4">
          <ImageSlider slides={data.images} />
          <div className="mx-1 my-5">
            <h5 className="h4"> {"Description"}</h5>
            <p>{data.description}</p>
          </div>
        </div>
        <div className="flex-1">
          <RealEstateDetails
            {...data}
            details={JSON.parse(data.details!.toString())}
          />
        </div>
      </div>
    </>
  );
};

export default page;
