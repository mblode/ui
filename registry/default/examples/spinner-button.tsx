import { Button } from "@/registry/default/ui/button";
import { Spinner } from "@/registry/default/ui/spinner";

export function SpinnerButton() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Button disabled size="sm">
        <Spinner data-icon="inline-start" />
        Loading...
      </Button>
      <Button disabled size="sm" variant="outline">
        <Spinner data-icon="inline-start" />
        Please wait
      </Button>
      <Button disabled size="sm" variant="secondary">
        <Spinner data-icon="inline-start" />
        Processing
      </Button>
    </div>
  );
}
