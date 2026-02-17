"use client";

import * as React from "react";

export function FontWeightSlider() {
  const [weight, setWeight] = React.useState(700);
  
  return (
    <div className="space-y-4 my-8">
      <div className="space-y-2">
        <label htmlFor="font-weight-slider" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Font Weight: <span>{weight}</span>
        </label>
        <input
          id="font-weight-slider"
          type="range"
          min="400"
          max="900"
          step="1"
          value={weight}
          className="w-full"
          onChange={(e) => setWeight(Number(e.target.value))}
        />
      </div>
      <p className="font-sans text-2xl" style={{ fontWeight: weight }}>
        Glide Variable Font
      </p>
    </div>
  )
}