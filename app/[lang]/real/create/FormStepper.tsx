"use client";
import Stepper from "./Stepper";

import { Dispatch, SetStateAction, createContext, useState } from "react";
import Step from "./Step";
import {
  AreaOption,
  RealEstateFormData,
} from "@/app/dataObjects/RealEstateFormData";
import { RealFormLocalProps } from "@/app/Props/CommonProps";
interface StepperProps {
  activeStepIndex: number;
  setActiveStepIndex: Dispatch<SetStateAction<number>>;
  formData: RealEstateFormData;
  setFormData: Dispatch<SetStateAction<RealEstateFormData>>;
}

interface Props {
  data?: RealEstateFormData;
  t: RealFormLocalProps;
}
export const FormContext = createContext<StepperProps>({} as StepperProps);

export const FormStepper = ({ data, t }: Props) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [itemId, setItemId] = useState<string>("");

  const [formData, setFormData] = useState<RealEstateFormData>(
    data ?? {
      title: "",
      description: "",
      type: "",
      overlooking: "",
      price: "",
      size: "",
      paymentMethod: "",
      rentOrSell: "",
      advisorType: "",
      areaOption: AreaOption.METER,
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
    }
  );

  return (
    <FormContext.Provider
      value={{
        activeStepIndex,
        setActiveStepIndex,
        formData,
        setFormData,
      }}
    >
      <section className="bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pt-32 pb-10 md:pt-10 md:pb-10">
            <Stepper />
            <Step t={t} />
          </div>
        </div>
      </section>
    </FormContext.Provider>
  );
};
