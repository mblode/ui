import React from "react";
import { PhoneInput } from "@/registry/default/ui/phone-input";

export default function PhoneInputDemo() {
  const [value, setValue] = React.useState("");

  return (
    <div className="w-full max-w-sm space-y-4">
      <PhoneInput
        value={value}
        onChange={setValue}
        placeholder="Enter phone number"
        defaultCountry="US"
        className="w-full"
      />
      <div className="text-sm text-muted-foreground">
        {value
          ? `Phone number: ${value}`
          : "Enter a phone number to see it here"}
      </div>
    </div>
  );
}
