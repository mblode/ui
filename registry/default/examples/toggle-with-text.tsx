import { ItalicIcon } from "@fingertip/icons";

import { Toggle } from "@/registry/default/ui/toggle";

export default function ToggleWithText() {
  return (
    <Toggle aria-label="Toggle italic">
      <ItalicIcon />
      Italic
    </Toggle>
  );
}
