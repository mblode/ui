import { ItalicIcon } from "@fingertip/icons";

import { Toggle } from "@/registry/default/ui/toggle";

export default function ToggleSecondary() {
  return (
    <Toggle variant="secondary" aria-label="Toggle italic">
      <ItalicIcon className="h-4 w-4" />
    </Toggle>
  );
}
