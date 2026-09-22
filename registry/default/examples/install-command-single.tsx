import { InstallCommand } from "@/registry/default/blocks/install-command";

export default function InstallCommandSingle() {
  return (
    <div className="w-full max-w-xl">
      <InstallCommand
        commands={[{ command: "npx shadcn@latest add @blode/button", label: "npm" }]}
      />
    </div>
  );
}
