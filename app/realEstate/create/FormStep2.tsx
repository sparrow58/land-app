// Basic.js
import { Form, Formik } from "formik";
import React, { useContext } from "react";
import * as yup from "yup";
import { FormContext } from "./FormStepper";
import {
  RealEstateFormData,
  RealEstateStep2Data,
} from "@/app/dataObjects/RealEstateFormData";
import TextField from "@/app/components/TextField";
import { enumToKeyValues } from "@/app/helpers/converters";
import SelectField from "@/app/components/SelectField";
import { OverlookingType, PaymentMethodType, RentOrSell } from "@prisma/client";
import SubmitButton from "@/app/components/SubmitButton";
import api from "@/app/helpers/api";
import Button from "@/app/components/Button";
import useCreateRealEstate from "@/app/hooks/realEstate/useCreateRealEstate";

function FormStep2() {
  const {
    activeStepIndex,
    setActiveStepIndex,
    formData,
    setFormData,
    setItemId,
  } = useContext(FormContext) || {};

  const { create, isLoading } = useCreateRealEstate({
    onSuccess: (response: any) => {
      console.log(response);
      setItemId?.(response.id as string);
      setActiveStepIndex?.((i) => i + 1);
    },
    onFailure: (error: any) => {},
  });
  const validationSchema = yup.object().shape({
    overlooking: yup.string().required("overlooking is required"),
    price: yup.number().min(1).required("price is required"),
    size: yup.string().required("Scheduled  is required"),
    paymentMethod: yup.string().required("payment_method time is required"),
    rentOrSell: yup.string().required("rentOrSell is required"),
  });

  const handleBack = (values: {}) => {
    setActiveStepIndex?.((i) => i - 1);
    formData && setFormData?.({ ...formData, ...values });
  };
  return (
    <Formik
      initialValues={{ ...formData }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        const data: RealEstateFormData | {} = { ...formData, ...values };
        setFormData?.(data);
        console.log("sending", data);

        // api
        //   .post("/realEstates", data)
        //   .then(function (response) {
        //     console.log(response);
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });

        create(data);
      }}
    >
      {({ values }) => (
        <Form className="flex flex-col justify-center items-center">
          <TextField
            name="price"
            label="Price"
            type="number"
            placeholder="Price"
          />
          <TextField
            name="size"
            label="Size"
            type="number"
            placeholder="Size"
          />
          <SelectField
            name="overlooking"
            label="Overlooking"
            options={enumToKeyValues(OverlookingType)}
            placeholder="select overlooking"
          />
          <SelectField
            name="rentOrSell"
            options={enumToKeyValues(RentOrSell)}
            label="Rent or Sell"
            placeholder="Select Rent or Sell"
          />
          <SelectField
            name="paymentMethod"
            options={enumToKeyValues(PaymentMethodType)}
            label="Payment Method"
            placeholder="Select Payment Method"
          />
          <div className="flex gap-6 ">
            <Button text="Back" onClick={() => handleBack(values)} />
            <SubmitButton text="Continue" disabled={isLoading} />
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default FormStep2;
