// Workspace.js
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useContext } from "react";
import * as yup from "yup";
import { FormContext } from "./FormStepper";
import {
  RealEstateFormData,
  RealEstateStep1Data,
} from "@/app/dataObjects/RealEstateFormData";
import { enumToKeyValues } from "@/app/helpers/converters";
import { AdvisorType, RealEstateType, RentOrSell } from "@prisma/client";
import TextField from "@/app/components/TextField";
import SelectField from "@/app/components/SelectField";
import TexAreaField from "@/app/components/TexAreaField";
import SubmitButton from "@/app/components/SubmitButton";

function FormStep1() {
  const { activeStepIndex, setActiveStepIndex, formData, setFormData } =
    useContext(FormContext);

  const validationSchema = yup.object().shape({
    title: yup
      .string()
      .min(5, "Title must be at least 5 characters")
      .required("Title is required"),
    description: yup
      .string()
      .min(10, "Description must be at least 10 characters")
      .required("Description is required"),
    type: yup.string().min(1).required("Type is required"),
    rentOrSell: yup.string().required("Rent or sell is required"),
    advisorType: yup.string().required("Advisor type is required"),
  });

  return (
    <>
      <div className="max-w-6xlxl mx-auto text-center pb-12 md:pb-20">
        <h2 className="h2"> Welcome!</h2>
      </div>
      <div className="max-w-md mx-auto">
        <Formik
          initialValues={{ ...formData }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            const data = { ...formData, ...values };

            setFormData?.(data);
            console.log(data);
            setActiveStepIndex?.((lastValue) => lastValue + 1);
          }}
        >
          <Form>
            <TextField
              name="title"
              label="Title"
              type="text"
              placeholder="Add title to your ad"
            />
            <TextField
              name="description"
              label="Description"
              placeholder="Descrip your real estate"
            />

            <SelectField
              name="type"
              label="Type"
              placeholder="Select type"
              options={enumToKeyValues(RealEstateType)}
            />
            <SelectField
              name="rentOrSell"
              options={enumToKeyValues(RentOrSell)}
              label="Rent or Sell"
              placeholder="Select Rent or Sell"
            />
            <SelectField
              name="advisorType"
              options={enumToKeyValues(AdvisorType)}
              label="Advisor Type"
              placeholder="Select advisor type"
            />
            <SubmitButton text="Continue" />
          </Form>
        </Formik>
      </div>
    </>
  );
}

export default FormStep1;
