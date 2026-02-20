import { ChevronDownIcon } from "blode-icons-react";
import type * as React from "react";

import { cn } from "@/lib/utils";

function NativeSelect({
  className,
  size = "default",
  ...props
}: Omit<React.ComponentProps<"select">, "size"> & { size?: "sm" | "default" }) {
  return (
    <div
      className="group/native-select relative w-full has-[select:disabled]:opacity-50"
      data-slot="native-select-wrapper"
    >
      <select
        className={cn(
          "input flex h-[var(--field-height)] w-full min-w-0 appearance-none rounded-[var(--field-radius)] border border-input bg-card px-[var(--field-padding-x)] py-[var(--field-padding-y)] pr-10 font-normal font-sans text-base text-foreground leading-snug shadow-input transition-colors placeholder:text-placeholder-foreground hover:border-input-hover focus:border-ring focus:outline-hidden focus:ring-2 focus:ring-ring/15 focus:ring-offset-1 focus:ring-offset-background disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive-foreground aria-invalid:ring-destructive/20 data-[size=sm]:h-[var(--field-height-sm)] data-[size=sm]:py-[calc(var(--field-padding-y)-2px)] data-[size=sm]:text-sm dark:aria-invalid:ring-destructive/40",
          className
        )}
        data-size={size}
        data-slot="native-select"
        {...props}
      />
      <ChevronDownIcon
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-[var(--field-padding-x)] size-4 -translate-y-1/2 select-none text-muted-foreground opacity-50"
        data-slot="native-select-icon"
      />
    </div>
  );
}

function NativeSelectOption({ ...props }: React.ComponentProps<"option">) {
  return <option data-slot="native-select-option" {...props} />;
}

function NativeSelectOptGroup({
  className,
  ...props
}: React.ComponentProps<"optgroup">) {
  return (
    <optgroup
      className={cn(className)}
      data-slot="native-select-optgroup"
      {...props}
    />
  );
}

export { NativeSelect, NativeSelectOptGroup, NativeSelectOption };
