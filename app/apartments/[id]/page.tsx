import RealEstateCard from "@/app/components/RealEstateCard";
import NotFound from "@/app/not-found";
import { getAppartment } from "@/app/services/reatState/apartmentService";
import React from "react";

const page = async ({ params }: any) => {
  const data = await getAppartment(params.id);
  if (data == null) return <NotFound />;
  console.log("apartment", data);
  return <RealEstateCard realEstate={data} />;
};

export default page;
