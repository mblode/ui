import { createHmac } from "node:crypto";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { POST as checkout } from "./checkout/route";
import { POST as reconcile } from "./reconcile/route";
import { POST as webhook } from "./webhook/route";

const WEBHOOK_URL = "https://blode.co/ui/api/pro/webhook";

interface StoreState {
  checkoutExpiries: number[];
  checkoutTokens: string[];
  orders: Set<string>;
  refunded: Set<string>;
  reservations: Set<string>;
}

function testIntegration({ checkoutFails = false }: { checkoutFails?: boolean } = {}) {
  const state: StoreState = {
    checkoutTokens: [],
    checkoutExpiries: [],
    orders: new Set(),
    refunded: new Set(),
    reservations: new Set(),
  };
  const fetch = vi.fn(async (input: string | URL | Request, init?: RequestInit) => {
    const url = String(input);
    if (url.startsWith("https://redis.example")) {
      const command = JSON.parse(String(init?.body)) as (number | string)[];
      const script = String(command[1]);
      if (script.includes("reserve-founder-seat")) {
        const limit = Number(command[5]);
        const token = String(command[6]);
        if (state.reservations.size + state.orders.size >= limit) {
          return Response.json({ result: -1 });
        }
        state.reservations.add(token);
        return Response.json({ result: limit - state.reservations.size - state.orders.size });
      }
      if (script.includes("confirm-founder-seat")) {
        const reservation = String(command[6]);
        const order = String(command[7]);
        if (state.refunded.has(order)) {
          return Response.json({ result: -2 });
        }
        if (state.orders.has(order)) {
          return Response.json({ result: 0 });
        }
        const held = state.reservations.delete(reservation);
        if (!held) {
          return Response.json({ result: -1 });
        }
        state.orders.add(order);
        return Response.json({ result: 1 });
      }
      if (script.includes("refund-founder-seat")) {
        const reservation = String(command[6]);
        const order = String(command[7]);
        state.refunded.add(order);
        state.reservations.delete(reservation);
        const released = state.orders.delete(order);
        return Response.json({ result: released ? 1 : 0 });
      }
      const token = String(command[4]);
      return Response.json({ result: state.reservations.delete(token) ? 1 : 0 });
    }

    if (url === "https://api.lemonsqueezy.com/v1/checkouts") {
      const body = JSON.parse(String(init?.body)) as {
        data: {
          attributes: {
            checkout_data: { custom: { founder_reservation_id: string } };
            expires_at: string;
          };
        };
      };
      const token = body.data.attributes.checkout_data.custom.founder_reservation_id;
      state.checkoutTokens.push(token);
      state.checkoutExpiries.push(Date.parse(body.data.attributes.expires_at));
      if (checkoutFails) {
        return Response.json({ error: "test outage" }, { status: 503 });
      }
      return Response.json({
        data: {
          attributes: {
            test_mode: true,
            url: `https://store.lemonsqueezy.com/checkout/custom/${token}`,
          },
        },
      });
    }
    throw new Error(`Unexpected request: ${url}`);
  });
  return { fetch, state };
}

function orderEvent(
  eventName: "order_created" | "order_refunded",
  reservationToken: string,
  orderId = "order-1",
) {
  return JSON.stringify({
    data: {
      attributes: {
        first_order_item: { product_id: 456, variant_id: 7 },
        status: eventName === "order_created" ? "paid" : "refunded",
        store_id: 123,
        test_mode: true,
      },
      id: orderId,
    },
    meta: {
      custom_data: { founder_reservation_id: reservationToken },
      event_name: eventName,
    },
  });
}

function signedWebhook(body: string) {
  const signature = createHmac("sha256", "webhook-secret").update(body).digest("hex");
  return new Request(WEBHOOK_URL, {
    body,
    headers: { "content-type": "application/json", "x-signature": signature },
    method: "POST",
  });
}

describe("Blode UI Pro founder checkout", () => {
  beforeEach(() => {
    Object.assign(process.env, {
      BLODE_UI_PRO_FOUNDER_VARIANT_ID: "7",
      BLODE_UI_PRO_LEMON_SQUEEZY_API_KEY: "api-key",
      BLODE_UI_PRO_LEMON_SQUEEZY_PRODUCT_ID: "456",
      BLODE_UI_PRO_LEMON_SQUEEZY_STORE_ID: "123",
      BLODE_UI_PRO_LEMON_SQUEEZY_VARIANT_IDS: "7",
      BLODE_UI_PRO_LEMON_SQUEEZY_WEBHOOK_SECRET: "webhook-secret",
      BLODE_UI_PRO_REDIS_REST_TOKEN: "redis-token",
      BLODE_UI_PRO_REDIS_REST_URL: "https://redis.example",
      BLODE_UI_PRO_RECONCILE_SECRET: "reconcile-secret",
      BLODE_UI_PRO_TEST_MODE: "true",
      BLODE_UI_PRO_TEST_PRICE_LABEL: "$149 test",
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
    for (const key of Object.keys(process.env).filter((key) => key.startsWith("BLODE_UI_PRO_"))) {
      Reflect.deleteProperty(process.env, key);
    }
  });

  it("fails closed before touching providers when test mode is disabled", async () => {
    process.env.BLODE_UI_PRO_TEST_MODE = "false";
    const fetch = vi.fn();
    vi.stubGlobal("fetch", fetch);
    const response = await checkout();
    expect(response.status).toBe(503);
    expect(response.headers.get("cache-control")).toContain("no-store");
    expect(fetch).not.toHaveBeenCalled();
  });

  it("atomically admits 50 concurrent reservations and rejects the next one", async () => {
    const integration = testIntegration();
    vi.stubGlobal("fetch", integration.fetch);
    const responses = await Promise.all(Array.from({ length: 51 }, () => checkout()));
    expect(responses.filter((response) => response.status === 303)).toHaveLength(50);
    expect(responses.filter((response) => response.status === 409)).toHaveLength(1);
    expect(integration.state.reservations.size).toBe(50);
    expect(integration.state.checkoutTokens).toHaveLength(50);
    expect(integration.state.checkoutExpiries[0] as number).toBeGreaterThan(Date.now());
    expect(responses[0]?.headers.get("cache-control")).toContain("no-store");
  });

  it("releases a reservation when Lemon Squeezy cannot create the test checkout", async () => {
    const integration = testIntegration({ checkoutFails: true });
    vi.stubGlobal("fetch", integration.fetch);
    const response = await checkout();
    expect(response.status).toBe(502);
    expect(integration.state.reservations.size).toBe(0);
    expect(response.headers.get("cache-control")).toContain("no-store");
  });

  it("retains a pending hold until an authenticated provider reconciliation releases it", async () => {
    const integration = testIntegration();
    vi.stubGlobal("fetch", integration.fetch);
    const checkoutResponse = await checkout();
    expect(checkoutResponse.status).toBe(303);
    const token = integration.state.checkoutTokens[0] as string;
    expect(integration.state.reservations.has(token)).toBe(true);

    const denied = await reconcile(
      new Request("https://blode.co/ui/api/pro/reconcile", {
        body: JSON.stringify({ providerConfirmedUnpaid: true, reservationToken: token }),
        headers: { authorization: "Bearer wrong-secret", "content-type": "application/json" },
        method: "POST",
      }),
    );
    expect(denied.status).toBe(401);
    expect(integration.state.reservations.has(token)).toBe(true);

    const released = await reconcile(
      new Request("https://blode.co/ui/api/pro/reconcile", {
        body: JSON.stringify({ providerConfirmedUnpaid: true, reservationToken: token }),
        headers: {
          authorization: "Bearer reconcile-secret",
          "content-type": "application/json",
        },
        method: "POST",
      }),
    );
    expect(released.status).toBe(200);
    expect(await released.json()).toEqual({ reconciled: true });
    expect(integration.state.reservations.has(token)).toBe(false);
    expect(released.headers.get("cache-control")).toContain("no-store");
  });

  it("accepts a delayed webhook without expiring or reallocating its hold", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-09-05T00:00:00Z"));
    const integration = testIntegration();
    vi.stubGlobal("fetch", integration.fetch);
    await checkout();
    const token = integration.state.checkoutTokens[0] as string;

    vi.setSystemTime(new Date("2026-10-05T00:00:00Z"));
    const created = await webhook(signedWebhook(orderEvent("order_created", token)));

    expect(created.status).toBe(200);
    expect(await created.json()).toEqual({ accepted: true, result: "accepted" });
    expect(integration.state.reservations.size).toBe(0);
    expect(integration.state.orders).toEqual(new Set(["order-1"]));
  });

  it("makes created/refunded webhooks replay-safe and keeps refund tombstones", async () => {
    const integration = testIntegration();
    vi.stubGlobal("fetch", integration.fetch);
    const checkoutResponse = await checkout();
    expect(checkoutResponse.status).toBe(303);
    const token = integration.state.checkoutTokens[0] as string;

    const createdBody = orderEvent("order_created", token);
    const created = await webhook(signedWebhook(createdBody));
    const replay = await webhook(signedWebhook(createdBody));
    expect(await created.json()).toEqual({ accepted: true, result: "accepted" });
    expect(await replay.json()).toEqual({ accepted: true, result: "replayed" });
    expect(integration.state.orders.size).toBe(1);

    const refundedBody = orderEvent("order_refunded", token);
    const refunded = await webhook(signedWebhook(refundedBody));
    const refundReplay = await webhook(signedWebhook(refundedBody));
    expect(await refunded.json()).toEqual({ accepted: true, released: true });
    expect(await refundReplay.json()).toEqual({ accepted: true, released: false });
    expect(integration.state.orders.size).toBe(0);

    const lateCreate = await webhook(signedWebhook(createdBody));
    expect(await lateCreate.json()).toEqual({ accepted: false, result: "refunded" });
    expect(integration.state.orders.size).toBe(0);
  });

  it("rejects a second order that reuses an already claimed reservation", async () => {
    const integration = testIntegration();
    vi.stubGlobal("fetch", integration.fetch);
    await checkout();
    const token = integration.state.checkoutTokens[0] as string;

    const first = await webhook(signedWebhook(orderEvent("order_created", token, "order-1")));
    const reused = await webhook(signedWebhook(orderEvent("order_created", token, "order-2")));

    expect(first.status).toBe(200);
    expect(reused.status).toBe(409);
    expect(integration.state.orders).toEqual(new Set(["order-1"]));
  });

  it("rejects unsigned events before changing inventory", async () => {
    const integration = testIntegration();
    vi.stubGlobal("fetch", integration.fetch);
    const response = await webhook(
      new Request(WEBHOOK_URL, { body: orderEvent("order_created", "missing"), method: "POST" }),
    );
    expect(response.status).toBe(401);
    expect(integration.state.orders.size).toBe(0);
    expect(integration.fetch).not.toHaveBeenCalled();
  });

  it("keeps a refund tombstone when refund arrives before order creation", async () => {
    const integration = testIntegration();
    vi.stubGlobal("fetch", integration.fetch);
    const refundBody = orderEvent("order_refunded", "reservation");
    const refund = await webhook(signedWebhook(refundBody));
    expect(await refund.json()).toEqual({ accepted: true, released: false });

    const createdBody = orderEvent("order_created", "reservation");
    const created = await webhook(signedWebhook(createdBody));
    expect(await created.json()).toEqual({ accepted: false, result: "refunded" });
    expect(integration.state.orders.size).toBe(0);
  });

  it("rejects a signed event for another product before changing inventory", async () => {
    const integration = testIntegration();
    vi.stubGlobal("fetch", integration.fetch);
    const body = orderEvent("order_created", "reservation").replace(
      '"product_id":456',
      '"product_id":999',
    );
    const response = await webhook(signedWebhook(body));
    expect(response.status).toBe(400);
    expect(integration.state.orders.size).toBe(0);
    expect(integration.fetch).not.toHaveBeenCalled();
  });
});
