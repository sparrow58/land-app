import RealEstateCard from "@/app/components/RealEstateCard";
import NotFound from "@/app/not-found";
import { getAppartment } from "@/app/services/reatState/apartmentService";
import Image from "next/image";
import React from "react";

const page = async ({ params }: any) => {
  const data = await getAppartment(params.id);
  if (data == null) return <NotFound />;
  console.log("apartment", data);
  return (
    <>
      <RealEstateCard realEstate={data} />
      <div className="max-w-6xl mt-8 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {data.images?.map((image, index) => {
          return (
            <div className="w-full " key={index}>
              <Image
                src={data.images.length !== 0 ? data.images[0] : "/land.jpeg"}
                width={600}
                height={100}
                quality={100}
                alt={data.title}
                className="w-full h-23 sm:h-48 object-cover"
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default page;
