import { allDocs } from "content-collections";

import { docsConfig } from "@/config/docs";
import { siteConfig, siteUrl } from "@/config/site";
import { componentCount, hero, pointOfView } from "@/lib/landing";

// https://llmstxt.org: a Markdown index an agent can read in one request.
//
// Built from the sidebar, in the sidebar's order, so it lists exactly the docs
// a reader can navigate to, and every description is the doc's own frontmatter,
// so this file cannot drift from the pages it indexes. Served beside robots.txt
// and under the same `basePath`, since this zone lives at blode.co/ui. With
// Cache Components a GET handler that reads no request data is prerendered, so
// this is a static file after the build.

const docsBySlug = new Map(
  allDocs.filter((doc) => doc.published).map((doc) => [doc.slug, doc] as const),
);

function linkLine(href: string, fallbackTitle: string) {
  const doc = docsBySlug.get(href);
  const title = doc?.title ?? fallbackTitle;
  const description = doc?.description ? `: ${doc.description}` : "";
  return `- [${title}](${siteUrl}${href})${description}`;
}

function section(title: string, lines: string[]) {
  return lines.length > 0 ? `## ${title}\n\n${lines.join("\n")}\n` : "";
}

function buildLlmsTxt() {
  const groups = docsConfig.sidebarNav.map((group) => {
    const lines = (group.items ?? []).flatMap((item) => {
      if (!item.href?.startsWith("/docs")) {
        return [];
      }
      const children = (item.items ?? [])
        .filter((child) => child.href?.startsWith("/docs"))
        .map((child) => `  ${linkLine(child.href as string, child.title)}`);
      return [linkLine(item.href, item.title), ...children];
    });
    return section(group.title === "Sections" ? "Docs" : group.title, lines);
  });

  return `# ${siteConfig.name}

> ${hero.description}

${pointOfView} Blode UI is a shadcn registry of ${componentCount} components. Every page below also answers \`Accept: text/markdown\` with its Markdown source.

${groups.filter(Boolean).join("\n")}
## Optional

- [Design rules](${siteUrl}/design.md): the visual system as Markdown, for agents writing UI.
- [Registry index](${siteUrl}/r/index.json): every installable item, as the shadcn CLI reads it.
- [Registry manifest](${siteUrl}/registry.json): the full registry, including blocks and libraries.
- [Theme Visualiser](${siteUrl}/theme-visualizer): preview a colour theme and copy its CSS variables.
- [Source code](${siteConfig.links.github}): MIT licensed.
`;
}

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: {
      "cache-control": "public, max-age=3600",
      "content-type": "text/plain; charset=utf-8",
    },
  });
}
