import Link from "next/link";
import React from "react";
interface Props {
  email: string;
  enter_email: string;
  password: string;
  enter_password: string;
  remember_me: string;
  forgot_password: string;
  continue_with_google: string;
  continue_with_facebook: string;
  sign_in: string;
}
const SignInForm = ({
  email,
  enter_email,
  password,
  enter_password,
  continue_with_google,
  forgot_password,
  remember_me,
  sign_in,
}: Props) => {
  return (
    <form>
      <div className="flex flex-wrap -mx-3 mb-4">
        <div className="w-full px-3">
          <label
            className="block text-gray-800 text-sm font-medium mb-1"
            htmlFor="email"
          >
            {email}
          </label>
          <input
            id="email"
            type="email"
            className="form-input w-full text-gray-800"
            placeholder={enter_email}
            required
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-4">
        <div className="w-full px-3">
          <div className="flex justify-between">
            <label
              className="block text-gray-800 text-sm font-medium mb-1"
              htmlFor="password"
            >
              {password}
            </label>
            <Link
              href="/reset-password"
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              {forgot_password}
            </Link>
          </div>
          <input
            id="password"
            type="password"
            className="form-input w-full text-gray-800"
            placeholder={enter_password}
            required
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-4">
        <div className="w-full px-3">
          <div className="flex justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="text-gray-600 ms-2">{remember_me}</span>
            </label>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mt-6">
        <div className="w-full px-3">
          <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full">
            {sign_in}
          </button>
        </div>
      </div>
    </form>
  );
};

export default SignInForm;
