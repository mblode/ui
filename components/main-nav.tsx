"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/default/ui/button";

export function MainNav({
  items,
  className,
  ...props
}: React.ComponentProps<"nav"> & {
  items: { href: string; label: string }[];
}) {
  const pathname = usePathname();

  return (
    <nav className={cn("items-center gap-0", className)} {...props}>
      {items.map((item) => (
        // Docs routes: upgrade the prefetch on hover so the body, not a
        // skeleton, is ready on click. See next.config.ts.
        <Button asChild className="px-2.5" key={item.href} size="sm" variant="ghost">
          <Link
            className="relative items-center"
            data-active={pathname === item.href}
            href={item.href}
            unstable_dynamicOnHover
          >
            {item.label}
          </Link>
        </Button>
      ))}
    </nav>
  );
}
