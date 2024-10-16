// Workspace.js
import { Form, Formik } from "formik";
import React, { useContext } from "react";
import * as yup from "yup";
import { FormContext } from "./FormStepper";
import {
  enumToKeyValues,
  enumToLocalKeyValues,
} from "@/app/helpers/converters";
import { AdvisorType, RealEstateType, RentOrSell } from "@prisma/client";
import TextField from "@/app/components/TextField";
import SelectField from "@/app/components/SelectField";
import TexAreaField from "@/app/components/TexAreaField";
import SubmitButton from "@/app/components/SubmitButton";
import { RealFormLocalProps } from "@/app/Props/CommonProps";
import ComboBoxField from "@/app/components/ComboboxField";

function FormStep1({
  t: {
    validations,
    real: { fields },
  },
}: Readonly<{
  t: RealFormLocalProps;
}>) {
  const { setActiveStepIndex, formData, setFormData } = useContext(FormContext);

  const validationSchema = yup.object().shape({
    title: yup
      .string()
      .min(5, validations.real.title.min)
      .required(validations.real.title.required),
    description: yup
      .string()
      .min(10, validations.real.description.min)
      .required(validations.real.description.required),
    type: yup.string().min(1).required(validations.real.type.required),
    rentOrSell: yup.string().required(validations.real.rentOrSell.required),
    advisorType: yup.string().required(validations.real.advisorType.required),
  });

  return (
    <>
      <div className="max-w-6xlxl mx-auto text-center pb-12 md:pb-20">
        <h2 className="h2"> Add your real estate!</h2>
      </div>
      <Formik
        initialValues={{ ...formData }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          const data = { ...formData, ...values };

          setFormData?.(data);
          console.log(data);
          setActiveStepIndex?.((lastValue) => lastValue + 1);
        }}
      >
        <Form className="flex flex-col justify-center items-center">
          <TextField
            name="title"
            label={fields.title.label}
            type="text"
            autoFocus
            placeholder={fields.title.placeholder}
            fullWidth
          />
          <TexAreaField
            name="description"
            label={fields.Description.label}
            placeholder={fields.Description.placeholder}
            fullWidth
          />

          <SelectField
            name="type"
            label={fields.type.label}
            placeholder={fields.type.placeholder}
            options={enumToLocalKeyValues(RealEstateType, fields.type.options)}
            fullWidth
          />
          <SelectField
            name="rentOrSell"
            options={enumToLocalKeyValues(
              RentOrSell,
              fields.rentOrSell.options
            )}
            label={fields.rentOrSell.label}
            placeholder={fields.rentOrSell.placeholder}
            fullWidth
          />
          <SelectField
            name="advisorType"
            options={enumToLocalKeyValues(
              AdvisorType,
              fields.advisorType.options
            )}
            label={fields.advisorType.label}
            placeholder={fields.advisorType.placeholder}
            fullWidth
          />
          <SubmitButton text="Continue" />
        </Form>
      </Formik>
    </>
  );
}

export default FormStep1;
