"use client";

import { useState } from "react";

import { PhoneInput } from "@/registry/default/ui/phone-input";

export default function PhoneInputDemo() {
  const [value, setValue] = useState("");

  return (
    <div className="w-full max-w-sm space-y-4">
      <PhoneInput
        className="w-full"
        defaultCountry="US"
        onChange={setValue}
        placeholder="Enter phone number"
        value={value}
      />
      <p className="text-muted-foreground text-sm">
        {value
          ? `Phone number: ${value}`
          : "Enter a phone number to see the E.164 value."}
      </p>
    </div>
  );
}
