"use client";

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
  { description: "Name and logo", label: "Workspace" },
  { description: "Send the invites", label: "Team" },
  { description: "Connect your tools", label: "Integrations" },
];

export const StepperWithDescription = () => (
  <Stepper aria-label="Workspace setup" className="max-w-2xl" value={1}>
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
);
