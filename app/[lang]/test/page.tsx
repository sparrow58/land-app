import React from "react";
import TestComp from "./TestComp";

const page = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="py-12 md:py-20">
        <div className="">
          <TestComp />
        </div>
      </div>
    </div>
  );
};

export default page;
