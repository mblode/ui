import { afterEach, describe, expect, it, vi } from "vitest";

import { fetchGoogleFonts, GoogleFontsError } from "./google-fonts";

const PROXY = "https://blode.co/ui/api/google-fonts";

/**
 * Exactly what `app/api/google-fonts/route.ts` emits: `{ items }` carrying only
 * the four fields. If the route ever widens or narrows that shape, this is the
 * test that fails.
 */
const trimmedPayload = {
  items: [
    { category: "sans-serif", family: "Inter", subsets: ["latin"], variants: ["regular"] },
    { category: "serif", family: "Lora", subsets: ["latin"], variants: ["regular", "700"] },
    { category: "monospace", family: "Fira Code", subsets: ["latin"], variants: ["regular"] },
  ],
};

const respondWith = (payload: unknown) => vi.fn().mockResolvedValue(Response.json(payload));

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("fetchGoogleFonts", () => {
  it("narrows the trimmed proxy payload without needing the dropped fields", async () => {
    vi.stubGlobal("fetch", respondWith(trimmedPayload));

    const fonts = await fetchGoogleFonts({ endpoint: PROXY });

    expect(fonts).toEqual(trimmedPayload.items);
  });

  it("sends no key to a proxy and forwards the sort", async () => {
    const fetchSpy = respondWith(trimmedPayload);
    vi.stubGlobal("fetch", fetchSpy);

    await fetchGoogleFonts({ endpoint: PROXY, sort: "alpha" });

    const requested = new URL(String(fetchSpy.mock.calls[0]?.[0]));
    expect(requested.searchParams.get("sort")).toBe("alpha");
    expect(requested.searchParams.has("key")).toBe(false);
  });

  it("keeps only families covering every requested subset and variant", async () => {
    vi.stubGlobal("fetch", respondWith(trimmedPayload));

    const fonts = await fetchGoogleFonts({
      endpoint: PROXY,
      variants: ["700"],
    });

    expect(fonts.map((font) => font.family)).toEqual(["Lora"]);
  });

  it("drops rows whose category is not one of the five Google groups", async () => {
    vi.stubGlobal(
      "fetch",
      respondWith({
        items: [
          { category: "icons", family: "Material Icons", subsets: [], variants: [] },
          ...trimmedPayload.items,
        ],
      }),
    );

    const fonts = await fetchGoogleFonts({ endpoint: PROXY });

    expect(fonts.map((font) => font.family)).not.toContain("Material Icons");
  });

  it("reports a rate limit as its own code so the UI can say to wait", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("", { status: 429 })));

    await expect(fetchGoogleFonts({ endpoint: PROXY })).rejects.toMatchObject({
      code: "rate-limited",
    });
  });

  it("refuses to run with neither a key nor an endpoint", async () => {
    const fetchSpy = respondWith(trimmedPayload);
    vi.stubGlobal("fetch", fetchSpy);

    await expect(fetchGoogleFonts({})).rejects.toBeInstanceOf(GoogleFontsError);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("says so when a relative endpoint cannot be resolved off the browser", async () => {
    // `document` is absent here, which is exactly the server case: `new URL`
    // would throw a bare TypeError that callers cannot branch on.
    await expect(fetchGoogleFonts({ endpoint: "/api/google-fonts" })).rejects.toBeInstanceOf(
      GoogleFontsError,
    );
  });
});
