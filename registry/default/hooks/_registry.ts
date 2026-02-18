import type { Registry } from "shadcn/schema";

export const hooks: Registry["items"] = [
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
