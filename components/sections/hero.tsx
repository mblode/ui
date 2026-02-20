import { allDocs } from "content-collections";
import { compareDesc } from "date-fns";
import Link from "next/link";

import TechStack from "@/components/tech-stack";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/registry/default/ui/button";

export default function Hero() {
  const _post = allDocs
    .filter(
      (post) =>
        post.date && post.date <= new Date().toISOString() && post.published
    )
    .sort((a, b) => {
      if (!(a.date || b.date)) {
        return 0; // Both dates are undefined, keep original order
      }
      if (!a.date) {
        return 1; // Move a to the end if date is undefined
      }
      if (!b.date) {
        return -1; // Move b to the end if date is undefined
      }
      return compareDesc(new Date(a.date), new Date(b.date)); // Both dates are defined, proceed with comparison
    })[0];

  return (
    <section id="hero">
      <div className="relative h-full overflow-hidden py-5 md:py-14">
        <div className="z-10 flex flex-col">
          <div className="mt-10 grid grid-cols-1 md:mt-20">
            <div className="flex flex-col items-start gap-6 px-7 pb-8 text-center md:items-center md:px-10">
              <div className="relative flex flex-col gap-4 md:items-center lg:flex-row">
                <h1
                  className={cn(
                    "text-black dark:text-white",
                    "relative mx-0 max-w-[43.5rem] pt-5 md:mx-auto md:px-4 md:py-2",
                    "text-balance text-left font-semibold tracking-tighter md:text-center",
                    "text-5xl sm:text-7xl md:text-7xl lg:text-7xl"
                  )}
                >
                  Blode UI
                </h1>
              </div>

              <div className="mx-0 w-full max-w-full py-1 sm:max-w-lg md:mx-auto">
                <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4">
                  <Link
                    className={cn(
                      buttonVariants({
                        variant: "default",
                        size: "lg",
                      }),
                      "w-full gap-2"
                    )}
                    href="/docs/installation"
                  >
                    Get started
                  </Link>
                  <Link
                    className={cn(
                      buttonVariants({
                        variant: "secondary",
                        size: "lg",
                      }),
                      "w-full gap-2"
                    )}
                    href="/docs/components"
                  >
                    Browse components
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="relative mx-auto flex w-full max-w-56 items-center justify-center">
            <TechStack
              className="mx-auto flex w-full items-center justify-between"
              technologies={[
                "react",
                "typescript",
                "tailwindcss",
                "motion",
                "shadcn",
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
