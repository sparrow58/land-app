import React, { HTMLInputTypeAttribute } from "react";
import { FieldProps } from "../Props/CommonProps";
import ErrorLabel from "./ErrorLabel";
import { useField } from "formik";
type Props = FieldProps & {
  type?: HTMLInputTypeAttribute;
};
const TextField = ({
  name,
  label = name,
  type = "text",
  placeholder,
  autoFocus = false,
}: Props) => {
  const [field, meta] = useField(name);

  return (
    <div className="flex flex-col mb-2">
      <label className="font-medium text-gray-900">{label}</label>
      <input
        className="rounded-md border-2 p-2"
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
