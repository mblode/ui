import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/registry/default/ui/toggle-group";

export function ToggleGroupSizes() {
  return (
    <div className="flex flex-col gap-4">
      <ToggleGroup defaultValue={["top"]} size="sm" variant="outline">
        <ToggleGroupItem aria-label="Toggle top" value="top">
          Top
        </ToggleGroupItem>
        <ToggleGroupItem aria-label="Toggle bottom" value="bottom">
          Bottom
        </ToggleGroupItem>
        <ToggleGroupItem aria-label="Toggle left" value="left">
          Left
        </ToggleGroupItem>
        <ToggleGroupItem aria-label="Toggle right" value="right">
          Right
        </ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup defaultValue={["top"]} variant="outline">
        <ToggleGroupItem aria-label="Toggle top" value="top">
          Top
        </ToggleGroupItem>
        <ToggleGroupItem aria-label="Toggle bottom" value="bottom">
          Bottom
        </ToggleGroupItem>
        <ToggleGroupItem aria-label="Toggle left" value="left">
          Left
        </ToggleGroupItem>
        <ToggleGroupItem aria-label="Toggle right" value="right">
          Right
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
