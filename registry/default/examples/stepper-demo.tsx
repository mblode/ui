"use client";

import * as React from "react";
import { Button } from "@/registry/default/ui/button";
import {
  Stepper,
  Step,
  StepContent,
  StepDescription,
  StepIndicator,
  StepLabel,
} from "@/registry/default/ui/stepper";

export default function StepperDemo() {
  const [activeStep, setActiveStep] = React.useState(0);
  const totalSteps = 3;

  const handleNext = () => {
    setActiveStep((prevActiveStep) =>
      Math.min(prevActiveStep + 1, totalSteps - 1),
    );
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => Math.max(prevActiveStep - 1, 0));
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <Stepper activeStep={activeStep} className="mb-8">
        <Step>
          <StepIndicator>1</StepIndicator>
          <div className="ml-3">
            <StepLabel>Account Details</StepLabel>
            <StepDescription>Create your account</StepDescription>
          </div>
        </Step>
        <Step>
          <StepIndicator>2</StepIndicator>
          <div className="ml-3">
            <StepLabel>Personal Information</StepLabel>
            <StepDescription>Add your personal info</StepDescription>
          </div>
        </Step>
        <Step>
          <StepIndicator>3</StepIndicator>
          <div className="ml-3">
            <StepLabel>Review and Submit</StepLabel>
            <StepDescription>Review your information</StepDescription>
          </div>
        </Step>
      </Stepper>

      <div className="mb-6 p-4 border rounded-md">
        {activeStep === 0 && (
          <StepContent>
            <p className="mb-4">Fill in your account details to get started.</p>
          </StepContent>
        )}
        {activeStep === 1 && (
          <StepContent>
            <p className="mb-4">Tell us about yourself.</p>
          </StepContent>
        )}
        {activeStep === 2 && (
          <StepContent>
            <p className="mb-4">
              Please review your information before submitting.
            </p>
          </StepContent>
        )}
      </div>

      <div className="flex gap-2 justify-between">
        <Button
          variant="secondary"
          onClick={handleBack}
          disabled={activeStep === 0}
        >
          Back
        </Button>

        <div className="flex gap-2">
          {activeStep === totalSteps - 1 ? (
            <Button onClick={handleReset}>Reset</Button>
          ) : (
            <Button onClick={handleNext}>Continue</Button>
          )}
        </div>
      </div>
    </div>
  );
}
