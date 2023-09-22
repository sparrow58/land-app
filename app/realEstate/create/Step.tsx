// Step.js
import React, { useContext } from "react";
import { FormContext } from "./FormStepper";
import FormStep2 from "./FormStep2";
import FormStep1 from "./FormStep1";
import Success from "./Success";
import FormStep3 from "./FormStep3";

function Step() {
  const context = useContext(FormContext);
  // console.log("formData", context?.formData);
  const activeStepIndex = context?.activeStepIndex;
  let stepContent;
  switch (activeStepIndex) {
    case 0:
      stepContent = <FormStep1 />;
      break;
    case 1:
      stepContent = <FormStep2 />;
      break;
    case 2:
      stepContent = <FormStep3 />;
      break;
    case 3:
      stepContent = <Success />;
      break;
    default:
      break;
  }

  return stepContent;
}

export default Step;
