"use client";
import React, { HTMLInputTypeAttribute } from "react";
import { FieldProps } from "../Props/CommonProps";
import ErrorLabel from "./ErrorLabel";
import { useField } from "formik";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
type Props = FieldProps & {
  type?: HTMLInputTypeAttribute;
};
const TextField = ({
  name,
  label = name,
  type = "text",
  placeholder,
  autoFocus,
  required,
  fullWidth,
}: Props) => {
  const [field, meta] = useField(name);

  return (
    <div
      className={`grid max-w-lg items-center gap-1.5 ${fullWidth && "w-full"}`}
    >
      <Label className="" htmlFor={name}>
        {label} {required && <span className="text-red-600">*</span>}
      </Label>
      <Input
        className={`appearance-none block w-full border ${
          meta.error && meta.touched && "border-red-500"
        }  rounded py-3 px-4 mb-3 leading-tight focus:outline-none `}
        {...field}
        autoFocus={autoFocus}
        type={type}
        placeholder={placeholder}
      />
      <ErrorLabel error={meta.error} touched={meta.touched} />
    </div>
  );
};

export default TextField;
