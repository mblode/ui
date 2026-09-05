import { createHash } from "node:crypto";

import { z } from "zod";

import type { ProRegistryConfig } from "@/lib/pro-config";
import { proRedisCommand, proRedisEval } from "@/lib/pro-redis";

const LICENSE_ENDPOINT = "https://api.lemonsqueezy.com/v1/licenses/validate";
const UPSTREAM_TIMEOUT_MS = 8000;
const VALID_CACHE_SECONDS = 60;
const INVALID_CACHE_SECONDS = 30;
const VALIDATION_LIMIT_PER_MINUTE = 50;

const RATE_LIMIT_SCRIPT = `
local count = redis.call("INCR", KEYS[1])
if count == 1 then redis.call("EXPIRE", KEYS[1], 60) end
return count
`;

const responseSchema = z.object({
  license_key: z.object({
    status: z.enum(["inactive", "active", "expired", "disabled"]),
  }),
  meta: z.object({
    product_id: z.number().int(),
    store_id: z.number().int(),
    variant_id: z.number().int(),
  }),
  valid: z.boolean(),
});

export type LicenseValidationResult =
  | { ok: true }
  | { ok: false; reason: "invalid" | "rate_limited" | "unavailable" };

export function readBearerLicense(request: Request): string | null {
  const authorization = request.headers.get("authorization");
  const match = authorization?.match(/^Bearer\s+(?<key>[^\s]+)$/iu);
  const key = match?.groups?.key;
  return key && key.length <= 256 ? key : null;
}

function licenseScope(config: ProRegistryConfig, licenseKey: string): string {
  const digest = createHash("sha256").update(licenseKey).digest("hex");
  const variants =
    [...config.variantIds].toSorted((left, right) => left - right).join(",") || "all";
  return `blode-ui-pro:test:${config.storeId}:${config.productId}:${variants}:licence:${digest}`;
}

async function readCachedValidation(
  licenseKey: string,
  config: ProRegistryConfig,
): Promise<LicenseValidationResult | null> {
  const cached = await proRedisCommand<string | null>(config.redis, [
    "GET",
    licenseScope(config, licenseKey),
  ]);
  if (cached === "valid") {
    return { ok: true };
  }
  if (cached === "invalid") {
    return { ok: false, reason: "invalid" };
  }
  return null;
}

async function cacheValidation(
  licenseKey: string,
  config: ProRegistryConfig,
  valid: boolean,
): Promise<void> {
  await proRedisCommand(config.redis, [
    "SETEX",
    licenseScope(config, licenseKey),
    valid ? VALID_CACHE_SECONDS : INVALID_CACHE_SECONDS,
    valid ? "valid" : "invalid",
  ]);
}

async function takeValidationSlot(config: ProRegistryConfig, now = Date.now()): Promise<boolean> {
  const minute = Math.floor(now / 60_000);
  const key = `blode-ui-pro:test:${config.storeId}:${config.productId}:validate:${minute}`;
  const count = await proRedisEval<number>(config.redis, RATE_LIMIT_SCRIPT, [key], []);
  return count <= VALIDATION_LIMIT_PER_MINUTE;
}

/** Validate and cache the exact Lemon Squeezy entitlement without storing its raw key. */
export async function validateLemonSqueezyLicense(
  licenseKey: string,
  config: ProRegistryConfig,
): Promise<LicenseValidationResult> {
  try {
    const cached = await readCachedValidation(licenseKey, config);
    if (cached) {
      return cached;
    }
    if (!(await takeValidationSlot(config))) {
      return { ok: false, reason: "rate_limited" };
    }
  } catch {
    return { ok: false, reason: "unavailable" };
  }

  let response: Response;
  try {
    response = await fetch(LICENSE_ENDPOINT, {
      body: new URLSearchParams({ license_key: licenseKey }),
      cache: "no-store",
      headers: {
        accept: "application/json",
        "content-type": "application/x-www-form-urlencoded",
      },
      method: "POST",
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    });
  } catch {
    return { ok: false, reason: "unavailable" };
  }
  if (response.status === 429) {
    return { ok: false, reason: "rate_limited" };
  }
  if (!response.ok) {
    return { ok: false, reason: response.status >= 500 ? "unavailable" : "invalid" };
  }

  const parsed = responseSchema.safeParse(await response.json().catch(() => null));
  if (!parsed.success) {
    return { ok: false, reason: "unavailable" };
  }
  const { license_key: license, meta, valid } = parsed.data;
  const acceptedStatus = license.status === "active" || license.status === "inactive";
  const acceptedVariant = config.variantIds.size === 0 || config.variantIds.has(meta.variant_id);
  const correctProduct = meta.store_id === config.storeId && meta.product_id === config.productId;
  const accepted = valid && acceptedStatus && acceptedVariant && correctProduct;
  try {
    await cacheValidation(licenseKey, config, accepted);
  } catch {
    return { ok: false, reason: "unavailable" };
  }
  return accepted ? { ok: true } : { ok: false, reason: "invalid" };
}

export const licenseValidationPolicy = {
  invalidCacheSeconds: INVALID_CACHE_SECONDS,
  limitPerMinute: VALIDATION_LIMIT_PER_MINUTE,
  validCacheSeconds: VALID_CACHE_SECONDS,
} as const;
