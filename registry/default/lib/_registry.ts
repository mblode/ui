import type { Registry } from "shadcn/schema";

export const lib: Registry["items"] = [
  {
    dependencies: ["cn"],
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
  {
    description: "Fetch and preview Google Fonts, with stylesheet injection and cleanup.",
    files: [
      {
        path: "lib/google-fonts.ts",
        type: "registry:lib",
      },
    ],
    name: "google-fonts",
    title: "Google Fonts",
    type: "registry:lib",
  },
];
