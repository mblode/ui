import { ItalicIcon } from "@fingertip/icons";

import { Toggle } from "@/registry/default/ui/toggle";

export default function ToggleSm() {
  return (
    <Toggle size="sm" aria-label="Toggle italic">
      <ItalicIcon className="h-4 w-4" />
    </Toggle>
  );
}
