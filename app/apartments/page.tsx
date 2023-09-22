import React, { Suspense } from "react";
import Loading from "../loading";
import ApartmentList from "./ApartmentList";

const page = () => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <ApartmentList />
      </Suspense>
    </>
  );
};

export default page;
