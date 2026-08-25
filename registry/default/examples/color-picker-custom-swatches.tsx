"use client";

import { useState } from "react";

import type { ColorSwatch } from "@/registry/default/ui/color-picker";
import { ColorPicker } from "@/registry/default/ui/color-picker";

const brandSwatches: ColorSwatch[] = [
  { name: "Ink", value: "#0A0A0A" },
  { name: "Graphite", value: "#333333" },
  { name: "Signal", value: "#D9544B" },
  { name: "Marigold", value: "#B27C00" },
  { name: "Fern", value: "#24A042" },
  { name: "Harbour", value: "#0091DE" },
];

export const ColorPickerCustomSwatches = () => {
  const [color, setColor] = useState("#0091DE");

  return (
    <ColorPicker
      aria-label="Brand colour"
      className="w-44"
      onValueChange={setColor}
      swatches={brandSwatches}
      value={color}
    />
  );
};
