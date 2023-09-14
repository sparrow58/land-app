import React from "react";
import { FieldProps } from "../Props/CommonProps";
import ErrorLabel from "./ErrorLabel";
import { useField } from "formik";
type Props = FieldProps & {
  options: { label: string; value: string }[];
};
const SelectField = ({
  label,
  name,
  placeholder,
  options,
  autoFocus = false,
}: Props) => {
  const [field, meta] = useField(name);

  return (
    <div className="flex flex-col items-start mb-2">
      <label className="font-medium text-gray-900">{label}</label>
      <select
        className="rounded-md border-2 p-2"
        {...field}
        autoFocus={autoFocus}
      >
        <option value="">{placeholder}</option>
        {options.map((listValue) => (
          <option key={listValue.label} value={listValue.label}>
            {listValue.label}
          </option>
        ))}
      </select>
      <ErrorLabel error={meta.error} touched={meta.touched} />
    </div>
  );
};

export default SelectField;
