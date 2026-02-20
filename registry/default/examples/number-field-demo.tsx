"use client";

import { type ComponentProps, useId } from "react";

import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldScrubArea,
  NumberFieldScrubAreaCursor,
} from "@/registry/default/ui/number-field";

export function NumberFieldDemo() {
  const id = useId();

  return (
    <NumberField defaultValue={100} id={id}>
      <NumberFieldScrubArea>
        <label className="cursor-ew-resize font-medium" htmlFor={id}>
          Amount
        </label>
        <NumberFieldScrubAreaCursor>
          <CursorGrowIcon />
        </NumberFieldScrubAreaCursor>
      </NumberFieldScrubArea>

      <NumberFieldGroup>
        <NumberFieldDecrement aria-label="Decrement">
          <MinusIcon />
        </NumberFieldDecrement>
        <NumberFieldInput />
        <NumberFieldIncrement aria-label="Increment">
          <PlusIcon />
        </NumberFieldIncrement>
      </NumberFieldGroup>
    </NumberField>
  );
}

function CursorGrowIcon(props: ComponentProps<"svg">) {
  return (
    <svg
      fill="currentColor"
      height="14"
      viewBox="0 0 26 14"
      width="26"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M19.5 5.5L6.49737 5.51844V2L1 6.9999L6.5 12L6.49737 8.5L19.5 8.5V12L25 6.9999L19.5 2V5.5Z" />
    </svg>
  );
}

function PlusIcon(props: ComponentProps<"svg">) {
  return (
    <svg
      fill="none"
      height="10"
      stroke="currentColor"
      strokeWidth="1.6"
      viewBox="0 0 10 10"
      width="10"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M0 5H5M10 5H5M5 5V0M5 5V10" />
    </svg>
  );
}

function MinusIcon(props: ComponentProps<"svg">) {
  return (
    <svg
      fill="none"
      height="10"
      stroke="currentColor"
      strokeWidth="1.6"
      viewBox="0 0 10 10"
      width="10"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M0 5H10" />
    </svg>
  );
}
