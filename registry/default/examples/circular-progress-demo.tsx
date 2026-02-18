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
    <div className="grid w-full max-w-md gap-6">
      <div className="space-y-1">
        <p className="font-medium text-sm">Profile completion</p>
        <p className="text-muted-foreground text-sm">
          Track required steps before launching your workspace.
        </p>
      </div>

      <div className="flex items-center justify-center gap-8">
        <div className="flex flex-col items-center">
          <CircularProgress className="size-24" value={progress} />
          <span className="mt-2 text-muted-foreground text-sm">With value</span>
        </div>

        <div className="flex flex-col items-center">
          <CircularProgress className="size-24" hideText value={progress} />
          <span className="mt-2 text-muted-foreground text-sm">
            Indicator only
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <Slider
          max={100}
          min={0}
          onValueChange={(value) => {
            setProgress(value[0] ?? 0);
          }}
          step={1}
          value={[progress]}
        />
        <div className="flex items-center justify-between text-muted-foreground text-sm">
          <span>{progress}% complete</span>
          <span>{100 - progress}% left</span>
        </div>

        <div className="flex justify-end gap-2">
          <Button
            onClick={() => {
              setAutoProgress(false);
              setProgress(0);
            }}
            variant="outline"
          >
            Reset
          </Button>
          <Button
            onClick={() => setAutoProgress((previous) => !previous)}
            variant="secondary"
          >
            {autoProgress ? "Pause" : "Auto-fill"}
          </Button>
        </div>
      </div>
    </div>
  );
}
