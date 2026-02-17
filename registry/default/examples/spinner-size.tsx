"use client";

import { Spinner } from "@/registry/default/ui/spinner";

export default function SpinnerSize() {
  return (
    <div className="flex items-center gap-8 justify-center py-6">
      <div className="flex flex-col items-center gap-2">
        <Spinner size={16} />
        <span className="text-sm text-muted-foreground">16px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size={24} />
        <span className="text-sm text-muted-foreground">24px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size={32} />
        <span className="text-sm text-muted-foreground">32px</span>
      </div>
    </div>
  );
}
