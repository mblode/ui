const ORIGIN = "https://ui.blode.co";

const API_CATALOG = {
  linkset: [
    {
      anchor: `${ORIGIN}/r`,
      "service-desc": [
        {
          href: `${ORIGIN}/r/index.json`,
          type: "application/json",
        },
      ],
      "service-doc": [
        {
          href: `${ORIGIN}/docs/installation`,
          type: "text/html",
        },
      ],
      "service-meta": [
        {
          href: `${ORIGIN}/registry.json`,
          type: "application/json",
        },
      ],
    },
    {
      anchor: `${ORIGIN}/.well-known/agent-skills`,
      describedby: [
        {
          href: `${ORIGIN}/.well-known/agent-skills/index.json`,
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
