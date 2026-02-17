"use client";

import React, { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import {
  BottomSheet,
  BottomSheetContent,
  BottomSheetInner,
  BottomSheetOuter,
} from "@/registry/default/ui/bottom-sheet";
import { CrossLargeIcon } from "@fingertip/icons";

export default function BottomSheetDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-center space-y-4">
      <Button onClick={() => setOpen(true)}>Open Bottom Sheet</Button>

      <BottomSheet open={open} onOpenChange={setOpen}>
        <BottomSheetContent className="w-full max-w-md mx-auto">
          <BottomSheetOuter>
            <div className="pointer-events-auto">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setOpen(false)}
                className="p-1"
              >
                <CrossLargeIcon className="h-5 w-5" />
              </Button>
            </div>
          </BottomSheetOuter>

          <BottomSheetInner>
            <div className="flex flex-col space-y-4 p-6">
              <div className="flex justify-center pb-2">
                <div className="h-1 w-12 rounded-full bg-muted-foreground/20" />
              </div>
              <h2 className="text-xl font-bold text-center">
                Bottom Sheet Title
              </h2>
              <p className="text-muted-foreground text-center">
                This is a bottom sheet component that slides up from the bottom
                of the screen. It's commonly used in mobile interfaces for
                displaying additional options or content.
              </p>
              <div className="flex justify-end pt-4">
                <Button onClick={() => setOpen(false)}>Close</Button>
              </div>
            </div>
          </BottomSheetInner>
        </BottomSheetContent>
      </BottomSheet>
    </div>
  );
}
