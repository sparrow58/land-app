"use client";

import React from "react";
import { useFormContext } from "./FormStepper";
import { useRouter } from "next/navigation";
import useCreateRealEstate from "@/app/hooks/realEstate/useCreateRealEstate";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RealFormLocalProps } from "@/app/Props/CommonProps";
import {
  EndowmentType,
  FinalizationType,
  OnMarketType,
  RentType,
} from "@/app/dataObjects/RealEstateFormData";
import { enumToLocalKeyValues } from "@/app/helpers/converters";
import { RentOrSell } from "@prisma/client";
import { toast } from "react-toastify";

const FormStep3 = ({
  t: {
    real: { fields },
  },
}: Readonly<{
  t: RealFormLocalProps;
}>) => {
  const { setActiveStepIndex, form } = useFormContext();
  const router = useRouter();
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const { create, update, isLoading } = useCreateRealEstate({
    onSuccess: (response) => {
      toast.success("Created");
      const formValues = form.getValues();
      if (formValues.id) {
        router.replace(`/real/${response.id}`);
      } else {
        router.replace(`/real/${response.id}/edit/images`);
      }
    },
    onFailure: (error) => {
      setIsSubmitted(false);
      toast.error("Error occurred " + error);
    },
  });

  const handleBack = () => {
    setActiveStepIndex((prev) => prev - 1);
  };

  const onSubmit = (values: any) => {
    setIsSubmitted(true);
    if (values.id) {
      update(values);
    } else {
      create(values);
    }
  };

  const rentOrSellParsed = (rentOrSell: RentOrSell) => {
    if (rentOrSell === "BOTH") return "Rent or Sell";
    else if (rentOrSell === "RENT") return "Rent";
    else if (rentOrSell === "SELL") return "Sell";
    else return rentOrSell;
  };

  return (
    <>
      <div className="max-w mx-auto text-center pb-6 md:pb-6">
        <h2 className="text-3xl font-bold">Add more details</h2>
        <h3 className="text-xl font-semibold capitalize mt-2">
          {form.getValues().title} {form.getValues().type.toLowerCase()} for{" "}
          {rentOrSellParsed(form.getValues().rentOrSell as RentOrSell)}
        </h3>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {form.getValues().type === "APARTMENT" && (
            <FormField
              control={form.control}
              name="details.floor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{fields.floor.label}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder={fields.floor.placeholder}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {(form.getValues().type === "BUILDING" ||
            form.getValues().type === "VILLA") && (
            <FormField
              control={form.control}
              name="details.numberOfFloors"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{fields.numberOfFloors.label}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder={fields.numberOfFloors.placeholder}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {(form.getValues().type === "APARTMENT" ||
            form.getValues().type === "BUILDING" ||
            form.getValues().type === "VILLA") && (
            <>
              <FormField
                control={form.control}
                name="details.numberOfRooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{fields.numberOfRooms.label}</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder={fields.numberOfRooms.placeholder}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="details.numberOfBathRooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{fields.numberOfBathRooms.label}</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder={fields.numberOfBathRooms.placeholder}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="details.finalizationType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{fields.finalizationType.label}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={fields.finalizationType.placeholder}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {enumToLocalKeyValues(
                          FinalizationType,
                          fields.finalizationType.options
                        ).map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="details.onMarketType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{fields.onMarketType.label}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={fields.onMarketType.placeholder}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {enumToLocalKeyValues(
                          OnMarketType,
                          fields.onMarketType.options
                        ).map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="details.yearOfDelivery"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{fields.yearOfDelivery.label}</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        placeholder={fields.yearOfDelivery.placeholder}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
          {form.getValues().rentOrSell !== "SELL" && (
            <FormField
              control={form.control}
              name="details.rentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{fields.rentType.label}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={fields.rentType.placeholder}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {enumToLocalKeyValues(
                        RentType,
                        fields.rentType.options
                      ).map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {form.getValues().rentOrSell !== "RENT" && (
            <FormField
              control={form.control}
              name="details.endowmentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{fields.endowmentType.label}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={fields.endowmentType.placeholder}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {enumToLocalKeyValues(
                        EndowmentType,
                        fields.endowmentType.options
                      ).map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <div className="flex justify-between gap-6">
            <Button type="button" variant="outline" onClick={handleBack}>
              Back
            </Button>
            <Button type="submit" disabled={isSubmitted || isLoading}>
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default FormStep3;
