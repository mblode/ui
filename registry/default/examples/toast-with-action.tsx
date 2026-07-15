"use client";

import { toast } from "sonner";
import { Button } from "@/registry/default/ui/button";

const ToastWithAction = () => (
  <Button
    onClick={() =>
      toast("Your message has been archived.", {
        action: {
          label: "Undo",
          onClick: () => {
            // no-op
          },
        },
      })
    }
    variant="outline"
  >
    Show Toast
  </Button>
);

export default ToastWithAction;
