export const metadata = {
  title: "Sign Up - Simple",
  description: "Page description",
};

import Link from "next/link";
import SignUpForm from "./SignUpForm";
import OAuthForm from "../signin/OAuthForm";

export default function SignUp() {
  return (
    <section className="bg-gradient-to-b from-gray-100 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          {/* Page header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h1 className="h1">
              Welcome. We exist to make entrepreneurism easier.
            </h1>
          </div>

          {/* Form */}
          <div className="max-w-sm mx-auto">
            <SignUpForm />
            <div className="flex items-center my-6">
              <div
                className="border-t border-gray-300 grow mr-3"
                aria-hidden="true"
              ></div>
              <div className="text-gray-600 italic">Or</div>
              <div
                className="border-t border-gray-300 grow ml-3"
                aria-hidden="true"
              ></div>
            </div>
            <OAuthForm />
            <div className="text-gray-600 text-center mt-6">
              Already using Easy Aqarat ?
              <Link
                href="/signin"
                className="text-blue-600 hover:underline transition duration-150 ease-in-out"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
