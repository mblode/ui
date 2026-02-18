"use client";

import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import * as React from "react";

import { cn } from "@/lib/utils";

function TooltipProvider({
  delayDuration,
  delay = delayDuration ?? 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider> & {
  delayDuration?: number;
}) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delay={delay}
      {...props}
    />
  );
}

const Tooltip = TooltipPrimitive.Root;

function TooltipTrigger({
  asChild = false,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger> & {
  asChild?: boolean;
}) {
  const render =
    asChild && React.isValidElement(children)
      ? (children as React.ReactElement)
      : undefined;

  return (
    <TooltipPrimitive.Trigger
      data-slot="tooltip-trigger"
      render={render}
      {...props}
    >
      {asChild ? null : children}
    </TooltipPrimitive.Trigger>
  );
}

type TooltipContentProps = React.ComponentPropsWithoutRef<
  typeof TooltipPrimitive.Popup
> &
  Pick<
    React.ComponentProps<typeof TooltipPrimitive.Positioner>,
    "align" | "alignOffset" | "side" | "sideOffset"
  > & {
    asChild?: boolean;
  };

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Popup>,
  TooltipContentProps
>(
  (
    {
      asChild = false,
      className,
      side = "top",
      sideOffset = 6,
      align = "center",
      alignOffset = 0,
      children,
      ...props
    },
    ref
  ) => {
    const render =
      asChild && React.isValidElement(children)
        ? (children as React.ReactElement)
        : undefined;

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
              "relative z-110 origin-(--transform-origin) rounded-xl bg-gray-900 px-3 py-2 font-normal font-sans text-sm text-white shadow-soft ring-1 ring-gray-700 data-closed:scale-95 data-open:scale-100 data-closed:opacity-0 data-open:opacity-100 motion-safe:transition-[opacity,scale] motion-safe:duration-150 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none motion-reduce:data-closed:scale-100 motion-reduce:data-open:scale-100",
              className
            )}
            ref={ref}
            render={render}
            {...props}
          >
            {asChild ? null : children}
            <TooltipPrimitive.Arrow className="pointer-events-none absolute size-2.5 rotate-45 rounded-[2px] bg-gray-900 ring-1 ring-gray-700 data-[side=bottom]:top-0 data-[side=left]:right-0 data-[side=top]:bottom-0 data-[side=right]:left-0 data-[side=left]:translate-x-1/2 data-[side=right]:-translate-x-1/2 data-[side=bottom]:-translate-y-1/2 data-[side=top]:translate-y-1/2" />
          </TooltipPrimitive.Popup>
        </TooltipPrimitive.Positioner>
      </TooltipPrimitive.Portal>
    );
  }
);
TooltipContent.displayName = TooltipPrimitive.Popup.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
