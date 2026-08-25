"use client";

import { useId, useState } from "react";

import { Field, FieldDescription, FieldLabel } from "@/registry/default/ui/field";
import { TimePicker } from "@/registry/default/ui/time-picker";

const STEP = 30;

/** Adds `STEP` minutes to an `"HH:mm"` string, clamped to the end of the day. */
const nextSlot = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  const total = Math.min(23 * 60 + 30, hours * 60 + minutes + STEP);

  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
};

export const TimePickerRange = () => {
  const startId = useId();
  const endId = useId();
  const [start, setStart] = useState("09:00");
  const [end, setEnd] = useState("17:00");

  const handleStartChange = (value: string) => {
    setStart(value);

    if (end <= value) {
      setEnd(nextSlot(value));
    }
  };

  return (
    <Field className="w-72">
      <FieldLabel htmlFor={startId}>Availability</FieldLabel>
      <div className="flex items-center gap-2">
        <TimePicker
          id={startId}
          locale="en-US"
          onValueChange={handleStartChange}
          step={STEP}
          value={start}
        />
        <span className="text-muted-foreground text-sm">to</span>
        <TimePicker
          id={endId}
          locale="en-US"
          min={nextSlot(start)}
          onValueChange={setEnd}
          step={STEP}
          value={end}
        />
      </div>
      <FieldDescription>Moving the start time pushes the end time along with it.</FieldDescription>
    </Field>
  );
};
