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
  itemId: string;
  setItemId: Dispatch<SetStateAction<string>>;
}
export const FormContext = createContext<StepperProps | null>(null);

export const FormStepper = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [itemId, setItemId] = useState<string>("");

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
      value={{
        activeStepIndex,
        setActiveStepIndex,
        formData,
        setFormData,
        itemId,
        setItemId,
      }}
    >
      <div className=" flex flex-col items-center justify-start">
        <Stepper />
        <Step />
      </div>
    </FormContext.Provider>
  );
};
