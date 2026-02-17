import { PlusIcon } from "blode-icons-react";

import { Button } from "@/registry/default/ui/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/registry/default/ui/button-group";

export default function ButtonGroupSplit() {
  return (
    <ButtonGroup>
      <Button variant="secondary">Button</Button>
      <ButtonGroupSeparator />
      <Button size="icon" variant="secondary">
        <PlusIcon />
      </Button>
    </ButtonGroup>
  );
}
