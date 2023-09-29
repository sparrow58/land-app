"use client";
import React, { useContext } from "react";
import { FormContext } from "./FormStepper";
import { useRouter } from "next/navigation";
import useCreateRealEstate from "@/app/hooks/realEstate/useCreateRealEstate";
import Button from "@/app/components/Button";
import SubmitButton from "@/app/components/SubmitButton";
import { Form, Formik } from "formik";
import {
  Details,
  EndowmentType,
  FinalizationType,
  OnMarketType,
  RealEstateFormData,
  RentType,
} from "@/app/dataObjects/RealEstateFormData";
import * as yup from "yup";
import TextField from "@/app/components/TextField";
import SelectField from "@/app/components/SelectField";
import { enumToKeyValues } from "@/app/helpers/converters";

const FormStep3 = () => {
  const { activeStepIndex, setActiveStepIndex, formData, setFormData } =
    useContext(FormContext) || {};
  const router = useRouter();

  const { create, isLoading } = useCreateRealEstate({
    onSuccess: (response) => {
      console.log(response);

      console.log("redirecting to ", `/realEstate/edit/${response.id}/images`);
      router.replace(`/realEstate/edit/${response.id}/images`);
    },
    onFailure: (error) => {},
  });
  const handleBack = (values: {}) => {
    setActiveStepIndex?.((i) => i - 1);

    setFormData({ ...formData, details: { ...values } });
  };

  const validationSchema = yup.object().shape({
    floor: yup.number(), //appartment
    numberOfFloors: yup.number(), // villa building house
    finalizationType: yup.string(), // appartment villa building house
    numberOfRooms: yup.number(), // appartment villa building house
    numberOfBathRooms: yup.number(), //appartment villa building house
    yearOfDelivery: yup.date(), ///appartment villa building house
    onMarketType: yup.string(), // appartment villa building house
    rentType: yup.string(), // rent
    endowmentType: yup.string(), // sell
  });

  const handelSubmit = (values: Details) => {
    const filteredDetails: Details = Object.fromEntries(
      Object.entries(values).filter(([key, value]) => value !== "")
    );
    console.log("filtered", filteredDetails);
    const final = { ...formData, details: { ...filteredDetails } };

    console.log("final Data", final);
    create(final);
  };
  return (
    <>
      <div className="max-w mx-auto text-center pb-6 md:pb-6">
        <h2 className="h4">More details: {formData.title}</h2>
        <h2 className="h4">
          {formData.type} for {formData.rentOrSell}
        </h2>
      </div>
      <div className="max-w-md mx-auto">
        <Formik
          initialValues={formData.details}
          validationSchema={validationSchema}
          onSubmit={handelSubmit}
        >
          {({ values, setFieldValue, errors }) => (
            <Form className="flex flex-col justify-center items-center">
              {formData.type === "APARTMENT" && (
                <TextField
                  name="floor"
                  placeholder="Floor number"
                  type="number"
                  label="Floor number"
                />
              )}
              {formData.type === "BUILDING" ||
                (formData.type === "VILLA" && (
                  <TextField
                    name="numberOfFloors"
                    label="Number of floors"
                    type="number"
                    placeholder="Number of floors"
                  />
                ))}
              {(formData.type === "APARTMENT" ||
                formData.type === "BUILDING" ||
                formData.type === "VILLA") && (
                <>
                  <TextField
                    name="numberOfRooms"
                    label="Number of rooms"
                    placeholder="Number of rooms"
                    type="number"
                  />
                  <TextField
                    name="numberOfBathRooms"
                    label="Number of bathrooms"
                    placeholder="Number of bathrooms"
                    type="number"
                  />
                  <SelectField
                    name="finalizationType"
                    label="Finalization Type"
                    placeholder="Select Finalization Type"
                    options={enumToKeyValues(FinalizationType)}
                  />
                  <SelectField
                    name="onMarketType"
                    label="Type on market"
                    placeholder="Type on market"
                    options={enumToKeyValues(OnMarketType)}
                  />
                  <TextField
                    name="yearOfDelivery"
                    label="Year of delivary"
                    placeholder="Year of delivary"
                    type="date"
                  />
                </>
              )}

              {formData.rentOrSell !== "SELL" && (
                <SelectField
                  name="rentType"
                  label="Rent purpose"
                  placeholder="Rent purpose"
                  options={enumToKeyValues(RentType)}
                />
              )}
              {formData.rentOrSell !== "RENT" && (
                <SelectField
                  name="endowmentType"
                  label="Endowment"
                  placeholder="Select Endowment type"
                  options={enumToKeyValues(EndowmentType)}
                />
              )}

              <div className="flex justify-between gap-6">
                <Button text="Back" onClick={() => handleBack(values)} />
                <SubmitButton text="Continue" />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default FormStep3;
