"use client";

import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import { CirclePlaceholderOnIcon } from "blode-icons-react";
import * as React from "react";

import { cn } from "@/lib/utils";

type RadioGroupProps = Omit<
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive>,
  "defaultValue" | "onValueChange" | "value"
> & {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
};

type RadioGroupItemProps = Omit<
  React.ComponentPropsWithoutRef<typeof RadioPrimitive.Root>,
  "value"
> & {
  value: string;
};

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, onValueChange, ...props }, ref) => {
    return (
      <RadioGroupPrimitive
        className={cn("grid w-full gap-2", className)}
        data-slot="radio-group"
        onValueChange={(nextValue) =>
          onValueChange?.(
            typeof nextValue === "string" ? nextValue : String(nextValue ?? "")
          )
        }
        ref={ref}
        {...props}
      />
    );
  }
);
RadioGroup.displayName = "RadioGroup";

const RadioGroupItem = React.forwardRef<HTMLSpanElement, RadioGroupItemProps>(
  ({ className, ...props }, ref) => {
    return (
      <RadioPrimitive.Root
        className={cn(
          "aspect-square size-5 cursor-pointer rounded-full border border-input bg-card text-primary-foreground shadow-input ring-offset-background transition-colors hover:border-input-hover",
          "data-checked:border-primary data-checked:bg-primary",
          "focus:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "data-disabled:cursor-not-allowed data-disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      >
        <RadioPrimitive.Indicator className="flex items-center justify-center">
          <CirclePlaceholderOnIcon className="size-2.5 fill-current text-primary-foreground" />
        </RadioPrimitive.Indicator>
      </RadioPrimitive.Root>
    );
  }
);
RadioGroupItem.displayName = "RadioGroupItem";

export { RadioGroup, RadioGroupItem };
