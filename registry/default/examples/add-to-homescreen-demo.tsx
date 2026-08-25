"use client";

import { useState } from "react";
import { AddToHomescreen } from "@/registry/default/ui/add-to-homescreen";
import { Button } from "@/registry/default/ui/button";

/**
 * No platform or browser override: this shows the recipe for the browser you
 * are reading in. On desktop Chrome that is the address-bar install pill, with
 * the arrow pointing up at it.
 */
export const AddToHomescreenDemo = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="outline">
        Add to home screen
      </Button>
      <AddToHomescreen appName="Ledger" onOpenChange={setOpen} open={open} />
    </>
  );
};
