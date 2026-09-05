import { createHash, timingSafeEqual } from "node:crypto";

import { z } from "zod";

import { getProCheckoutConfig } from "@/lib/pro-config";
import { releaseFounderReservation } from "@/lib/pro-founder-seats";
import { PRO_PRIVATE_HEADERS, proErrorResponse } from "@/lib/pro-private-response";

const requestSchema = z.object({
  providerConfirmedUnpaid: z.literal(true),
  reservationToken: z.string().uuid(),
});

function digest(value: string): Buffer {
  return createHash("sha256").update(value).digest();
}

export async function POST(request: Request) {
  const config = getProCheckoutConfig();
  if (!config) {
    return proErrorResponse("The Blode UI Pro reconciliation route is unavailable.", 503);
  }

  const authorization = request.headers.get("authorization");
  const suppliedSecret = authorization?.startsWith("Bearer ") ? authorization.slice(7) : "";
  if (!timingSafeEqual(digest(suppliedSecret), digest(config.reconcileSecret))) {
    return proErrorResponse("Invalid reconciliation credentials.", 401);
  }

  let parsed;
  try {
    parsed = requestSchema.safeParse(await request.json());
  } catch {
    parsed = null;
  }
  if (!parsed?.success) {
    return proErrorResponse("Provider non-payment confirmation is required.", 400);
  }

  try {
    await releaseFounderReservation(config, parsed.data.reservationToken);
    return Response.json({ reconciled: true }, { headers: PRO_PRIVATE_HEADERS });
  } catch {
    return proErrorResponse("Founder seat inventory is temporarily unavailable.", 503);
  }
}
