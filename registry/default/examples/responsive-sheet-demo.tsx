"use client";

import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import { Input } from "@/registry/default/ui/input";
import { Label } from "@/registry/default/ui/label";
import { ResponsiveSheet } from "@/registry/default/ui/responsive-sheet";
import { ResponsiveSheetContent } from "@/registry/default/ui/responsive-sheet-content";

export default function ResponsiveSheetDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-center space-y-4">
      <p className="text-sm text-muted-foreground text-center mb-4">
        This component appears as a bottom sheet on mobile and a dialog on
        desktop. Try resizing your browser to see the difference.
      </p>

      <Button onClick={() => setOpen(true)}>Open Responsive Sheet</Button>

      <ResponsiveSheet open={open} onOpenChange={setOpen}>
        <ResponsiveSheetContent
          mobileClassName="p-6 max-h-[85vh]"
          desktopClassName="max-w-md"
        >
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h2 className="text-xl font-bold">Edit Profile</h2>
              <p className="text-sm text-muted-foreground">
                Make changes to your profile here. Click save when you're done.
              </p>
            </div>

            <div className="grid gap-4 py-4">
              <div className="w-full items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  defaultValue="John Doe"
                  className="col-span-3"
                />
              </div>
              <div className="w-full items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input
                  id="username"
                  defaultValue="@johndoe"
                  className="col-span-3"
                />
              </div>
              <div className="w-full items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  defaultValue="john.doe@example.com"
                  className="col-span-3"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="secondary" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>Save changes</Button>
            </div>
          </div>
        </ResponsiveSheetContent>
      </ResponsiveSheet>
    </div>
  );
}
