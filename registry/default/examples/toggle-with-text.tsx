import { ItalicIcon } from "blode-icons-react";
import { Toggle } from "@/registry/default/ui/toggle";

export function ToggleText() {
  return (
    <Toggle aria-label="Toggle italic">
      <ItalicIcon />
      Italic
    </Toggle>
  );
}
