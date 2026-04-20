import { Button } from "@/registry/default/ui/button";

export default function ButtonLoading() {
  return (
    <div className="flex gap-2">
      <Button loading variant="outline">
        Generating
      </Button>
      <Button loading variant="secondary">
        Downloading
      </Button>
    </div>
  );
}
