import { CopyButton } from "@/registry/default/ui/copy-button";

export default function CopyButtonDemo() {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-input bg-card px-3 py-2">
      <code className="text-muted-foreground text-sm">npm install @blode/ui</code>
      <CopyButton value="npm install @blode/ui" />
    </div>
  );
}
