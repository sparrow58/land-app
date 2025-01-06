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
  autoFocus,
  fullWidth,
}: Props) => {
  const [field, meta] = useField(name);
  return (
    <div className="flex max-w-xl w-full flex-wrap -mx-3 mb-4">
      <div className="w-full px-3">
        <label className="block text-gray-800 text-xl font-medium mb-1">
          {label}
        </label>
        <select
          className={`appearance-none block bg-gray-50 text-gray-700 border ${
            fullWidth && "w-full"
          } ${
            meta.error && meta.touched && "border-red-500"
          }  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
          {...field}
          autoFocus={autoFocus}
        >
          <option value="">{placeholder}</option>
          {options.map((listValue) => (
            <option key={listValue.value} value={listValue.value}>
              {listValue.label}
            </option>
          ))}
        </select>
        <ErrorLabel error={meta.error} touched={meta.touched} />
      </div>
    </div>
  );
};

export default SelectField;
