import React, { Suspense } from "react";
import LandsList from "./LandList";
import Loading from "../loading";

const page = () => {
  return (
    <main>
      <nav>
        <div>
          <h2>Lands</h2>
          <p>
            <small>Lands for sell.</small>
          </p>
        </div>
      </nav>
      <Suspense fallback={<Loading />}>
        <LandsList />
      </Suspense>
    </main>
  );
};

export default page;
