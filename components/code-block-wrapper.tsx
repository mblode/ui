"use client";

import React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/registry/default/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/registry/default/ui/collapsible";
import { Separator } from "@/registry/default/ui/separator";

export function CodeBlockWrapper({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Collapsible>) {
  const [isOpened, setIsOpened] = React.useState(false);

  return (
    <Collapsible
      className={cn("group/collapsible relative md:-mx-1", className)}
      onOpenChange={setIsOpened}
      open={isOpened}
      {...props}
    >
      <CollapsibleTrigger asChild>
        <div className="absolute top-1.5 right-9 z-10 flex items-center">
          <Button
            className="h-7 rounded-md px-2 text-muted-foreground"
            size="sm"
            variant="ghost"
          >
            {isOpened ? "Collapse" : "Expand"}
          </Button>
          <Separator className="!h-4 mx-1.5" orientation="vertical" />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent
        className="[&>figure]:md:!mx-0 relative mt-6 overflow-hidden data-[state=closed]:max-h-64 data-[state=closed]:[content-visibility:auto] [&>figure]:mt-0"
        forceMount
      >
        {children}
      </CollapsibleContent>
      <CollapsibleTrigger className="absolute inset-x-0 -bottom-2 flex h-20 items-center justify-center rounded-b-lg bg-gradient-to-b from-code/70 to-code text-muted-foreground text-sm group-data-[state=open]/collapsible:hidden">
        {isOpened ? "Collapse" : "Expand"}
      </CollapsibleTrigger>
    </Collapsible>
  );
}
