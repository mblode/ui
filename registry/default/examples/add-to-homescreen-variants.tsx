"use client";

import { useState } from "react";
import { AddToHomescreen } from "@/registry/default/ui/add-to-homescreen";
import type {
  AddToHomescreenBrowser,
  AddToHomescreenPlatform,
} from "@/registry/default/ui/add-to-homescreen";
import { Button } from "@/registry/default/ui/button";

const VARIANTS: {
  browser: AddToHomescreenBrowser;
  label: string;
  platform: AddToHomescreenPlatform;
}[] = [
  { browser: "safari", label: "iOS Safari", platform: "ios" },
  { browser: "chrome", label: "iOS Chrome", platform: "ios" },
  { browser: "chrome", label: "Android Chrome", platform: "android" },
  { browser: "chrome", label: "Desktop Chrome", platform: "desktop" },
  { browser: "safari", label: "macOS Safari", platform: "desktop" },
  { browser: "instagram", label: "In-app browser", platform: "ios" },
  { browser: "firefox", label: "Desktop Firefox", platform: "desktop" },
];

/**
 * Every recipe, pinned. Note which ones draw an arrow: only those whose control
 * sits somewhere the page can actually know. iOS Chrome keeps Share beside an
 * address bar the reader may have moved to either end, so it points at nothing
 * and says where to look instead.
 */
export const AddToHomescreenVariants = () => {
  const [active, setActive] = useState<number | null>(null);
  const variant = active === null ? null : VARIANTS[active];

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {VARIANTS.map((item, index) => (
        <Button key={item.label} onClick={() => setActive(index)} size="sm" variant="outline">
          {item.label}
        </Button>
      ))}

      {variant && (
        <AddToHomescreen
          appName="Ledger"
          browser={variant.browser}
          key={variant.label}
          onOpenChange={(next) => !next && setActive(null)}
          open
          platform={variant.platform}
        />
      )}
    </div>
  );
};
