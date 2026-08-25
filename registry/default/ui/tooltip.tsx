"use client";

import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import * as React from "react";

import { cn } from "@/lib/utils";

const TooltipProvider = ({
  delayDuration,
  delay = delayDuration ?? 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider> & {
  delayDuration?: number;
}) => <TooltipPrimitive.Provider data-slot="tooltip-provider" delay={delay} {...props} />;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = ({
  asChild = false,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger> & {
  asChild?: boolean;
}) => {
  const render =
    asChild && React.isValidElement(children) ? (children as React.ReactElement) : undefined;

  return (
    <TooltipPrimitive.Trigger data-slot="tooltip-trigger" render={render} {...props}>
      {asChild ? null : children}
    </TooltipPrimitive.Trigger>
  );
};

type TooltipContentProps = React.ComponentProps<typeof TooltipPrimitive.Popup> &
  Pick<
    React.ComponentProps<typeof TooltipPrimitive.Positioner>,
    "align" | "alignOffset" | "side" | "sideOffset"
  > & {
    asChild?: boolean;
  };

const TooltipContent = ({
  asChild = false,
  className,
  side = "top",
  sideOffset = 8,
  align = "center",
  alignOffset = 0,
  children,
  ...props
}: TooltipContentProps) => {
  const render =
    asChild && React.isValidElement(children) ? (children as React.ReactElement) : undefined;

  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        className="isolate z-110"
        side={side}
        sideOffset={sideOffset}
      >
        <TooltipPrimitive.Popup
          className={cn(
            "fade-in-0 zoom-in-95 data-closed:fade-out-0 data-closed:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-110 origin-(--transform-origin) animate-in rounded-xl bg-primary px-3 py-2 font-normal font-sans text-primary-foreground text-sm shadow-soft ring-1 ring-border data-closed:animate-out motion-reduce:animate-none",
            className,
          )}
          data-slot="tooltip-content"
          render={render}
          {...props}
        >
          {asChild ? null : children}
          {/* The clip-path half-square comes from creator-frontend, with the tip radius taken
              from 3px to 5px because 3px on a 10px arrow still reads as a point at 1x. Radix
              rotates its arrow per side; Base UI never does, so the per-side rotation has to
              be spelled out here or the tip only points the right way on side="top". */}
          <TooltipPrimitive.Arrow className="pointer-events-none absolute size-2.5 rounded-bl-[5px] border border-border bg-primary [clip-path:polygon(0_100%,0_0,100%_100%)] data-[side=bottom]:top-0 data-[side=left]:right-0 data-[side=top]:bottom-0 data-[side=right]:left-0 data-[side=left]:translate-x-1/2 data-[side=right]:-translate-x-1/2 data-[side=bottom]:-translate-y-1/2 data-[side=top]:translate-y-1/2 data-[side=bottom]:rotate-135 data-[side=left]:-rotate-135 data-[side=right]:rotate-45 data-[side=top]:-rotate-45" />
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  );
};

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
