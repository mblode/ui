"use client";

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import * as React from "react";

import { cn } from "@/lib/utils";

import "./checkbox.css";

type CheckedState = boolean | "indeterminate";

export interface CheckboxProps extends Omit<
  React.ComponentProps<typeof CheckboxPrimitive.Root>,
  "checked" | "defaultChecked" | "indeterminate" | "onCheckedChange"
> {
  checked?: CheckedState;
  defaultChecked?: CheckedState;
  hasError?: boolean;
  indeterminate?: boolean;
  onCheckedChange?: (checked: CheckedState) => void;
}

const Checkbox = ({
  checked,
  className,
  defaultChecked,
  hasError,
  indeterminate,
  onCheckedChange,
  ...props
}: CheckboxProps) => {
  const resolvedIndeterminate =
    indeterminate ?? (checked === "indeterminate" || defaultChecked === "indeterminate");

  return (
    <CheckboxPrimitive.Root
      aria-invalid={hasError || undefined}
      checked={checked === "indeterminate" ? false : checked}
      className={cn(
        "ft-checkbox peer relative inline-flex size-5 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-[6px] bg-card align-middle shadow-input transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-disabled:cursor-not-allowed data-checked:text-primary-foreground data-indeterminate:text-primary-foreground data-disabled:opacity-50",
        className,
      )}
      data-slot="checkbox"
      defaultChecked={defaultChecked === "indeterminate" ? false : defaultChecked}
      indeterminate={resolvedIndeterminate}
      onCheckedChange={(nextChecked) => onCheckedChange?.(nextChecked)}
      render={(renderProps, state) => {
        let dataState: "indeterminate" | "checked" | "unchecked" = "unchecked";
        if (state.indeterminate) {
          dataState = "indeterminate";
        } else if (state.checked) {
          dataState = "checked";
        }
        return <span {...renderProps} data-state={dataState} />;
      }}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className="pointer-events-none flex items-center justify-center text-current"
        data-slot="checkbox-indicator"
        keepMounted
      >
        <svg aria-hidden="true" className="z-10 h-3 w-4" role="presentation" viewBox="0 0 17 18">
          <polyline
            className="ft-checkbox-polyline"
            fill="none"
            points="1 9 7 14 15 4"
            stroke="currentColor"
            strokeDasharray={22}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
          <line
            className="ft-checkbox-line"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth={2}
            x1="3"
            x2="13"
            y1="9"
            y2="9"
          />
        </svg>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
};

export { Checkbox };
