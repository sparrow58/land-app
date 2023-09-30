"use client";
import Stepper from "./Stepper";

import { Dispatch, SetStateAction, createContext, useState } from "react";
import Step from "./Step";
import { RealEstateFormData } from "@/app/dataObjects/RealEstateFormData";
interface StepperProps {
  activeStepIndex: number;
  setActiveStepIndex: Dispatch<SetStateAction<number>>;
  formData: RealEstateFormData;
  setFormData: Dispatch<SetStateAction<RealEstateFormData>>;
}
export const FormContext = createContext<StepperProps>({} as StepperProps);

export const FormStepper = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [itemId, setItemId] = useState<string>("");

  const [formData, setFormData] = useState<RealEstateFormData>({
    title: "",
    description: "",
    type: "",
    overlooking: "",
    price: "",
    size: "",
    paymentMethod: "",
    rentOrSell: "",
    advisorType: "",
    details: {
      floor: "",
      endowmentType: "",
      yearOfDelivery: new Date().getFullYear(),
      finalizationType: "",
      onMarketType: "",
      numberOfBathRooms: "",
      numberOfFloors: "",
      numberOfRooms: "",
      rentType: "",
    },
  });

  return (
    <FormContext.Provider
      value={{
        activeStepIndex,
        setActiveStepIndex,
        formData,
        setFormData,
      }}
    >
      <section className="bg-gradient-to-b from-gray-100 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pt-32 pb-10 md:pt-10 md:pb-10">
            <Stepper />
            <Step />
          </div>
        </div>
      </section>
    </FormContext.Provider>
  );
};
