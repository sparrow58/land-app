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
import FormPageContainer from "@/app/components/FormPageContainer";
import TextField from "@/app/components/TextField";
import TexAreaField from "@/app/components/TexAreaField";
import { enumToKeyValues } from "@/app/helpers/converters";
import DropList from "@/app/components/DropList";

const RealEstateForm = () => {
  const { handleChange, handleBlur, handleSubmit, values, errors } =
    useRealEstateForm((values) => {});
  const { steps, step, isFirstStep, isLastStep, currentStepIndex, back, next } =
    useMultistepForm([
      <FormPageContainer key={0}>
        <TextField
          fieldName="title"
          label="Title"
          value={values.title}
          error={errors.title}
          onChange={handleChange}
          onBlur={handleBlur}
          autoFocus={true}
        />

        <TexAreaField
          fieldName="description"
          label="Description"
          value={values.description}
          error={errors.description}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <DropList
          fieldName="type"
          label="Type"
          value={values.type}
          onChange={handleChange}
          onBlur={handleBlur}
          options={enumToKeyValues(RealEstateType)}
          error={errors.type}
        />
      </FormPageContainer>,

      <FormPageContainer key={1}>
        <TextField
          fieldName="price"
          label="Price"
          value={values.price}
          error={errors.price}
          onChange={handleChange}
          onBlur={handleBlur}
          type="number"
          autoFocus={true}
        />
        <TextField
          fieldName="size"
          label="Size"
          value={values.size}
          error={errors.size}
          onChange={handleChange}
          onBlur={handleBlur}
          type="number"
        />
        <DropList
          fieldName="overlooking"
          label="Overlooking"
          value={values.overlooking}
          onChange={handleChange}
          onBlur={handleBlur}
          options={enumToKeyValues(OverlookingType)}
          error={errors.overlooking}
        />
      </FormPageContainer>,
    ]);

  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (!isLastStep) next();
  };
  console.log("errors", errors);
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
