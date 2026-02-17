"use client";

import { DirectionProvider as BaseDirectionProvider } from "@base-ui/react/direction-provider";
import type * as React from "react";

function DirectionProvider({
  dir,
  direction,
  children,
  ...props
}: React.ComponentProps<typeof BaseDirectionProvider> & {
  dir?: React.ComponentProps<typeof BaseDirectionProvider>["direction"];
  direction?: React.ComponentProps<typeof BaseDirectionProvider>["direction"];
}) {
  return (
    <BaseDirectionProvider direction={direction ?? dir} {...props}>
      {children}
    </BaseDirectionProvider>
  );
}

export { DirectionProvider };
// biome-ignore lint/performance/noBarrelFile: intentional re-export of useDirection
export { useDirection } from "@base-ui/react/direction-provider";
