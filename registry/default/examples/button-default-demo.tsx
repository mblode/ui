import { ArrowUpIcon } from "blode-icons-react";
import { Button } from "@/registry/default/ui/button";

export default function ButtonDefaultDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2 md:flex-row">
      <Button variant="default">Button</Button>
      <Button aria-label="Submit" size="icon" variant="default">
        <ArrowUpIcon />
      </Button>
    </div>
  );
}
