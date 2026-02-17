import * as React from "react";
import {
  CheckIcon,
  GraduateCapIcon,
  ShoppingBag1Icon,
  StarIcon,
} from "@fingertip/icons";

import { List, ListItem } from "@/registry/default/ui/list";

export default function ListDemo() {
  return (
    <div className="w-full max-w-sm">
      <List>
        <ListItem>
          <ShoppingBag1Icon className="mr-2 h-4 w-4" />
          <span>Basic list item with icon</span>
        </ListItem>
        <ListItem className="bg-muted/50">
          <GraduateCapIcon className="mr-2 h-4 w-4" />
          <span>List item with different background</span>
        </ListItem>
        <ListItem>
          <StarIcon className="mr-2 h-4 w-4 text-yellow-500" />
          <span className="flex-1">List item with trailing element</span>
          <CheckIcon className="h-4 w-4 text-green-500" />
        </ListItem>
        <ListItem className="cursor-pointer hover:bg-accent hover:text-accent-foreground">
          <span>Interactive list item with hover state</span>
        </ListItem>
      </List>
    </div>
  );
}
