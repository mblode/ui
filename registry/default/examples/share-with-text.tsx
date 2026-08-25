"use client";

import { Share } from "@/registry/default/ui/share";

export const ShareWithText = () => (
  <Share
    copyMessage="Invite link copied to clipboard"
    label="Share invite"
    showLabel
    text="Join our workspace on Blode."
    title="Workspace invite"
    value="https://blode.co/ui"
  />
);
