import { BookmarkIcon } from "blode-icons-react";
import { Toggle } from "@/registry/default/ui/toggle";

export function ToggleDemo() {
  return (
    <Toggle aria-label="Toggle bookmark" size="sm" variant="outline">
      <BookmarkIcon className="group-aria-pressed/toggle:fill-foreground" />
      Bookmark
    </Toggle>
  );
}
