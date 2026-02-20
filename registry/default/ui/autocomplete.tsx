"use client";

import { Autocomplete as AutocompletePrimitive } from "@base-ui/react/autocomplete";
import type * as React from "react";

import { cn } from "@/lib/utils";

const Autocomplete = AutocompletePrimitive.Root;

function AutocompleteInput({
  className,
  ...props
}: React.ComponentProps<typeof AutocompletePrimitive.Input>) {
  return (
    <AutocompletePrimitive.Input
      className={cn(
        "input flex h-[var(--field-height)] w-full rounded-[var(--field-radius)] border border-input bg-card px-[var(--field-padding-x)] py-[var(--field-padding-y)] font-normal font-sans text-base text-foreground leading-snug shadow-input transition-colors placeholder:text-placeholder-foreground hover:border-input-hover focus-visible:border-ring focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring/15 focus-visible:ring-offset-1 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      data-slot="autocomplete-input"
      {...props}
    />
  );
}

function AutocompletePortal({
  ...props
}: React.ComponentProps<typeof AutocompletePrimitive.Portal>) {
  return <AutocompletePrimitive.Portal {...props} />;
}

function AutocompletePositioner({
  className,
  ...props
}: React.ComponentProps<typeof AutocompletePrimitive.Positioner>) {
  return (
    <AutocompletePrimitive.Positioner
      className={cn("isolate z-110", className)}
      data-slot="autocomplete-positioner"
      {...props}
    />
  );
}

function AutocompletePopup({
  className,
  ...props
}: React.ComponentProps<typeof AutocompletePrimitive.Popup>) {
  return (
    <AutocompletePrimitive.Popup
      className={cn(
        "fade-in-80 relative z-110 max-h-[250px] w-(--anchor-width) max-w-(--available-width) origin-(--transform-origin) animate-in overflow-hidden rounded-xl border border-border bg-popover p-0 text-popover-foreground shadow-soft",
        className
      )}
      data-slot="autocomplete-popup"
      {...props}
    />
  );
}

function AutocompleteEmpty({
  className,
  ...props
}: React.ComponentProps<typeof AutocompletePrimitive.Empty>) {
  return (
    <AutocompletePrimitive.Empty
      className={cn(
        "cursor-default px-4 py-3 text-center text-muted-foreground text-sm empty:hidden",
        className
      )}
      data-slot="autocomplete-empty"
      {...props}
    />
  );
}

function AutocompleteList({
  className,
  ...props
}: React.ComponentProps<typeof AutocompletePrimitive.List>) {
  return (
    <AutocompletePrimitive.List
      className={cn("w-full overflow-y-auto p-1", className)}
      data-slot="autocomplete-list"
      {...props}
    />
  );
}

function AutocompleteItem({
  className,
  ...props
}: React.ComponentProps<typeof AutocompletePrimitive.Item>) {
  return (
    <AutocompletePrimitive.Item
      className={cn(
        "cursor-pointer touch-manipulation rounded-lg px-3 py-2 outline-hidden data-highlighted:bg-accent data-highlighted:text-accent-foreground",
        className
      )}
      data-slot="autocomplete-item"
      {...props}
    />
  );
}

export {
  Autocomplete,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopup,
  AutocompletePortal,
  AutocompletePositioner,
};
