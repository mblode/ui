"use client";

import { CheckIcon } from "@fingertip/icons";
import React from "react";

import { cn } from "@/lib/utils";

interface StepperProps {
  activeStep: number;
  orientation?: "horizontal" | "vertical";
  className?: string;
  children?: React.ReactNode;
}

export function Stepper({
  activeStep,
  orientation = "horizontal",
  className,
  children,
}: StepperProps) {
  return (
    <div
      className={cn(
        "flex",
        orientation === "vertical" ? "flex-col space-y-2" : "space-x-4",
        className,
      )}
    >
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            index,
            active: index === activeStep,
            completed: index < activeStep,
            orientation,
            isLast: index === React.Children.count(children) - 1,
          });
        }
        return child;
      })}
    </div>
  );
}

interface StepProps {
  orientation?: "horizontal" | "vertical";
  isLast?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function Step({
  orientation = "horizontal",
  isLast,
  className,
  children,
}: StepProps) {
  return (
    <div
      className={cn(
        "flex",
        orientation === "vertical" ? "flex-col" : "items-center",
        className,
      )}
    >
      <div className="flex items-center">
        {children}
        {!isLast && orientation === "horizontal" && (
          <StepSeparator orientation={orientation} />
        )}
      </div>
      {!isLast && orientation === "vertical" && (
        <StepSeparator orientation={orientation} />
      )}
    </div>
  );
}

interface StepIndicatorProps {
  active?: boolean;
  completed?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function StepIndicator({
  active,
  completed,
  className,
  children,
}: StepIndicatorProps) {
  return (
    <div
      className={cn(
        "relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2",
        {
          "border-primary bg-primary text-primary-foreground": completed,
          "border-primary": active,
          "border-muted-foreground": !active && !completed,
        },
        className,
      )}
    >
      {completed
        ? children || <CheckIcon className="h-4 w-4" />
        : children || <span className="text-sm font-medium">{""}</span>}
    </div>
  );
}

interface StepSeparatorProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export function StepSeparator({
  orientation = "horizontal",
  className,
}: StepSeparatorProps) {
  return (
    <div
      className={cn(
        orientation === "horizontal"
          ? "ml-2 mr-2 h-[1px] w-10 bg-border"
          : "ml-4 mt-1 mb-1 h-6 w-[1px] bg-border",
        className,
      )}
    />
  );
}

interface StepLabelProps {
  className?: string;
  children?: React.ReactNode;
}

export function StepLabel({ className, children }: StepLabelProps) {
  return (
    <span className={cn("text-sm font-medium", className)}>{children}</span>
  );
}

interface StepContentProps {
  className?: string;
  children?: React.ReactNode;
}

export function StepContent({ className, children }: StepContentProps) {
  return <div className={cn("mt-2", className)}>{children}</div>;
}

interface StepDescriptionProps {
  className?: string;
  children?: React.ReactNode;
}

export function StepDescription({ className, children }: StepDescriptionProps) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)}>{children}</p>
  );
}
