import { createLemonSqueezyTestCheckout } from "@/lib/lemon-squeezy-checkout";
import { getProCheckoutConfig } from "@/lib/pro-config";
import { releaseFounderReservation, reserveFounderSeat } from "@/lib/pro-founder-seats";
import { PRO_PRIVATE_HEADERS, proErrorResponse } from "@/lib/pro-private-response";

export async function POST() {
  const config = getProCheckoutConfig();
  if (!config) {
    return proErrorResponse("The Blode UI Pro test checkout is unavailable.", 503);
  }

  let reservation;
  try {
    reservation = await reserveFounderSeat(config);
  } catch {
    return proErrorResponse("Founder seat inventory is temporarily unavailable.", 503);
  }
  if (!reservation) {
    return proErrorResponse("All 50 test founder seats are reserved or claimed.", 409);
  }

  const checkoutUrl = await createLemonSqueezyTestCheckout(config, reservation);
  if (!checkoutUrl) {
    await releaseFounderReservation(config, reservation.token).catch(() => undefined);
    return proErrorResponse("The Lemon Squeezy test checkout is temporarily unavailable.", 502);
  }

  return new Response(null, {
    headers: { ...PRO_PRIVATE_HEADERS, location: checkoutUrl },
    status: 303,
  });
}
