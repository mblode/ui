import React from "react";
import { PhoneInput } from "@/registry/default/ui/phone-input";

export default function PhoneInputClearable() {
  const [value, setValue] = React.useState("+14155552671");

  const handleClear = React.useCallback(() => {
    setValue("");
  }, []);

  return (
    <div className="w-full max-w-sm space-y-4">
      <PhoneInput
        value={value}
        onChange={setValue}
        placeholder="Enter phone number"
        defaultCountry="US"
        clearable
        onClear={handleClear}
        className="w-full"
      />
      <div className="text-sm text-muted-foreground">
        {value ? `Phone number: ${value}` : "Phone number cleared"}
      </div>
    </div>
  );
}
