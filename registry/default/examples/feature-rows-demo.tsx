import { FeatureRows } from "@/registry/default/blocks/feature-rows";
import { Button } from "@/registry/default/ui/button";
import { Switch } from "@/registry/default/ui/switch";

const items = [
  {
    description:
      "Every action in the product is one button, with a loading state that holds its width.",
    media: (
      <div className="flex min-h-40 items-center justify-center rounded-xl border bg-muted/40 p-6">
        <Button loading>Saving</Button>
      </div>
    ),
    title: "Buttons that wait",
  },
  {
    description: "Settings apply the moment they change. There is no save step to forget.",
    media: (
      <div className="flex min-h-40 items-center justify-center rounded-xl border bg-muted/40 p-6">
        <Switch aria-label="Email notifications" defaultChecked />
      </div>
    ),
    title: "Switches that apply at once",
  },
];

export default function FeatureRowsDemo() {
  return (
    <div className="w-full p-6">
      <FeatureRows items={items} />
    </div>
  );
}
