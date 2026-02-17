import { Italic } from "blode-icons-react";

import { Toggle } from "@/registry/default/ui/toggle";

export default function ToggleSm() {
  return (
    <Toggle aria-label="Toggle italic" size="sm">
      <Italic />
    </Toggle>
  );
}
