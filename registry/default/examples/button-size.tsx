import { ArrowUpRightIcon } from "blode-icons-react";

import { Button } from "@/registry/default/ui/button";

export default function ButtonSize() {
  return (
    <div className="flex flex-col items-start gap-8 sm:flex-row">
      <div className="flex items-start gap-2">
        <Button size="sm" variant="outline">
          Small
        </Button>
        <Button aria-label="Submit" size="icon-sm" variant="outline">
          <ArrowUpRightIcon />
        </Button>
      </div>
      <div className="flex items-start gap-2">
        <Button variant="outline">Default</Button>
        <Button aria-label="Submit" size="icon" variant="outline">
          <ArrowUpRightIcon />
        </Button>
      </div>
      <div className="flex items-start gap-2">
        <Button size="lg" variant="outline">
          Large
        </Button>
        <Button aria-label="Submit" size="icon-lg" variant="outline">
          <ArrowUpRightIcon />
        </Button>
      </div>
    </div>
  );
}
