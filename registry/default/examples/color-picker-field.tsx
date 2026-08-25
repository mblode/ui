"use client";

import { useId, useState } from "react";

import { ColorPicker } from "@/registry/default/ui/color-picker";
import { Field, FieldDescription, FieldLabel } from "@/registry/default/ui/field";

export const ColorPickerField = () => {
  const id = useId();
  const [color, setColor] = useState("#24A042");

  return (
    <Field className="w-64">
      <FieldLabel htmlFor={id}>Calendar colour</FieldLabel>
      <ColorPicker aria-label="Calendar colour" id={id} onValueChange={setColor} value={color} />
      <FieldDescription>Events in this calendar are tinted with this colour.</FieldDescription>
    </Field>
  );
};
