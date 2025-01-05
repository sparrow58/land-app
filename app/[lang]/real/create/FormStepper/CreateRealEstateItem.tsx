"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProgressIndicator } from "./ProgressIndicator";
import { Step1 } from "./Step1";
import { Step2 } from "./Step2";
import { Step3 } from "./Step3";

import { RealFormLocalProps } from "@/app/Props/CommonProps";
import useCreateRealEstate from "@/app/hooks/realEstate/useCreateRealEstate";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import {
  AreaOption,
  RealEstateFormData,
  realEstateSchema,
} from "@/app/fromSchemas/realEstateFormSchema";

const steps = ["Basic Info", "Details", "Advisor"];

interface Props {
  t: RealFormLocalProps;
}
export function CreateRealEstateItem({ t }: Props) {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();
  const methods = useForm<RealEstateFormData>({
    resolver: zodResolver(realEstateSchema),
    mode: "onChange",
    defaultValues: {
      areaOption: AreaOption.LEBNAH,
    },
  });
  const { create, update, isLoading } = useCreateRealEstate({
    onSuccess: (response) => {
      console.log("created");
      toast.success("Created");
      const id = methods.getValues("id");
      if (id) {
        router.replace(`/real/${response.id}`);
      } else {
        router.replace(`/real/${response.id}/edit/images`);
      }
    },
    onFailure: (error) => {
      toast.error("Error occurred " + error);
    },
  });
  // const { toast } = useToast();

  const {
    handleSubmit,
    trigger,
    formState: { errors },
  } = methods;
  console.log("errors", errors);
  console.log("data", methods.getValues());

  const onSubmit = async (data: RealEstateFormData) => {
    console.log("submitting...");
    const isValid = await trigger();

    if (isValid) {
      console.log("on submit data", data);
      if (data.id) {
        update(data);
      } else {
        create(data);
      }
      // Here you would typically send the data to your backend
    } else {
      console.log("data not valid");
    }
  };

  const handleNext = async () => {
    const fields =
      steps[currentStep] === "Basic Info"
        ? ["type", "title", "description", "advisorType"]
        : steps[currentStep] === "Details"
        ? [
            "paymentMethod",
            "rentOrSell",
            "price",
            "size",
            "sizeUnit",
            "overlooking",
          ]
        : "details";

    const isStepValid = await trigger(fields as any);
    if (isStepValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <FormProvider {...methods}>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold mb-4">
            Create Real Estate Item
          </CardTitle>
          <ProgressIndicator steps={steps} currentStep={currentStep} />
        </CardHeader>
        <CardContent className="mt-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            {currentStep === 0 && <Step1 t={t} />}
            {currentStep === 1 && <Step2 t={t} />}
            {currentStep === 2 && <Step3 t={t} />}
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          {currentStep < steps.length - 1 ? (
            <Button type="button" onClick={handleNext}>
              Next
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={isLoading}
              onClick={handleSubmit(onSubmit)}
            >
              Submits
            </Button>
          )}
        </CardFooter>
      </Card>
    </FormProvider>
  );
}
