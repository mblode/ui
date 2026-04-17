import type { Registry } from "shadcn/schema";

export const hooks: Registry["items"] = [
  {
    description: "A hook that copies text to the clipboard and resets after a timeout.",
    files: [
      {
        path: "hooks/use-copy-to-clipboard.ts",
        type: "registry:lib",
      },
    ],
    name: "use-copy-to-clipboard",
    title: "Use Copy To Clipboard",
    type: "registry:lib",
  },
  {
    description: "A hook that detects whether the viewport matches a mobile breakpoint.",
    files: [
      {
        path: "hooks/use-mobile.ts",
        type: "registry:lib",
      },
    ],
    name: "use-mobile",
    title: "Use Mobile",
    type: "registry:lib",
  },
  {
    description: "A hook that observes and tracks the active tab indicator position.",
    files: [
      {
        path: "hooks/use-tab-observer.ts",
        type: "registry:lib",
      },
    ],
    name: "use-tab-observer",
    title: "Use Tab Observer",
    type: "registry:lib",
  },
];
