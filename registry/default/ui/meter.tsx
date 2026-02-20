"use client";

import { Meter as MeterPrimitive } from "@base-ui/react/meter";
import type * as React from "react";

import { cn } from "@/lib/utils";

function Meter({
  className,
  ...props
}: React.ComponentProps<typeof MeterPrimitive.Root>) {
  return (
    <MeterPrimitive.Root
      className={cn("flex w-full flex-col gap-2", className)}
      data-slot="meter"
      {...props}
    />
  );
}

function MeterLabel({
  className,
  ...props
}: React.ComponentProps<typeof MeterPrimitive.Label>) {
  return (
    <MeterPrimitive.Label
      className={cn("font-medium text-sm leading-none", className)}
      data-slot="meter-label"
      {...props}
    />
  );
}

function MeterValue({
  className,
  ...props
}: React.ComponentProps<typeof MeterPrimitive.Value>) {
  return (
    <MeterPrimitive.Value
      className={cn("text-muted-foreground text-sm tabular-nums", className)}
      data-slot="meter-value"
      {...props}
    />
  );
}

function MeterTrack({
  className,
  ...props
}: React.ComponentProps<typeof MeterPrimitive.Track>) {
  return (
    <MeterPrimitive.Track
      className={cn(
        "h-2 w-full overflow-hidden rounded-full bg-primary/20",
        className
      )}
      data-slot="meter-track"
      {...props}
    />
  );
}

function MeterIndicator({
  className,
  ...props
}: React.ComponentProps<typeof MeterPrimitive.Indicator>) {
  return (
    <MeterPrimitive.Indicator
      className={cn("h-full bg-primary transition-[width]", className)}
      data-slot="meter-indicator"
      {...props}
    />
  );
}

export { Meter, MeterIndicator, MeterLabel, MeterTrack, MeterValue };
