"use client";
import ErrorLabel from "@/app/components/ErrorLabel";
import PasswordSigninField from "@/app/components/PasswordSigninField";
import SubmitButton from "@/app/components/SubmitButton";
import TextField from "@/app/components/TextField";
import { Form, Formik } from "formik";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useState } from "react";
interface Props {
  t: {
    email: string;
    enter_email: string;
    password: string;
    enter_password: string;
    remember_me: string;
    forgot_password: string;
    continue_with_google: string;
    continue_with_facebook: string;
    sign_in: string;
    invalid_credentials: string;
  };
}
const SignInForm = ({ t }: Props) => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  const [error, setError] = useState<string | undefined>(undefined);
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={async (values) => {
        console.log("on submit", values);
        setLoading(true);
        const signinResponse = await signIn("credentials", {
          redirect: false,
          username: values.email,
          password: values.password,
          callbackUrl,
        });
        console.log(signinResponse);
        setLoading(false);
        if (signinResponse?.ok) {
          router.replace(callbackUrl);
        }
        if (signinResponse?.error === "CredentialsSignin") {
          setError(t.invalid_credentials);
        }
      }}
    >
      <Form>
        <TextField
          name="email"
          label={t.email}
          placeholder={t.enter_email}
          required
        />

        <PasswordSigninField t={t} />

        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-full px-3">
            <div className="flex justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="text-gray-600 ms-2">{t.remember_me}</span>
              </label>
            </div>
          </div>
        </div>
        <ErrorLabel error={error} touched={error !== undefined} />

        <SubmitButton text={t.sign_in} fullWidth disabled={isLoading} />
      </Form>
    </Formik>
  );
};

export default SignInForm;
