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
    <div className="flex max-w-xl w-full flex-wrap -mx-3 mb-4">
      <div className="w-full px-3">
        <label className="block text-gray-800 text-xl font-medium mb-1">
          {label}
        </label>
        <input
          className={`appearance-none block w-full bg-gray-50 text-gray-700 border ${
            meta.error && "border-red-500"
          }  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
          {...field}
          autoFocus={autoFocus}
          type={type}
          placeholder={placeholder}
        />
        <ErrorLabel error={meta.error} touched={meta.touched} />
      </div>
    </div>
  );
};

export default TextField;
