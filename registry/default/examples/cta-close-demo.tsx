import { CtaClose } from "@/registry/default/blocks/cta-close";
import { InstallCommand } from "@/registry/default/blocks/install-command";
import { Button } from "@/registry/default/ui/button";

export default function CtaCloseDemo() {
  return (
    <CtaClose
      action={<Button size="lg">Open the install guide</Button>}
      className="w-full p-6"
      command={
        <InstallCommand
          commands={[{ command: "npx shadcn@latest add @blode/button", label: "npm" }]}
        />
      }
      description="Add one component, read the file it writes, and decide from there."
      title="Add your first component"
    />
  );
}
