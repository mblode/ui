import { Toggle } from "@/registry/default/ui/toggle";

export function ToggleDisabled() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Toggle aria-label="Toggle disabled" disabled>
        Disabled
      </Toggle>
      <Toggle aria-label="Toggle disabled outline" disabled variant="outline">
        Disabled
      </Toggle>
    </div>
  );
}
