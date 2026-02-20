"use client";

import { useState } from "react";

import { CurrencyInput } from "@/registry/default/ui/currency-input";
import { Label } from "@/registry/default/ui/label";

export default function CurrencyInputDemo() {
  const [monthlyPrice, setMonthlyPrice] = useState<string | undefined>("29.00");
  const [credit, setCredit] = useState<string | undefined>("100.00");

  return (
    <div className="grid w-full max-w-md gap-6">
      <div className="space-y-1">
        <p className="font-medium text-sm">Billing settings</p>
        <p className="text-muted-foreground text-sm">
          Configure workspace pricing and account credits.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="monthly-price">Monthly price</Label>
        <CurrencyInput
          decimalSeparator="."
          decimalsLimit={2}
          groupSeparator=","
          id="monthly-price"
          name="monthlyPrice"
          onValueChange={(value) => setMonthlyPrice(value)}
          placeholder="Enter monthly price"
          prefix="$"
          value={monthlyPrice}
        />
        <p className="text-muted-foreground text-sm">
          Charged once per workspace each month.
        </p>
      </div>
    </div>
  );
}
