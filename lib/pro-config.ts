const POSITIVE_INTEGER = /^[1-9]\d*$/u;
type ProEnvironment = Readonly<Record<string, string | undefined>>;

export interface ProRedisConfig {
  token: string;
  url: string;
}

export interface ProRegistryConfig {
  productId: number;
  redis: ProRedisConfig;
  storeId: number;
  variantIds: ReadonlySet<number>;
}

export interface ProCheckoutConfig extends ProRegistryConfig {
  apiKey: string;
  founderLimit: 50;
  founderVariantId: number;
  priceLabel: string;
  reconcileSecret: string;
  webhookSecret: string;
}

export interface ProPreviewConfig {
  checkoutUrl: string | null;
  enabled: boolean;
  founderLimit: 50;
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
  return values.some((id) => id === null) ? null : new Set(values as number[]);
}

function parseRedisConfig(env: ProEnvironment): ProRedisConfig | null {
  const rawUrl = env.BLODE_UI_PRO_REDIS_REST_URL?.trim();
  const token = env.BLODE_UI_PRO_REDIS_REST_TOKEN?.trim();
  if (!(rawUrl && token)) {
    return null;
  }
  try {
    const url = new URL(rawUrl);
    return url.protocol === "https:" ? { token, url: url.toString().replace(/\/$/u, "") } : null;
  } catch {
    return null;
  }
}

/** Premium routes exist only in an explicitly configured test environment. */
export function getProRegistryConfig(env: ProEnvironment = process.env): ProRegistryConfig | null {
  if (env.BLODE_UI_PRO_TEST_MODE !== "true") {
    return null;
  }
  const storeId = parsePositiveInteger(env.BLODE_UI_PRO_LEMON_SQUEEZY_STORE_ID);
  const productId = parsePositiveInteger(env.BLODE_UI_PRO_LEMON_SQUEEZY_PRODUCT_ID);
  const variantIds = parseVariantIds(env.BLODE_UI_PRO_LEMON_SQUEEZY_VARIANT_IDS);
  const redis = parseRedisConfig(env);
  return storeId && productId && variantIds && redis
    ? { productId, redis, storeId, variantIds }
    : null;
}

export function getProCheckoutConfig(env: ProEnvironment = process.env): ProCheckoutConfig | null {
  const registry = getProRegistryConfig(env);
  const apiKey = env.BLODE_UI_PRO_LEMON_SQUEEZY_API_KEY?.trim();
  const webhookSecret = env.BLODE_UI_PRO_LEMON_SQUEEZY_WEBHOOK_SECRET?.trim();
  const reconcileSecret = env.BLODE_UI_PRO_RECONCILE_SECRET?.trim();
  const priceLabel = env.BLODE_UI_PRO_TEST_PRICE_LABEL?.trim();
  const founderVariantId = parsePositiveInteger(env.BLODE_UI_PRO_FOUNDER_VARIANT_ID);
  if (!(registry && apiKey && webhookSecret && reconcileSecret && priceLabel && founderVariantId)) {
    return null;
  }
  if (registry.variantIds.size > 0 && !registry.variantIds.has(founderVariantId)) {
    return null;
  }
  return {
    ...registry,
    apiKey,
    founderLimit: 50,
    founderVariantId,
    priceLabel,
    reconcileSecret,
    webhookSecret,
  };
}

/** The no-index review page stays visible while its test checkout is disabled. */
export function getProPreviewConfig(env: ProEnvironment = process.env): ProPreviewConfig {
  const checkout = getProCheckoutConfig(env);
  return {
    checkoutUrl: checkout ? "/ui/api/pro/checkout" : null,
    enabled: Boolean(checkout),
    founderLimit: 50,
    priceLabel: env.BLODE_UI_PRO_TEST_PRICE_LABEL?.trim() || "Price pending",
  };
}
