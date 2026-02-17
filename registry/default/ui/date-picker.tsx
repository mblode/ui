"use client";

import { Calendar1Icon, CircleXFilledIcon } from "@fingertip/icons";
import { format } from "date-fns";
import * as React from "react";
import { useCallback } from "react";
import { type OnSelectHandler } from "react-day-picker";

import { Button } from "./button";
import { Calendar, CalendarProps } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { cn } from "@/lib/utils";

type Props = CalendarProps & {
  date?: Date;
  setDate: (value: Date | undefined) => void;
  isClearable?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
};

export const DatePicker = ({
  date,
  setDate,
  isClearable,
  disabled,
  children,
  ...props
}: Props) => {
  const [open, setOpen] = React.useState(false);

  const onDateSelect = useCallback<OnSelectHandler<Date | undefined>>(
    (date) => {
      setDate(date);
      setOpen(false);
    },
    [setDate],
  );

  return (
    <Popover
      open={open}
      onOpenChange={(value) => {
        if (value && !disabled) {
          setOpen(value);
        }
      }}
    >
      {children ? (
        <PopoverTrigger asChild>{children}</PopoverTrigger>
      ) : (
        <PopoverTrigger asChild>
          <div className="relative flex items-center">
            <Button
              type="button"
              variant="input"
              disabled={disabled}
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground",
              )}
            >
              <Calendar1Icon className="mr-2 size-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>

            {!!date && isClearable && (
              <Button
                type="button"
                variant="ghost"
                onClick={() => setDate(undefined)}
                className="absolute right-0 top-0 flex flex-row gap-1 pr-3"
              >
                <CircleXFilledIcon className="size-5 text-muted-foreground/50" />
              </Button>
            )}
          </div>
        </PopoverTrigger>
      )}

      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          {...props}
          mode="single"
          selected={date}
          onSelect={onDateSelect}
        />
      </PopoverContent>
    </Popover>
  );
};
