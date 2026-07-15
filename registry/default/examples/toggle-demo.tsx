import { BookmarkFilledIcon, BookmarkIcon } from "blode-icons-react";
import { Toggle } from "@/registry/default/ui/toggle";

export const ToggleDemo = () => (
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
