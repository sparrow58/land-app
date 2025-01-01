import React from "react";
import { useFormContext } from "./FormStepper";
import FormStep1 from "./FormStep1";
import FormStep2 from "./FormStep2";
import FormStep3 from "./FormStep3";
import Success from "./Success";
import { RealFormLocalProps } from "@/app/Props/CommonProps";

function Step({ t }: { t: RealFormLocalProps }) {
  const { activeStepIndex } = useFormContext();

  switch (activeStepIndex) {
    case 0:
      return <FormStep1 t={t} />;
    case 1:
      return <FormStep2 t={t} />;
    case 2:
      return <FormStep3 t={t} />;
    case 3:
      return <Success />;
    default:
      return null;
  }
}

export default Step;
