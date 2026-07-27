import { siteUrl } from "@/config/site";

const API_CATALOG = {
  linkset: [
    {
      anchor: `${siteUrl}/r`,
      "service-desc": [
        {
          href: `${siteUrl}/r/index.json`,
          type: "application/json",
        },
      ],
      "service-doc": [
        {
          href: `${siteUrl}/docs/installation`,
          type: "text/html",
        },
      ],
      "service-meta": [
        {
          href: `${siteUrl}/registry.json`,
          type: "application/json",
        },
      ],
    },
    {
      anchor: `${siteUrl}/.well-known/agent-skills`,
      describedby: [
        {
          href: `${siteUrl}/.well-known/agent-skills/index.json`,
          type: "application/json",
        },
      ],
    },
  ],
};

export function GET() {
  return new Response(JSON.stringify(API_CATALOG, null, 2) + "\n", {
    headers: {
      "cache-control": "public, max-age=3600",
      "content-type": "application/linkset+json; charset=utf-8",
    },
  });
}
