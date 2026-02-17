"use client";
import React, { ReactNode } from "react";

import { Label } from "./label";
import { cn } from "@/lib/utils";

import { Validation } from "@/registry/default/ui/validation";

export type FormControlProps = {
  name: string;
  label?: ReactNode;
  labelRight?: ReactNode;
  error?: ReactNode;
  success?: ReactNode;
  warning?: ReactNode;
  loading?: ReactNode;
  caption?: ReactNode;
  controlLeft?: ReactNode;
  children: ReactNode;
  className?: string;
  validationPosition?: "left" | "right";
  validationClassName?: string;
  captionClassName?: string;
  labelClassName?: string;
};

export const FormControl = ({
  label,
  labelRight,
  controlLeft,
  name,
  caption,
  error,
  loading,
  success,
  warning,
  children,
  className,
  validationPosition = "left",
  validationClassName,
  captionClassName,
  labelClassName,
}: FormControlProps) => {
  return (
    <div className={cn("mb-4 flex flex-col", className)}>
      {(label || labelRight) && (
        <div className="mb-2 flex justify-between items-center gap-1">
          <div>
            {label && (
              <Label
                htmlFor={name}
                className={cn("cursor-pointer", labelClassName)}
              >
                {label}
              </Label>
            )}
          </div>

          <div>{labelRight}</div>
        </div>
      )}

      {children}

      {caption && (
        <span
          className={cn("mt-1 text-sm text-muted-foreground", captionClassName)}
        >
          {caption}
        </span>
      )}

      {controlLeft && <div className="mt-1">{controlLeft}</div>}

      <div
        className={cn("flex flex-row", {
          "justify-end": validationPosition === "right",
          "justify-start": validationPosition === "left",
        })}
      >
        {success && (
          <Validation variant="success" className={validationClassName}>
            {success}
          </Validation>
        )}
        {warning && (
          <Validation variant="warning" className={validationClassName}>
            {warning}
          </Validation>
        )}
        {error && (
          <Validation variant="error" className={validationClassName}>
            {error}
          </Validation>
        )}
        {loading && (
          <Validation variant="loading" className={validationClassName}>
            {loading}
          </Validation>
        )}
      </div>
    </div>
  );
};
