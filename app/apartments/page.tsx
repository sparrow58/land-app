import React, { Suspense } from "react";
import Loading from "../loading";
import ApartmentList from "./ApartmentList";

const page = () => {
  return (
    <main>
      <nav>
        <div>
          <h2>Appartments</h2>
          <p>
            <small>Show Appartments</small>
          </p>
        </div>
      </nav>
      <Suspense fallback={<Loading />}>
        <ApartmentList />
      </Suspense>
    </main>
  );
};

export default page;
