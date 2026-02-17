import type { Registry } from "shadcn/schema";

export const hooks: Registry["items"] = [
  {
    name: "use-mobile",
    type: "registry:hook",
    files: [
      {
        path: "hooks/use-mobile.ts",
        type: "registry:hook",
      },
    ],
  },
  {
    name: "use-tab-observer",
    type: "registry:hook",
    files: [
      {
        path: "hooks/use-tab-observer.ts",
        type: "registry:hook",
      },
    ],
  },
];
