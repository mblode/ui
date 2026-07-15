"use client";

import { CalendarIcon } from "blode-icons-react";
import { addDays, format } from "date-fns";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { Button } from "@/registry/default/ui/button";
import { Calendar } from "@/registry/default/ui/calendar";
import { Field, FieldLabel } from "@/registry/default/ui/field";
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/default/ui/popover";

export const DatePickerWithRange = () => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 20),
    to: addDays(new Date(new Date().getFullYear(), 0, 20), 20),
  });

  const renderDateLabel = () => {
    if (!date?.from) {
      return <span>Pick a date</span>;
    }
    if (date.to) {
      return (
        <>
          {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
        </>
      );
    }
    return format(date.from, "LLL dd, y");
  };

  return (
    <Field className="mx-auto w-60">
      <FieldLabel htmlFor="date-picker-range">Date Picker Range</FieldLabel>
      <Popover>
        <PopoverTrigger
          render={
            <Button className="justify-start" id="date-picker-range" size="input" variant="input" />
          }
        >
          <CalendarIcon data-icon="inline-start" />
          {renderDateLabel()}
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto p-0">
          <Calendar
            defaultMonth={date?.from}
            mode="range"
            numberOfMonths={2}
            onSelect={setDate}
            selected={date}
          />
        </PopoverContent>
      </Popover>
    </Field>
  );
};
