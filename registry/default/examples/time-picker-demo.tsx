"use client";

import { useId, useState } from "react";

import { Field, FieldLabel } from "@/registry/default/ui/field";
import { TimePicker } from "@/registry/default/ui/time-picker";

export const TimePickerDemo = () => {
  const id = useId();
  const [time, setTime] = useState("09:30");

  return (
    <Field className="w-48">
      <FieldLabel htmlFor={id}>Doors open</FieldLabel>
      <TimePicker id={id} locale="en-US" onValueChange={setTime} value={time} />
    </Field>
  );
};
