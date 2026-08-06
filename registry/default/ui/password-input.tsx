"use client";

import { EyeOpenIcon, EyeSlashIcon } from "blode-icons-react";
import type * as React from "react";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { Input } from "@/registry/default/ui/input";
import type { InputProps } from "@/registry/default/ui/input";

export interface PasswordInputProps extends Omit<InputProps, "type"> {
  defaultShowPassword?: boolean;
  onShowPasswordChange?: (showPassword: boolean) => void;
  ref?: React.Ref<HTMLInputElement>;
  showPassword?: boolean;
}

export const PasswordInput = ({
  className,
  defaultShowPassword = false,
  disabled,
  onShowPasswordChange,
  ref,
  showPassword: showPasswordProp,
  ...props
}: PasswordInputProps) => {
  const [internalShowPassword, setInternalShowPassword] = useState(defaultShowPassword);
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
          className="flex h-[var(--field-height)] cursor-pointer items-center justify-center rounded-[min(var(--radius-md),12px)] px-3 text-muted-foreground/70 outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-1 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50"
          disabled={disabled}
          onClick={() => {
            const next = !isVisible;
            setInternalShowPassword(next);
            onShowPasswordChange?.(next);
          }}
          type="button"
        >
          {isVisible ? <EyeSlashIcon className="size-5" /> : <EyeOpenIcon className="size-5" />}
        </button>
      }
      type={isVisible ? "text" : "password"}
    />
  );
};
