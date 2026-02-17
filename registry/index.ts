import { registrySchema } from "shadcn/schema";
import { z } from "zod";

import { examples } from "@/registry/registry-examples";
import { lib } from "@/registry/registry-lib";
import { ui } from "@/registry/registry-ui";

export const registry = {
  name: "fingertip/ui",
  homepage: "https://ui.fingertip.com",
  items: [
    ...ui,
    ...lib,

    // Internal use only.
    ...examples,
  ],
} satisfies z.infer<typeof registrySchema>;
