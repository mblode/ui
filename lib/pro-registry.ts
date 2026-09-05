import { promises as fs } from "node:fs";
import path from "node:path";
import { registryItemSchema } from "shadcn/schema";

import { proRegistry } from "@/registry/pro/_registry";

const registryByName = new Map(proRegistry.map((item) => [item.name, item]));

function toConsumerImports(content: string): string {
  return content.replaceAll(
    /@\/(?<packagePath>.+?)\/(?<type>(?:.*?\/)?(?:components|ui|hooks|lib))\/(?<name>[\w-]+)/gu,
    (match, _packagePath: string, type: string, name: string) => {
      if (type.endsWith("components")) {
        return `@/components/${name}`;
      }
      if (type.endsWith("ui")) {
        return `@/components/ui/${name}`;
      }
      if (type.endsWith("hooks")) {
        return `@/hooks/${name}`;
      }
      if (type.endsWith("lib")) {
        return `@/lib/${name}`;
      }
      return match;
    },
  );
}

export async function getProRegistryItem(name: string) {
  const item = registryByName.get(name);
  if (!item) {
    return null;
  }

  const files = await Promise.all(
    (item.files ?? []).map(async (file) => {
      if (typeof file === "string") {
        throw new TypeError("Blode UI Pro registry files must declare a target and type.");
      }

      const sourcePath = path.join(process.cwd(), "registry", "pro", file.path);
      const content = toConsumerImports(await fs.readFile(sourcePath, "utf-8"));
      return { ...file, content };
    }),
  );

  return registryItemSchema.parse({
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    author: "Matthew Blode",
    ...item,
    files,
  });
}
