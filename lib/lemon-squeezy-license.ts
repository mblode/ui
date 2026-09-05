import { z } from "zod";

import type { ProRegistryConfig } from "@/lib/pro-config";

const LICENSE_ENDPOINT = "https://api.lemonsqueezy.com/v1/licenses/validate";
const UPSTREAM_TIMEOUT_MS = 8000;

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
  | { ok: false; reason: "invalid" | "unavailable" };

export function readBearerLicense(request: Request): string | null {
  const authorization = request.headers.get("authorization");
  const match = authorization?.match(/^Bearer\s+(?<key>[^\s]+)$/iu);
  const key = match?.groups?.key;

  return key && key.length <= 256 ? key : null;
}

/** Validate the key and its exact Lemon Squeezy product on the server. */
export async function validateLemonSqueezyLicense(
  licenseKey: string,
  config: ProRegistryConfig,
): Promise<LicenseValidationResult> {
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

  return valid && acceptedStatus && acceptedVariant && correctProduct
    ? { ok: true }
    : { ok: false, reason: "invalid" };
}
