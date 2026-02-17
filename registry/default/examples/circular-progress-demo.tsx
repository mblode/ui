"use client";

import { useEffect, useState } from "react";

import { Button } from "@/registry/default/ui/button";
import { CircularProgress } from "@/registry/default/ui/circular-progress";
import { Slider } from "@/registry/default/ui/slider";

export default function CircularProgressDemo() {
  const [progress, setProgress] = useState(45);
  const [autoProgress, setAutoProgress] = useState(false);

  useEffect(() => {
    if (!autoProgress) {
      return;
    }

    const interval = setInterval(() => {
      setProgress((previous) => {
        if (previous >= 100) {
          setAutoProgress(false);
          return 0;
        }

        return previous + 5;
      });
    }, 500);

    return () => clearInterval(interval);
  }, [autoProgress]);

  return (
    <div className="flex flex-col items-center space-y-8">
      <div className="flex items-center justify-center gap-8">
        <div className="flex flex-col items-center">
          <div className="h-24 w-24">
            <CircularProgress value={progress} />
          </div>
          <span className="mt-2 text-muted-foreground text-sm">With Text</span>
        </div>

        <div className="flex flex-col items-center">
          <div className="h-24 w-24">
            <CircularProgress hideText value={progress} />
          </div>
          <span className="mt-2 text-muted-foreground text-sm">
            Without Text
          </span>
        </div>
      </div>

      <div className="flex w-full max-w-md flex-col gap-4">
        <Slider
          max={100}
          min={0}
          onValueChange={(value) => {
            setProgress(value[0] ?? 0);
          }}
          step={1}
          value={[progress]}
        />

        <div className="flex justify-center gap-4">
          <Button
            onClick={() => setAutoProgress((previous) => !previous)}
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
