"use client";

import React, { useState } from "react";
import { ColorPicker } from "@/registry/default/ui/color-picker";
import { Label } from "@/registry/default/ui/label";

export default function ColorPickerDemo() {
  const [selectedColor, setSelectedColor] = useState("#7CB342");

  return (
    <div className="space-y-8 w-full max-w-md mx-auto">
      <div className="space-y-2">
        <Label>Selected Color</Label>
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-md border"
            style={{ backgroundColor: selectedColor }}
          />
          <span className="font-mono">{selectedColor}</span>
        </div>
      </div>

      <div className="flex flex-col gap-4 p-4 rounded-md border">
        <div className="flex items-center justify-between">
          <Label>Color Picker</Label>
          <ColorPicker
            color={selectedColor}
            onSelectAction={setSelectedColor}
            label="Select a color"
          />
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            This color picker provides a selection of preset colors. Click the
            colored square to open the picker.
          </p>
        </div>
      </div>

      <div
        className="p-6 rounded-lg transition-colors space-y-4"
        style={{ backgroundColor: selectedColor }}
      >
        <h3
          className="text-lg font-semibold"
          style={{
            color: isLightColor(selectedColor) ? "#000000" : "#FFFFFF",
          }}
        >
          Preview with selected color
        </h3>
        <p
          style={{
            color: isLightColor(selectedColor) ? "#000000" : "#FFFFFF",
          }}
        >
          This box demonstrates how the selected color looks as a background.
        </p>
      </div>
    </div>
  );
}

// Helper function to determine if a color is light or dark
function isLightColor(color: string) {
  // Convert hex to RGB
  const hex = color.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Calculate brightness (HSP formula)
  const brightness = Math.sqrt(
    0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b),
  );

  // Return true if the color is light
  return brightness > 150; // Threshold can be adjusted
}
