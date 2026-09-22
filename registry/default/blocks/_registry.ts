import type { Registry } from "shadcn/schema";

// Marketing blocks: the sections a product landing page is built from. Each is
// a single component file, installed to `components/` rather than
// `components/ui/`, because they compose primitives instead of being one.
export const blocks: Registry["items"] = [
  {
    categories: ["marketing"],
    description:
      "A landing page hero: eyebrow, headline, one-sentence subhead, one primary action, and a slot for the product.",
    files: [
      {
        path: "blocks/marketing-hero.tsx",
        type: "registry:component",
      },
    ],
    name: "marketing-hero",
    title: "Marketing Hero",
    type: "registry:block",
  },
  {
    categories: ["marketing"],
    dependencies: ["blode-icons-react"],
    description:
      "A copyable install command, with tabs for alternative setups and copied and failed states.",
    files: [
      {
        path: "blocks/install-command.tsx",
        type: "registry:component",
      },
    ],
    name: "install-command",
    registryDependencies: ["button", "tabs"],
    title: "Install Command",
    type: "registry:block",
  },
  {
    categories: ["marketing"],
    dependencies: ["motion"],
    description:
      "Alternating rows of text and real product media, with an optional once-only reveal.",
    files: [
      {
        path: "blocks/feature-rows.tsx",
        type: "registry:component",
      },
    ],
    name: "feature-rows",
    title: "Feature Rows",
    type: "registry:block",
  },
  {
    categories: ["marketing"],
    description:
      "A strip of live numbers in tabular figures that hides any stat it could not fetch.",
    files: [
      {
        path: "blocks/proof-stats.tsx",
        type: "registry:component",
      },
    ],
    name: "proof-stats",
    title: "Proof Stats",
    type: "registry:block",
  },
  {
    categories: ["marketing"],
    description:
      "Questions and answers as native disclosures, with FAQPage JSON-LD built from the same data.",
    files: [
      {
        path: "blocks/faq.tsx",
        type: "registry:component",
      },
    ],
    name: "faq",
    title: "FAQ",
    type: "registry:block",
  },
  {
    categories: ["marketing"],
    description: "The closing section of a landing page: the primary action again, plus a command.",
    files: [
      {
        path: "blocks/cta-close.tsx",
        type: "registry:component",
      },
    ],
    name: "cta-close",
    title: "CTA Close",
    type: "registry:block",
  },
  {
    categories: ["marketing"],
    description: "Jump links for a long page that mark the section currently in view.",
    files: [
      {
        path: "blocks/section-toc.tsx",
        type: "registry:component",
      },
    ],
    name: "section-toc",
    title: "Section TOC",
    type: "registry:block",
  },
];
