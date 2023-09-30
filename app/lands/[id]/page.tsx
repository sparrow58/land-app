import React from "react";
import LandCard from "../LandCard";
import NotFound from "@/app/not-found";
import { getLand } from "@/app/services/landService";
import RealEstateCard from "@/app/components/RealEstateCard";
import Image from "next/image";
interface Props {
  params: {
    id: string;
  };
}
const page = async ({ params }: Props) => {
  //   const data = await fetchSingle<Land>(
  //     "http://localhost:3000/api/lands/" + params.id
  //   );
  const data = await getLand(params.id);
  if (data == null) return <NotFound />;
  return (
    <>
      <RealEstateCard data={data} />
      <div className="max-w-6xl mt-8 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {data.images?.map((image, index) => {
          return (
            <div className="w-full " key={index}>
              <Image
                src={image}
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
