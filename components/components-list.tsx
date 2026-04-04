import Link from "next/link";

import { docsConfig } from "@/config/docs";

const componentItems = docsConfig.sidebarNav
  .flatMap((group) => group.items ?? [])
  .filter(
    (item): item is { title: string; href: string; label?: string } =>
      typeof item.href === "string" && item.href.startsWith("/docs/components/")
  )
  .toSorted((a, b) =>
    a.title.localeCompare(b.title, undefined, {
      sensitivity: "base",
    })
  );

export function ComponentsList() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-x-8 lg:gap-x-16 lg:gap-y-6 xl:gap-x-20">
      {componentItems.map((component) => (
        <Link
          className="inline-flex items-center gap-2 font-medium text-lg underline-offset-4 hover:underline md:text-base"
          href={component.href}
          key={component.href}
        >
          {component.title}
          {component.label && (
            <span
              className="flex size-2 rounded-full bg-blue-500"
              title={component.label}
            />
          )}
        </Link>
      ))}
    </div>
  );
}
