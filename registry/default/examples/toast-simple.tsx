"use client";

import { toast } from "sonner";
import { Button } from "@/registry/default/ui/button";

export default function ToastSimple() {
  return (
    <Button onClick={() => toast("Message sent.")} variant="outline">
      Show Toast
    </Button>
  );
}
