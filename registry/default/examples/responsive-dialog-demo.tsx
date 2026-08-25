"use client";

import { useState } from "react";

import { Button } from "@/registry/default/ui/button";
import { Field, FieldLabel } from "@/registry/default/ui/field";
import { Input } from "@/registry/default/ui/input";
import {
  ResponsiveDialog,
  ResponsiveDialogClose,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
} from "@/registry/default/ui/responsive-dialog";

export const ResponsiveDialogDemo = () => {
  // Field state lives above ResponsiveDialog on purpose. Crossing the 768px
  // breakpoint unmounts the dialog and mounts the drawer (or the reverse), so
  // anything held inside the dialog subtree — including uncontrolled inputs —
  // is destroyed. State lifted to here survives the swap.
  const [displayName, setDisplayName] = useState("Ada Lovelace");
  const [email, setEmail] = useState("ada@example.com");

  return (
    <ResponsiveDialog>
      <ResponsiveDialogTrigger asChild>
        <Button variant="outline">Edit profile</Button>
      </ResponsiveDialogTrigger>
      <ResponsiveDialogContent className="data-[layout=dialog]:max-w-[425px]">
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle>Edit profile</ResponsiveDialogTitle>
          <ResponsiveDialogDescription>
            Update how your name and email appear to collaborators.
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>

        <div className="grid gap-4 group-data-[layout=drawer]/responsive-dialog:px-4">
          <Field>
            <FieldLabel htmlFor="responsive-dialog-name">Display name</FieldLabel>
            <Input
              id="responsive-dialog-name"
              onChange={(event) => setDisplayName(event.target.value)}
              value={displayName}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="responsive-dialog-email">Email</FieldLabel>
            <Input
              id="responsive-dialog-email"
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              value={email}
            />
          </Field>
        </div>

        <ResponsiveDialogFooter>
          <ResponsiveDialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </ResponsiveDialogClose>
          <ResponsiveDialogClose asChild>
            <Button>Save changes</Button>
          </ResponsiveDialogClose>
        </ResponsiveDialogFooter>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
};
