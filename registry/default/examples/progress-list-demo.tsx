"use client";

import * as React from "react";

import {
  ProgressList,
  ProgressItem,
} from "@/registry/default/ui/progress-list";

export default function ProgressListDemo() {
  return (
    <ProgressList>
      <ProgressItem title="Step 1: Create account" completed={true} />
      <ProgressItem title="Step 2: Verify email" completed={true} />
      <ProgressItem title="Step 3: Complete profile" completed={false} />
      <ProgressItem title="Step 4: Set preferences" completed={false} />
    </ProgressList>
  );
}
