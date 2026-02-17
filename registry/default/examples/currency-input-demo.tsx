import React, { useState } from "react";
import { CurrencyInput } from "@/registry/default/ui/currency-input";
import { Label } from "@/registry/default/ui/label";

export default function CurrencyInputDemo() {
  const [value, setValue] = useState<string | undefined>("1234.56");

  const handleValueChange = (value: string | undefined) => {
    setValue(value);
  };

  return (
    <div className="grid w-full gap-6">
      <div className="flex flex-col space-y-2">
        <Label htmlFor="amount">Amount</Label>
        <CurrencyInput
          id="amount"
          name="amount"
          placeholder="Enter an amount"
          prefix="$"
          groupSeparator=","
          decimalSeparator="."
          decimalsLimit={2}
          value={value}
          onValueChange={handleValueChange}
        />
      </div>
      <div className="flex flex-col space-y-2">
        <Label htmlFor="customized">Customized</Label>
        <CurrencyInput
          id="customized"
          name="customized"
          placeholder="Enter an amount (€)"
          prefix="€"
          suffix=" EUR"
          groupSeparator="."
          decimalSeparator=","
          decimalsLimit={2}
        />
      </div>
      <div className="flex flex-col space-y-2">
        <Label htmlFor="clearable">Clearable</Label>
        <CurrencyInput
          id="clearable"
          name="clearable"
          placeholder="Enter an amount"
          prefix="$"
          groupSeparator=","
          decimalSeparator="."
          decimalsLimit={2}
          defaultValue="100.00"
          clearable
          onClear={() => console.log("Value cleared")}
        />
      </div>
    </div>
  );
}
