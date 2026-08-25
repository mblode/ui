"use client";

import { useState } from "react";

import { ColorPicker } from "@/registry/default/ui/color-picker";

export const ColorPickerDemo = () => {
  const [color, setColor] = useState("#587EEB");

  return (
    <ColorPicker
      aria-label="Label colour"
      className="w-44"
      onValueChange={setColor}
      value={color}
    />
  );
};
