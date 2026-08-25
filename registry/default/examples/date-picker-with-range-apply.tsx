"use client";

import { CalendarIcon } from "blode-icons-react";
import { addDays, format } from "date-fns";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { Button } from "@/registry/default/ui/button";
import { Calendar } from "@/registry/default/ui/calendar";
import { Field, FieldLabel } from "@/registry/default/ui/field";
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/default/ui/popover";
import { Separator } from "@/registry/default/ui/separator";

const INITIAL_RANGE: DateRange = {
  from: new Date(new Date().getFullYear(), 0, 20),
  to: addDays(new Date(new Date().getFullYear(), 0, 20), 20),
};

const formatRange = (range: DateRange | undefined) => {
  if (!range?.from) {
    return "Pick a date";
  }
  if (range.to) {
    return `${format(range.from, "LLL dd, y")} - ${format(range.to, "LLL dd, y")}`;
  }
  return format(range.from, "LLL dd, y");
};

export const DatePickerWithRangeApply = () => {
  const [open, setOpen] = useState(false);
  // The committed value. Only Apply writes to it.
  const [applied, setApplied] = useState<DateRange | undefined>(INITIAL_RANGE);
  // The staged value the calendar edits.
  const [draft, setDraft] = useState<DateRange | undefined>(INITIAL_RANGE);

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      setDraft(applied);
    }
    setOpen(nextOpen);
  };

  return (
    <Field className="mx-auto w-60">
      <FieldLabel htmlFor="date-picker-range-apply">Reporting period</FieldLabel>
      <Popover onOpenChange={handleOpenChange} open={open}>
        <PopoverTrigger
          render={
            <Button
              className="justify-start"
              id="date-picker-range-apply"
              size="input"
              variant="input"
            />
          }
        >
          <CalendarIcon data-icon="inline-start" />
          {formatRange(applied)}
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto p-0">
          <Calendar
            defaultMonth={draft?.from}
            mode="range"
            numberOfMonths={2}
            onSelect={setDraft}
            selected={draft}
          />
          <Separator />
          <div className="flex items-center justify-between gap-2 p-3">
            <output aria-live="polite" className="text-muted-foreground text-sm">
              {formatRange(draft)}
            </output>
            <div className="flex gap-2">
              <Button onClick={() => setDraft(applied)} size="sm" variant="outline">
                Reset
              </Button>
              <Button
                onClick={() => {
                  setApplied(draft);
                  setOpen(false);
                }}
                size="sm"
              >
                Apply
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </Field>
  );
};
