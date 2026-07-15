"use client";

import { CheckboxGroup as CheckboxGroupPrimitive } from "@base-ui/react/checkbox-group";
import type * as React from "react";

import { cn } from "@/lib/utils";

const CheckboxGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxGroupPrimitive>) => (
  <CheckboxGroupPrimitive
    className={cn("flex flex-col gap-3", className)}
    data-slot="checkbox-group"
    {...props}
  />
);

const CheckboxGroupLabel = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div
    className={cn("font-medium text-sm leading-none", className)}
    data-slot="checkbox-group-label"
    {...props}
  />
);

export { CheckboxGroup, CheckboxGroupLabel };
