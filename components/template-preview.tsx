import { SquareArrowTopRightIcon } from "blode-icons-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/registry/default/ui/button";

export default function TemplatePreview({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      className={cn(
        buttonVariants({
          variant: "secondary",
        }),
        "not-prose group relative w-full gap-2"
      )}
      href={href}
      target="_blank"
    >
      {children}
      <SquareArrowTopRightIcon className="size-4" />
    </Link>
  );
}
