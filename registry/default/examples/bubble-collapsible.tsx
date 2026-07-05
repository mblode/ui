"use client";

import { ChevronDownIcon } from "blode-icons-react";
import * as React from "react";

import { Bubble, BubbleContent } from "@/registry/default/ui/bubble";
import { Button } from "@/registry/default/ui/button";
import { Collapsible, CollapsibleTrigger } from "@/registry/default/ui/collapsible";

const text = `The accessibility review found two focus states that were visually too subtle in dark mode.

I checked the dialog, menu, and drawer paths because each one renders focusable controls inside a layered surface.

The dialog and drawer are fine. The menu needs the hover and focus tokens split so keyboard focus stays visible when the pointer is not involved.

I also recommend keeping the change in the style file instead of the primitive so the other themes can choose their own focus treatment later.`;

const previewLength = 180;

export default function BubbleCollapsible() {
  const [open, setOpen] = React.useState(false);
  const isLong = text.length > previewLength;
  const preview = `${text.slice(0, previewLength)}...`;

  return (
    <div className="flex w-full max-w-sm flex-col gap-8 py-12">
      <Bubble variant="muted">
        <BubbleContent>How can I help you today?</BubbleContent>
      </Bubble>

      <Bubble align="end" variant="muted">
        <BubbleContent className="whitespace-pre-line">
          <Collapsible onOpenChange={setOpen} open={open}>
            <div>{open || !isLong ? text : preview}</div>
            {isLong ? (
              <CollapsibleTrigger
                render={<Button className="gap-1 p-0 text-muted-foreground" variant="link" />}
              >
                {open ? "Show less" : "Show more"}
                <ChevronDownIcon
                  className="group-data-[panel-open]/button:rotate-180"
                  data-icon="inline-end"
                />
              </CollapsibleTrigger>
            ) : null}
          </Collapsible>
        </BubbleContent>
      </Bubble>
    </div>
  );
}
