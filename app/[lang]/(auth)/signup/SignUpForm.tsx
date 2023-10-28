"use client";
import SubmitButton from "@/app/components/SubmitButton";
import TextField from "@/app/components/TextField";
import useCreateUser from "@/app/hooks/user/useCreateUser";
import { Form, Formik } from "formik";
import * as yup from "yup";

export interface SignUpProps {
  locals: {
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
const SignUpForm = ({
  locals: {
    name,
    enter_name,
    email,
    enter_email,
    password,
    enter_password,
    sign_up,
    errors,
  },
}: SignUpProps) => {
  const passwordRules =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&;'*])(?=.{5,})/;
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .trim()
      .min(3, errors.nameShort)
      .max(100, errors.nameLong)
      .required(errors.name),
    email: yup.string().email(errors.validEmail).required(errors.email),
    password: yup
      .string()
      .trim()
      .min(4, errors.password)
      .matches(passwordRules, errors.passwordComplex)
      .required(errors.password),
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
              label={name}
              placeholder={enter_name}
              required
              autoFocus
            />

            <TextField
              name="email"
              label={email}
              placeholder={enter_email}
              required
            />
            <TextField
              name="password"
              label={password}
              type="password"
              placeholder={enter_password}
              required
            />

            <SubmitButton text={sign_up} fullWidth disabled={isLoading} />

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
