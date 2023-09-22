import React from "react";
import { getAppartments } from "../services/reatState/apartmentService";
import Link from "next/link";
import RealEstateCard from "../components/RealEstateCard";

const ApartmentList = async () => {
  const data = await getAppartments();
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          <div className="max-w-3xl mx-auto text-center pb-5 md:pb-5">
            <h2 className="h2 mb-4">Explore the appartments</h2>
          </div>
          <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((item) => (
              <Link key={item.id} href={`/apartments/${item.id}`}>
                <RealEstateCard realEstate={item} />
              </Link>
            ))}
          </div>
          {data.length === 0 && (
            <p className="text-center">There are no apartments available</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ApartmentList;
