import React from "react";
import { FieldProps } from "../Props/CommonProps";
import ErrorLabel from "./ErrorLabel";
import { useField } from "formik";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const TexAreaField = ({
  name,
  label,
  placeholder,
  autoFocus = false,
  fullWidth,
}: FieldProps) => {
  const [field, meta] = useField(name);

  return (
    <div
      className={`grid max-w-lg items-center gap-1.5 ${fullWidth && "w-full"}`}
    >
      <Label className="">{label}</Label>
      <Textarea
        className={`  ${
          meta.error && meta.touched && "border-red-500"
        }  rounded py-3 px-4 mb-3 leading-tight focus:outline-none`}
        {...field}
        autoFocus={autoFocus}
        placeholder={placeholder}
      />
      <ErrorLabel error={meta.error} touched={meta.touched} />
    </div>
  );
};

export default TexAreaField;
