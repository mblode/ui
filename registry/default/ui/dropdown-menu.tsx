"use client";

import { Menu as DropdownMenuPrimitive } from "@base-ui/react/menu";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "blode-icons-react";
import * as React from "react";

import { cn } from "@/lib/utils";

function DropdownMenu({ ...props }: DropdownMenuPrimitive.Root.Props) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
}

function DropdownMenuPortal({ ...props }: DropdownMenuPrimitive.Portal.Props) {
  return (
    <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
  );
}

function DropdownMenuTrigger({
  asChild,
  children,
  ...props
}: DropdownMenuPrimitive.Trigger.Props & {
  asChild?: boolean;
}) {
  if (asChild && React.isValidElement(children)) {
    return (
      <DropdownMenuPrimitive.Trigger
        data-slot="dropdown-menu-trigger"
        render={children}
        {...props}
      />
    );
  }

  return (
    <DropdownMenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props}>
      {children}
    </DropdownMenuPrimitive.Trigger>
  );
}

function DropdownMenuContent({
  className,
  align = "start",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  ...props
}: DropdownMenuPrimitive.Popup.Props &
  Pick<
    DropdownMenuPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        className="isolate z-110 outline-none"
        side={side}
        sideOffset={sideOffset}
      >
        <DropdownMenuPrimitive.Popup
          className={cn(
            "data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-3 data-[side=top]:slide-in-from-bottom-2 z-110 min-w-[8rem] overflow-hidden rounded-xl border border-border bg-popover p-1 text-popover-foreground shadow-soft data-closed:animate-out data-open:animate-in",
            className
          )}
          data-slot="dropdown-menu-content"
          {...props}
        />
      </DropdownMenuPrimitive.Positioner>
    </DropdownMenuPrimitive.Portal>
  );
}

function DropdownMenuGroup({ ...props }: DropdownMenuPrimitive.Group.Props) {
  return (
    <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
  );
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  asChild,
  children,
  ...props
}: DropdownMenuPrimitive.Item.Props & {
  inset?: boolean;
  variant?: "default" | "destructive";
  asChild?: boolean;
}) {
  if (asChild && React.isValidElement(children)) {
    return (
      <DropdownMenuPrimitive.Item
        className={cn(
          "data-[variant=destructive]:*:[svg]:!text-destructive relative flex cursor-pointer select-none items-center gap-2 rounded-lg px-3 py-2 text-base outline-hidden transition-colors focus:text-primary data-[disabled]:pointer-events-none data-[inset]:pl-8 data-[variant=destructive]:text-destructive data-[disabled]:opacity-50 data-[variant=destructive]:focus:text-destructive [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0",
          className
        )}
        data-inset={inset}
        data-slot="dropdown-menu-item"
        data-variant={variant}
        render={children}
        {...props}
      />
    );
  }

  return (
    <DropdownMenuPrimitive.Item
      className={cn(
        "data-[variant=destructive]:*:[svg]:!text-destructive relative flex cursor-pointer select-none items-center gap-2 rounded-lg px-3 py-2 text-base outline-hidden transition-colors focus:text-primary data-[disabled]:pointer-events-none data-[inset]:pl-8 data-[variant=destructive]:text-destructive data-[disabled]:opacity-50 data-[variant=destructive]:focus:text-destructive [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      )}
      data-inset={inset}
      data-slot="dropdown-menu-item"
      data-variant={variant}
      {...props}
    >
      {children}
    </DropdownMenuPrimitive.Item>
  );
}

type DropdownMenuCheckedState = boolean | "indeterminate";

type DropdownMenuCheckboxItemProps = Omit<
  DropdownMenuPrimitive.CheckboxItem.Props,
  "checked" | "defaultChecked" | "onCheckedChange"
> & {
  checked?: DropdownMenuCheckedState;
  defaultChecked?: DropdownMenuCheckedState;
  onCheckedChange?: (
    checked: DropdownMenuCheckedState,
    eventDetails: DropdownMenuPrimitive.CheckboxItem.ChangeEventDetails
  ) => void;
};

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  defaultChecked,
  onCheckedChange,
  ...props
}: DropdownMenuCheckboxItemProps) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      checked={checked === "indeterminate" ? true : checked}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-lg py-2 pr-3 pl-8 text-base outline-hidden transition-colors focus:text-primary data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      )}
      data-slot="dropdown-menu-checkbox-item"
      defaultChecked={
        defaultChecked === "indeterminate" ? true : defaultChecked
      }
      onCheckedChange={(value, eventDetails) =>
        onCheckedChange?.(value, eventDetails)
      }
      {...props}
    >
      <span className="pointer-events-none absolute left-3 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.CheckboxItemIndicator>
          <CheckIcon className="size-4" />
        </DropdownMenuPrimitive.CheckboxItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
}

function DropdownMenuRadioGroup({
  ...props
}: DropdownMenuPrimitive.RadioGroup.Props) {
  return (
    <DropdownMenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  );
}

function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: DropdownMenuPrimitive.RadioItem.Props) {
  return (
    <DropdownMenuPrimitive.RadioItem
      className={cn(
        "relative flex cursor-default select-none items-center rounded-lg py-2 pr-3 pl-8 text-base outline-hidden transition-colors focus:text-primary data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      )}
      data-slot="dropdown-menu-radio-item"
      {...props}
    >
      <span className="pointer-events-none absolute left-3 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.RadioItemIndicator>
          <CircleIcon className="size-2 fill-current" />
        </DropdownMenuPrimitive.RadioItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  );
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: DropdownMenuPrimitive.GroupLabel.Props & {
  inset?: boolean;
}) {
  return (
    <DropdownMenuPrimitive.GroupLabel
      className={cn(
        "px-3 py-2 font-semibold text-base data-[inset]:pl-8",
        className
      )}
      data-inset={inset}
      data-slot="dropdown-menu-label"
      {...props}
    />
  );
}

function DropdownMenuSeparator({
  className,
  ...props
}: DropdownMenuPrimitive.Separator.Props) {
  return (
    <DropdownMenuPrimitive.Separator
      className={cn("mx-3 my-1 h-px bg-input", className)}
      data-slot="dropdown-menu-separator"
      {...props}
    />
  );
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
      data-slot="dropdown-menu-shortcut"
      {...props}
    />
  );
}

function DropdownMenuSub({
  ...props
}: DropdownMenuPrimitive.SubmenuRoot.Props) {
  return (
    <DropdownMenuPrimitive.SubmenuRoot
      data-slot="dropdown-menu-sub"
      {...props}
    />
  );
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: DropdownMenuPrimitive.SubmenuTrigger.Props & {
  inset?: boolean;
}) {
  return (
    <DropdownMenuPrimitive.SubmenuTrigger
      className={cn(
        "flex cursor-default select-none items-center gap-2 rounded-lg px-3 py-2 text-base outline-hidden transition-colors focus:text-primary data-[inset]:pl-8 data-popup-open:text-primary [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      )}
      data-inset={inset}
      data-slot="dropdown-menu-sub-trigger"
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto size-4" />
    </DropdownMenuPrimitive.SubmenuTrigger>
  );
}

function DropdownMenuSubContent({
  className,
  align = "start",
  alignOffset = -3,
  side = "right",
  sideOffset = 0,
  ...props
}: DropdownMenuPrimitive.Popup.Props &
  Pick<
    DropdownMenuPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        className="isolate z-110 outline-none"
        side={side}
        sideOffset={sideOffset}
      >
        <DropdownMenuPrimitive.Popup
          className={cn(
            "data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-3 data-[side=top]:slide-in-from-bottom-2 z-110 min-w-[8rem] overflow-hidden rounded-xl border border-border bg-popover p-1 text-popover-foreground shadow-lg data-closed:animate-out data-open:animate-in",
            className
          )}
          data-slot="dropdown-menu-sub-content"
          {...props}
        />
      </DropdownMenuPrimitive.Positioner>
    </DropdownMenuPrimitive.Portal>
  );
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
};
