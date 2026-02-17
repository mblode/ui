"use client";

import { ArrowOutOfBoxIcon } from "@fingertip/icons";
import { Button } from "@/registry/default/ui/button";

import { Share } from "@/registry/default/ui/share";

export default function ShareDemo() {
  return (
    <div className="flex flex-wrap items-center justify-start gap-4">
      {/* Default share button */}
      <Share value="https://fingertip.com" />

      {/* Share with custom icon */}
      <Share
        value="https://fingertip.com"
        className="h-10 w-10 flex items-center justify-center rounded-full bg-primary text-primary-foreground"
      >
        <ArrowOutOfBoxIcon className="h-5 w-5" />
      </Share>

      {/* Share as child */}
      <Share
        value="https://fingertip.com"
        displayValue="Check out Fingertip"
        description="Link copied to clipboard!"
        asChild
      >
        <Button>
          Share Website <ArrowOutOfBoxIcon className="ml-2 h-4 w-4" />
        </Button>
      </Share>

      {/* Share with value prefix */}
      <Share
        value="https://fingertip.com"
        valuePrefix="Check out this website:"
        displayValue="Fingertip"
        className="rounded-md border p-2 hover:bg-muted"
      >
        <span className="flex items-center gap-2">
          <ArrowOutOfBoxIcon className="h-4 w-4" />
          Share with message
        </span>
      </Share>
    </div>
  );
}
