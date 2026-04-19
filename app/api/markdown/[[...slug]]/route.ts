import { allDocs, allPages } from "content-collections";
import { siteConfig } from "@/config/site";

interface RouteParams {
  params: Promise<{
    slug?: string[];
  }>;
}

const HOME_MARKDOWN = `# ${siteConfig.name}

${siteConfig.description}

## Sections

- [Documentation](/docs)
- [Components](/docs/components)
- [Installation](/docs/installation)

## Machine-readable resources

- Registry manifest: [/r/index.json](/r/index.json)
- API catalog: [/.well-known/api-catalog](/.well-known/api-catalog)
- Agent skills: [/.well-known/agent-skills/index.json](/.well-known/agent-skills/index.json)
- Sitemap: [/sitemap.xml](/sitemap.xml)
`;

function buildMarkdown(title: string, description: string | undefined, body: string) {
  const heading = `# ${title}\n`;
  const subheading = description ? `\n> ${description}\n` : "";
  const trimmed = body.trimStart();
  return `${heading}${subheading}\n${trimmed}\n`;
}

function markdownResponse(markdown: string, status = 200) {
  return new Response(markdown, {
    headers: {
      "cache-control": "public, max-age=0, must-revalidate",
      "content-type": "text/markdown; charset=utf-8",
      vary: "Accept",
      "x-markdown-tokens": String(markdown.length),
    },
    status,
  });
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { slug = [] } = await params;
  const path = slug.join("/");

  if (path === "" || path === "index") {
    return markdownResponse(HOME_MARKDOWN);
  }

  if (path === "docs" || path.startsWith("docs/")) {
    const docSlug = path === "docs" ? "" : path.replace(/^docs\//, "");
    const doc = allDocs.find((entry) => entry.slugAsParams === docSlug && entry.published);
    if (doc) {
      return markdownResponse(buildMarkdown(doc.title, doc.description, doc.body.raw));
    }
  }

  const page = allPages.find((entry) => entry.slugAsParams === path);
  if (page) {
    return markdownResponse(buildMarkdown(page.title, page.description, page.body.raw));
  }

  return new Response(`No markdown available for /${path}\n`, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      vary: "Accept",
    },
    status: 404,
  });
}
