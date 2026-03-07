import type { registrySchema } from "shadcn/schema";
import type { z } from "zod";

import { base } from "@/registry/default/base/_registry";
import { examples } from "@/registry/default/examples/_registry";
import { fonts } from "@/registry/default/fonts/_registry";
import { hooks } from "@/registry/default/hooks/_registry";
import { lib } from "@/registry/default/lib/_registry";
import { ui } from "@/registry/default/ui/_registry";

export const registry = {
  name: "blode/ui",
  homepage: "https://ui.blode.co",
  items: [
    ...base,
    ...fonts,
    ...ui,
    ...lib,
    ...hooks,

    // Internal use only.
    ...examples,
  ],
} satisfies z.infer<typeof registrySchema>;
