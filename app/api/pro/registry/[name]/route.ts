import { getProRegistryConfig } from "@/lib/pro-config";
import { getProRegistryItem } from "@/lib/pro-registry";
import { readBearerLicense, validateLemonSqueezyLicense } from "@/lib/lemon-squeezy-license";

const PRIVATE_HEADERS = {
  "cache-control": "private, no-store",
  "cdn-cache-control": "no-store",
  vary: "Authorization",
  "vercel-cdn-cache-control": "no-store",
};

function errorResponse(error: string, status: number) {
  return Response.json({ error }, { headers: PRIVATE_HEADERS, status });
}

export async function GET(request: Request, context: { params: Promise<{ name: string }> }) {
  const config = getProRegistryConfig();
  if (!config) {
    return errorResponse("Blode UI Pro is unavailable.", 503);
  }

  const licenseKey = readBearerLicense(request);
  if (!licenseKey) {
    return errorResponse("A Blode UI Pro licence key is required.", 401);
  }

  const validation = await validateLemonSqueezyLicense(licenseKey, config);
  if (!validation.ok) {
    return validation.reason === "unavailable"
      ? errorResponse("Licence validation is temporarily unavailable.", 502)
      : errorResponse("The Blode UI Pro licence is not valid for this product.", 401);
  }

  const { name } = await context.params;
  const item = await getProRegistryItem(name);
  if (!item) {
    return errorResponse("Premium registry item not found.", 404);
  }

  return Response.json(item, { headers: PRIVATE_HEADERS });
}
