import { allDocs, allPages } from "content-collections";
import { siteConfig, siteUrl } from "@/config/site";

interface RouteParams {
  params: Promise<{
    slug?: string[];
  }>;
}

const HOME_MARKDOWN = `# ${siteConfig.name}

${siteConfig.description}

## Sections

- [Documentation](${siteUrl}/docs)
- [Components](${siteUrl}/docs/components)
- [Installation](${siteUrl}/docs/installation)

## Machine-readable resources

- Registry manifest: [${siteUrl}/r/index.json](${siteUrl}/r/index.json)
- API catalog: [${siteUrl}/.well-known/api-catalog](${siteUrl}/.well-known/api-catalog)
- Agent skills: [${siteUrl}/.well-known/agent-skills/index.json](${siteUrl}/.well-known/agent-skills/index.json)
- Sitemap: [${siteUrl}/sitemap.xml](${siteUrl}/sitemap.xml)
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
    const docSlug = path === "docs" ? "" : path.replace(/^docs\//u, "");
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
