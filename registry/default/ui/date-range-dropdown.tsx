"use client";
import { Calendar1Icon } from "@fingertip/icons";
import { format, startOfYear, subDays, subMonths } from "date-fns";
import { useState } from "react";
import { DateRange } from "react-day-picker";

import { Button } from "./button";
import { cn } from "@/lib/utils";

import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

export type DateRangeOption = {
  id: string;
  label: string;
  value?: DateRange;
};

type Props = {
  dateRangeOption?: DateRangeOption;
  setDateRangeOption: (option: DateRangeOption) => void;
  options: DateRangeOption[];
  fromDate?: Date;
} & React.HTMLAttributes<HTMLDivElement>;

export const presets: DateRangeOption[] = [
  {
    id: "24_HOURS",
    label: "Last 24 hours",
    value: {
      from: subDays(new Date(), 1),
      to: new Date(),
    },
  },
  {
    id: "7_DAYS",
    label: "Last 7 days",
    value: {
      from: subDays(new Date(), 7),
      to: new Date(),
    },
  },
  {
    id: "30_DAYS",
    label: "Last 30 days",
    value: {
      from: subDays(new Date(), 30),
      to: new Date(),
    },
  },
  {
    id: "3_MONTHS",
    label: "Last 3 months",
    value: {
      from: subMonths(new Date(), 3),
      to: new Date(),
    },
  },
  {
    id: "YEAR_TO_DATE",
    label: "Year to date",
    value: {
      from: startOfYear(new Date()),
      to: new Date(),
    },
  },
  {
    id: "12_MONTHS",
    label: "Last 12 months",
    value: {
      from: subMonths(new Date(), 12),
      to: new Date(),
    },
  },
  {
    id: "ALL_TIME",
    label: "All time",
    value: {
      from: new Date(2022, 0, 1),
      to: new Date(),
    },
  },
];

export const DateRangeDropdown = ({
  dateRangeOption,
  setDateRangeOption,
  options,
  className,
  fromDate,
}: Props) => {
  const [tempDateRangeOption, setTempDateRangeOption] = useState<
    DateRangeOption | undefined
  >(dateRangeOption);

  const handlePresetChange = (value: string) => {
    const preset = options.find((p) => p.id === value);
    if (!preset?.value?.from || !preset?.value?.to) return;

    const adjustedValue = {
      from:
        fromDate && preset.value.from < fromDate ? fromDate : preset.value.from,
      to: preset.value.to,
    };

    setTempDateRangeOption({
      ...preset,
      value: adjustedValue,
    });
  };

  const handleDateRangeChange = (range: DateRange | undefined) => {
    if (!range) {
      setTempDateRangeOption({
        id: "custom",
        label: "Custom range",
        value: undefined,
      });
      return;
    }

    const adjustedRange = {
      from:
        fromDate && range.from && range.from < fromDate ? fromDate : range.from,
      to: range.to,
    };

    setTempDateRangeOption({
      id: "custom",
      label: "Custom range",
      value: adjustedRange,
    });
  };

  const handleApply = () => {
    if (!tempDateRangeOption?.value?.from || !tempDateRangeOption?.value?.to) {
      return;
    }

    setDateRangeOption(tempDateRangeOption);
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="input"
            className={cn(
              "w-full justify-start text-left font-normal",
              !tempDateRangeOption?.value && "text-muted-foreground",
            )}
          >
            <Calendar1Icon className="mr-2 size-4 shrink-0" />
            {tempDateRangeOption?.value?.from ? (
              tempDateRangeOption.value.to ? (
                <>
                  {format(tempDateRangeOption.value.from, "MMM do, yyyy")} -{" "}
                  {format(tempDateRangeOption.value.to, "MMM do, yyyy")}
                </>
              ) : (
                format(tempDateRangeOption.value.from, "MMM do, yyyy")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto" align="start">
          <Select
            onValueChange={handlePresetChange}
            value={tempDateRangeOption?.id}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select preset range" />
            </SelectTrigger>

            <SelectContent position="popper">
              {options.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.label}
                </SelectItem>
              ))}

              {tempDateRangeOption?.id === "custom" && (
                <SelectItem value="custom">Custom</SelectItem>
              )}
            </SelectContent>
          </Select>

          <div className="mt-4">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={tempDateRangeOption?.value?.from}
              selected={tempDateRangeOption?.value}
              onSelect={handleDateRangeChange}
              numberOfMonths={1}
              fromDate={fromDate}
              className="p-0"
            />
          </div>

          <div className="mt-4 flex justify-end">
            <Button
              onClick={handleApply}
              disabled={
                !tempDateRangeOption?.value?.from ||
                !tempDateRangeOption?.value?.to
              }
            >
              Apply
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
