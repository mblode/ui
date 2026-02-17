"use client";

import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group";
import type { VariantProps } from "class-variance-authority";
import type * as React from "react";
import { createContext, useContext } from "react";

import { cn } from "@/lib/utils";
import { toggleVariants } from "@/registry/default/ui/toggle";

const ToggleGroupContext = createContext<
  VariantProps<typeof toggleVariants> & {
    spacing?: number;
  }
>({
  size: "default",
  variant: "default",
  spacing: 0,
});

type ToggleGroupValue = string | string[];

type ToggleGroupProps = Omit<
  React.ComponentProps<typeof ToggleGroupPrimitive>,
  "defaultValue" | "multiple" | "onValueChange" | "value"
> &
  VariantProps<typeof toggleVariants> & {
    type?: "single" | "multiple";
    spacing?: number;
    value?: ToggleGroupValue;
    defaultValue?: ToggleGroupValue;
    onValueChange?: (value: ToggleGroupValue) => void;
    multiple?: boolean;
  };

const normalizeToggleGroupValue = (
  value: ToggleGroupValue | undefined
): readonly string[] | undefined => {
  if (value === undefined) {
    return undefined;
  }

  if (Array.isArray(value)) {
    return value;
  }

  return value === "" ? [] : [value];
};

function ToggleGroup({
  className,
  defaultValue,
  multiple,
  onValueChange,
  type,
  variant,
  size,
  spacing = 0,
  value,
  children,
  ...props
}: ToggleGroupProps) {
  const resolvedMultiple = type ? type === "multiple" : (multiple ?? false);

  return (
    <ToggleGroupPrimitive
      className={cn(
        "group/toggle-group flex w-fit items-center gap-[--spacing(var(--gap))] rounded-md data-[spacing=default]:data-[variant=outline]:shadow-xs",
        className
      )}
      data-size={size}
      data-slot="toggle-group"
      data-spacing={spacing}
      data-variant={variant}
      defaultValue={normalizeToggleGroupValue(defaultValue)}
      multiple={resolvedMultiple}
      onValueChange={(nextValue) => {
        if (!onValueChange) {
          return;
        }

        if (resolvedMultiple) {
          onValueChange(nextValue);
          return;
        }

        onValueChange(nextValue[0] ?? "");
      }}
      style={{ "--gap": spacing } as React.CSSProperties}
      value={normalizeToggleGroupValue(value)}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size, spacing }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive>
  );
}

function ToggleGroupItem({
  className,
  children,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive> &
  VariantProps<typeof toggleVariants>) {
  const context = useContext(ToggleGroupContext);

  return (
    <TogglePrimitive
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        "w-auto min-w-0 shrink-0 px-3 focus:z-10 focus-visible:z-10",
        "data-[spacing=0]:data-[variant=outline]:border-l-0 data-[spacing=0]:rounded-none data-[spacing=0]:shadow-none data-[spacing=0]:last:rounded-r-md data-[spacing=0]:data-[variant=outline]:first:border-l data-[spacing=0]:first:rounded-l-md",
        className
      )}
      data-size={context.size || size}
      data-slot="toggle-group-item"
      data-spacing={context.spacing}
      data-variant={context.variant || variant}
      {...props}
    >
      {children}
    </TogglePrimitive>
  );
}

export { ToggleGroup, ToggleGroupItem };
