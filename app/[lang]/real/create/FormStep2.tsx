"use client";

import React from "react";
import { useFormContext } from "./FormStepper";
import { OverlookingType, PaymentMethodType } from "@prisma/client";
import { enumToLocalKeyValues } from "@/app/helpers/converters";
import { RealFormLocalProps } from "@/app/Props/CommonProps";
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
import { AreaOption } from "@/app/dataObjects/RealEstateFormData";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

function FormStep2({
  t: {
    validations,
    real: { fields },
  },
}: Readonly<{
  t: RealFormLocalProps;
}>) {
  const { setActiveStepIndex, form } = useFormContext();

  const onSubmit = (data: any) => {
    setActiveStepIndex((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStepIndex((prev) => prev - 1);
  };

  return (
    <>
      <div className="max-w-6xlxl mx-auto text-center pb-12 md:pb-20">
        <h2 className="text-3xl font-bold">Property Details</h2>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="size"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{fields.size.label}</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder={fields.size.placeholder}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="areaOption"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Area Unit</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-row space-x-4"
                  >
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value={AreaOption.METER} />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {fields.squareMeter.label}
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value={AreaOption.LEBNAH} />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {fields.lebnah.label}
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{fields.price.label}</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder={fields.price.placeholder}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="overlooking"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{fields.overlooking.label}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={fields.overlooking.placeholder}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {enumToLocalKeyValues(
                      OverlookingType,
                      fields.overlooking.options
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
            name="paymentMethod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{fields.paymentMethod.label}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={fields.paymentMethod.placeholder}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {enumToLocalKeyValues(
                      PaymentMethodType,
                      fields.paymentMethod.options
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
          <div className="flex justify-between gap-6">
            <Button type="button" variant="outline" onClick={handleBack}>
              Back
            </Button>
            <Button type="submit">Continue</Button>
          </div>
        </form>
      </Form>
    </>
  );
}

export default FormStep2;
