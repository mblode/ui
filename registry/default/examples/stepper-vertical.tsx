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

export default function StepperVertical() {
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
    <div className="w-full max-w-xl mx-auto flex">
      <Stepper activeStep={activeStep} orientation="vertical" className="mb-8">
        <Step>
          <div className="flex items-start">
            <StepIndicator>1</StepIndicator>
            <div className="ml-3">
              <StepLabel>Account Details</StepLabel>
              <StepDescription>Create your account</StepDescription>
              {activeStep === 0 && (
                <StepContent className="my-4 ml-1">
                  <div className="space-y-4 p-4 border rounded-md">
                    <p>Fill in your account details to get started.</p>
                    <div className="flex gap-2">
                      <Button onClick={handleNext}>Continue</Button>
                    </div>
                  </div>
                </StepContent>
              )}
            </div>
          </div>
        </Step>
        <Step>
          <div className="flex items-start">
            <StepIndicator>2</StepIndicator>
            <div className="ml-3">
              <StepLabel>Personal Information</StepLabel>
              <StepDescription>Add your personal info</StepDescription>
              {activeStep === 1 && (
                <StepContent className="my-4 ml-1">
                  <div className="space-y-4 p-4 border rounded-md">
                    <p>Tell us about yourself.</p>
                    <div className="flex gap-2">
                      <Button variant="secondary" onClick={handleBack}>
                        Back
                      </Button>
                      <Button onClick={handleNext}>Continue</Button>
                    </div>
                  </div>
                </StepContent>
              )}
            </div>
          </div>
        </Step>
        <Step>
          <div className="flex items-start">
            <StepIndicator>3</StepIndicator>
            <div className="ml-3">
              <StepLabel>Review and Submit</StepLabel>
              <StepDescription>Review your information</StepDescription>
              {activeStep === 2 && (
                <StepContent className="my-4 ml-1">
                  <div className="space-y-4 p-4 border rounded-md">
                    <p>Please review your information before submitting.</p>
                    <div className="flex gap-2">
                      <Button variant="secondary" onClick={handleBack}>
                        Back
                      </Button>
                      <Button onClick={handleReset}>Reset</Button>
                    </div>
                  </div>
                </StepContent>
              )}
            </div>
          </div>
        </Step>
      </Stepper>
    </div>
  );
}
