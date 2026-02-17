import { BookmarkIcon } from "blode-icons-react";

import { Toggle } from "@/registry/default/ui/toggle";

export default function ToggleDemo() {
  return (
    <Toggle
      aria-label="Toggle bookmark"
      className="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-foreground data-[state=on]:*:[svg]:stroke-foreground"
      size="sm"
      variant="outline"
    >
      <BookmarkIcon />
      Bookmark
    </Toggle>
  );
}
