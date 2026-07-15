import { LoaderIcon } from "blode-icons-react";

import { cn } from "@/lib/utils";

const Spinner = ({ className, ...props }: React.ComponentProps<"svg">) => (
  <output aria-label="Loading">
    <LoaderIcon className={cn("size-4 animate-spin", className)} {...props} />
  </output>
);

export const SpinnerCustom = () => (
  <div className="flex items-center gap-4">
    <Spinner />
  </div>
);
