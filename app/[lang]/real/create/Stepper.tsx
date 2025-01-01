import React from "react";
import { useFormContext } from "./FormStepper";

function Stepper() {
  const { activeStepIndex } = useFormContext();

  return (
    <div className="w-full mx-auto flex flex-row items-center justify-between px-4 py-8">
      {[1, 2, 3].map((step) => (
        <React.Fragment key={step}>
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium ${
              step <= activeStepIndex + 1
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {step}
          </div>
          {step < 3 && <div className="flex-auto border-t border-muted" />}
        </React.Fragment>
      ))}
    </div>
  );
}

export default Stepper;
