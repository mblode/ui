/**
 * Live proof numbers for marketing pages: GitHub stars and npm downloads.
 *
 * Every helper fails closed. A network error, a timeout, a rate limit, or a
 * response in an unexpected shape all resolve to `null`, never a stale or
 * guessed number, so a page renders the stat or renders nothing.
 *
 * Call these from a server component. The `next.revalidate` option caches each
 * response for a day in the Next.js data cache, which keeps the page inside
 * GitHub's unauthenticated rate limit. Set `GITHUB_TOKEN` to raise that limit.
 */

/** One day, in seconds. */
export const LIVE_STATS_REVALIDATE = 86_400;

const TIMEOUT_MS = 5000;
const REPO_PATTERN = /^[\w.-]+\/[\w.-]+$/u;

type NextFetchInit = RequestInit & { next?: { revalidate?: number | false; tags?: string[] } };

const fetchJson = async (url: string, headers: Record<string, string> = {}): Promise<unknown> => {
  try {
    const init: NextFetchInit = {
      headers: { accept: "application/json", ...headers },
      next: { revalidate: LIVE_STATS_REVALIDATE },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    };
    const response = await fetch(url, init);

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch {
    return null;
  }
};

const toCount = (value: unknown): number | null =>
  typeof value === "number" && Number.isFinite(value) && value >= 0 ? value : null;

/**
 * Stargazer count for a public GitHub repository, e.g. `getGitHubStars("mblode/ui")`.
 */
export const getGitHubStars = async (repo: string): Promise<number | null> => {
  if (!REPO_PATTERN.test(repo)) {
    return null;
  }

  const token = typeof process === "undefined" ? undefined : process.env.GITHUB_TOKEN;
  const data = await fetchJson(`https://api.github.com/repos/${repo}`, {
    accept: "application/vnd.github+json",
    ...(token ? { authorization: `Bearer ${token}` } : {}),
    "x-github-api-version": "2022-11-28",
  });

  if (!data || typeof data !== "object" || !("stargazers_count" in data)) {
    return null;
  }

  return toCount(data.stargazers_count);
};

export type NpmDownloadsPeriod = "last-day" | "last-week" | "last-month" | "last-year";

/**
 * Download count for an npm package over a rolling period, e.g.
 * `getNpmDownloads("blode-icons-react", "last-week")`.
 */
export const getNpmDownloads = async (
  pkg: string,
  period: NpmDownloadsPeriod = "last-week",
): Promise<number | null> => {
  if (!pkg || pkg.length > 214) {
    return null;
  }

  // Scoped names keep their slash: the endpoint expects `@scope/name` as is.
  const name = pkg.startsWith("@")
    ? `@${encodeURIComponent(pkg.slice(1)).replace("%2F", "/")}`
    : encodeURIComponent(pkg);
  const data = await fetchJson(`https://api.npmjs.org/downloads/point/${period}/${name}`);

  if (!data || typeof data !== "object" || !("downloads" in data)) {
    return null;
  }

  return toCount(data.downloads);
};
