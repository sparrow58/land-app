"use client";
import { useMultistepForm } from "@/app/hooks/useMultistepFrom";
import React, { FormEvent, useState } from "react";
import RealEstateStep1Form from "./RealEstateStep1Form";
import RealEstateStep2Form from "./RealEstateStep2Form";
import {
  OverlookingType,
  PaymentMethodType,
  RealEstate,
  RealEstateType,
} from "@prisma/client";
import { RealEstateFormData } from "@/app/dataObjects/RealEstateFormData";
import useRealEstateForm from "@/app/hooks/useRealStateForm";

const initialData: RealEstateFormData = {
  title: "",
  description: "",
  overlooking: OverlookingType.BACK,
  details: JSON.parse("{}"),
  payment_method: PaymentMethodType.BOTH,
  price: 0,
  rentOrSell: "BOTH",
  size: 0,
  type: "APARTMENT",
};
const RealEstateForm = () => {
  const { handleChange, handleBlur, handleSubmit, values, errors } =
    useRealEstateForm((values) => {});
  // const [data, setData] = useState(initialData);
  // const updateFields = (fields: Partial<RealEstateFormData>) => {
  //   setData((prev) => {
  //     return { ...prev, ...fields };
  //   });
  // };
  const { steps, step, isFirstStep, isLastStep, currentStepIndex, back, next } =
    useMultistepForm([
      <RealEstateStep1Form
        {...values}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors}
      />,
      <RealEstateStep2Form
        {...values}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors}
      />,
    ]);

  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (!isLastStep) next();
    console.log(values);
  };

  return (
    <div className="relative bg-white rounded-sm p-8 m-4 ">
      <div className="absolute top-2 right-2">
        {currentStepIndex + 1}/ {steps.length}
      </div>
      <form onSubmit={onSubmitHandler}>
        {step}
        <div className="mt-4 flex justify-end  gap-2">
          {!isFirstStep && (
            <button className="btn-primary" type="button" onClick={back}>
              Back
            </button>
          )}
          <button className="btn-primary" type="submit">
            {isLastStep ? "Finish" : "Next"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RealEstateForm;
