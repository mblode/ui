"use client";

import type * as React from "react";

import { cn } from "@/lib/utils";

const AspectRatio = ({
  ratio,
  className,
  style,
  ...props
}: React.ComponentProps<"div"> & { ratio: number }) => (
  <div
    className={cn("relative aspect-(--ratio) aspect-[var(--ratio)]", className)}
    data-slot="aspect-ratio"
    style={
      {
        "--ratio": ratio,
        ...style,
      } as React.CSSProperties
    }
    {...props}
  />
);

export { AspectRatio };
