"use client";

import React, { useState, useEffect } from "react";
import { CircularProgress } from "@/registry/default/ui/circular-progress";
import { Button } from "@/registry/default/ui/button";
import { Slider } from "@/registry/default/ui/slider";

export default function CircularProgressDemo() {
  const [progress, setProgress] = useState(45);
  const [autoProgress, setAutoProgress] = useState(false);

  useEffect(() => {
    if (!autoProgress) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setAutoProgress(false);
          return 0;
        }
        return prev + 5;
      });
    }, 500);

    return () => clearInterval(interval);
  }, [autoProgress]);

  return (
    <div className="flex flex-col items-center space-y-8">
      <div className="flex gap-8 items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24">
            <CircularProgress value={progress} />
          </div>
          <span className="text-sm text-muted-foreground mt-2">With Text</span>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-24 h-24">
            <CircularProgress value={progress} hideText />
          </div>
          <span className="text-sm text-muted-foreground mt-2">
            Without Text
          </span>
        </div>
      </div>

      <div className="w-full max-w-md flex flex-col gap-4">
        <Slider
          value={[progress]}
          min={0}
          max={100}
          step={1}
          onValueChange={(value) => setProgress(value[0])}
        />

        <div className="flex gap-4 justify-center">
          <Button
            onClick={() => setAutoProgress(!autoProgress)}
            variant="secondary"
          >
            {autoProgress ? "Stop Animation" : "Animate Progress"}
          </Button>
          <Button onClick={() => setProgress(0)} variant="secondary">
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
