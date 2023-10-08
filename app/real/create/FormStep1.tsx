// Workspace.js
import { Form, Formik } from "formik";
import React, { useContext, useEffect } from "react";
import * as yup from "yup";
import { FormContext } from "./FormStepper";
import { enumToKeyValues } from "@/app/helpers/converters";
import { AdvisorType, RealEstateType, RentOrSell } from "@prisma/client";
import TextField from "@/app/components/TextField";
import SelectField from "@/app/components/SelectField";
import TexAreaField from "@/app/components/TexAreaField";
import SubmitButton from "@/app/components/SubmitButton";
import { ToastContainer, toast } from "react-toastify";
import MainToastContainer from "@/app/components/MainToastContainer";

function FormStep1() {
  // useEffect(() => {
  //   toast.success("cool");
  // }, []);
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
        <Form className="flex flex-col justify-center items-center">
          <TextField
            name="title"
            label="Title"
            type="text"
            autoFocus
            placeholder="Add title to your ad"
          />
          <TexAreaField
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
    </>
  );
}

export default FormStep1;
