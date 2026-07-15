"use client";

import { Meter as MeterPrimitive } from "@base-ui/react/meter";
import type * as React from "react";

import { cn } from "@/lib/utils";

const Meter = ({ className, ...props }: React.ComponentProps<typeof MeterPrimitive.Root>) => (
  <MeterPrimitive.Root
    className={cn("flex w-full flex-col gap-2", className)}
    data-slot="meter"
    {...props}
  />
);

const MeterLabel = ({ className, ...props }: React.ComponentProps<typeof MeterPrimitive.Label>) => (
  <MeterPrimitive.Label
    className={cn("font-medium text-sm leading-none", className)}
    data-slot="meter-label"
    {...props}
  />
);

const MeterValue = ({ className, ...props }: React.ComponentProps<typeof MeterPrimitive.Value>) => (
  <MeterPrimitive.Value
    className={cn("text-muted-foreground text-sm tabular-nums", className)}
    data-slot="meter-value"
    {...props}
  />
);

const MeterTrack = ({ className, ...props }: React.ComponentProps<typeof MeterPrimitive.Track>) => (
  <MeterPrimitive.Track
    className={cn("h-2 w-full overflow-hidden rounded-full bg-primary/20", className)}
    data-slot="meter-track"
    {...props}
  />
);

const MeterIndicator = ({
  className,
  ...props
}: React.ComponentProps<typeof MeterPrimitive.Indicator>) => (
  <MeterPrimitive.Indicator
    className={cn("h-full bg-primary transition-[width]", className)}
    data-slot="meter-indicator"
    {...props}
  />
);

export { Meter, MeterIndicator, MeterLabel, MeterTrack, MeterValue };
