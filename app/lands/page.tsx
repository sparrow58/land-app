import React, { Suspense } from "react";
import LandsList from "./LandList";
import Loading from "../loading";

const page = () => {
  return (
    <section>
      <Suspense fallback={<Loading />}>
        <LandsList />
      </Suspense>
    </section>
  );
};

export default page;
