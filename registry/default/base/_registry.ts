import type { Registry } from "shadcn/schema";

export const base: Registry["items"] = [
  {
    config: {
      iconLibrary: "blode-icons-react",
      registries: {
        "@blode": "https://ui.blode.co/r/{name}.json",
      },
      style: "base-blode",
      tailwind: {
        baseColor: "neutral",
        cssVariables: true,
      },
    },
    dependencies: [
      "@base-ui/react",
      "tw-animate-css",
      "class-variance-authority",
      "blode-icons-react",
    ],
    description: "Blode UI design-system base built on Base UI.",
    name: "blode",
    registryDependencies: ["utils"],
    title: "Blode UI",
    type: "registry:base",
  },
];
