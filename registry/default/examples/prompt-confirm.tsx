"use client";

import { CheckIcon, SquareBehindSquare6Icon, TriangleAlertIcon } from "blode-icons-react";
import { useId, useState } from "react";

import { useCopyToClipboard } from "@/registry/default/hooks/use-copy-to-clipboard";
import { Button } from "@/registry/default/ui/button";
import { Input } from "@/registry/default/ui/input";
import { Prompt } from "@/registry/default/ui/prompt";

const PROJECT_NAME = "blodemd-test";

export default function PromptConfirm() {
  const labelId = useId();
  const [value, setValue] = useState("");
  const { isCopied, copyToClipboard } = useCopyToClipboard();

  return (
    <Prompt
      onOpenChange={(open) => {
        if (!open) {
          setValue("");
        }
      }}
    >
      <Prompt.Trigger asChild>
        <Button variant="destructive">Delete project</Button>
      </Prompt.Trigger>
      <Prompt.Content>
        <Prompt.Header className="flex-row items-start gap-4 space-y-0 text-left">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <TriangleAlertIcon className="size-5" />
          </div>
          <div className="space-y-2">
            <Prompt.Title>Delete {PROJECT_NAME}?</Prompt.Title>
            <Prompt.Description className="text-muted-foreground text-sm">
              Every deployment, published file, custom domain and deploy key for this project is
              deleted. This cannot be undone.
            </Prompt.Description>
          </div>
        </Prompt.Header>
        <div className="grid gap-2">
          <p className="flex flex-wrap items-center gap-1.5 text-sm" id={labelId}>
            Type
            <Button
              aria-label={`Copy ${PROJECT_NAME}`}
              className="text-sm"
              onClick={() => copyToClipboard(PROJECT_NAME)}
              size="xs"
              variant="secondary"
            >
              {PROJECT_NAME}
              {isCopied ? (
                <CheckIcon className="size-3.5" />
              ) : (
                <SquareBehindSquare6Icon className="size-3.5" />
              )}
            </Button>
            to confirm.
          </p>
          <Input
            aria-labelledby={labelId}
            autoComplete="off"
            onChange={(event) => setValue(event.target.value)}
            placeholder="Enter project name"
            value={value}
          />
        </div>
        <Prompt.Footer>
          <Prompt.Cancel>Cancel</Prompt.Cancel>
          <Prompt.Action disabled={value !== PROJECT_NAME}>Delete project</Prompt.Action>
        </Prompt.Footer>
      </Prompt.Content>
    </Prompt>
  );
}
