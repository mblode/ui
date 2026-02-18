"use client";

import { useState } from "react";

import { Label } from "@/registry/default/ui/label";
import { PhoneInput } from "@/registry/default/ui/phone-input";

export default function PhoneInputDemo() {
  const [value, setValue] = useState("");

  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="account-phone">Account phone</Label>
      <PhoneInput
        className="w-full"
        clearable
        defaultCountry="US"
        id="account-phone"
        onChange={setValue}
        onClear={() => setValue("")}
        placeholder="Enter account phone"
        value={value}
      />
      <p className="text-muted-foreground text-sm">
        {value
          ? `Stored as E.164: ${value}`
          : "Used for login recovery and billing alerts."}
      </p>
    </div>
  );
}
