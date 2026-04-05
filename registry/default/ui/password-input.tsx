"use client";

import { EyeOpenIcon, EyeSlashIcon } from "blode-icons-react";
import * as React from "react";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { Input, type InputProps } from "@/registry/default/ui/input";

export interface PasswordInputProps extends Omit<InputProps, "type"> {
  defaultShowPassword?: boolean;
  onShowPasswordChange?: (showPassword: boolean) => void;
  showPassword?: boolean;
}

export const PasswordInput = React.forwardRef<
  HTMLInputElement,
  PasswordInputProps
>(
  (
    {
      className,
      defaultShowPassword = false,
      disabled,
      onShowPasswordChange,
      showPassword: showPasswordProp,
      ...props
    },
    ref
  ) => {
    const [internalShowPassword, setInternalShowPassword] =
      useState(defaultShowPassword);
    const isVisible = showPasswordProp ?? internalShowPassword;

    return (
      <Input
        {...props}
        className={cn("pr-10", className)}
        disabled={disabled}
        ref={ref}
        rightControl={
          <button
            aria-label={isVisible ? "Hide password" : "Show password"}
            className="flex h-[var(--field-height)] cursor-pointer items-center justify-center px-3 text-muted-foreground/70 hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
            disabled={disabled}
            onClick={() => {
              const next = !isVisible;
              setInternalShowPassword(next);
              onShowPasswordChange?.(next);
            }}
            tabIndex={-1}
            type="button"
          >
            {isVisible ? (
              <EyeSlashIcon className="size-5" />
            ) : (
              <EyeOpenIcon className="size-5" />
            )}
          </button>
        }
        type={isVisible ? "text" : "password"}
      />
    );
  }
);
PasswordInput.displayName = "PasswordInput";
