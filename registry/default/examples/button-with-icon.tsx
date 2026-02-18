import { GitBranchesIcon, GitForkIcon } from "blode-icons-react";
import { Button } from "@/registry/default/ui/button";

export default function ButtonWithIcon() {
  return (
    <div className="flex gap-2">
      <Button variant="outline">
        <GitBranchesIcon data-icon="inline-start" /> New Branch
      </Button>
      <Button variant="outline">
        Fork
        <GitForkIcon data-icon="inline-end" />
      </Button>
    </div>
  );
}
