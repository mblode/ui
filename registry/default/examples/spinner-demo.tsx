"use client";

import { Spinner } from "@/registry/default/ui/spinner";

export default function SpinnerDemo() {
  return (
    <div className="flex items-center justify-center py-6">
      <div className="flex flex-col items-center gap-2">
        <Spinner />
        <span className="text-sm text-muted-foreground">Default spinner</span>
      </div>
    </div>
  );
}
