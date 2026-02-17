import { Badge } from "@/registry/default/ui/badge";
import { Spinner } from "@/registry/default/ui/spinner";

export default function SpinnerBadge() {
  return (
    <div className="flex items-center gap-4 [--radius:1.2rem]">
      <Badge>
        <Spinner size={16} />
        Syncing
      </Badge>
      <Badge variant="secondary">
        <Spinner size={16} />
        Updating
      </Badge>
      <Badge variant="outline">
        <Spinner size={16} />
        Processing
      </Badge>
    </div>
  );
}
