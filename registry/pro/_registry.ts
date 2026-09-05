import type { Registry } from "shadcn/schema";

export const proRegistry: Registry["items"] = [
  {
    dependencies: ["blode-icons-react"],
    description: "A responsive overview with key metrics and a recent activity table.",
    files: [
      {
        path: "blocks/dashboard-overview.tsx",
        target: "components/blocks/dashboard-overview.tsx",
        type: "registry:component",
      },
    ],
    name: "dashboard-overview",
    registryDependencies: ["@blode/badge", "@blode/button", "@blode/card", "@blode/table"],
    title: "Dashboard Overview",
    type: "registry:block",
  },
  {
    dependencies: ["blode-icons-react"],
    description: "A focused sign-in card with accessible fields and recovery actions.",
    files: [
      {
        path: "blocks/sign-in-card.tsx",
        target: "components/blocks/sign-in-card.tsx",
        type: "registry:component",
      },
    ],
    name: "sign-in-card",
    registryDependencies: ["@blode/button", "@blode/card", "@blode/field", "@blode/input"],
    title: "Sign-in Card",
    type: "registry:block",
  },
  {
    dependencies: ["blode-icons-react"],
    description: "A restrained two-tier pricing section with an optional test-mode notice.",
    files: [
      {
        path: "blocks/pricing-section.tsx",
        target: "components/blocks/pricing-section.tsx",
        type: "registry:component",
      },
    ],
    name: "pricing-section",
    registryDependencies: ["@blode/badge", "@blode/button", "@blode/card"],
    title: "Pricing Section",
    type: "registry:block",
  },
];
