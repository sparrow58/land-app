import RealEstateCard from "@/app/components/RealEstateCard";
import { RealEstate } from "@prisma/client";
import Link from "next/link";
import React from "react";

interface Props {
  data: RealEstate[];
}
const RealList = async ({ data }: Props) => {
  // console.log("list Data", data);
  return (
    <>
      <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item) => (
          <Link key={item.id} href={`/real/${item.id}`}>
            <RealEstateCard data={item} />
          </Link>
        ))}
      </div>
      {data.length === 0 && (
        <p className="text-center">There are no apartments available</p>
      )}
    </>
  );
};

interface Props {}
export default RealList;
