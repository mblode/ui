"use client";

import { useId, useState } from "react";

import { Field, FieldDescription, FieldLabel } from "@/registry/default/ui/field";
import { TimePicker } from "@/registry/default/ui/time-picker";

export const TimePicker24Hour = () => {
  const id = useId();
  const [time, setTime] = useState("18:45");

  return (
    <Field className="w-48">
      <FieldLabel htmlFor={id}>Departure</FieldLabel>
      <TimePicker hour12={false} id={id} locale="en-GB" onValueChange={setTime} value={time} />
      <FieldDescription>Stored as 18:45 either way.</FieldDescription>
    </Field>
  );
};
