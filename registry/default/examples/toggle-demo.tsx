import { BookmarkFilledIcon, BookmarkIcon } from "blode-icons-react";
import { Toggle } from "@/registry/default/ui/toggle";

export function ToggleDemo() {
  return (
    <Toggle
      aria-label="Toggle bookmark"
      render={(props, state) => (
        <button type="button" {...props}>
          {state.pressed ? <BookmarkFilledIcon /> : <BookmarkIcon />}
          Bookmark
        </button>
      )}
      size="sm"
      variant="outline"
    />
  );
}
