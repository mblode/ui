"use client";

import { toast } from "sonner";
import { Button } from "@/registry/default/ui/button";

export default function ToastDestructive() {
  return (
    <Button
      onClick={() =>
        toast.error("Uh oh! Something went wrong.", {
          description: "There was a problem with your request.",
        })
      }
      variant="outline"
    >
      Show Toast
    </Button>
  );
}
