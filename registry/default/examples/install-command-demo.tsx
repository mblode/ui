import { InstallCommand } from "@/registry/default/blocks/install-command";

const commands = [
  { command: "npx shadcn@latest init https://blode.co/ui/r/ui.json", label: "New project" },
  {
    command:
      "npx shadcn@latest registry add @blode=https://blode.co/ui/r/{name}.json && npx shadcn@latest add @blode/ui",
    label: "Existing project",
  },
];

export default function InstallCommandDemo() {
  return (
    <div className="w-full max-w-xl">
      <InstallCommand commands={commands} />
    </div>
  );
}
