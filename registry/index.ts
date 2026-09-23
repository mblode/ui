import type { registrySchema } from "shadcn/schema";
import type { z } from "zod";

import { base } from "@/registry/default/base/_registry";
import { examples } from "@/registry/default/examples/_registry";
import { fonts } from "@/registry/default/fonts/_registry";
import { hooks } from "@/registry/default/hooks/_registry";
import { lib } from "@/registry/default/lib/_registry";
import { ui } from "@/registry/default/ui/_registry";

export const registry = {
  homepage: "https://blode.co/ui",
  items: [
    ...base,
    ...fonts,
    ...ui,
    ...lib,
    ...hooks,

    // Internal use only.
    ...examples,
  ],
  // Bare, single-token, and matching the `@blode` namespace. shadcn's registry
  // directory expects the two to line up (`7ovr` -> `@7ovr`); a slash here does
  // not resolve to a namespace.
  name: "blode",
} satisfies z.infer<typeof registrySchema>;
