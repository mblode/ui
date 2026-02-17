"use client";
import { CircleXFilledIcon } from "@fingertip/icons";
import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
  clearable?: boolean;
  onClear?: () => void;
  clearClassName?: string;
  leftAddon?: React.ReactNode | null;
  rightAddon?: React.ReactNode | null;
  leftControl?: React.ReactNode | null;
  rightControl?: React.ReactNode | null;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      clearClassName,
      hasError,
      clearable,
      onClear,
      leftAddon,
      rightAddon,
      leftControl,
      rightControl,
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

        <div className="w-full">
          <input
            className={cn(
              "input flex h-[52px] w-full rounded-2xl border border-input transition-colors shadow-input hover:border-input-hover bg-card px-4 py-[14px] font-sans font-normal text-base leading-snug text-foreground placeholder:text-placeholder-foreground focus:outline-hidden focus:border-ring focus:ring-2 focus:ring-ring/15 focus:ring-offset-1 focus:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
              {
                "border-destructive-foreground": hasError,
                "pr-9": clearable && !!props.value,
                "hover:border-input! focus:border-input!": props.readOnly,
              },
              className,
            )}
            ref={ref}
            {...props}
          />

          {clearable && !!props.value && (
            <div className="absolute right-0 top-0 flex flex-row gap-1 pr-3">
              <button
                tabIndex={-1}
                className={cn(
                  "flex h-[52px] items-center cursor-pointer justify-center p-0! text-muted-foreground",
                  clearClassName,
                )}
                type="button"
                onClick={() => onClear?.()}
                aria-label="clear input"
              >
                <CircleXFilledIcon className="size-5 text-muted-foreground/50" />
              </button>
            </div>
          )}
        </div>

        {rightControl && (
          <div className="absolute right-0 top-0 flex h-full flex-row place-items-center items-center justify-center">
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
Input.displayName = "Input";

export { Input };
