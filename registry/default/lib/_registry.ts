import type { Registry } from "shadcn/schema";

export const lib: Registry["items"] = [
  {
    dependencies: ["clsx", "tailwind-merge"],
    description: "Utility functions including cn() for merging Tailwind CSS classes.",
    files: [
      {
        path: "lib/utils.ts",
        type: "registry:lib",
      },
    ],
    name: "utils",
    title: "Utils",
    type: "registry:lib",
  },
];
