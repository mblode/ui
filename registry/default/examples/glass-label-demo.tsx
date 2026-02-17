import { GlassLabel } from "@/registry/default/ui/glass-label";
import { CircleInfoIcon, MagicWandIcon, RocketIcon } from "@fingertip/icons";

export default function GlassLabelDemo() {
  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-3">
        <h3 className="text-sm font-medium">Default Variants</h3>
        <div className="flex flex-wrap gap-4">
          <GlassLabel title="Default" />
          <GlassLabel title="Primary" variant="primary" />
          <GlassLabel title="Success" variant="success" />
          <GlassLabel title="Warning" variant="warning" />
          <GlassLabel title="Destructive" variant="destructive" />
          <GlassLabel title="Info" variant="info" />
          <GlassLabel title="Magic" variant="magic" />
          <GlassLabel title="Muted" variant="muted" />
          <GlassLabel title="Purple" variant="purple" />
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium">Sizes</h3>
        <div className="flex flex-wrap items-end gap-4">
          <GlassLabel title="Extra Small" size="xs" variant="primary" />
          <GlassLabel title="Small" size="sm" variant="primary" />
          <GlassLabel title="Default" variant="primary" />
          <GlassLabel title="Large" size="lg" variant="primary" />
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium">With Icons</h3>
        <div className="flex flex-wrap gap-4">
          <GlassLabel
            title="New Feature"
            icon={<RocketIcon className="h-4 w-4" />}
            variant="primary"
          />
          <GlassLabel
            title="Magic Effect"
            icon={<MagicWandIcon className="h-4 w-4" />}
            variant="magic"
          />
          <GlassLabel
            title="Information"
            icon={<CircleInfoIcon className="h-4 w-4" />}
            variant="info"
          />
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium">Rotation</h3>
        <div className="flex flex-wrap gap-4">
          <GlassLabel title="Rotate -5°" rotate={-5} variant="primary" />
          <GlassLabel title="No Rotation" rotate={0} variant="success" />
          <GlassLabel title="Rotate 5°" rotate={5} variant="warning" />
        </div>
      </div>
    </div>
  );
}
