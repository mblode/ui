"use client";

import { useId } from "react";

import { Checkbox } from "@/registry/default/ui/checkbox";
import {
  CheckboxGroup,
  CheckboxGroupLabel,
} from "@/registry/default/ui/checkbox-group";

export function CheckboxGroupDemo() {
  const id = useId();
  const fujiId = `${id}-fuji`;
  const galaId = `${id}-gala`;
  const grannySmithId = `${id}-granny-smith`;

  return (
    <CheckboxGroup
      aria-labelledby={id}
      className="w-full max-w-xs"
      defaultValue={["fuji-apple"]}
    >
      <CheckboxGroupLabel id={id}>Apples</CheckboxGroupLabel>

      <div className="flex items-center gap-2 font-normal text-sm">
        <Checkbox id={fujiId} name="apple" value="fuji-apple" />
        <label htmlFor={fujiId}>Fuji</label>
      </div>

      <div className="flex items-center gap-2 font-normal text-sm">
        <Checkbox id={galaId} name="apple" value="gala-apple" />
        <label htmlFor={galaId}>Gala</label>
      </div>

      <div className="flex items-center gap-2 font-normal text-sm">
        <Checkbox id={grannySmithId} name="apple" value="granny-smith-apple" />
        <label htmlFor={grannySmithId}>Granny Smith</label>
      </div>
    </CheckboxGroup>
  );
}
