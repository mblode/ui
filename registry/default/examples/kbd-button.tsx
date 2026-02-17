import { Button } from "@/registry/default/ui/button";
import { Kbd } from "@/registry/default/ui/kbd";

export default function KbdButton() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button className="pr-2" size="sm" variant="outline">
        Accept <Kbd icon="enter" />
      </Button>
      <Button className="pr-2" size="sm" variant="outline">
        Cancel <Kbd>Esc</Kbd>
      </Button>
    </div>
  );
}
