import { Button } from "@/registry/default/ui/button";
import { Kbd } from "@/registry/default/ui/kbd";

export default function KbdButton() {
  return (
    <Button variant="outline">
      Accept{" "}
      <Kbd className="translate-x-0.5" data-icon="inline-end">
        ⏎
      </Kbd>
    </Button>
  );
}
