import { ItalicIcon } from "blode-icons-react";
import { Toggle } from "@/registry/default/ui/toggle";

export const ToggleText = () => (
  <Toggle aria-label="Toggle italic">
    <ItalicIcon />
    Italic
  </Toggle>
);
