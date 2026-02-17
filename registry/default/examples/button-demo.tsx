import { ArrowUpIcon } from "blode-icons-react";

import { Button } from "@/registry/default/ui/button";

export default function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2 md:flex-row">
      <Button>Button</Button>
      <Button aria-label="Submit" size="icon">
        <ArrowUpIcon />
      </Button>
    </div>
  );
}
