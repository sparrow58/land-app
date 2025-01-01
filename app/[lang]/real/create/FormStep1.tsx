"use client";

import React from "react";
import { useFormContext } from "./FormStepper";
import { AdvisorType, RealEstateType, RentOrSell } from "@prisma/client";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function FormStep1({
  t: {
    validations,
    real: { fields },
  },
}: Readonly<{
  t: RealFormLocalProps;
}>) {
  const { setActiveStepIndex, form } = useFormContext();

  const onSubmit = (data: any) => {
    console.log("submit data", data);
    setActiveStepIndex((prev) => prev + 1);
  };

  return (
    <>
      <div className="max-w-6xlxl mx-auto text-center pb-12 md:pb-20">
        <h2 className="text-3xl font-bold">Add your real estate!</h2>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{fields.title.label}</FormLabel>
                <FormControl>
                  <Input placeholder={fields.title.placeholder} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{fields.Description.label}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={fields.Description.placeholder}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{fields.type.label}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={fields.type.placeholder} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {enumToLocalKeyValues(
                      RealEstateType,
                      fields.type.options
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
            name="rentOrSell"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{fields.rentOrSell.label}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={fields.rentOrSell.placeholder}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {enumToLocalKeyValues(
                      RentOrSell,
                      fields.rentOrSell.options
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
            name="advisorType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{fields.advisorType.label}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={fields.advisorType.placeholder}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {enumToLocalKeyValues(
                      AdvisorType,
                      fields.advisorType.options
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
          <Button type="submit" className="w-full">
            Continue
          </Button>
        </form>
      </Form>
    </>
  );
}

export default FormStep1;
