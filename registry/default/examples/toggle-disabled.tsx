import { UnderlineIcon } from "@fingertip/icons";

import { Toggle } from "@/registry/default/ui/toggle";

export default function ToggleDisabled() {
  return (
    <Toggle aria-label="Toggle underline" disabled>
      <UnderlineIcon className="h-4 w-4" />
    </Toggle>
  );
}
