"use client";
import SubmitButton from "@/app/components/SubmitButton";
import TextField from "@/app/components/TextField";
import useCreateUser from "@/app/hooks/user/useCreateUser";
import { Form, Formik } from "formik";
import * as yup from "yup";

export interface SignUpProps {
  t: {
    name: string;
    enter_name: string;
    email: string;
    enter_email: string;
    password: string;
    enter_password: string;
    sign_up: string;
    errors: Errors;
  };
}
interface Errors {
  passwordComplex: string;
  password: string;
  name: string;
  email: string;
  nameShort: string;
  nameLong: string;
  validEmail: string;
}
const SignUpForm = ({ t }: SignUpProps) => {
  const passwordRules =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&;'*])(?=.{5,})/;
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .trim()
      .min(3, t.errors.nameShort)
      .max(100, t.errors.nameLong)
      .required(t.errors.name),
    email: yup.string().email(t.errors.validEmail).required(t.errors.email),
    password: yup
      .string()
      .trim()
      .min(4, t.errors.password)
      .matches(passwordRules, t.errors.passwordComplex)
      .required(t.errors.password),
  });
  const {
    create,
    error: signUpErrors,
    isLoading,
  } = useCreateUser({
    onSuccess: (result) => {
      console.log("userCreated", result);
    },
    onFailure: (errors) => {
      console.log("error creating user", errors);
    },
  });
  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
        create(values);
      }}
    >
      {({ setErrors }) => {
        if (signUpErrors?.error?.field === "email") {
          setErrors({ email: signUpErrors.error.message });
        }

        return (
          <Form>
            <TextField
              name="name"
              label={t.name}
              placeholder={t.enter_name}
              required
              autoFocus
            />

            <TextField
              name="email"
              label={t.email}
              placeholder={t.enter_email}
              required
            />
            <TextField
              name="password"
              label={t.password}
              type="password"
              placeholder={t.enter_password}
              required
            />

            <SubmitButton text={t.sign_up} fullWidth disabled={isLoading} />

            {/* <div className="text-sm text-gray-500 text-center mt-3">
            By creating an account, you agree to the{" "}
            <a className="underline" href="#0">
            terms & conditions
            </a>
            , and our{" "}
            <a className="underline" href="#0">
            privacy policy
            </a>
            .
          </div> */}
          </Form>
        );
      }}
    </Formik>
  );
};

export default SignUpForm;
