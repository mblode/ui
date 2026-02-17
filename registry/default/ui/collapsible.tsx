"use client";

import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";
import * as React from "react";

function Collapsible({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />;
}

function CollapsibleTrigger({
  asChild = false,
  children,
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Trigger> & {
  asChild?: boolean;
}) {
  const render =
    asChild && React.isValidElement(children)
      ? (children as React.ReactElement)
      : undefined;

  return (
    <CollapsiblePrimitive.Trigger
      data-slot="collapsible-trigger"
      render={render}
      {...props}
    >
      {asChild ? null : children}
    </CollapsiblePrimitive.Trigger>
  );
}

function CollapsibleContent({
  forceMount,
  keepMounted,
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Panel> & {
  forceMount?: boolean;
}) {
  return (
    <CollapsiblePrimitive.Panel
      data-slot="collapsible-content"
      keepMounted={forceMount ?? keepMounted}
      {...props}
    />
  );
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
