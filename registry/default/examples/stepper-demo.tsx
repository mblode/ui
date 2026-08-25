"use client";

import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import {
  Step,
  StepIndicator,
  StepLabel,
  StepSeparator,
  Stepper,
} from "@/registry/default/ui/stepper";

const steps = ["Cart", "Shipping", "Payment", "Review"];

export const StepperDemo = () => {
  const [step, setStep] = useState(1);

  return (
    <div className="flex w-full max-w-xl flex-col gap-6">
      <Stepper aria-label="Checkout" value={step}>
        {steps.map((label) => (
          <Step key={label}>
            <StepIndicator />
            <StepLabel className="sr-only sm:not-sr-only">{label}</StepLabel>
            <StepSeparator />
          </Step>
        ))}
      </Stepper>

      <div className="flex items-center justify-between gap-2">
        <Button
          disabled={step === 0}
          onClick={() => setStep((current) => current - 1)}
          variant="outline"
        >
          Back
        </Button>
        <Button
          disabled={step === steps.length - 1}
          onClick={() => setStep((current) => current + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
