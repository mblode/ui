"use client";

import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import {
  Step,
  StepContent,
  StepDescription,
  StepIndicator,
  StepLabel,
  StepSeparator,
  Stepper,
} from "@/registry/default/ui/stepper";

const steps = [
  { description: "Point your registrar at our nameservers.", label: "Add domain" },
  { description: "We check the DNS records every few minutes.", label: "Verify DNS" },
  { description: "A certificate is issued once DNS resolves.", label: "Issue certificate" },
  { description: "Traffic moves over with no downtime.", label: "Go live" },
];

export const StepperVertical = () => {
  const [step, setStep] = useState(1);

  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Stepper aria-label="Domain setup" orientation="vertical" value={step}>
        {steps.map(({ description, label }) => (
          <Step key={label}>
            <StepIndicator />
            <StepContent>
              <StepLabel>{label}</StepLabel>
              <StepDescription>{description}</StepDescription>
            </StepContent>
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
