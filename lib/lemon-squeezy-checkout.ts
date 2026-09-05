import { z } from "zod";

import type { ProCheckoutConfig } from "@/lib/pro-config";
import type { FounderReservation } from "@/lib/pro-founder-seats";

const CHECKOUT_ENDPOINT = "https://api.lemonsqueezy.com/v1/checkouts";

const checkoutResponseSchema = z.object({
  data: z.object({
    attributes: z.object({
      test_mode: z.literal(true),
      url: z.url(),
    }),
  }),
});

export async function createLemonSqueezyTestCheckout(
  config: ProCheckoutConfig,
  reservation: FounderReservation,
): Promise<string | null> {
  const response = await fetch(CHECKOUT_ENDPOINT, {
    body: JSON.stringify({
      data: {
        attributes: {
          checkout_data: { custom: { founder_reservation_id: reservation.token } },
          expires_at: reservation.expiresAt.toISOString(),
          product_options: { enabled_variants: [config.founderVariantId] },
          test_mode: true,
        },
        relationships: {
          store: { data: { id: String(config.storeId), type: "stores" } },
          variant: { data: { id: String(config.founderVariantId), type: "variants" } },
        },
        type: "checkouts",
      },
    }),
    cache: "no-store",
    headers: {
      accept: "application/vnd.api+json",
      authorization: `Bearer ${config.apiKey}`,
      "content-type": "application/vnd.api+json",
    },
    method: "POST",
    signal: AbortSignal.timeout(8000),
  }).catch(() => null);
  if (!response?.ok) {
    return null;
  }
  const parsed = checkoutResponseSchema.safeParse(await response.json().catch(() => null));
  if (!parsed.success) {
    return null;
  }
  const checkoutUrl = new URL(parsed.data.data.attributes.url);
  return checkoutUrl.protocol === "https:" && checkoutUrl.hostname.endsWith(".lemonsqueezy.com")
    ? checkoutUrl.toString()
    : null;
}
