import { BugIcon, LightBulbIcon, PencilIcon } from "blode-icons-react";
import type { Doc } from "content-collections";
import Link from "next/link";

import { getGitHubIssueUrl, getGithubFileUrl } from "@/lib/github";

export function Contribute({ doc }: { doc: Doc }) {
  const contributeLinks = [
    {
      href: getGitHubIssueUrl({
        labels: ["bug", "documentation"],
        owner: "mblode",
        repo: "blode-ui",
        template: "bug_report.md",
        title: `[bug]: ${doc.slug}`,
      }),
      icon: BugIcon,
      text: "Report an issue",
    },
    {
      href: getGitHubIssueUrl({
        labels: ["enhancement"],
        owner: "mblode",
        repo: "blode-ui",
        template: "feature_request.md",
        title: `[feat]: ${doc.slug}`,
      }),
      icon: LightBulbIcon,
      text: "Request a feature",
    },
    {
      href: getGithubFileUrl(doc.slug),
      icon: PencilIcon,
      text: "Edit this page",
    },
  ];

  return (
    <div className="space-y-2">
      <p className="font-medium">Contribute</p>
      <ul className="m-0 list-none">
        {contributeLinks.map((link) => (
          <li className="mt-0 pt-2" key={link.href}>
            <Link
              className="inline-flex items-center text-muted-foreground text-sm transition-colors hover:text-foreground"
              href={link.href}
              rel="noopener noreferrer"
              target="_blank"
            >
              <link.icon className="mr-2 size-4" />
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
