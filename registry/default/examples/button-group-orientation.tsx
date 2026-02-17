import { MinusIcon, PlusIcon } from "blode-icons-react";

import { Button } from "@/registry/default/ui/button";
import { ButtonGroup } from "@/registry/default/ui/button-group";

export default function ButtonGroupOrientation() {
  return (
    <ButtonGroup
      aria-label="Media controls"
      className="h-fit"
      orientation="vertical"
    >
      <Button size="icon" variant="outline">
        <PlusIcon />
      </Button>
      <Button size="icon" variant="outline">
        <MinusIcon />
      </Button>
    </ButtonGroup>
  );
}
