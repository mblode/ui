import { Underline } from "blode-icons-react";

import { Toggle } from "@/registry/default/ui/toggle";

export default function ToggleDisabled() {
  return (
    <Toggle aria-label="Toggle italic" disabled>
      <Underline className="h-4 w-4" />
    </Toggle>
  );
}
