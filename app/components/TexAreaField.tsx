import React from "react";
import { FieldProps } from "../Props/FormProps";
import ErrorLabel from "./ErrorLabel";

const TexAreaField = ({
  fieldName,
  value,
  error,
  label,
  onBlur,
  onChange,
  autoFocus = false,
}: FieldProps) => {
  return (
    <div>
      <label>{label}</label>
      <textarea
        className="border-2 rounded-lg h-20 border-stone-600-400"
        value={value}
        onChange={onChange(fieldName)}
        onBlur={onBlur(fieldName)}
        autoFocus={autoFocus}
      />
      <ErrorLabel error={error} />
    </div>
  );
};

export default TexAreaField;
