"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import * as React from "react";

import { cn } from "@/lib/utils";

import "./checkbox.css";

export interface CheckboxProps extends React.ComponentPropsWithoutRef<
  typeof CheckboxPrimitive.Root
> {
  hasError?: boolean;
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "ft-checkbox cursor-pointer peer size-5 shrink-0 relative overflow-hidden rounded-[6px] bg-card shadow-input transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:text-primary-foreground data-[state=indeterminate]:text-primary-foreground",
      className,
    )}
    {...props}
  >
    <div className="flex items-center justify-center text-current">
      <svg
        aria-hidden="true"
        role="presentation"
        viewBox="0 0 17 18"
        className="z-10 h-3 w-4"
      >
        <polyline
          fill="none"
          points="1 9 7 14 15 4"
          stroke="currentColor"
          strokeDasharray={22}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          className="ft-checkbox-polyline"
        />
        <line
          x1="3"
          y1="9"
          x2="13"
          y2="9"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          className="ft-checkbox-line"
        />
      </svg>
    </div>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
