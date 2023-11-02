import Link from "next/link";
import React from "react";
import ErrorLabel from "./ErrorLabel";
import { useField } from "formik";
interface Props {
  t: {
    password: string;
    enter_password: string;
    forgot_password: string;
  };
}
const PasswordSigninField = ({ t }: Props) => {
  const [field, meta] = useField("password");

  return (
    <div className="flex flex-wrap -mx-3 mb-4">
      <div className="w-full px-3">
        <div className="flex justify-between">
          <label
            className="block text-gray-800 text-xl font-medium mb-1"
            htmlFor={"password"}
          >
            {t.password} <span className="text-red-600">*</span>
          </label>
          <Link
            href="/reset-password"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            {t.forgot_password}
          </Link>
        </div>
        <input
          className={`appearance-none block w-full bg-gray-50 text-gray-700 border ${
            meta.error && meta.touched && "border-red-500"
          }  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
          {...field}
          type="password"
          placeholder={t.enter_password}
        />
        <ErrorLabel error={meta.error} touched={meta.touched} />
      </div>
    </div>
  );
};

export default PasswordSigninField;
