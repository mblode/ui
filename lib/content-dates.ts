import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";

/**
 * When each file last changed in git, as ISO strings keyed by repo-relative
 * path. The sitemap reads this at build time so `lastModified` reflects the
 * content, not the deploy. A date the history cannot vouch for is left out,
 * and a URL with no date is better than one with a false one.
 *
 * Deploys clone shallowly. In a shallow clone the oldest commit looks as if it
 * added every file in the repo, so its date would stamp every untouched page
 * with the clone boundary. Those boundary commits are skipped.
 */
function readGitDates(): Map<string, string> {
  const dates = new Map<string, string>();

  try {
    const shallowFile = execFileSync("git", ["rev-parse", "--git-path", "shallow"], {
      encoding: "utf-8",
    }).trim();
    const boundaries = new Set(
      existsSync(shallowFile) ? readFileSync(shallowFile, "utf-8").split("\n").filter(Boolean) : [],
    );

    const log = execFileSync(
      "git",
      [
        "log",
        "--format=commit %H %cI",
        "--name-only",
        "--no-renames",
        "--",
        "content",
        "app",
        "components",
        "lib",
      ],
      { encoding: "utf-8", maxBuffer: 32 * 1024 * 1024 },
    );

    let current: string | null = null;
    for (const line of log.split("\n")) {
      if (line.startsWith("commit ")) {
        const [, sha, date] = line.split(" ");
        current = sha && date && !boundaries.has(sha) ? date : null;
        continue;
      }
      // `git log` is newest first, so the first date seen for a file is its latest.
      if (current && line && !dates.has(line)) {
        dates.set(line, current);
      }
    }
  } catch {
    // No git (a tarball deploy, or a runtime render): every date is omitted.
  }

  return dates;
}

let cache: Map<string, string> | undefined;

/** The latest git date across `paths`, or `undefined` when none is known. */
export function lastModifiedFromGit(...paths: string[]): string | undefined {
  cache ??= readGitDates();
  const known = paths
    .map((path) => cache?.get(path))
    .filter((date): date is string => Boolean(date));

  if (known.length === 0) {
    return undefined;
  }

  return known.reduce((latest, date) => (Date.parse(date) > Date.parse(latest) ? date : latest));
}
