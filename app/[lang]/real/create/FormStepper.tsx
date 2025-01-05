"use client";

import { createContext, useContext, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent } from "@/components/ui/card";
import Stepper from "./Stepper";
import Step from "./Step";
import { RealFormLocalProps } from "@/app/Props/CommonProps";
import { AreaOption } from "@/app/dataObjects/RealEstateFormData";

const formSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  type: z.string().min(1, "Type is required"),
  overlooking: z.string(),
  price: z.number().min(1, "Price is required"),
  size: z.number().min(1, "Size is required"),
  paymentMethod: z.string(),
  rentOrSell: z.string(),
  advisorType: z.string(),
  areaOption: z.nativeEnum(AreaOption),
  details: z.object({
    floor: z.string().optional(),
    endowmentType: z.string().optional(),
    yearOfDelivery: z.string().optional(),
    finalizationType: z.string().optional(),
    onMarketType: z.string().optional(),
    numberOfBathRooms: z.string().optional(),
    numberOfFloors: z.string().optional(),
    numberOfRooms: z.string().optional(),
    rentType: z.string().optional(),
  }),
});

export type FormData = z.infer<typeof formSchema>;

interface FormContextType {
  activeStepIndex: number;
  setActiveStepIndex: React.Dispatch<React.SetStateAction<number>>;
  form: UseFormReturn<FormData>;
}

export const FormContext = createContext<FormContextType | null>(null);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (context === null) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};

interface Props {
  data?: FormData;
  t: RealFormLocalProps;
}

export const FormStepper = ({ data, t }: Props) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const form = useForm<FormData>({
    // resolver: zodResolver(formSchema),
    defaultValues: data
      ? {
          id: data.id,
          title: data.title,
          description: data.description,
          type: data.type,
          overlooking: data.overlooking,
          price: data.price,
          size: data.size,
          paymentMethod: data.paymentMethod,
          rentOrSell: data.rentOrSell,
          advisorType: data.advisorType,
          areaOption: data.areaOption,
          details: {
            floor: data.details.floor?.toString() || undefined,
            endowmentType: data.details.endowmentType || undefined,
            yearOfDelivery:
              data.details.yearOfDelivery?.toString() || undefined,
            finalizationType: data.details.finalizationType || undefined,
            onMarketType: data.details.onMarketType || undefined,
            numberOfBathRooms:
              data.details.numberOfBathRooms?.toString() || undefined,
            numberOfFloors:
              data.details.numberOfFloors?.toString() || undefined,
            numberOfRooms: data.details.numberOfRooms?.toString() || undefined,
            rentType: data.details.rentType || undefined,
          },
        }
      : {
          id: undefined,
          title: "",
          description: "",
          type: "",
          overlooking: "",
          price: 0,
          size: 0,
          paymentMethod: "",
          rentOrSell: "",
          advisorType: "",
          areaOption: AreaOption.METER,
          details: {
            floor: undefined,
            endowmentType: undefined,
            yearOfDelivery: new Date().getFullYear().toString(),
            finalizationType: undefined,
            onMarketType: undefined,
            numberOfBathRooms: undefined,
            numberOfFloors: undefined,
            numberOfRooms: undefined,
            rentType: undefined,
          },
        },
  });

  return (
    <FormContext.Provider
      value={{
        activeStepIndex,
        setActiveStepIndex,
        form,
      }}
    >
      <section className="bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pt-32 pb-10 md:pt-10 md:pb-10">
            <Card>
              <CardContent>
                <Stepper />
                <Step t={t} />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </FormContext.Provider>
  );
};
