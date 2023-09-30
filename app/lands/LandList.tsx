import Link from "next/link";
import React from "react";
import fetchData from "../services/fetchData";
import Image from "next/image";
import LandCard from "./LandCard";
import { getLands } from "../services/landService";
import RealEstateCard from "../components/RealEstateCard";

const LandsList = async () => {
  // const data = await fetchData<Land>("http://localhost:3000/api/lands");
  const data = await getLands();
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          <div className="max-w-3xl mx-auto text-center pb-5 md:pb-5">
            <h2 className="h2 mb-4">Explore the lands</h2>
          </div>
          <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((item) => (
              <Link key={item.id} href={`/lands/${item.id}`}>
                <RealEstateCard data={item} key={item.id} />
              </Link>
            ))}
          </div>
          {data.length === 0 && (
            <p className="text-center">There are no lands available</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default LandsList;
