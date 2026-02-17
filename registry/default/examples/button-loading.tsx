import { Button } from "@/registry/default/ui/button";
import { Spinner } from "@/registry/default/ui/spinner";

export default function ButtonLoading() {
  return (
    <Button disabled size="sm" variant="outline">
      <Spinner size={16} />
      Submit
    </Button>
  );
}
