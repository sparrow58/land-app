// Basic.js
"use client";
import { Form, Formik } from "formik";
import React, { useContext } from "react";
import * as yup from "yup";
import { FormContext } from "./FormStepper";
import TextField from "@/app/components/TextField";
import {
  convertToMeter,
  enumToKeyValues,
  enumToLocalKeyValues,
} from "@/app/helpers/converters";
import SelectField from "@/app/components/SelectField";
import { OverlookingType, PaymentMethodType } from "@prisma/client";
import SubmitButton from "@/app/components/SubmitButton";
import Button from "@/app/components/Button";
import AreaUnitSelect from "./AreaUnitSelect";
import { AreaOption } from "c:/Projects/NextJS/land-app/app/dataObjects/RealEstateFormData";
import { RealFormLocalProps } from "@/app/Props/CommonProps";

function FormStep2({
  t: {
    validations,
    real: { fields },
  },
}: Readonly<{
  t: RealFormLocalProps;
}>) {
  const { activeStepIndex, setActiveStepIndex, formData, setFormData } =
    useContext(FormContext);

  const validationSchema = yup.object().shape({
    overlooking: yup.string().required(validations.real.overlooking.required),
    price: yup.number().min(1).required(validations.real.price.required),
    size: yup.string().required(validations.real.size.required),
    paymentMethod: yup
      .string()
      .required(validations.real.paymentMethod.required),
  });

  const handleBack = (values: {}) => {
    setFormData?.({ ...formData, ...values });
    setActiveStepIndex?.((i) => i - 1);
  };

  return (
    <Formik
      initialValues={{ ...formData }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        setFormData?.({ ...formData, ...values });

        setActiveStepIndex?.((i) => i + 1);
      }}
    >
      {({ values, setFieldValue }) => (
        <Form className="flex flex-col justify-center items-center">
          <TextField
            name="size"
            label={fields.size.label}
            type="number"
            autoFocus
            fullWidth
            placeholder={`${fields.size.label} ${
              formData.areaOption === "METER"
                ? fields.squareMeter.label
                : fields.lebnah.label
            } `}
          />
          <AreaUnitSelect
            areaOption={values.areaOption}
            onChange={handleUnitChange(setFieldValue, values.size as number)}
            lebnahLabel={fields.lebnah.label}
            squarMeterLabel={fields.squareMeter.label}
          />
          <TextField
            name="price"
            label={fields.price.label}
            type="number"
            placeholder={fields.price.placeholder}
            fullWidth
          />

          <SelectField
            name="overlooking"
            label={fields.overlooking.label}
            options={enumToLocalKeyValues(
              OverlookingType,
              fields.overlooking.options
            )}
            placeholder={fields.overlooking.placeholder}
            fullWidth
          />

          <SelectField
            name="paymentMethod"
            options={enumToLocalKeyValues(
              PaymentMethodType,
              fields.paymentMethod.options
            )}
            label={fields.paymentMethod.label}
            placeholder={fields.paymentMethod.placeholder}
            fullWidth
          />
          <div className="flex justify-between gap-6">
            <Button text="Back" onClick={() => handleBack(values)} />
            <SubmitButton text="Continue" />
          </div>
        </Form>
      )}
    </Formik>
  );

  function handleUnitChange(
    setFieldValue: (field: string, value: any) => Promise<any>,
    size?: number
  ): (value: AreaOption) => void {
    const handleLebnahChange = () => {
      setFieldValue("areaOption", "LEBNAH");
      if (size) {
        const convertedSize = size / 44.44;
        setFieldValue("size", Math.round(convertedSize * 100) / 100);
      }
    };

    const handleMeterChange = () => {
      setFieldValue("areaOption", "METER");
      if (size) {
        const convertedSize = convertToMeter(size);
        setFieldValue("size", convertedSize);
      }
    };

    return (value) => {
      console.log("value changed", value);
      if (value === "LEBNAH") {
        handleLebnahChange();
      } else if (value === "METER") {
        handleMeterChange();
      }
    };
  }
}

export default FormStep2;
