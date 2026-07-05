"use client";

import { GitBranchesIcon, RotateCcwIcon } from "blode-icons-react";
import { toast } from "sonner";

import { Marker, MarkerContent, MarkerIcon } from "@/registry/default/ui/marker";

export default function MarkerLinkButtonDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-8 py-12">
      <Marker render={<a aria-label="View the pull request" href="#links-and-buttons" />}>
        <MarkerIcon>
          <GitBranchesIcon />
        </MarkerIcon>
        <MarkerContent>View the pull request</MarkerContent>
      </Marker>
      <Marker
        render={
          <button
            aria-label="Revert this change"
            className="transition-colors hover:text-foreground"
            onClick={() => toast("You clicked the revert button")}
            type="button"
          />
        }
      >
        <MarkerIcon>
          <RotateCcwIcon />
        </MarkerIcon>
        <MarkerContent>Revert this change</MarkerContent>
      </Marker>
    </div>
  );
}
