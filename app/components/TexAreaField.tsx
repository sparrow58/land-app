import React from "react";
import { FieldProps } from "../Props/CommonProps";
import ErrorLabel from "./ErrorLabel";
import { useField } from "formik";

const TexAreaField = ({
  name,
  label,
  placeholder,
  autoFocus = false,
}: FieldProps) => {
  const [field, meta] = useField(name);

  return (
    <div className="flex flex-wrap -mx-3 mb-4">
      <div className="w-full px-3">
        <label className="block text-gray-800 text-xl font-medium mb-1">
          {label}
        </label>
        <textarea
          className="form-input w-80 text-gray-800"
          {...field}
          autoFocus={autoFocus}
          placeholder={placeholder}
        />
        <ErrorLabel error={meta.error} touched={meta.touched} />
      </div>
    </div>
  );
};

export default TexAreaField;
