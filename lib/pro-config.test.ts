import { describe, expect, it } from "vitest";

import { getProCheckoutConfig, getProPreviewConfig, getProRegistryConfig } from "./pro-config";

const validEnv = {
  BLODE_UI_PRO_LEMON_SQUEEZY_PRODUCT_ID: "456",
  BLODE_UI_PRO_LEMON_SQUEEZY_STORE_ID: "123",
  BLODE_UI_PRO_FOUNDER_VARIANT_ID: "7",
  BLODE_UI_PRO_LEMON_SQUEEZY_API_KEY: "test-api-key",
  BLODE_UI_PRO_TEST_MODE: "true",
  BLODE_UI_PRO_TEST_PRICE_LABEL: "$99",
  BLODE_UI_PRO_LEMON_SQUEEZY_WEBHOOK_SECRET: "test-webhook-secret",
  BLODE_UI_PRO_REDIS_REST_TOKEN: "test-redis-token",
  BLODE_UI_PRO_REDIS_REST_URL: "https://redis.example",
  BLODE_UI_PRO_RECONCILE_SECRET: "test-reconcile-secret",
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

    expect(config).toEqual({
      productId: 456,
      redis: { token: "test-redis-token", url: "https://redis.example" },
      storeId: 123,
      variantIds: new Set([7, 9]),
    });
  });

  it("enables only the internal test checkout when every server value exists", () => {
    expect(getProCheckoutConfig(validEnv)?.founderLimit).toBe(50);
    expect(getProPreviewConfig(validEnv)).toMatchObject({
      checkoutUrl: "/ui/api/pro/checkout",
      enabled: true,
      founderLimit: 50,
    });
    expect(
      getProPreviewConfig({ ...validEnv, BLODE_UI_PRO_LEMON_SQUEEZY_API_KEY: "" }),
    ).toMatchObject({ checkoutUrl: null, enabled: false });
  });

  it("keeps a disabled review page without inventing a price", () => {
    expect(getProPreviewConfig({})).toEqual({
      checkoutUrl: null,
      enabled: false,
      founderLimit: 50,
      priceLabel: "Price pending",
    });
  });

  it("rejects a founder variant outside the entitlement allowlist", () => {
    expect(
      getProCheckoutConfig({
        ...validEnv,
        BLODE_UI_PRO_LEMON_SQUEEZY_VARIANT_IDS: "9",
      }),
    ).toBeNull();
  });
});
