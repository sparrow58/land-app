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
  t,
}: Readonly<{
  t: RealFormLocalProps;
}>) {
  const { setActiveStepIndex, form } = useFormContext();

  const onSubmit = (data: any) => {
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
                <FormLabel>{t.real.fields.title.label}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t.real.fields.title.placeholder}
                    {...field}
                  />
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
                <FormLabel>{t.real.fields.Description.label}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t.real.fields.Description.placeholder}
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
                <FormLabel>{t.real.fields.type.label}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={t.real.fields.type.placeholder}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {enumToLocalKeyValues(
                      RealEstateType,
                      t.real.fields.type.options
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
                <FormLabel>{t.real.fields.rentOrSell.label}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={t.real.fields.rentOrSell.placeholder}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {enumToLocalKeyValues(
                      RentOrSell,
                      t.real.fields.rentOrSell.options
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
                <FormLabel>{t.real.fields.advisorType.label}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={t.real.fields.advisorType.placeholder}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {enumToLocalKeyValues(
                      AdvisorType,
                      t.real.fields.advisorType.options
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
