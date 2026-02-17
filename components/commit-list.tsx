"use client";

import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/registry/default/ui/badge";

interface CommitItem {
  commit?: {
    author?: {
      date?: string;
    };
    message?: string;
  };
  sha?: string;
}

export default function CommitList({
  repo,
  owner,
}: {
  repo: string;
  owner: string;
}) {
  const [, setLoading] = useState(false);
  const [commits, setCommits] = useState<CommitItem[]>([]);

  useEffect(() => {
    const loadCommits = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL}/api/repo/commits`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ repo, owner }),
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = (await response.json()) as { commits?: CommitItem[] };
        setCommits(data.commits ?? []);
      } catch (error) {
        toast.error("Error occurred while loading commits. Please try again.");
        console.error("error", error);
      } finally {
        setLoading(false);
      }
    };
    loadCommits();
  }, [repo, owner]);

  return (
    <ul>
      {commits.map((commit) => (
        <li key={commit.sha ?? commit.commit?.message ?? "commit"}>
          {commit?.commit?.message}{" "}
          <Badge className="ml-2">
            {commit?.commit?.author?.date
              ? formatDistanceToNow(new Date(commit.commit.author.date), {
                  addSuffix: true,
                })
              : "Unknown date"}
          </Badge>
        </li>
      ))}
    </ul>
  );
}
