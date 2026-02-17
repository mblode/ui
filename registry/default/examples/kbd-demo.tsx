import { Kbd } from "@/registry/default/ui/kbd";

export default function KbdDemo() {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <Kbd>A</Kbd>
        <Kbd>B</Kbd>
        <Kbd>C</Kbd>
        <Kbd>Shift</Kbd>
        <Kbd>Enter</Kbd>
        <Kbd>Delete</Kbd>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-1">
          <Kbd icon="command" />
          <span>+</span>
          <Kbd>K</Kbd>
        </div>

        <div className="flex items-center gap-1">
          <Kbd icon="ctrl" />
          <span>+</span>
          <Kbd>C</Kbd>
        </div>

        <div className="flex items-center gap-1">
          <Kbd icon="alt" />
          <span>+</span>
          <Kbd icon="tab" />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Kbd variant="tooltip">Esc</Kbd>
        <Kbd variant="tooltip" icon="shift" />
        <Kbd variant="tooltip" icon="enter" />
      </div>

      <div className="flex flex-wrap items-center gap-1">
        <span className="text-sm text-muted-foreground">Press</span>
        <Kbd icon="mod" />
        <span className="text-sm text-muted-foreground">+</span>
        <Kbd>K</Kbd>
        <span className="text-sm text-muted-foreground">
          to open command menu
        </span>
      </div>
    </div>
  );
}
