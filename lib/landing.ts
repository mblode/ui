import { docsConfig } from "@/config/docs";
import { siteConfig, siteUrl } from "@/config/site";

/**
 * The landing page's copy, in one place. The page, its FAQPage JSON-LD, the
 * Markdown mirror (`app/api/markdown`) and `llms.txt` all read from here, so
 * what a crawler or an agent is told can never drift from what a reader sees.
 */

// Counted rather than written out, so every claim on the page matches the
// sidebar the reader is looking at.
export const componentCount =
  docsConfig.sidebarNav.find((group) => group.title === "Components")?.items?.length ?? 0;

export const hero = {
  description: `For React teams on Tailwind v4: install any of ${componentCount} Base UI components with the shadcn CLI, and the source lands in your repo, ready to edit.`,
  eyebrow: siteConfig.name,
  title: "React components you own",
} as const;

/** The page's one primary action, in the hero. */
export const primaryCta = {
  href: "/docs/installation",
  label: "Open the install guide",
} as const;

export const installCommands = [
  {
    command: "npx shadcn@latest init https://blode.co/ui/r/ui.json",
    label: "New project",
  },
];

/** What Blode UI refuses to be. */
export const pointOfView =
  "Blode UI is never a package you import. Each component is a file in your repo, so you change it the way you change the rest of your code.";

export const wall = {
  description:
    "Pick a theme and every preview repaints from the same CSS variables. Copy the install command from any card.",
  title: "Try every component here",
} as const;

export const features = [
  {
    description:
      "Keyboard navigation, focus management and ARIA come from Base UI primitives, so you can restyle a component without solving accessibility again.",
    title: "Behaviour from Base UI",
  },
  {
    description:
      "npx skills add mblode/ui gives Claude Code and other agents the @blode install commands and the design rules, so the UI they write matches yours.",
    title: "Your agent knows the rules",
  },
] as const;

export const faqs = [
  {
    answer: `Blode UI is an open-source shadcn registry of ${componentCount} React components built on Base UI and Tailwind CSS v4. You install each component with the shadcn CLI, and its source is copied into your project, where you read it and change it like any other file.`,
    question: "What is Blode UI?",
  },
  {
    answer:
      "Yes. Blode UI is MIT licensed, so you can use it in personal and commercial projects without paying or asking. The source is on GitHub at mblode/ui.",
    question: "Is Blode UI free?",
  },
  {
    answer:
      "Yes. Register the namespace with npx shadcn@latest registry add @blode=https://blode.co/ui/r/{name}.json, then add the design system with npx shadcn@latest add @blode/ui. Your existing components.json is left alone.",
    question: "Can I add it to an existing shadcn project?",
  },
  {
    answer:
      "It installs through the same shadcn CLI and the files will look familiar. The differences are deliberate: success and warning colours beside destructive, a linear radius scale, a global reduced-motion guarantee, no transition-all, and components shadcn does not ship, such as Currency Input and Timezone Picker.",
    question: "How is it different from shadcn/ui?",
  },
  {
    answer:
      "No. There is no package to upgrade, because every component is a file in your repo. When a component changes upstream, run its add command again and review the diff, or keep your version.",
    question: "Do I have to keep it updated?",
  },
];

export const sections = [
  { id: "components", label: "Components" },
  { id: "how-it-works", label: "How it works" },
  { id: "faq", label: "FAQ" },
];

/**
 * The page as Markdown, for `Accept: text/markdown` requests to the zone root.
 */
export const landingMarkdown = `# ${hero.eyebrow}: ${hero.title}

${hero.description}

${pointOfView}

[${primaryCta.label}](${siteUrl}${primaryCta.href})

## Install

${installCommands.map((item) => `${item.label}:\n\n\`\`\`bash\n${item.command}\n\`\`\``).join("\n\n")}

## ${wall.title}

${wall.description} Browse all ${componentCount} components at [${siteUrl}/docs/components](${siteUrl}/docs/components).

## How it works

${features.map((item) => `### ${item.title}\n\n${item.description}`).join("\n\n")}

## FAQ

${faqs.map((item) => `### ${item.question}\n\n${item.answer}`).join("\n\n")}

## Machine-readable resources

- Documentation index for agents: [${siteUrl}/llms.txt](${siteUrl}/llms.txt)
- Registry manifest: [${siteUrl}/r/index.json](${siteUrl}/r/index.json)
- API catalog: [${siteUrl}/.well-known/api-catalog](${siteUrl}/.well-known/api-catalog)
- Agent skills: [${siteUrl}/.well-known/agent-skills/index.json](${siteUrl}/.well-known/agent-skills/index.json)
- Design rules: [${siteUrl}/design.md](${siteUrl}/design.md)
- Sitemap: [${siteUrl}/sitemap.xml](${siteUrl}/sitemap.xml)
`;
