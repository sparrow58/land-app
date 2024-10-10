"use client";
import React, { useContext, useState } from "react";
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
  RentType,
} from "@/app/dataObjects/RealEstateFormData";
import * as yup from "yup";
import TextField from "@/app/components/TextField";
import SelectField from "@/app/components/SelectField";
import {
  enumToKeyValues,
  enumToLocalKeyValues,
} from "@/app/helpers/converters";
import { RentOrSell } from "@prisma/client";
import { toast } from "react-toastify";
import { RealFormLocalProps } from "@/app/Props/CommonProps";

const FormStep3 = ({
  t: {
    real: { fields },
  },
}: Readonly<{
  t: RealFormLocalProps;
}>) => {
  const { setActiveStepIndex, formData, setFormData } =
    useContext(FormContext) || {};
  const router = useRouter();
  const [isSubmited, setIsSubmited] = useState(false);

  const { create, update, isLoading } = useCreateRealEstate({
    onSuccess: (response) => {
      toast.success("Created");
      if (formData.id) router.replace(`/real/${response.id}`);
      else router.replace(`/real/${response.id}/edit/images`);
    },
    onFailure: (error) => {
      setIsSubmited(false);
      toast.error("Error occured " + error);
    },
  });
  const handleBack = (values: {}) => {
    setActiveStepIndex?.((i) => i - 1);

    setFormData({ ...formData, details: { ...values } });
  };
  const rentOrSellParsed = (rentOrSell: RentOrSell) => {
    if (rentOrSell === "BOTH") return "Rent or Sell";
    else if (rentOrSell === "RENT") return "Rent";
    else if (rentOrSell === "SELL") return "Sell";
    else return rentOrSell;
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
    setIsSubmited(true);
    if (final.id) {
      update(final);
    } else {
      create(final);
    }
  };
  console.log("formData.rentOrSell", formData);
  return (
    <>
      <div className="max-w mx-auto text-center pb-6 md:pb-6">
        <h2 className="h4">Add more details</h2>
        <h2 className="h4 capitalize">
          {formData.title} {formData.type.toLocaleLowerCase()} for{" "}
          {rentOrSellParsed(formData.rentOrSell as RentOrSell)}
        </h2>
      </div>
      <Formik
        initialValues={formData.details}
        validationSchema={validationSchema}
        onSubmit={handelSubmit}
      >
        {({ values }) => (
          <Form className="flex flex-col justify-center items-center">
            {formData.type === "APARTMENT" && (
              <TextField
                name="floor"
                label={fields.floor.label}
                placeholder={fields.floor.placeholder}
                type="number"
                fullWidth
              />
            )}
            {formData.type === "BUILDING" ||
              (formData.type === "VILLA" && (
                <TextField
                  name="numberOfFloors"
                  label={fields.numberOfFloors.label}
                  type="number"
                  placeholder={fields.numberOfFloors.placeholder}
                  fullWidth
                />
              ))}
            {(formData.type === "APARTMENT" ||
              formData.type === "BUILDING" ||
              formData.type === "VILLA") && (
              <>
                <TextField
                  name="numberOfRooms"
                  label={fields.numberOfRooms.label}
                  placeholder={fields.numberOfRooms.placeholder}
                  type="number"
                  fullWidth
                />
                <TextField
                  name="numberOfBathRooms"
                  label={fields.numberOfBathRooms.label}
                  placeholder={fields.numberOfBathRooms.placeholder}
                  type="number"
                  fullWidth
                />
                <SelectField
                  name="finalizationType"
                  label={fields.finalizationType.label}
                  placeholder={fields.finalizationType.placeholder}
                  options={enumToLocalKeyValues(
                    FinalizationType,
                    fields.finalizationType.options
                  )}
                  fullWidth
                />
                <SelectField
                  name="onMarketType"
                  label={fields.onMarketType.label}
                  placeholder={fields.onMarketType.placeholder}
                  options={enumToLocalKeyValues(
                    OnMarketType,
                    fields.onMarketType.options
                  )}
                  fullWidth
                />
                <TextField
                  name="yearOfDelivery"
                  label={fields.yearOfDelivery.label}
                  placeholder={fields.yearOfDelivery.placeholder}
                  type="date"
                  fullWidth
                />
              </>
            )}

            {formData.rentOrSell !== "SELL" && (
              <SelectField
                name="rentType"
                label={fields.rentType.label}
                placeholder={fields.rentType.placeholder}
                options={enumToLocalKeyValues(
                  RentType,
                  fields.rentType.options
                )}
                fullWidth
              />
            )}
            {formData.rentOrSell !== "RENT" && (
              <SelectField
                name="endowmentType"
                label={fields.endowmentType.label}
                placeholder={fields.endowmentType.placeholder}
                options={enumToLocalKeyValues(
                  EndowmentType,
                  fields.endowmentType.options
                )}
                fullWidth
              />
            )}

            <div className="flex justify-between gap-6">
              <Button text="Back" onClick={() => handleBack(values)} />
              <SubmitButton text="Continue" disabled={isSubmited} />
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default FormStep3;
