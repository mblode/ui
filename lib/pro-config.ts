const POSITIVE_INTEGER = /^[1-9]\d*$/u;
type ProEnvironment = Readonly<Record<string, string | undefined>>;

export interface ProRegistryConfig {
  productId: number;
  storeId: number;
  variantIds: ReadonlySet<number>;
}

export interface ProPreviewConfig extends ProRegistryConfig {
  checkoutUrl: string;
  priceLabel: string;
}

function parsePositiveInteger(value: string | undefined): number | null {
  if (!value || !POSITIVE_INTEGER.test(value)) {
    return null;
  }

  const parsed = Number(value);
  return Number.isSafeInteger(parsed) ? parsed : null;
}

function parseVariantIds(value: string | undefined): ReadonlySet<number> | null {
  if (!value) {
    return new Set();
  }

  const values = value.split(",").map((part) => parsePositiveInteger(part.trim()));
  if (values.some((id) => id === null)) {
    return null;
  }

  return new Set(values as number[]);
}

/**
 * Blode UI Pro has no live-mode branch yet. Every required value must be
 * present and the explicit test-mode switch must be on, otherwise premium
 * content stays unavailable.
 */
export function getProRegistryConfig(env: ProEnvironment = process.env): ProRegistryConfig | null {
  if (env.BLODE_UI_PRO_TEST_MODE !== "true") {
    return null;
  }

  const storeId = parsePositiveInteger(env.BLODE_UI_PRO_LEMON_SQUEEZY_STORE_ID);
  const productId = parsePositiveInteger(env.BLODE_UI_PRO_LEMON_SQUEEZY_PRODUCT_ID);
  const variantIds = parseVariantIds(env.BLODE_UI_PRO_LEMON_SQUEEZY_VARIANT_IDS);

  if (!(storeId && productId && variantIds)) {
    return null;
  }

  return { productId, storeId, variantIds };
}

export function getProPreviewConfig(env: ProEnvironment = process.env): ProPreviewConfig | null {
  const registry = getProRegistryConfig(env);
  const checkoutUrl = env.BLODE_UI_PRO_TEST_CHECKOUT_URL;
  const priceLabel = env.BLODE_UI_PRO_TEST_PRICE_LABEL?.trim();

  if (!(registry && checkoutUrl && priceLabel)) {
    return null;
  }

  let parsedCheckout: URL;
  try {
    parsedCheckout = new URL(checkoutUrl);
  } catch {
    return null;
  }

  if (
    parsedCheckout.protocol !== "https:" ||
    !parsedCheckout.hostname.endsWith(".lemonsqueezy.com")
  ) {
    return null;
  }

  return { ...registry, checkoutUrl: parsedCheckout.toString(), priceLabel };
}
