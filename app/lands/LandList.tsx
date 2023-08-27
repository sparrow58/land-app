import Link from "next/link";
import React from "react";
import fetchData from "../services/fetchData";
import Image from "next/image";
import LandCard from "./LandCard";
import { getLands } from "../services/landService";

export interface Land {
  id: string;
  name: string;
  land_size: number;
  land_price: number;
  endowment: boolean;
  image?: string | null;
  created_by: string;
  updated_by: string;
  created_at: Date;
  updated_at: Date | null;
}
const LandsList = async () => {
  // const data = await fetchData<Land>("http://localhost:3000/api/lands");
  const data = await getLands();
  return (
    <>
      <div className="mt-8 grid lg:grid-cols-3 gap-10">
        {data.map((item) => (
          <Link key={item.id} href={`/lands/${item.id}`}>
            <LandCard land={item} key={item.id} />
          </Link>
        ))}
      </div>
      {data.length === 0 && (
        <p className="text-center">There are no open tickets</p>
      )}
    </>
  );
};

export default LandsList;
