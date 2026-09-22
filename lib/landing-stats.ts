import { cacheLife } from "next/cache";

import { repoSlug } from "@/lib/landing";
import { getGitHubStars } from "@/registry/default/lib/live-stats";

/**
 * GitHub stars for the landing page's proof strip. Cached for a day, matching
 * the `revalidate: 86400` inside the fetch. A failed fetch is `null`, which the
 * strip hides, and is only cached for an hour so the number comes back soon
 * after GitHub does.
 */
export async function getRepoStars(): Promise<number | null> {
  "use cache";

  const stars = await getGitHubStars(repoSlug);

  if (stars === null) {
    cacheLife("hours");
  } else {
    cacheLife("days");
  }

  return stars;
}
