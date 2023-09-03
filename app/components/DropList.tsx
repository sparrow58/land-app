import React from "react";
import { FieldProps } from "../Props/FormProps";
import ErrorLabel from "./ErrorLabel";
type Props = FieldProps & {
  options: { key: string; value: string }[];
};
const DropList = ({
  fieldName,
  value,
  error,
  onChange,
  onBlur,
  options,
  label,
  autoFocus = false,
}: Props) => {
  return (
    <div>
      <label>{label}</label>
      <select
        value={value}
        onChange={onChange(fieldName)}
        onBlur={onBlur(fieldName)}
        autoFocus={autoFocus}
      >
        <option value="">Select...</option>
        {options.map((listValue) => (
          <option key={listValue.key} value={listValue.value}>
            {listValue.value}
          </option>
        ))}
      </select>
      <ErrorLabel error={error} />
    </div>
  );
};

export default DropList;
