import { Stat } from "@/registry/default/ui/stat";

export function StatDemo() {
  return (
    <div className="w-full max-w-xs">
      <Stat
        description="+8.2% from last week"
        title="Active users"
        value="12,408"
      />
    </div>
  );
}
