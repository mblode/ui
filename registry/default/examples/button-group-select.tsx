"use client";

import { ArrowRightIcon } from "blode-icons-react";
import { useState } from "react";

import { Button } from "@/registry/default/ui/button";
import { ButtonGroup } from "@/registry/default/ui/button-group";
import { Input } from "@/registry/default/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/registry/default/ui/select";

const CURRENCIES = [
  {
    value: "$",
    label: "US Dollar",
  },
  {
    value: "€",
    label: "Euro",
  },
  {
    value: "£",
    label: "British Pound",
  },
];

export default function ButtonGroupSelect() {
  const [currency, setCurrency] = useState("$");

  return (
    <ButtonGroup>
      <ButtonGroup>
        <Select onValueChange={setCurrency} value={currency}>
          <SelectTrigger className="font-mono">{currency}</SelectTrigger>
          <SelectContent className="min-w-24">
            {CURRENCIES.map((currency) => (
              <SelectItem key={currency.value} value={currency.value}>
                {currency.value}{" "}
                <span className="text-muted-foreground">{currency.label}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input pattern="[0-9]*" placeholder="10.00" />
      </ButtonGroup>
      <ButtonGroup>
        <Button aria-label="Send" size="icon" variant="outline">
          <ArrowRightIcon />
        </Button>
      </ButtonGroup>
    </ButtonGroup>
  );
}
