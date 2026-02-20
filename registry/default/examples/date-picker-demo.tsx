"use client";

import { ChevronDownIcon } from "blode-icons-react";
import { format } from "date-fns";
import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import { Calendar } from "@/registry/default/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/default/ui/popover";

export function DatePickerDemo() {
  const [date, setDate] = useState<Date>();

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            className="w-[212px] justify-between text-left data-[empty=true]:text-placeholder-foreground"
            data-empty={!date}
            size="input"
            variant="input"
          />
        }
      >
        {date ? format(date, "PPP") : <span>Pick a date</span>}
        <ChevronDownIcon data-icon="inline-end" />
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-0">
        <Calendar
          defaultMonth={date}
          mode="single"
          onSelect={setDate}
          selected={date}
        />
      </PopoverContent>
    </Popover>
  );
}
