"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface CircularProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  hideText?: boolean;
  strokeWidth?: number;
  value: number;
}

const CircularProgress = React.forwardRef<
  HTMLDivElement,
  CircularProgressProps
>(({ value, strokeWidth = 4, className, hideText, ...props }, ref) => {
  const percentage = Math.min(Math.max(value, 0), 100);
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div
      aria-valuemax={100}
      aria-valuemin={0}
      aria-valuenow={percentage}
      className={cn("relative", className)}
      ref={ref}
      role="progressbar"
      {...props}
    >
      <svg
        className="size-full -rotate-90"
        viewBox="0 0 36 36"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Circular progress</title>
        <circle
          className="stroke-current text-primary/30"
          cx="18"
          cy="18"
          fill="none"
          r={radius}
          strokeWidth={strokeWidth}
        />
        <circle
          className="stroke-current text-primary"
          cx="18"
          cy="18"
          fill="none"
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
          style={{
            transition: "stroke-dashoffset 300ms ease-in-out",
          }}
        />
      </svg>

      {!hideText && (
        <div className="absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 leading-none">
          <span className="text-center font-bold text-primary leading-none dark:text-foreground">
            {percentage}%
          </span>
        </div>
      )}
    </div>
  );
});

CircularProgress.displayName = "CircularProgress";

export { CircularProgress };
