"use client";

import { CheckboxGroup as CheckboxGroupPrimitive } from "@base-ui/react/checkbox-group";
import type * as React from "react";

import { cn } from "@/lib/utils";

function CheckboxGroup({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxGroupPrimitive>) {
  return (
    <CheckboxGroupPrimitive
      className={cn("flex flex-col gap-3", className)}
      data-slot="checkbox-group"
      {...props}
    />
  );
}

function CheckboxGroupLabel({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("font-medium text-sm leading-none", className)}
      data-slot="checkbox-group-label"
      {...props}
    />
  );
}

export { CheckboxGroup, CheckboxGroupLabel };
