import type { ProRedisConfig } from "@/lib/pro-config";

interface RedisResponse<T> {
  error?: string;
  result?: T;
}

export async function proRedisCommand<T>(
  config: ProRedisConfig,
  command: readonly (number | string)[],
): Promise<T> {
  const response = await fetch(config.url, {
    body: JSON.stringify(command),
    cache: "no-store",
    headers: {
      authorization: `Bearer ${config.token}`,
      "content-type": "application/json",
    },
    method: "POST",
    signal: AbortSignal.timeout(5000),
  });
  if (!response.ok) {
    throw new Error(`Pro Redis returned ${response.status}`);
  }
  const payload = (await response.json()) as RedisResponse<T>;
  if (payload.error || payload.result === undefined) {
    throw new Error(payload.error || "Pro Redis returned no result");
  }
  return payload.result;
}

export async function proRedisEval<T>(
  config: ProRedisConfig,
  script: string,
  keys: readonly string[],
  args: readonly (number | string)[],
): Promise<T> {
  return proRedisCommand<T>(config, ["EVAL", script, keys.length, ...keys, ...args]);
}
