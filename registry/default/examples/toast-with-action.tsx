"use client";

import { toast } from "sonner";
import { Button } from "@/registry/default/ui/button";

export default function ToastWithAction() {
  return (
    <Button
      onClick={() =>
        toast("Your message has been archived.", {
          action: {
            label: "Undo",
            onClick: () => {},
          },
        })
      }
      variant="outline"
    >
      Show Toast
    </Button>
  );
}
