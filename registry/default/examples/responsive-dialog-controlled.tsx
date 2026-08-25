"use client";

import { useState } from "react";

import { Button } from "@/registry/default/ui/button";
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
} from "@/registry/default/ui/responsive-dialog";

export const ResponsiveDialogControlled = () => {
  const [open, setOpen] = useState(false);
  const [archived, setArchived] = useState(false);

  return (
    <div className="flex flex-col items-center gap-3">
      <Button onClick={() => setOpen(true)} variant="outline">
        Archive workspace
      </Button>

      <output aria-live="polite" className="text-muted-foreground text-sm">
        {archived ? "Workspace archived." : "Workspace is active."}
      </output>

      <ResponsiveDialog onOpenChange={setOpen} open={open}>
        <ResponsiveDialogContent className="data-[layout=dialog]:max-w-[425px]">
          <ResponsiveDialogHeader>
            <ResponsiveDialogTitle>Archive this workspace?</ResponsiveDialogTitle>
            <ResponsiveDialogDescription>
              Members lose access immediately. You can restore it from settings for 30 days.
            </ResponsiveDialogDescription>
          </ResponsiveDialogHeader>

          <ResponsiveDialogFooter>
            <Button onClick={() => setOpen(false)} variant="outline">
              Keep active
            </Button>
            <Button
              onClick={() => {
                setArchived(true);
                setOpen(false);
              }}
              variant="destructive"
            >
              Archive
            </Button>
          </ResponsiveDialogFooter>
        </ResponsiveDialogContent>
      </ResponsiveDialog>
    </div>
  );
};
