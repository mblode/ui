import React from "react";
import { PhoneInput } from "@/registry/default/ui/phone-input";

export default function PhoneInputDisabled() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <PhoneInput
        disabled
        defaultCountry="US"
        placeholder="Phone number disabled"
        className="w-full"
      />
    </div>
  );
}
