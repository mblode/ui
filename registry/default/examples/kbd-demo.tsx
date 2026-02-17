import { Kbd, KbdGroup } from "@/registry/default/ui/kbd";

export default function KbdDemo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <KbdGroup>
        <Kbd icon="command" />
        <Kbd icon="shift" />
        <Kbd icon="alt" />
        <Kbd icon="ctrl" />
      </KbdGroup>
      <KbdGroup>
        <Kbd icon="ctrl" />
        <span>+</span>
        <Kbd>B</Kbd>
      </KbdGroup>
    </div>
  );
}
