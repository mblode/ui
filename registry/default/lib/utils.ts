import { registryItemSchema } from "shadcn/schema";
import { z } from "zod";

export const lib: z.infer<typeof registryItemSchema>[] = [
  {
    name: "utils",
    type: "registry:lib",
    dependencies: ["clsx", "tailwind-merge"],
    files: [
      {
        path: "lib/utils.ts",
        type: "registry:lib",
      },
    ],
  },
];
