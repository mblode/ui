import { BoldIcon } from "@fingertip/icons";

import { Toggle } from "@/registry/default/ui/toggle";

export default function ToggleDemo() {
  return (
    <Toggle aria-label="Toggle bold">
      <BoldIcon className="h-4 w-4" />
    </Toggle>
  );
}
