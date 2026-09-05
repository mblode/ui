import { getProCheckoutConfig } from "@/lib/pro-config";
import { confirmFounderOrder, refundFounderOrder } from "@/lib/pro-founder-seats";
import { PRO_PRIVATE_HEADERS, proErrorResponse } from "@/lib/pro-private-response";
import { parseProOrderEvent, verifyLemonSqueezySignature } from "@/lib/lemon-squeezy-webhook";

export async function POST(request: Request) {
  const config = getProCheckoutConfig();
  if (!config) {
    return proErrorResponse("The Blode UI Pro test webhook is unavailable.", 503);
  }
  const body = await request.text();
  if (
    !verifyLemonSqueezySignature(body, request.headers.get("x-signature"), config.webhookSecret)
  ) {
    return proErrorResponse("Invalid webhook signature.", 401);
  }

  let event;
  try {
    event = parseProOrderEvent(body, config);
  } catch {
    event = null;
  }
  if (!event) {
    return proErrorResponse("Invalid test order event.", 400);
  }

  try {
    if (event.eventName === "order_refunded") {
      const released = await refundFounderOrder(config, event.reservationToken, event.orderId);
      return Response.json({ accepted: true, released }, { headers: PRO_PRIVATE_HEADERS });
    }

    const result = await confirmFounderOrder(config, event.reservationToken, event.orderId);
    if (result === "full") {
      return proErrorResponse("The founder seat limit was reached before this order arrived.", 409);
    }
    return Response.json(
      { accepted: result !== "refunded", result },
      { headers: PRO_PRIVATE_HEADERS },
    );
  } catch {
    return proErrorResponse("Founder seat inventory is temporarily unavailable.", 503);
  }
}
