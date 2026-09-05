import { describe, expect, it } from "vitest";

import { getProPreviewConfig, getProRegistryConfig } from "./pro-config";

const validEnv = {
  BLODE_UI_PRO_LEMON_SQUEEZY_PRODUCT_ID: "456",
  BLODE_UI_PRO_LEMON_SQUEEZY_STORE_ID: "123",
  BLODE_UI_PRO_TEST_CHECKOUT_URL: "https://example.lemonsqueezy.com/buy/test-checkout",
  BLODE_UI_PRO_TEST_MODE: "true",
  BLODE_UI_PRO_TEST_PRICE_LABEL: "$99",
};

describe("Blode UI Pro configuration", () => {
  it("stays disabled unless test mode and exact product IDs are configured", () => {
    expect(getProRegistryConfig({})).toBeNull();
    expect(getProRegistryConfig({ ...validEnv, BLODE_UI_PRO_TEST_MODE: "false" })).toBeNull();
    expect(
      getProRegistryConfig({ ...validEnv, BLODE_UI_PRO_LEMON_SQUEEZY_PRODUCT_ID: "" }),
    ).toBeNull();
  });

  it("accepts an optional allowlist of Lemon Squeezy variants", () => {
    const config = getProRegistryConfig({
      ...validEnv,
      BLODE_UI_PRO_LEMON_SQUEEZY_VARIANT_IDS: "7, 9",
    });

    expect(config).toEqual({ productId: 456, storeId: 123, variantIds: new Set([7, 9]) });
  });

  it("only exposes the preview with a Lemon Squeezy HTTPS checkout and price", () => {
    expect(getProPreviewConfig(validEnv)?.checkoutUrl).toBe(
      "https://example.lemonsqueezy.com/buy/test-checkout",
    );
    expect(
      getProPreviewConfig({ ...validEnv, BLODE_UI_PRO_TEST_CHECKOUT_URL: "https://example.com" }),
    ).toBeNull();
    expect(getProPreviewConfig({ ...validEnv, BLODE_UI_PRO_TEST_PRICE_LABEL: "" })).toBeNull();
  });
});
