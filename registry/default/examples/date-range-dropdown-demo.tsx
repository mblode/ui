"use client";

import * as React from "react";

import {
  DateRangeDropdown,
  presets,
} from "@/registry/default/ui/date-range-dropdown";
import { type DateRangeOption } from "@/registry/default/ui/date-range-dropdown";

export default function DateRangeDropdownDemo() {
  const [dateRangeOption, setDateRangeOption] = React.useState<DateRangeOption>(
    presets[2],
  );

  return (
    <div className="flex w-full max-w-sm flex-col">
      <DateRangeDropdown
        dateRangeOption={dateRangeOption}
        setDateRangeOption={setDateRangeOption}
        options={presets}
      />

      <div className="mt-4 text-sm text-muted-foreground">
        {dateRangeOption.value?.from && dateRangeOption.value?.to ? (
          <p>
            Selected: <strong>{dateRangeOption.label}</strong> from{" "}
            <strong>{dateRangeOption.value.from.toLocaleDateString()}</strong>{" "}
            to <strong>{dateRangeOption.value.to.toLocaleDateString()}</strong>
          </p>
        ) : (
          <p>No date range selected</p>
        )}
      </div>
    </div>
  );
}
