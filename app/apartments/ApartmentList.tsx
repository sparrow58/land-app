import React from "react";
import { getAppartments } from "../services/reatState/apartmentService";
import Link from "next/link";
import RealEstateCard from "../components/RealEstateCard";

const ApartmentList = async () => {
  const data = await getAppartments();
  return (
    <>
      <div className="mt-8 grid lg:grid-cols-3 gap-10">
        {data.map((item) => (
          <Link key={item.id} href={`/apartments/${item.id}`}>
            <RealEstateCard realEstate={item} />
          </Link>
        ))}
      </div>
      {data.length === 0 && (
        <p className="text-center">There are no apartments available</p>
      )}
    </>
  );
};

export default ApartmentList;
