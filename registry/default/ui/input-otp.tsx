"use client";

import { OTPInput, OTPInputContext } from "input-otp";
import type * as React from "react";
import { useContext } from "react";

import { cn } from "@/lib/utils";

const InputOTP = ({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string;
}) => (
  <OTPInput
    className={cn("disabled:cursor-not-allowed", className)}
    containerClassName={cn("flex items-center gap-2 has-disabled:opacity-50", containerClassName)}
    data-slot="input-otp"
    {...props}
  />
);

const InputOTPGroup = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div className={cn("flex items-center", className)} data-slot="input-otp-group" {...props} />
);

const InputOTPSlot = ({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  index: number;
}) => {
  const inputOTPContext = useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};

  return (
    <div
      className={cn(
        "group/slot relative flex h-[var(--field-height)] w-10 items-center justify-center border-input border-y border-r text-2xl shadow-input transition-all first:rounded-l-lg first:border-l last:rounded-r-lg hover:bg-background",
        className,
      )}
      data-active={isActive}
      data-slot="input-otp-slot"
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-[24px] w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
      )}
      {isActive && (
        <div className="absolute inset-0 ring ring-ring group-first/slot:rounded-l-lg group-last/slot:rounded-r-lg" />
      )}
    </div>
  );
};

const InputOTPSeparator = ({ className, ...props }: React.ComponentProps<"hr">) => (
  <hr
    className={cn("mx-1 h-1 w-2 rounded-full border-0 bg-border", className)}
    data-slot="input-otp-separator"
    {...props}
  />
);

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
