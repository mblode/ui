"use client";

import * as React from "react";

import { Button } from "@/registry/default/ui/button";
import { Prompt } from "@/registry/default/ui/prompt";

export default function PromptDemo() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex gap-2">
      <Button onClick={() => setOpen(true)}>Show Prompt</Button>
      <Prompt open={open}>
        <Prompt.Content>
          <Prompt.Header>
            <Prompt.Title>Delete Account</Prompt.Title>
            <Prompt.Description>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </Prompt.Description>
          </Prompt.Header>
          <Prompt.Footer>
            <Prompt.Cancel onClick={() => setOpen(false)}>Cancel</Prompt.Cancel>
            <Prompt.Action
              onClick={() => {
                console.log("Account deleted");
                setOpen(false);
              }}
            >
              Delete
            </Prompt.Action>
          </Prompt.Footer>
        </Prompt.Content>
      </Prompt>
    </div>
  );
}
