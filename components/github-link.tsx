import { GithubIcon } from "blode-icons-react";
import Link from "next/link";
import { Suspense } from "react";
import { siteConfig } from "@/config/site";
import { Button } from "@/registry/default/ui/button";
import { Skeleton } from "@/registry/default/ui/skeleton";

export function GitHubLink() {
  return (
    <Button asChild className="h-8 shadow-none" size="sm" variant="ghost">
      <Link href={siteConfig.links.github} rel="noreferrer" target="_blank">
        <GithubIcon className="size-4" />
        <Suspense fallback={<Skeleton className="h-4 w-[42px]" />}>
          <StarsCount />
        </Suspense>
      </Link>
    </Button>
  );
}

async function StarsCount() {
  const data = await fetch("https://api.github.com/repos/mblode/blode-ui", {
    next: { revalidate: 86_400 },
  });
  const json = await data.json();

  const formattedCount =
    json.stargazers_count >= 1000
      ? `${Math.round(json.stargazers_count / 1000)}k`
      : (json.stargazers_count?.toLocaleString() ?? "0");

  return (
    <span className="w-fit text-muted-foreground text-xs tabular-nums">
      {formattedCount}
    </span>
  );
}
