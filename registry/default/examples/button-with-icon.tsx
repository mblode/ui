import { GitBranchesIcon } from "blode-icons-react";

import { Button } from "@/registry/default/ui/button";

export default function ButtonWithIcon() {
  return (
    <Button size="sm" variant="outline">
      <GitBranchesIcon /> New Branch
    </Button>
  );
}
