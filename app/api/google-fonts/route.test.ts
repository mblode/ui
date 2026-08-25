import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { GET } from "./route";

const ROUTE = "https://blode.co/ui/api/google-fonts";

/** One upstream row, with the bulk fields this route is meant to drop. */
const upstreamRow = {
  category: "serif",
  family: "Lora",
  files: { "400": "https://fonts.gstatic.com/s/lora/v35/regular.woff2" },
  kind: "webfonts#webfont",
  lastModified: "2026-08-01",
  menu: "https://fonts.gstatic.com/s/lora/v35/menu.woff2",
  subsets: ["latin"],
  variants: ["regular"],
  version: "v35",
};

const okUpstream = () => vi.fn().mockResolvedValue(Response.json({ items: [upstreamRow] }));

describe("GET /api/google-fonts", () => {
  beforeEach(() => {
    process.env.GOOGLE_FONTS_API_KEY = "test-key";
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    // Assigning `undefined` would store the string "undefined", which is truthy.
    delete process.env.GOOGLE_FONTS_API_KEY;
  });

  it("rejects an unknown query parameter before calling Google", async () => {
    // The guard exists to stop cache-busting: CDNs key on the full query
    // string, so an ignored parameter would be a distinct entry and another
    // full upstream fetch. Asserting fetch was never reached is the point.
    const fetchSpy = okUpstream();
    vi.stubGlobal("fetch", fetchSpy);

    const response = await GET(new Request(`${ROUTE}?x=1`));

    expect(response.status).toBe(400);
    expect(fetchSpy).not.toHaveBeenCalled();
    expect(response.headers.get("cache-control")).toBe("no-store");
  });

  it("rejects a sort outside the four the API accepts", async () => {
    const fetchSpy = okUpstream();
    vi.stubGlobal("fetch", fetchSpy);

    const response = await GET(new Request(`${ROUTE}?sort=../evil`));

    expect(response.status).toBe(400);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("forwards an accepted sort and drops the fields the picker never reads", async () => {
    const fetchSpy = okUpstream();
    vi.stubGlobal("fetch", fetchSpy);

    const response = await GET(new Request(`${ROUTE}?sort=alpha`));
    const body = (await response.json()) as { items: Record<string, unknown>[] };

    const requested = new URL(String(fetchSpy.mock.calls[0]?.[0]));
    expect(requested.searchParams.get("sort")).toBe("alpha");
    expect(requested.searchParams.get("key")).toBe("test-key");

    expect(response.status).toBe(200);
    expect(Object.keys(body.items[0] ?? {}).toSorted()).toEqual([
      "category",
      "family",
      "subsets",
      "variants",
    ]);
  });

  it.each([
    ["unset", undefined],
    // .env.example ships `GOOGLE_FONTS_API_KEY=` with no value, so an empty
    // string has to mean the same thing as an absent one.
    ["empty", ""],
  ])("answers 503 without caching when the key is %s", async (_label, key) => {
    if (key === undefined) {
      delete process.env.GOOGLE_FONTS_API_KEY;
    } else {
      process.env.GOOGLE_FONTS_API_KEY = key;
    }
    const fetchSpy = okUpstream();
    vi.stubGlobal("fetch", fetchSpy);

    const response = await GET(new Request(ROUTE));

    expect(response.status).toBe(503);
    expect(fetchSpy).not.toHaveBeenCalled();
    expect(response.headers.get("cache-control")).toBe("no-store");
  });

  it("passes a 429 through so the picker can show its rate-limit copy", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("", { status: 429 })));

    const response = await GET(new Request(ROUTE));

    expect(response.status).toBe(429);
  });
});
