"use client";

import type * as React from "react";
import { CodeBlockWrapper } from "@/components/code-block-wrapper";
import { cn } from "@/lib/utils";

interface ComponentSourceProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
}

export function ComponentSource({ children, className }: ComponentSourceProps) {
  return (
    <CodeBlockWrapper className={cn(className)}>{children}</CodeBlockWrapper>
  );
}
