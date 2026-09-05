import { randomUUID } from "node:crypto";

import type { ProCheckoutConfig } from "@/lib/pro-config";
import { proRedisEval } from "@/lib/pro-redis";

const CHECKOUT_TTL_MS = 15 * 60 * 1000;
const RESERVE_SCRIPT = `
-- reserve-founder-seat
local limit = tonumber(ARGV[1])
local occupied = redis.call("SCARD", KEYS[1]) + redis.call("SCARD", KEYS[2])
if occupied >= limit then return -1 end
redis.call("SADD", KEYS[1], ARGV[2])
return limit - occupied - 1
`;

const CONFIRM_SCRIPT = `
-- confirm-founder-seat
local reservation = ARGV[1]
local order = ARGV[2]
if redis.call("SISMEMBER", KEYS[3], order) == 1 then return -2 end
if redis.call("SISMEMBER", KEYS[2], order) == 1 then return 0 end
local held = redis.call("SREM", KEYS[1], reservation)
if held == 0 then return -1 end
redis.call("SADD", KEYS[2], order)
return 1
`;

const REFUND_SCRIPT = `
-- refund-founder-seat
redis.call("SADD", KEYS[3], ARGV[2])
redis.call("SREM", KEYS[1], ARGV[1])
return redis.call("SREM", KEYS[2], ARGV[2])
`;

export interface FounderReservation {
  expiresAt: Date;
  remainingAfterReservation: number;
  token: string;
}

export type FounderConfirmation = "accepted" | "full" | "refunded" | "replayed";

function founderKeys(config: ProCheckoutConfig): readonly [string, string, string] {
  const scope = `blode-ui-pro:test:${config.storeId}:${config.productId}:${config.founderVariantId}`;
  return [`${scope}:reservations`, `${scope}:orders`, `${scope}:refunded`];
}

export async function reserveFounderSeat(
  config: ProCheckoutConfig,
  now = Date.now(),
): Promise<FounderReservation | null> {
  const token = randomUUID();
  const checkoutExpiresAtMs = now + CHECKOUT_TTL_MS;
  const remaining = await proRedisEval<number>(
    config.redis,
    RESERVE_SCRIPT,
    founderKeys(config).slice(0, 2),
    [config.founderLimit, token],
  );
  return remaining < 0
    ? null
    : { expiresAt: new Date(checkoutExpiresAtMs), remainingAfterReservation: remaining, token };
}

export async function releaseFounderReservation(
  config: ProCheckoutConfig,
  token: string,
): Promise<void> {
  await proRedisEval<number>(
    config.redis,
    '-- release-founder-seat\nreturn redis.call("SREM", KEYS[1], ARGV[1])',
    [founderKeys(config)[0]],
    [token],
  );
}

export async function confirmFounderOrder(
  config: ProCheckoutConfig,
  reservationToken: string,
  orderId: string,
): Promise<FounderConfirmation> {
  const result = await proRedisEval<number>(config.redis, CONFIRM_SCRIPT, founderKeys(config), [
    reservationToken,
    orderId,
  ]);
  if (result === 1) {
    return "accepted";
  }
  if (result === 0) {
    return "replayed";
  }
  if (result === -2) {
    return "refunded";
  }
  return "full";
}

export async function refundFounderOrder(
  config: ProCheckoutConfig,
  reservationToken: string,
  orderId: string,
): Promise<boolean> {
  const result = await proRedisEval<number>(config.redis, REFUND_SCRIPT, founderKeys(config), [
    reservationToken,
    orderId,
  ]);
  return result === 1;
}

export const founderSeatScripts = {
  confirm: CONFIRM_SCRIPT,
  refund: REFUND_SCRIPT,
  reserve: RESERVE_SCRIPT,
} as const;

export const founderSeatTiming = {
  checkoutTtlMs: CHECKOUT_TTL_MS,
} as const;
