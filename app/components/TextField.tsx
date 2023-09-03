import React from "react";
import { FieldProps } from "../Props/FormProps";
import ErrorLabel from "./ErrorLabel";
type Props = FieldProps & {
  type?: string;
};
const TextField = ({
  fieldName,
  value,
  onChange,
  onBlur,
  error,
  label = fieldName,
  type = "text",
  autoFocus = false,
}: Props) => {
  return (
    <div>
      <label>{label}</label>
      <input
        className="border-2 rounded-lg h-10 border-stone-600-400"
        value={value}
        onChange={onChange(fieldName)}
        onBlur={onBlur(fieldName)}
        autoFocus={autoFocus}
        type={type}
      />
      <ErrorLabel error={error} />
    </div>
  );
};

export default TextField;
