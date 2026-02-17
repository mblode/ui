import { ItalicIcon } from "@fingertip/icons";

import { Toggle } from "@/registry/default/ui/toggle";

export default function ToggleLg() {
  return (
    <Toggle size="lg" aria-label="Toggle italic">
      <ItalicIcon className="h-4 w-4" />
    </Toggle>
  );
}
