"use client";

import { CircleXFilledIcon } from "@fingertip/icons";
import * as React from "react";
import TextareaAutosize from "react-textarea-autosize";

import { cn } from "@/lib/utils";

export interface TextareaProps extends Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  "style"
> {
  hasError?: boolean;
  clearable?: boolean;
  onClear?: () => void;
  clearClassName?: string;
  leftAddon?: React.ReactNode | null;
  rightAddon?: React.ReactNode | null;
  leftControl?: React.ReactNode | null;
  rightControl?: React.ReactNode | null;
  minRows?: number;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      onClear,
      clearable,
      hasError,
      leftAddon,
      rightAddon,
      clearClassName,
      leftControl,
      rightControl,
      minRows,
      ...props
    },
    ref,
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
          <div className="absolute left-0 top-0 flex h-full flex-row place-items-center items-center justify-center">
            {leftControl}
          </div>
        )}

        <TextareaAutosize
          className={cn(
            "flex h-[52px] w-full rounded-2xl border border-input transition-colors shadow-input hover:border-input-hover bg-card px-4 py-[14px] font-sans font-normal text-base leading-snug text-foreground placeholder:text-placeholder-foreground focus:outline-hidden focus:border-ring focus:ring-2 focus:ring-ring/15 focus:ring-offset-1 focus:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
            {
              "border-destructive-foreground": hasError,
              "pr-9": clearable && !!props.value,
              "pr-12": clearable && !!props.value && rightControl,
            },
            className,
          )}
          ref={ref}
          minRows={minRows}
          {...props}
        />

        {clearable && !!props.value && (
          <div className="absolute right-0 top-0">
            <button
              tabIndex={-1}
              className={cn(
                "flex h-[52px] w-10 items-center cursor-pointer justify-center p-0! text-muted-foreground",
                clearClassName,
              )}
              type="button"
              onClick={() => onClear?.()}
              aria-label="clear input"
            >
              <CircleXFilledIcon className="size-4 text-muted-foreground/50" />
            </button>
          </div>
        )}

        {rightControl && (
          <div
            className={cn(
              "absolute right-0 top-0 flex h-full flex-row place-items-center items-center justify-center",
              {
                "right-9": clearable && !!props.value,
              },
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
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
