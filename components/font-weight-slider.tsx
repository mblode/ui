"use client";

import React from "react";

export function FontWeightSlider() {
  const [weight, setWeight] = React.useState(700);

  return (
    <div className="my-8 space-y-4">
      <div className="space-y-2">
        <label
          className="font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          htmlFor="font-weight-slider"
        >
          Font Weight: <span>{weight}</span>
        </label>
        <input
          className="w-full"
          id="font-weight-slider"
          max="900"
          min="400"
          onChange={(e) => setWeight(Number(e.target.value))}
          step="1"
          type="range"
          value={weight}
        />
      </div>
      <p className="font-sans text-2xl" style={{ fontWeight: weight }}>
        Glide Variable Font
      </p>
    </div>
  );
}
