"use client";

import { Select as SelectPrimitive } from "@base-ui/react/select";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "blode-icons-react";
import type * as React from "react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/registry/default/ui/button";

type SelectProps<Value = string> = Omit<SelectPrimitive.Root.Props<Value>, "onValueChange"> & {
  onValueChange?: (value: Value, eventDetails: SelectPrimitive.Root.ChangeEventDetails) => void;
};

const Select = <Value = string,>({ onValueChange, ...props }: SelectProps<Value>) => (
  <SelectPrimitive.Root
    data-slot="select"
    onValueChange={(value, eventDetails) => {
      if (value !== null) {
        onValueChange?.(value as Value, eventDetails);
      }
    }}
    {...props}
  />
);

const SelectGroup = ({ ...props }: SelectPrimitive.Group.Props) => (
  <SelectPrimitive.Group data-slot="select-group" {...props} />
);

const SelectValue = ({ ...props }: SelectPrimitive.Value.Props) => (
  <SelectPrimitive.Value data-slot="select-value" {...props} />
);

const SelectTrigger = ({
  className,
  size = "default",
  children,
  ...props
}: SelectPrimitive.Trigger.Props & {
  size?: "sm" | "default";
}) => (
  <SelectPrimitive.Trigger
    className={cn(
      buttonVariants({
        size: size === "sm" ? "input-sm" : "input",
        variant: "input",
      }),
      "w-full justify-between whitespace-normal pr-3",
      className,
    )}
    data-slot="select-trigger"
    {...props}
  >
    <span className="line-clamp-2 flex-1 pr-0.5 text-left">{children}</span>
    <SelectPrimitive.Icon render={<ChevronDownIcon className="size-4 opacity-50" />} />
  </SelectPrimitive.Trigger>
);

const SelectScrollUpButton = ({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpArrow>) => (
  <SelectPrimitive.ScrollUpArrow
    className={cn("flex cursor-default items-center justify-center py-1", className)}
    data-slot="select-scroll-up-button"
    {...props}
  >
    <ChevronUpIcon className="size-4" />
  </SelectPrimitive.ScrollUpArrow>
);

const SelectScrollDownButton = ({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownArrow>) => (
  <SelectPrimitive.ScrollDownArrow
    className={cn("flex cursor-default items-center justify-center py-1", className)}
    data-slot="select-scroll-down-button"
    {...props}
  >
    <ChevronDownIcon className="size-4" />
  </SelectPrimitive.ScrollDownArrow>
);

const SelectContent = ({
  className,
  children,
  position = "item-aligned",
  side = "bottom",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  alignItemWithTrigger,
  ...props
}: SelectPrimitive.Popup.Props &
  Pick<
    SelectPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset" | "alignItemWithTrigger"
  > & {
    position?: "item-aligned" | "popper";
  }) => {
  const shouldAlignItemWithTrigger = alignItemWithTrigger ?? position !== "popper";

  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        align={align}
        alignItemWithTrigger={shouldAlignItemWithTrigger}
        alignOffset={alignOffset}
        className="isolate z-110"
        side={side}
        sideOffset={sideOffset}
      >
        <SelectPrimitive.Popup
          className={cn(
            "data-open:fade-in-80 relative z-110 min-w-[8rem] origin-(--transform-origin) overflow-hidden rounded-xl border border-border bg-popover text-popover-foreground shadow-soft data-closed:animate-out data-open:animate-in",
            position === "popper" && "translate-y-1",
            className,
          )}
          data-slot="select-content"
          {...props}
        >
          <SelectScrollUpButton />
          <SelectPrimitive.List
            className={cn(
              "scroll-fade max-h-(--available-height) overflow-x-hidden overflow-y-auto p-1",
              position === "popper" &&
                "h-(--anchor-height) w-full min-w-(--anchor-width) scroll-my-1",
            )}
          >
            {children}
          </SelectPrimitive.List>
          <SelectScrollDownButton />
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  );
};

const SelectLabel = ({ className, ...props }: SelectPrimitive.GroupLabel.Props) => (
  <SelectPrimitive.GroupLabel
    className={cn("py-1.5 pr-8 pl-2 font-semibold", className)}
    data-slot="select-label"
    {...props}
  />
);

const SelectItem = ({ className, children, ...props }: SelectPrimitive.Item.Props) => (
  <SelectPrimitive.Item
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-lg py-1.5 pr-8 pl-2 font-sans text-base leading-[22px] outline-hidden focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
      className,
    )}
    data-slot="select-item"
    {...props}
  >
    <span
      className="absolute right-2 flex size-3.5 items-center justify-center"
      data-slot="select-item-indicator"
    >
      <SelectPrimitive.ItemIndicator>
        <CheckIcon className="size-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
);

const SelectSeparator = ({ className, ...props }: SelectPrimitive.Separator.Props) => (
  <SelectPrimitive.Separator
    className={cn("mx-3 my-1 h-px bg-input", className)}
    data-slot="select-separator"
    {...props}
  />
);

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
