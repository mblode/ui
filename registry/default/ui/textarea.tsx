"use client";

import { CircleXFilledIcon } from "blode-icons-react";
import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "style"> {
  clearable?: boolean;
  clearClassName?: string;
  hasError?: boolean;
  leftAddon?: React.ReactNode | null;
  leftControl?: React.ReactNode | null;
  onClear?: () => void;
  rightAddon?: React.ReactNode | null;
  rightControl?: React.ReactNode | null;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      rows = 2,
      onClear,
      clearable,
      hasError,
      leftAddon,
      rightAddon,
      clearClassName,
      leftControl,
      rightControl,
      ...props
    },
    ref
  ) => {
    return (
      <label
        className={cn("relative w-full", {
          "input-group": !!leftAddon || !!rightAddon,
        })}
      >
        {leftAddon && (
          <span className="shrink-0 cursor-pointer">{leftAddon}</span>
        )}

        {leftControl && (
          <div className="absolute top-0 left-0 flex h-full flex-row place-items-center items-center justify-center">
            {leftControl}
          </div>
        )}

        <textarea
          className={cn(
            "field-sizing-content flex min-h-[var(--textarea-min-height)] w-full rounded-[var(--field-radius)] border border-input bg-card px-[var(--field-padding-x)] py-[var(--field-padding-y)] font-normal font-sans text-base text-foreground leading-snug shadow-input transition-colors placeholder:text-placeholder-foreground hover:border-input-hover focus:border-ring focus:outline-hidden focus:ring-2 focus:ring-ring/15 focus:ring-offset-1 focus:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
            {
              "border-destructive-foreground": hasError,
              "pr-9": clearable && !!props.value,
              "pr-12": clearable && !!props.value && rightControl,
              "hover:border-input! focus:border-input!": props.readOnly,
            },
            className
          )}
          ref={ref}
          rows={rows}
          {...props}
        />

        {clearable && !!props.value && (
          <div className="absolute top-0 right-0 h-full">
            <button
              aria-label="clear input"
              className={cn(
                "flex h-full w-10 cursor-pointer items-center justify-center p-0! text-muted-foreground",
                clearClassName
              )}
              onClick={() => onClear?.()}
              tabIndex={-1}
              type="button"
            >
              <CircleXFilledIcon className="size-4 text-muted-foreground/50" />
            </button>
          </div>
        )}

        {rightControl && (
          <div
            className={cn(
              "absolute top-0 right-0 flex h-full flex-row place-items-center items-center justify-center",
              {
                "right-9": clearable && !!props.value,
              }
            )}
          >
            {rightControl}
          </div>
        )}

        {rightAddon && (
          <span className="shrink-0 cursor-pointer">{rightAddon}</span>
        )}
      </label>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
