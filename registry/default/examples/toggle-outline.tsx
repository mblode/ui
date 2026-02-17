import { Italic } from "blode-icons-react";

import { Toggle } from "@/registry/default/ui/toggle";

export default function ToggleOutline() {
  return (
    <Toggle aria-label="Toggle italic" variant="outline">
      <Italic />
    </Toggle>
  );
}
