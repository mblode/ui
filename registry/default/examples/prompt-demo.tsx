"use client";

import { Button } from "@/registry/default/ui/button";
import { Prompt } from "@/registry/default/ui/prompt";

export default function PromptDemo() {
  return (
    <div className="flex flex-col items-start gap-2">
      <p className="text-muted-foreground text-sm">
        Permanently remove this workspace and all project data.
      </p>
      <Prompt>
        <Prompt.Trigger asChild>
          <Button variant="destructive">Delete workspace</Button>
        </Prompt.Trigger>
        <Prompt.Content>
          <Prompt.Header>
            <Prompt.Title>Delete workspace?</Prompt.Title>
            <Prompt.Description>
              This action cannot be undone. This will permanently delete your
              workspace, members, and billing history.
            </Prompt.Description>
          </Prompt.Header>
          <Prompt.Footer>
            <Prompt.Cancel>Cancel</Prompt.Cancel>
            <Prompt.Action>Delete workspace</Prompt.Action>
          </Prompt.Footer>
        </Prompt.Content>
      </Prompt>
    </div>
  );
}
