import { Italic } from "blode-icons-react";

import { Toggle } from "@/registry/default/ui/toggle";

export default function ToggleWithText() {
  return (
    <Toggle aria-label="Toggle italic">
      <Italic />
      Italic
    </Toggle>
  );
}
