"use client";
import { enumToKeyValues } from "@/app/helpers/converters";
import * as yup from "yup";

import * as Yup from "yup";
import Stepper from "./Stepper";

import { Dispatch, SetStateAction, createContext, useState } from "react";
import Step from "./Step";
import { RealEstateFormData } from "@/app/dataObjects/RealEstateFormData";
interface StepperProps {
  activeStepIndex: number;
  setActiveStepIndex: Dispatch<SetStateAction<number>>;
  formData: RealEstateFormData | {};
  setFormData: Dispatch<SetStateAction<RealEstateFormData | {}>>;
}
export const FormContext = createContext<StepperProps | null>(null);

const validationSchema = Yup.object().shape({
  title: yup
    .string()
    .min(5, "Title must be at least 5 characters")
    .required("Title is required"),
  description: yup
    .string()
    .min(10, "Description must be at least 10 characters")
    .required("Description is required"),
  type: yup.string().required("type is required"),
  overlooking: yup.string().required("overlooking is required"),
  price: yup.number().min(1, "price is required").required("price is required"),
  size: yup.string().required("Scheduled  is required"),
  payment_method: yup.string().required("payment_method time is required"),
  rentOrSell: yup.string().required("rentOrSell is required"),
});

export const FormStepper = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [formData, setFormData] = useState<RealEstateFormData | {}>({
    title: "",
    description: "",
    type: "",
    overlooking: "",
    price: "",
    size: "",
    paymentMethod: "",
    rentOrSell: "",
  });

  return (
    <FormContext.Provider
      value={{ activeStepIndex, setActiveStepIndex, formData, setFormData }}
    >
      <div className=" flex flex-col items-center justify-start">
        <Stepper />
        <Step />
      </div>
    </FormContext.Provider>
  );
};
