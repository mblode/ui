import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { GET } from "./route";

const ROUTE = "https://blode.co/ui/api/pro/registry/pricing-section";
const context = { params: Promise.resolve({ name: "pricing-section" }) };

function licenceResponse(overrides: Record<string, unknown> = {}) {
  return Response.json({
    license_key: { status: "active" },
    meta: { product_id: 456, store_id: 123, variant_id: 7 },
    valid: true,
    ...overrides,
  });
}

describe("GET /api/pro/registry/[name]", () => {
  beforeEach(() => {
    process.env.BLODE_UI_PRO_LEMON_SQUEEZY_PRODUCT_ID = "456";
    process.env.BLODE_UI_PRO_LEMON_SQUEEZY_STORE_ID = "123";
    process.env.BLODE_UI_PRO_TEST_MODE = "true";
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    delete process.env.BLODE_UI_PRO_LEMON_SQUEEZY_PRODUCT_ID;
    delete process.env.BLODE_UI_PRO_LEMON_SQUEEZY_STORE_ID;
    delete process.env.BLODE_UI_PRO_LEMON_SQUEEZY_VARIANT_IDS;
    delete process.env.BLODE_UI_PRO_TEST_MODE;
  });

  it("fails closed when the test integration is disabled", async () => {
    delete process.env.BLODE_UI_PRO_TEST_MODE;
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);

    const response = await GET(new Request(ROUTE), context);

    expect(response.status).toBe(503);
    expect(fetchSpy).not.toHaveBeenCalled();
    expect(response.headers.get("cache-control")).toBe("private, no-store");
    expect(response.headers.get("cdn-cache-control")).toBe("no-store");
    expect(response.headers.get("vercel-cdn-cache-control")).toBe("no-store");
  });

  it("requires a bearer licence before contacting Lemon Squeezy", async () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);

    const response = await GET(new Request(ROUTE), context);

    expect(response.status).toBe(401);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("serves transformed source for a key belonging to the configured product", async () => {
    const fetchSpy = vi.fn().mockResolvedValue(licenceResponse());
    vi.stubGlobal("fetch", fetchSpy);

    const response = await GET(
      new Request(ROUTE, { headers: { authorization: "Bearer test-licence" } }),
      context,
    );
    const body = (await response.json()) as {
      files: { content: string; target: string }[];
      name: string;
      registryDependencies: string[];
    };

    expect(response.status).toBe(200);
    expect(response.headers.get("cache-control")).toBe("private, no-store");
    expect(response.headers.get("cdn-cache-control")).toBe("no-store");
    expect(response.headers.get("vercel-cdn-cache-control")).toBe("no-store");
    expect(response.headers.get("vary")).toBe("Authorization");
    expect(body.name).toBe("pricing-section");
    expect(body.files[0]?.target).toBe("components/blocks/pricing-section.tsx");
    expect(body.files[0]?.content).toContain('from "@/components/ui/button"');
    expect(body.registryDependencies).toEqual(["@blode/badge", "@blode/button", "@blode/card"]);

    const request = fetchSpy.mock.calls[0]?.[1] as RequestInit;
    expect(request.method).toBe("POST");
    expect(String(request.body)).toBe("license_key=test-licence");
  });

  it("rejects a valid Lemon Squeezy key for another product", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        licenceResponse({
          meta: { product_id: 999, store_id: 123, variant_id: 7 },
        }),
      ),
    );

    const response = await GET(
      new Request(ROUTE, { headers: { authorization: "Bearer another-product" } }),
      context,
    );

    expect(response.status).toBe(401);
  });

  it("rejects a variant outside the configured allowlist", async () => {
    process.env.BLODE_UI_PRO_LEMON_SQUEEZY_VARIANT_IDS = "8";
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(licenceResponse()));

    const response = await GET(
      new Request(ROUTE, { headers: { authorization: "Bearer wrong-variant" } }),
      context,
    );

    expect(response.status).toBe(401);
  });

  it("turns malformed upstream data into a non-cacheable gateway error", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(Response.json({ valid: true })));

    const response = await GET(
      new Request(ROUTE, { headers: { authorization: "Bearer malformed" } }),
      context,
    );

    expect(response.status).toBe(502);
    expect(response.headers.get("cache-control")).toContain("no-store");
  });
});
