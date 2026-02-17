"use client";

import { CircleXFilledIcon } from "blode-icons-react";
import type * as React from "react";
import CurrencyInputField, {
  type CurrencyInputProps,
} from "react-currency-input-field";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  clearable?: boolean;
  clearClassName?: string;
  hasError?: boolean;
  leftAddon?: React.ReactNode | null;
  leftControl?: React.ReactNode | null;
  onClear?: () => void;
  rightAddon?: React.ReactNode | null;
  rightControl?: React.ReactNode | null;
}

export const CurrencyInput = ({
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
}: CurrencyInputProps & InputProps) => {
  return (
    <label
      className={cn("relative w-full", {
        "input-group": !!leftAddon || !!rightAddon,
      })}
      htmlFor={props.id}
    >
      {leftAddon && (
        <span className="shrink-0 cursor-pointer">{leftAddon}</span>
      )}

      {leftControl && (
        <div className="absolute left-3 flex h-full flex-row place-items-center items-center justify-center">
          {leftControl}
        </div>
      )}

      <div className="w-full">
        <CurrencyInputField
          className={cn(
            "input flex h-[52px] w-full rounded-2xl border border-input bg-card px-4 py-[14px] font-normal font-sans text-base text-foreground leading-snug shadow-input placeholder:text-placeholder-foreground focus:border-ring focus:outline-hidden focus:ring-2 focus:ring-ring/15 focus:ring-offset-1 focus:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
            {
              "border-destructive-foreground": hasError,
              "pr-9": clearable && !!props.value,
            },
            className
          )}
          {...props}
        />

        {clearable && !!props.value && (
          <div className="absolute top-0 right-0 flex flex-row gap-1 pr-3">
            <button
              aria-label="clear input"
              className={cn(
                "flex h-[52px] cursor-pointer items-center justify-center p-0! text-muted-foreground",
                clearClassName
              )}
              onClick={() => onClear?.()}
              tabIndex={-1}
              type="button"
            >
              <CircleXFilledIcon className="size-5 text-muted-foreground/50" />
            </button>
          </div>
        )}
      </div>

      {rightControl && (
        <div className="absolute top-0 right-3 flex h-full flex-row place-items-center items-center justify-center">
          {rightControl}
        </div>
      )}

      {rightAddon && <span className="cursor-pointer">{rightAddon}</span>}
    </label>
  );
};
