"use client";

import { useState } from "react";

import { ColorPicker } from "@/registry/default/ui/color-picker";

export const ColorPickerCommit = () => {
  const [color, setColor] = useState("#D25188");
  const [saved, setSaved] = useState("#D25188");

  return (
    <div className="flex flex-col items-center gap-3">
      <ColorPicker
        aria-label="Theme colour"
        className="w-44"
        onValueChange={setColor}
        onValueCommit={setSaved}
        value={color}
      />
      <p className="tabular-figures text-muted-foreground text-sm">
        Previewing {color} · saved {saved}
      </p>
    </div>
  );
};
