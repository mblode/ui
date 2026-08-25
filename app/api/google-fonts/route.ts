const WEBFONTS_ENDPOINT = "https://www.googleapis.com/webfonts/v1/webfonts";

/**
 * The slice of an upstream row this route forwards. Everything else Google
 * sends — `files`, `menu`, `axes`, `version`, `lastModified`, `kind` — is
 * dropped. Kept structurally identical to `RawGoogleFont` in
 * `registry/default/lib/google-fonts.ts`, which is what makes the trim
 * invisible to the client.
 */
interface UpstreamFont {
  category?: string;
  family?: string;
  subsets?: string[];
  variants?: string[];
}

/**
 * The orders the Google Fonts Developer API accepts. `sort` arrives from the
 * query string, so it is validated here rather than forwarded — this is the
 * trust boundary between a visitor's URL and an outbound request.
 */
const SORTS = new Set(["alpha", "popularity", "style", "trending"]);

const DEFAULT_SORT = "popularity";

/** How long to wait on Google before giving up and letting the picker retry. */
const UPSTREAM_TIMEOUT_MS = 10_000;

/**
 * `cache-control` keeps browsers revalidating; `cdn-cache-control` is the one
 * that matters, and it is why this is roughly one upstream call rather than one
 * per visitor. The catalogue changes weekly at most, so the edge holds it for a
 * day and serves stale for another while it refreshes. Same split as
 * app/api/markdown.
 */
const CACHE_HEADERS = {
  "cache-control": "public, max-age=0, must-revalidate",
  "cdn-cache-control": "public, s-maxage=86400, stale-while-revalidate=604800",
};

function errorResponse(message: string, status: number) {
  return Response.json(
    { error: message },
    // An error must never be the thing the edge caches for a day.
    { headers: { "cache-control": "no-store" }, status },
  );
}

/**
 * Proxies the Google Fonts Developer API so the key stays on the server, and
 * drops the fields the picker never reads.
 *
 * Measured against the live catalogue (1951 families): the full response is
 * 1.52MB, of which `files` — a download URL for every weight of every family —
 * is 0.87MB and `menu` another 0.17MB. Neither is ever read. Keeping only the
 * four fields `narrowFont` looks at takes it to 0.29MB, and 0.02MB gzipped
 * against 0.20MB. Google does not gzip its own response, so nothing upstream
 * recovers this for us.
 *
 * This stays shape-compatible rather than becoming our own format: `RawGoogleFont`
 * in `registry/default/lib/google-fonts.ts` declares exactly these four fields,
 * so the trimmed body runs through the same narrowing as an untouched one, and a
 * consumer pointing `FontPicker`'s `endpoint` at a raw Google proxy still works.
 * There is one client path, not two.
 */
export async function GET(request: Request) {
  // Read straight from process.env rather than through env.mjs: nothing else in
  // the app imports that module, so importing it here would switch on its
  // validation of unrelated variables for every build. An empty string and an
  // unset variable have to mean the same thing, which the falsy check gives.
  const apiKey = process.env.GOOGLE_FONTS_API_KEY;
  if (!apiKey) {
    return errorResponse("GOOGLE_FONTS_API_KEY is not configured.", 503);
  }

  const params = new URL(request.url).searchParams;

  // The edge caches per full query string, so an ignored parameter would still
  // be a distinct cache entry and another full call upstream. Rejecting the
  // request keeps a cache-busting loop to a cheap 400.
  for (const name of params.keys()) {
    if (name !== "sort") {
      return errorResponse(`Unsupported query parameter: ${name}`, 400);
    }
  }

  const sort = params.get("sort") ?? DEFAULT_SORT;
  if (!SORTS.has(sort)) {
    return errorResponse(`Unsupported sort: ${sort}`, 400);
  }

  const upstream = new URL(WEBFONTS_ENDPOINT);
  upstream.searchParams.set("key", apiKey);
  upstream.searchParams.set("sort", sort);

  let response: Response;
  try {
    response = await fetch(upstream, {
      headers: { accept: "application/json" },
      // Without this a hung upstream holds the invocation until the platform
      // timeout, instead of failing into the 502 the picker can retry from.
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    });
  } catch {
    return errorResponse("Could not reach the Google Fonts API.", 502);
  }

  if (!response.ok) {
    // 429 is passed through rather than flattened, because the picker shows
    // distinct copy for it — the fix is to wait, not to retry.
    return errorResponse(
      `The Google Fonts API returned ${response.status}.`,
      response.status === 429 ? 429 : 502,
    );
  }

  let payload: { items?: UpstreamFont[] };
  try {
    payload = (await response.json()) as { items?: UpstreamFont[] };
  } catch {
    return errorResponse("The Google Fonts API returned a malformed response.", 502);
  }

  const items = (payload.items ?? []).map(({ category, family, subsets, variants }) => ({
    category,
    family,
    subsets,
    variants,
  }));

  return Response.json({ items }, { headers: CACHE_HEADERS });
}
