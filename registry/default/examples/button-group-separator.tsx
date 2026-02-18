import { Button } from "@/registry/default/ui/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/registry/default/ui/button-group";

export default function ButtonGroupSeparatorDemo() {
  return (
    <ButtonGroup>
      <Button size="sm" variant="secondary">
        Copy
      </Button>
      <ButtonGroupSeparator />
      <Button size="sm" variant="secondary">
        Paste
      </Button>
    </ButtonGroup>
  );
}
