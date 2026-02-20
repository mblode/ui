import {
  ProgressItem,
  ProgressList,
} from "@/registry/default/ui/progress-list";

export function ProgressListDemo() {
  return (
    <ProgressList>
      <ProgressItem completed title="Account setup" />
      <ProgressItem completed title="Connect data source" />
      <ProgressItem state="current" title="Invite team members" />
      <ProgressItem completed={false} title="Publish project" />
    </ProgressList>
  );
}
