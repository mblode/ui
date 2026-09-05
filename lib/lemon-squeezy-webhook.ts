import { createHmac, timingSafeEqual } from "node:crypto";

import { z } from "zod";

import type { ProCheckoutConfig } from "@/lib/pro-config";

const orderSchema = z.object({
  data: z.object({
    attributes: z.object({
      first_order_item: z.object({
        product_id: z.number().int(),
        variant_id: z.number().int(),
      }),
      status: z.string(),
      store_id: z.number().int(),
      test_mode: z.literal(true),
    }),
    id: z.string().min(1).max(128),
  }),
  meta: z.object({
    custom_data: z.record(z.string(), z.unknown()).optional(),
    event_name: z.enum(["order_created", "order_refunded"]),
  }),
});

export interface ProOrderEvent {
  eventName: "order_created" | "order_refunded";
  orderId: string;
  reservationToken: string;
}

export function verifyLemonSqueezySignature(
  body: string,
  signature: string | null,
  secret: string,
): boolean {
  if (!signature || !/^[a-f\d]{64}$/iu.test(signature)) {
    return false;
  }
  const expected = createHmac("sha256", secret).update(body).digest();
  const received = Buffer.from(signature, "hex");
  return received.length === expected.length && timingSafeEqual(received, expected);
}

export function parseProOrderEvent(body: string, config: ProCheckoutConfig): ProOrderEvent | null {
  const parsed = orderSchema.safeParse(JSON.parse(body) as unknown);
  if (!parsed.success) {
    return null;
  }
  const { attributes, id } = parsed.data.data;
  const { event_name: eventName, custom_data: customData } = parsed.data.meta;
  const reservationToken = customData?.founder_reservation_id;
  const correctOrder =
    attributes.store_id === config.storeId &&
    attributes.first_order_item.product_id === config.productId &&
    attributes.first_order_item.variant_id === config.founderVariantId;
  const correctStatus =
    eventName === "order_created" ? attributes.status === "paid" : attributes.status === "refunded";
  return correctOrder && correctStatus && typeof reservationToken === "string"
    ? { eventName, orderId: id, reservationToken }
    : null;
}
