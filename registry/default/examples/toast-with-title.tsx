"use client";

import { toast } from "sonner";
import { Button } from "@/registry/default/ui/button";

export default function ToastWithTitle() {
  return (
    <Button
      onClick={() =>
        toast("Scheduled: Catch up", {
          description: "Friday, February 10, 2023 at 5:57 PM",
        })
      }
      variant="outline"
    >
      Show Toast
    </Button>
  );
}
