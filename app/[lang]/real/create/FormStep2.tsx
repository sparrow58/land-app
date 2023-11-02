// Basic.js
"use client";
import { Form, Formik } from "formik";
import React, { useContext } from "react";
import * as yup from "yup";
import { FormContext } from "./FormStepper";
import TextField from "@/app/components/TextField";
import { convertToMeter, enumToKeyValues } from "@/app/helpers/converters";
import SelectField from "@/app/components/SelectField";
import { OverlookingType, PaymentMethodType } from "@prisma/client";
import SubmitButton from "@/app/components/SubmitButton";
import Button from "@/app/components/Button";
import AreaUnitSelect from "./AreaUnitSelect";

function FormStep2() {
  const { activeStepIndex, setActiveStepIndex, formData, setFormData } =
    useContext(FormContext);

  const validationSchema = yup.object().shape({
    overlooking: yup.string().required("overlooking is required"),
    price: yup.number().min(1).required("price is required"),
    size: yup.string().required("size is required"),
    paymentMethod: yup.string().required("payment_method time is required"),
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
            label="Total Area"
            type="number"
            autoFocus
            placeholder={`Total area in ${
              formData.areaOption === "METER" ? "Square Meters" : "Lebnah"
            } `}
          />
          <AreaUnitSelect
            areaOption={values.areaOption}
            onChange={(value) => {
              console.log("value changed", value);
              if (value === "LEBNAH") {
                setFieldValue("areaOption", value);
                console.log("converting to lebnah");
                if (values?.size) {
                  const converted = values?.size && values.size / 44.44;
                  setFieldValue("size", Math.round(converted * 100) / 100);
                }
              } else if (value === "METER") {
                setFieldValue("areaOption", value);

                console.log("converting to meter");

                if (values?.size) {
                  const converted = convertToMeter(values?.size);

                  setFieldValue("size", converted);
                }
              }
            }}
          />
          <TextField
            name="price"
            label="Price"
            type="number"
            placeholder="Total price"
          />

          <SelectField
            name="overlooking"
            label="Overlooking"
            options={enumToKeyValues(OverlookingType)}
            placeholder="select overlooking"
          />

          <SelectField
            name="paymentMethod"
            options={enumToKeyValues(PaymentMethodType)}
            label="Payment Method"
            placeholder="Select Payment Method"
          />
          <div className="flex justify-between gap-6">
            <Button text="Back" onClick={() => handleBack(values)} />
            <SubmitButton text="Continue" />
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default FormStep2;
