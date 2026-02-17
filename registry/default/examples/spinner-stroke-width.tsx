"use client";

import { Spinner } from "@/registry/default/ui/spinner";

export default function SpinnerStrokeWidth() {
  return (
    <div className="flex items-center gap-8 justify-center py-6">
      <div className="flex flex-col items-center gap-2">
        <Spinner strokeWidth={1} />
        <span className="text-sm text-muted-foreground">1px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner strokeWidth={2} />
        <span className="text-sm text-muted-foreground">2px (default)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner strokeWidth={4} />
        <span className="text-sm text-muted-foreground">4px</span>
      </div>
    </div>
  );
}
