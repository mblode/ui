"use client";

import { Checkbox } from "@/registry/default/ui/checkbox";

export default function CheckboxWithText() {
  return (
    <div className="items-top flex gap-2">
      <Checkbox id="terms1" />
      <div className="grid gap-1.5 leading-none">
        <label
          className="font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          htmlFor="terms1"
        >
          Accept terms and conditions
        </label>
        <p className="text-muted-foreground text-sm">
          You agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
