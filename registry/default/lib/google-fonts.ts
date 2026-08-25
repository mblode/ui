/**
 * A minimal client for the Google Fonts Developer API, plus reference-counted
 * `<link>` injection for previewing families in the browser.
 *
 * There are two ways to reach the catalogue, and which one you want depends on
 * whether you have a server:
 *
 * - `apiKey` calls Google directly from the browser. The key travels in the
 *   query string of a request the browser makes, so it is public by design.
 *   Restrict it to your own HTTP referrers in the Google Cloud Console.
 * - `endpoint` calls a URL of your own that proxies Google. The key stays on
 *   your server, one upstream request can be cached for every visitor, and the
 *   browser only ever talks to your origin. The proxy must answer with a
 *   `{ items }` object whose rows carry at least `category`, `family`,
 *   `subsets`, and `variants`; Google's own response already does, so a
 *   pass-through proxy needs no mapping. Dropping the fields this module never
 *   reads — `files` above all — is worth doing, since they are the bulk of the
 *   payload.
 */

const WEBFONTS_ENDPOINT = "https://www.googleapis.com/webfonts/v1/webfonts";
const STYLESHEET_ENDPOINT = "https://fonts.googleapis.com/css2";
const PREVIEW_ATTRIBUTE = "data-google-font";

/** The five families Google groups its catalogue into. */
type GoogleFontCategory = "display" | "handwriting" | "monospace" | "sans-serif" | "serif";

/** Order the API returns families in. */
type GoogleFontSort = "alpha" | "popularity" | "style" | "trending";

/** One family, narrowed to the fields a picker actually needs. */
interface GoogleFont {
  category: GoogleFontCategory;
  family: string;
  subsets: string[];
  variants: string[];
}

/** Why a fetch failed, in terms a UI can act on. */
type GoogleFontsErrorCode = "missing-key" | "network" | "rate-limited" | "request-failed";

/** Thrown by `fetchGoogleFonts`. `code` is what to branch a UI state on. */
class GoogleFontsError extends Error {
  readonly code: GoogleFontsErrorCode;
  readonly status?: number;

  constructor(message: string, code: GoogleFontsErrorCode, status?: number) {
    super(message);
    this.code = code;
    this.name = "GoogleFontsError";
    this.status = status;
  }
}

interface FetchGoogleFontsOptions {
  /** A Google Fonts Developer API key. Ignored when `endpoint` is set. */
  apiKey?: string;
  /** Keeps only these categories. Defaults to every category. */
  categories?: GoogleFontCategory[];
  /**
   * A URL that proxies the Google Fonts Developer API. Takes precedence over
   * `apiKey`, and no key is sent — the proxy holds it. `sort` is forwarded as a
   * query parameter. See the module comment for the response shape.
   */
  endpoint?: string;
  /** Caps how many families come back, applied after filtering. */
  limit?: number;
  /** Aborts the request. */
  signal?: AbortSignal;
  /** Order to request. Defaults to `"popularity"`. */
  sort?: GoogleFontSort;
  /** Keeps only families covering every one of these subsets. */
  subsets?: string[];
  /** Keeps only families offering every one of these variants. */
  variants?: string[];
}

interface RawGoogleFont {
  category?: string;
  family?: string;
  subsets?: string[];
  variants?: string[];
}

const CATEGORIES = new Set<string>(["display", "handwriting", "monospace", "sans-serif", "serif"]);

const coversAll = (available: string[], required?: string[]) =>
  !required?.length || required.every((entry) => available.includes(entry));

/** Narrows one raw API row to a `GoogleFont`, or null if it fails the filters. */
const narrowFont = (
  item: RawGoogleFont,
  categories: Set<string> | null,
  subsets?: string[],
  variants?: string[],
): GoogleFont | null => {
  const category = item.category ?? "";
  if (!item.family || !CATEGORIES.has(category)) {
    return null;
  }
  if (categories && !categories.has(category)) {
    return null;
  }
  const availableSubsets = item.subsets ?? [];
  const availableVariants = item.variants ?? [];
  if (!coversAll(availableSubsets, subsets) || !coversAll(availableVariants, variants)) {
    return null;
  }
  return {
    category: category as GoogleFontCategory,
    family: item.family,
    subsets: availableSubsets,
    variants: availableVariants,
  };
};

/**
 * The URL to ask for the catalogue. A proxy carries no key — that is the whole
 * point of it — so the key is only ever appended to Google's own endpoint.
 * Throws `missing-key` when there is nothing to call.
 */
const catalogueUrl = (endpoint: string | undefined, apiKey: string | undefined, sort: string) => {
  if (endpoint) {
    // A relative `endpoint` is the common case for a same-origin proxy, and
    // `new URL` needs a base to resolve one against. There is no such base off
    // the browser, so say that rather than letting `new URL` throw a bare
    // TypeError that callers cannot branch on.
    const base = typeof document === "undefined" ? undefined : document.baseURI;
    if (!(base || URL.canParse(endpoint))) {
      throw new GoogleFontsError(
        `A relative endpoint ("${endpoint}") cannot be resolved outside a browser. Pass an absolute URL when calling from the server.`,
        "request-failed",
      );
    }
    const proxied = new URL(endpoint, base);
    proxied.searchParams.set("sort", sort);
    return proxied;
  }

  if (!apiKey) {
    throw new GoogleFontsError(
      "A Google Fonts API key or a proxy endpoint is required.",
      "missing-key",
    );
  }

  const direct = new URL(WEBFONTS_ENDPOINT);
  direct.searchParams.set("key", apiKey);
  direct.searchParams.set("sort", sort);
  return direct;
};

/**
 * Fetches the catalogue and narrows it. Rejects with a `GoogleFontsError` for
 * everything except an abort, which rejects with the original `AbortError` so
 * callers can ignore it the usual way.
 */
const fetchGoogleFonts = async ({
  apiKey,
  categories,
  endpoint,
  limit,
  signal,
  sort = "popularity",
  subsets,
  variants,
}: FetchGoogleFontsOptions): Promise<GoogleFont[]> => {
  const url = catalogueUrl(endpoint, apiKey, sort);

  let response: Response;
  try {
    response = await fetch(url, { signal });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw error;
    }
    throw new GoogleFontsError("Could not reach the Google Fonts API.", "network");
  }

  if (!response.ok) {
    throw new GoogleFontsError(
      response.status === 429
        ? "The Google Fonts API rate limit has been reached."
        : `The Google Fonts API returned ${response.status}.`,
      response.status === 429 ? "rate-limited" : "request-failed",
      response.status,
    );
  }

  const payload = (await response.json()) as { items?: RawGoogleFont[] };
  const allowed = categories?.length ? new Set<string>(categories) : null;

  const fonts: GoogleFont[] = [];
  for (const item of payload.items ?? []) {
    const font = narrowFont(item, allowed, subsets, variants);
    if (!font) {
      continue;
    }
    fonts.push(font);
    if (limit !== undefined && fonts.length >= limit) {
      break;
    }
  }

  return fonts;
};

/** Slug for a family, stable enough to key a stylesheet element by. */
const googleFontId = (family: string) => family.trim().toLowerCase().replaceAll(/\s+/gu, "-");

/** The `css2` stylesheet URL for one family, at its default weight. */
const googleFontStylesheetHref = (family: string) =>
  `${STYLESHEET_ENDPOINT}?family=${encodeURIComponent(family).replaceAll("%20", "+")}&display=swap`;

/**
 * Reference counted so two pickers previewing the same family share one
 * `<link>`, and so releasing one of them does not pull the stylesheet out from
 * under the other.
 */
const previews = new Map<string, { count: number; link: HTMLLinkElement }>();

const noop = () => {
  // Nothing was injected, so nothing needs releasing.
};

/**
 * Adds a preview stylesheet for `family` to `<head>`, and returns the function
 * that releases it. Call the returned function on unmount — an unreleased
 * preview stays in `<head>` for the life of the page.
 */
const loadGoogleFontPreview = (family: string): (() => void) => {
  if (typeof document === "undefined") {
    return noop;
  }

  const id = googleFontId(family);
  const existing = previews.get(id);
  if (existing) {
    existing.count += 1;
  } else {
    const link = document.createElement("link");
    link.href = googleFontStylesheetHref(family);
    link.rel = "stylesheet";
    link.setAttribute(PREVIEW_ATTRIBUTE, id);
    document.head.append(link);
    previews.set(id, { count: 1, link });
  }

  let released = false;
  return () => {
    if (released) {
      return;
    }
    released = true;
    const entry = previews.get(id);
    if (!entry) {
      return;
    }
    entry.count -= 1;
    if (entry.count <= 0) {
      entry.link.remove();
      previews.delete(id);
    }
  };
};

export {
  fetchGoogleFonts,
  googleFontId,
  googleFontStylesheetHref,
  GoogleFontsError,
  loadGoogleFontPreview,
};
export type {
  FetchGoogleFontsOptions,
  GoogleFont,
  GoogleFontCategory,
  GoogleFontsErrorCode,
  GoogleFontSort,
};
