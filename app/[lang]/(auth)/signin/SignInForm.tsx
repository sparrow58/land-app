"use client";
import ErrorLabel from "@/app/components/ErrorLabel";
import PasswordSigninField from "@/app/components/PasswordSigninField";
import SubmitButton from "@/app/components/SubmitButton";
import TextField from "@/app/components/TextField";
import useSignIn from "@/app/hooks/user/useSignIn";
import { Form, Formik } from "formik";

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
  const { signInCredentials, isLoading, error } = useSignIn(
    t.invalid_credentials
  );
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={async (values) => {
        signInCredentials(values.email, values.password);
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
