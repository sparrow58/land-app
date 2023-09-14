import React, { useContext } from "react";
import { FormContext } from "./FormStepper";
import * as yup from "yup";
import { RealEstateStep3Data } from "@/app/dataObjects/RealEstateFormData";

const FormStep3 = () => {
  const { activeStepIndex, setActiveStepIndex, formData, setFormData } =
    useContext(FormContext) || {};

  const validationSchema = yup.object().shape({
    payment_method: yup.string().required("payment_method time is required"),
    rentOrSell: yup.string().required("rentOrSell is required"),
  });

  const initialValues: RealEstateStep3Data = {
    paymentMethod: "",
    rentOrSell: "",
  };

  return <div>FormStep3</div>;
};

export default FormStep3;
