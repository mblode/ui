import { Button } from "@/registry/default/ui/button";
import { Spinner } from "@/registry/default/ui/spinner";

export default function SpinnerButton() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Button disabled size="sm">
        <Spinner size={16} />
        Loading...
      </Button>
      <Button disabled size="sm" variant="outline">
        <Spinner size={16} />
        Please wait
      </Button>
      <Button disabled size="sm" variant="secondary">
        <Spinner size={16} />
        Processing
      </Button>
    </div>
  );
}
