import { BugIcon, LightBulbIcon, PencilIcon } from "blode-icons-react";
import type { Doc } from "content-collections";
import Link from "next/link";

import { getGitHubIssueUrl, getGithubFileUrl } from "@/lib/github";

export function Contribute({ doc }: { doc: Doc }) {
  const contributeLinks = [
    {
      text: "Report an issue",
      icon: BugIcon,
      href: getGitHubIssueUrl({
        owner: "mblode",
        repo: "blode-ui",
        title: `[bug]: ${doc.slug}`,
        labels: ["bug", "documentation"],
        template: "bug_report.md",
      }),
    },
    {
      text: "Request a feature",
      icon: LightBulbIcon,
      href: getGitHubIssueUrl({
        owner: "mblode",
        repo: "blode-ui",
        title: `[feat]: ${doc.slug}`,
        labels: ["enhancement"],
        template: "feature_request.md",
      }),
    },
    {
      text: "Edit this page",
      icon: PencilIcon,
      href: getGithubFileUrl(doc.slug),
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
