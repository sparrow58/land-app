import React from "react";
import LandCard from "../LandCard";
import { fetchSingle } from "@/app/services/fetchData";
import { Land } from "../LandList";
import NotFound from "@/app/not-found";
const page = async ({ params }: any) => {
  const data = await fetchSingle<Land>(
    "http://localhost:3000/api/lands/" + params.id
  );
  if (data == null) return <NotFound />;
  return (
    <main>
      <LandCard land={data} />
    </main>
  );
};

export default page;
