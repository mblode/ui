"use client";

import { useState } from "react";

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
          decimalSeparator="."
          decimalsLimit={2}
          groupSeparator=","
          id="amount"
          name="amount"
          onValueChange={handleValueChange}
          placeholder="Enter an amount"
          prefix="$"
          value={value}
        />
      </div>
      <div className="flex flex-col space-y-2">
        <Label htmlFor="customized">Customized</Label>
        <CurrencyInput
          decimalSeparator=","
          decimalsLimit={2}
          groupSeparator="."
          id="customized"
          name="customized"
          placeholder="Enter an amount (€)"
          prefix="€"
          suffix=" EUR"
        />
      </div>
      <div className="flex flex-col space-y-2">
        <Label htmlFor="clearable">Clearable</Label>
        <CurrencyInput
          clearable
          decimalSeparator="."
          decimalsLimit={2}
          defaultValue="100.00"
          groupSeparator=","
          id="clearable"
          name="clearable"
          onClear={() => setValue(undefined)}
          placeholder="Enter an amount"
          prefix="$"
        />
      </div>
    </div>
  );
}
