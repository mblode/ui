"use client";

import { useId, useState } from "react";

import { Field, FieldDescription, FieldLabel } from "@/registry/default/ui/field";
import { TimezonePicker } from "@/registry/default/ui/timezone-picker";

export const TimezonePickerField = () => {
  const id = useId();
  const [timeZone, setTimeZone] = useState("Australia/Melbourne");

  return (
    <Field className="w-72">
      <FieldLabel htmlFor={id}>Booking time zone</FieldLabel>
      <TimezonePicker id={id} onValueChange={setTimeZone} value={timeZone} />
      <FieldDescription>
        Guests see your availability converted into their own zone.
      </FieldDescription>
    </Field>
  );
};
