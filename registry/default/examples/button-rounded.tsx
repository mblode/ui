import { ArrowUpIcon } from "blode-icons-react";
import { Button } from "@/registry/default/ui/button";

export default function ButtonRounded() {
  return (
    <div className="flex gap-2">
      <Button className="rounded-full">Get Started</Button>
      <Button className="rounded-full" size="icon" variant="outline">
        <ArrowUpIcon />
      </Button>
    </div>
  );
}
