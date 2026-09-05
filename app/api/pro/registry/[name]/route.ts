import { getProRegistryConfig } from "@/lib/pro-config";
import { getProRegistryItem } from "@/lib/pro-registry";
import { readBearerLicense, validateLemonSqueezyLicense } from "@/lib/lemon-squeezy-license";
import { PRO_PRIVATE_HEADERS, proErrorResponse } from "@/lib/pro-private-response";

const PRIVATE_HEADERS = { ...PRO_PRIVATE_HEADERS, vary: "Authorization" };

export async function GET(request: Request, context: { params: Promise<{ name: string }> }) {
  const config = getProRegistryConfig();
  if (!config) {
    return proErrorResponse("Blode UI Pro is unavailable.", 503, { vary: "Authorization" });
  }

  const licenseKey = readBearerLicense(request);
  if (!licenseKey) {
    return proErrorResponse("A Blode UI Pro licence key is required.", 401, {
      vary: "Authorization",
    });
  }

  const validation = await validateLemonSqueezyLicense(licenseKey, config);
  if (!validation.ok) {
    if (validation.reason === "rate_limited") {
      return proErrorResponse("Licence validation is busy. Try again in one minute.", 429, {
        "retry-after": "60",
        vary: "Authorization",
      });
    }
    return validation.reason === "unavailable"
      ? proErrorResponse("Licence validation is temporarily unavailable.", 502, {
          vary: "Authorization",
        })
      : proErrorResponse("The Blode UI Pro licence is not valid for this product.", 401, {
          vary: "Authorization",
        });
  }

  const { name } = await context.params;
  const item = await getProRegistryItem(name);
  if (!item) {
    return proErrorResponse("Premium registry item not found.", 404, { vary: "Authorization" });
  }

  return Response.json(item, { headers: PRIVATE_HEADERS });
}
