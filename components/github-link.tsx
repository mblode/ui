import { GithubIcon } from "blode-icons-react";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { Button } from "@/registry/default/ui/button";

export function GitHubLink() {
  return (
    <Button asChild className="h-8 shadow-none" size="sm" variant="ghost">
      <Link href={siteConfig.links.github} rel="noreferrer" target="_blank">
        <GithubIcon className="size-4" />
        <span className="sr-only">GitHub</span>
      </Link>
    </Button>
  );
}
