"use client";

import * as React from "react";

import { Button } from "@/registry/default/ui/button";
import { RenderPrompt } from "@/registry/default/ui/render-prompt";

export default function RenderPromptDemo() {
  const [open, setOpen] = React.useState(false);
  const [verificationOpen, setVerificationOpen] = React.useState(false);

  const handleConfirm = () => {
    setOpen(false);
    console.log("Action confirmed");
  };

  const handleCancel = () => {
    setOpen(false);
    console.log("Action cancelled");
  };

  const handleVerificationConfirm = () => {
    setVerificationOpen(false);
    console.log("Verification confirmed");
  };

  const handleVerificationCancel = () => {
    setVerificationOpen(false);
    console.log("Verification cancelled");
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Button onClick={() => setOpen(true)}>Open Simple Prompt</Button>
        <Button onClick={() => setVerificationOpen(true)}>
          Open Verification Prompt
        </Button>
      </div>

      <RenderPrompt
        open={open}
        title="Confirm Action"
        description="Are you sure you want to perform this action? This cannot be undone."
        confirmText="Yes, continue"
        cancelText="No, cancel"
        onConfirmAction={handleConfirm}
        onCancelAction={handleCancel}
      />

      <RenderPrompt
        open={verificationOpen}
        title="Delete Resource"
        description="This action is irreversible. Your data will be permanently deleted."
        verificationText="delete"
        confirmText="Delete"
        cancelText="Cancel"
        onConfirmAction={handleVerificationConfirm}
        onCancelAction={handleVerificationCancel}
      />
    </div>
  );
}
