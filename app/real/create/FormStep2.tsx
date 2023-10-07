// Basic.js
"use client";
import { Form, Formik } from "formik";
import React, { useContext, useState } from "react";
import * as yup from "yup";
import { FormContext } from "./FormStepper";
import {
  RealEstateFormData,
  RealEstateStep2Data,
} from "@/app/dataObjects/RealEstateFormData";
import TextField from "@/app/components/TextField";
import { enumToKeyValues } from "@/app/helpers/converters";
import SelectField from "@/app/components/SelectField";
import { OverlookingType, PaymentMethodType, RentOrSell } from "@prisma/client";
import SubmitButton from "@/app/components/SubmitButton";
import Button from "@/app/components/Button";

function FormStep2() {
  const { activeStepIndex, setActiveStepIndex, formData, setFormData } =
    useContext(FormContext);

  const validationSchema = yup.object().shape({
    overlooking: yup.string().required("overlooking is required"),
    price: yup.number().min(1).required("price is required"),
    size: yup.string().required("size is required"),
    paymentMethod: yup.string().required("payment_method time is required"),
  });

  const handleBack = (values: {}) => {
    const data: RealEstateFormData = processData(areaOption, values, formData);
    setFormData?.(data);
    setActiveStepIndex?.((i) => i - 1);
  };

  const [areaOption, setAreaOption] = useState("meter");

  return (
    <Formik
      initialValues={{ ...formData }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        const data: RealEstateFormData = processData(
          areaOption,
          values,
          formData
        );
        setFormData?.(data);

        setActiveStepIndex?.((i) => i + 1);
      }}
    >
      {({ values, setFieldValue }) => (
        <Form className="flex flex-col justify-center items-center">
          <TextField
            name="size"
            label="Total Area"
            type="number"
            placeholder={`Total area in ${
              areaOption === "meter" ? "Square Meters" : "Lebnah"
            } `}
          />
          <TextField
            name="price"
            label="Price"
            type="number"
            autoFocus
            placeholder="Total price"
          />
          <div className="flex flex-row justify-between gap-6">
            <div className="flex items-center">
              <input
                checked={areaOption === "meter"}
                id="default-radio-2"
                type="radio"
                value="meter"
                name="meter-radio"
                onChange={(e) => {
                  setAreaOption(e.target.value);
                  if (values?.size) {
                    const converted = convertToMeter(values?.size);

                    setFieldValue("size", converted);
                  }
                }}
                className="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300
             
              dark:bg-gray-700 "
              />
              <label
                htmlFor="default-radio-2"
                className="ml-2 text-sm font-medium "
              >
                Meter Square
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="default-radio-2"
                checked={areaOption === "lebnah"}
                type="radio"
                value="lebnah"
                name="lebnah-radio"
                onChange={(e) => {
                  setAreaOption(e.target.value);
                  if (values?.size) {
                    const converted = values?.size && values.size / 44.44;
                    setFieldValue("size", Math.round(converted * 100) / 100);
                  }
                }}
                className="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300
              "
              />
              <label
                htmlFor="default-radio-2"
                className="ml-2 text-sm font-medium "
              >
                Lebnah
              </label>
            </div>
          </div>

          <SelectField
            name="overlooking"
            label="Overlooking"
            options={enumToKeyValues(OverlookingType)}
            placeholder="select overlooking"
          />

          <SelectField
            name="paymentMethod"
            options={enumToKeyValues(PaymentMethodType)}
            label="Payment Method"
            placeholder="Select Payment Method"
          />
          <div className="flex justify-between gap-6">
            <Button text="Back" onClick={() => handleBack(values)} />
            <SubmitButton text="Continue" />
          </div>
        </Form>
      )}
    </Formik>
  );
}
function processData(
  areaOption: string,
  values: any,
  formData: RealEstateFormData | undefined
) {
  let newValues: any;
  if (areaOption === "lebnah") {
    if (values.size)
      newValues = { ...values, size: convertToMeter(values.size) };
  } else newValues = values;
  const data: RealEstateFormData = { ...formData, ...newValues };
  return data;
}

function convertToMeter(size: number) {
  return Math.round(size && size * 44.44 * 100) / 100;
}
export default FormStep2;
