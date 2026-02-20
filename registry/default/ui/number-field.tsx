"use client";

import { NumberField as NumberFieldPrimitive } from "@base-ui/react/number-field";
import type * as React from "react";

import { cn } from "@/lib/utils";

function NumberField({
  className,
  ...props
}: React.ComponentProps<typeof NumberFieldPrimitive.Root>) {
  return (
    <NumberFieldPrimitive.Root
      className={cn("flex w-full max-w-xs flex-col gap-2", className)}
      data-slot="number-field"
      {...props}
    />
  );
}

function NumberFieldScrubArea({
  className,
  ...props
}: React.ComponentProps<typeof NumberFieldPrimitive.ScrubArea>) {
  return (
    <NumberFieldPrimitive.ScrubArea
      className={cn(
        "inline-flex w-fit cursor-ew-resize select-none items-center gap-2 rounded-md px-1 py-0.5 text-muted-foreground text-sm leading-none data-disabled:pointer-events-none data-disabled:opacity-50",
        className
      )}
      data-slot="number-field-scrub-area"
      {...props}
    />
  );
}

function NumberFieldScrubAreaCursor({
  className,
  ...props
}: React.ComponentProps<typeof NumberFieldPrimitive.ScrubAreaCursor>) {
  return (
    <NumberFieldPrimitive.ScrubAreaCursor
      className={cn(
        "inline-flex size-6 items-center justify-center rounded-md bg-foreground text-background shadow-sm",
        className
      )}
      data-slot="number-field-scrub-area-cursor"
      {...props}
    />
  );
}

function NumberFieldGroup({
  className,
  ...props
}: React.ComponentProps<typeof NumberFieldPrimitive.Group>) {
  return (
    <NumberFieldPrimitive.Group
      className={cn(
        "flex h-[var(--field-height)] w-full items-center overflow-hidden rounded-[var(--field-radius)] border border-input bg-card shadow-input transition-colors focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/15 focus-within:ring-offset-1 focus-within:ring-offset-background data-disabled:opacity-50",
        className
      )}
      data-slot="number-field-group"
      {...props}
    />
  );
}

function NumberFieldDecrement({
  className,
  ...props
}: React.ComponentProps<typeof NumberFieldPrimitive.Decrement>) {
  return (
    <NumberFieldPrimitive.Decrement
      className={cn(
        "inline-flex h-full w-10 items-center justify-center border-input border-r text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      data-slot="number-field-decrement"
      {...props}
    />
  );
}

function NumberFieldInput({
  className,
  ...props
}: React.ComponentProps<typeof NumberFieldPrimitive.Input>) {
  return (
    <NumberFieldPrimitive.Input
      className={cn(
        "h-full min-w-0 flex-1 border-0 bg-transparent px-3 py-0 text-center font-sans text-base text-foreground leading-none outline-none placeholder:text-placeholder-foreground disabled:cursor-not-allowed",
        className
      )}
      data-slot="number-field-input"
      {...props}
    />
  );
}

function NumberFieldIncrement({
  className,
  ...props
}: React.ComponentProps<typeof NumberFieldPrimitive.Increment>) {
  return (
    <NumberFieldPrimitive.Increment
      className={cn(
        "inline-flex h-full w-10 items-center justify-center border-input border-l text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      data-slot="number-field-increment"
      {...props}
    />
  );
}

export {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldScrubArea,
  NumberFieldScrubAreaCursor,
};
