import type { Registry } from "shadcn/schema";

export const hooks: Registry["items"] = [
  {
    name: "use-copy-to-clipboard",
    type: "registry:lib",
    title: "Use Copy To Clipboard",
    description:
      "A hook that copies text to the clipboard and resets after a timeout.",
    files: [
      {
        path: "hooks/use-copy-to-clipboard.ts",
        type: "registry:lib",
      },
    ],
  },
  {
    name: "use-mobile",
    type: "registry:lib",
    title: "Use Mobile",
    description:
      "A hook that detects whether the viewport matches a mobile breakpoint.",
    files: [
      {
        path: "hooks/use-mobile.ts",
        type: "registry:lib",
      },
    ],
  },
  {
    name: "use-tab-observer",
    type: "registry:lib",
    title: "Use Tab Observer",
    description:
      "A hook that observes and tracks the active tab indicator position.",
    files: [
      {
        path: "hooks/use-tab-observer.ts",
        type: "registry:lib",
      },
    ],
  },
];
