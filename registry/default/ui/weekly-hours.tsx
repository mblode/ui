"use client";

import { PlusIcon, SquareBehindSquare1Icon, XIcon } from "blode-icons-react";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/registry/default/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/default/ui/dropdown-menu";
import { Field, FieldError } from "@/registry/default/ui/field";
import { Switch } from "@/registry/default/ui/switch";
import { TimePicker } from "@/registry/default/ui/time-picker";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/default/ui/tooltip";

/** A single opening interval, as 24-hour `"HH:mm"` strings. */
interface TimeRange {
  /** Exclusive end of the interval. Must be later in the day than `start`. */
  end: string;
  /** Inclusive start of the interval. */
  start: string;
}

/** Days of the week, keyed the way `Date.prototype.getDay()` numbers them. */
type Weekday = "friday" | "monday" | "saturday" | "sunday" | "thursday" | "tuesday" | "wednesday";

/** Opening hours for a whole week. An empty array means the day is closed. */
type WeeklyHoursValue = Record<Weekday, TimeRange[]>;

/** Every user-visible and assistive-technology string the component renders. */
interface WeeklyHoursLabels {
  /** Accessible name of the add-range button. */
  addRange: (day: string) => string;
  /** Tooltip on the add-range button. Must be a substring of `addRange`. */
  addRangeShort: string;
  /** Action that copies the day's ranges onto the checked days. */
  copyApply: string;
  /** Accessible name of the copy-to-other-days trigger. Must contain `copyToHeading`. */
  copyTo: (day: string) => string;
  /**
   * Heading inside the copy-to-other-days menu, and the tooltip on its trigger.
   * Must be a substring of `copyTo`, so the visible text is contained in the
   * accessible name.
   */
  copyToHeading: string;
  /** Display name for each weekday. */
  days: Record<Weekday, string>;
  /** Error shown when a range ends at or before it starts. */
  endBeforeStart: string;
  /** Accessible name of the end-time picker. */
  endTime: (day: string) => string;
  /** Placeholder shown on a day with no ranges. */
  noHours: string;
  /** Error shown when two ranges on the same day overlap. */
  overlap: string;
  /** Accessible name of the remove-range button. */
  removeRange: (day: string, start: string, end: string) => string;
  /** Tooltip on the remove-range button. Must be a substring of `removeRange`. */
  removeRangeShort: string;
  /** Toggles every target day in the copy menu at once. */
  selectAll: string;
  /** Accessible name of the start-time picker. */
  startTime: (day: string) => string;
}

interface WeeklyHoursProps extends Omit<React.ComponentProps<"div">, "onChange"> {
  /** Disables every control. */
  disabled?: boolean;
  /**
   * Force a 12- or 24-hour display on the time pickers. Defaults to whatever
   * the locale itself prefers, so an `en-GB` user is not shown AM/PM.
   */
  hour12?: boolean;
  /** Overrides for the built-in English strings. */
  labels?: Partial<WeeklyHoursLabels>;
  /**
   * BCP 47 locale the time pickers display in. Defaults to `navigator.language`.
   * Pass it explicitly when the component is server-rendered, so the server and
   * the client format the same string.
   */
  locale?: string;
  /** Caps how many ranges a single day may hold. Defaults to 4. */
  maxRangesPerDay?: number;
  /** Called with the next week whenever the user edits it. */
  onValueChange: (value: WeeklyHoursValue) => void;
  /** Granularity of the time pickers, in minutes. Defaults to 15. */
  step?: number;
  /** The controlled week. */
  value: WeeklyHoursValue;
  /** First column of the week, numbered like `getDay()`. Defaults to 1 (Monday). */
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

const MINUTES_IN_DAY = 24 * 60;
const LAST_MINUTE_OF_DAY = MINUTES_IN_DAY - 1;
const DEFAULT_RANGE: TimeRange = { end: "17:00", start: "09:00" };
const DEFAULT_RANGE_LENGTH = 60;

/** Indexed to match `Date.prototype.getDay()`. */
const WEEKDAYS: Weekday[] = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

/**
 * Returns null rather than NaN for anything unparseable. NaN would make every
 * comparison below false, so a malformed range would silently read as valid.
 */
const toMinutes = (time: string): number | null => {
  const match = /^(?<hours>\d{1,2}):(?<minutes>\d{2})$/u.exec(time.trim());
  if (!match?.groups) {
    return null;
  }
  const hours = Number(match.groups.hours);
  const minutes = Number(match.groups.minutes);
  if (hours > 23 || minutes > 59) {
    return null;
  }
  return hours * 60 + minutes;
};

const toTime = (minutes: number) => {
  const clamped = Math.max(0, Math.min(LAST_MINUTE_OF_DAY, Math.round(minutes)));
  const hours = Math.floor(clamped / 60);
  return `${String(hours).padStart(2, "0")}:${String(clamped % 60).padStart(2, "0")}`;
};

/** Locale-independent so the server and client render the same aria-label. */
const formatTime = (time: string) => {
  const total = toMinutes(time);
  if (total === null) {
    return time;
  }
  const hours = Math.floor(total / 60);
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;
  const minutes = String(total % 60).padStart(2, "0");
  return `${hour12}:${minutes} ${hours < 12 ? "AM" : "PM"}`;
};

const DEFAULT_LABELS: WeeklyHoursLabels = {
  addRange: (day) => `Add hours for ${day}`,
  addRangeShort: "Add hours",
  copyApply: "Copy hours",
  copyTo: (day) => `Copy times to other days from ${day}`,
  copyToHeading: "Copy times to",
  days: {
    friday: "Friday",
    monday: "Monday",
    saturday: "Saturday",
    sunday: "Sunday",
    thursday: "Thursday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
  },
  endBeforeStart: "End time must be later in the day than the start time.",
  endTime: (day) => `${day} end time`,
  noHours: "Closed",
  overlap: "These hours overlap another range on the same day.",
  removeRange: (day, start, end) => `Remove ${formatTime(start)} to ${formatTime(end)} on ${day}`,
  removeRangeShort: "Remove",
  selectAll: "Select all",
  startTime: (day) => `${day} start time`,
};

/**
 * Presentational validation only — never mutates the caller's value. Ranges are
 * treated as same-day intervals, so anything that would cross midnight reads as
 * an end-before-start error rather than wrapping around.
 */
const getRangeErrors = (ranges: TimeRange[], labels: WeeklyHoursLabels) => {
  const errors: (string | undefined)[] = Array.from({ length: ranges.length });

  for (const [index, range] of ranges.entries()) {
    const start = toMinutes(range.start);
    const end = toMinutes(range.end);
    if (start === null || end === null || end <= start) {
      errors[index] = labels.endBeforeStart;
    }
  }

  for (let i = 0; i < ranges.length; i += 1) {
    for (let j = i + 1; j < ranges.length; j += 1) {
      if (errors[i] === labels.endBeforeStart || errors[j] === labels.endBeforeStart) {
        continue;
      }
      const aStart = toMinutes(ranges[i].start);
      const aEnd = toMinutes(ranges[i].end);
      const bStart = toMinutes(ranges[j].start);
      const bEnd = toMinutes(ranges[j].end);
      if (aStart === null || aEnd === null || bStart === null || bEnd === null) {
        continue;
      }
      if (aStart < bEnd && bStart < aEnd) {
        // Flag the range that starts later, so the earlier one still reads as settled.
        errors[aStart <= bStart ? j : i] = labels.overlap;
      }
    }
  }

  return errors;
};

/**
 * Earliest time the end picker may offer, so a range that ends at or before it
 * starts is unrepresentable through the UI. Returns undefined near midnight,
 * where there is no later slot to constrain to. `getRangeErrors` still runs:
 * a caller's value can be anything, and this only narrows the picker.
 *
 * Snaps up to the next slot on the step grid rather than adding `step` to the
 * start. A start that sits off the grid — a time saved before `step` changed —
 * would otherwise shift every option off it too, leaving nothing clean to pick.
 */
const minEnd = (start: string, step: number): string | undefined => {
  const startMinutes = toMinutes(start);
  if (startMinutes === null) {
    return undefined;
  }
  const interval = Math.max(1, Math.round(step));
  const next = Math.floor(startMinutes / interval) * interval + interval;
  if (next > LAST_MINUTE_OF_DAY) {
    return undefined;
  }
  return toTime(next);
};

/** Next sensible range: an hour after the last one ends, clamped to the day. */
const nextRange = (ranges: TimeRange[]): TimeRange | null => {
  const last = ranges.at(-1);
  if (!last) {
    return { ...DEFAULT_RANGE };
  }
  const start = toMinutes(last.end);
  if (start === null || start >= LAST_MINUTE_OF_DAY) {
    return null;
  }
  return { end: toTime(start + DEFAULT_RANGE_LENGTH), start: toTime(start) };
};

interface WeeklyHoursDayProps {
  day: Weekday;
  disabled?: boolean;
  hour12?: boolean;
  labels: WeeklyHoursLabels;
  locale?: string;
  maxRangesPerDay: number;
  onCopy: (targets: Weekday[]) => void;
  onRangesChange: (ranges: TimeRange[]) => void;
  orderedDays: Weekday[];
  ranges: TimeRange[];
  step: number;
}

const WeeklyHoursDay = ({
  day,
  disabled,
  hour12,
  labels,
  locale,
  maxRangesPerDay,
  onCopy,
  onRangesChange,
  orderedDays,
  ranges,
  step,
}: WeeklyHoursDayProps) => {
  const groupId = React.useId();
  const fieldId = React.useId();
  const addRef = React.useRef<HTMLButtonElement>(null);
  const switchRef = React.useRef<HTMLButtonElement>(null);
  const [copyOpen, setCopyOpen] = React.useState(false);
  const [copyTargets, setCopyTargets] = React.useState<Weekday[]>([]);

  const dayLabel = labels.days[day];
  const isOpen = ranges.length > 0;
  const errors = getRangeErrors(ranges, labels);
  const candidate = nextRange(ranges);
  const canAdd = !disabled && ranges.length < maxRangesPerDay && candidate !== null;
  const targetDays = orderedDays.filter((other) => other !== day);

  const handleToggle = (checked: boolean) => {
    onRangesChange(checked ? [{ ...DEFAULT_RANGE }] : []);
  };

  const handleRangeChange = (index: number, patch: Partial<TimeRange>) => {
    onRangesChange(ranges.map((range, i) => (i === index ? { ...range, ...patch } : range)));
  };

  const handleAdd = () => {
    if (!candidate) {
      return;
    }
    onRangesChange([...ranges, candidate]);
  };

  const handleRemove = (index: number) => {
    const next = ranges.filter((_, i) => i !== index);
    onRangesChange(next);
    // Removing the row that held focus would otherwise drop it on <body>.
    requestAnimationFrame(() => {
      if (next.length > 0) {
        addRef.current?.focus();
      } else {
        switchRef.current?.focus();
      }
    });
  };

  const handleApplyCopy = () => {
    if (copyTargets.length > 0) {
      onCopy(copyTargets);
    }
    setCopyOpen(false);
  };

  return (
    <fieldset
      className="flex min-w-0 flex-col gap-3 border-border border-b py-4 last:border-b-0 @min-[34rem]:flex-row @min-[34rem]:flex-wrap"
      data-slot="weekly-hours-day"
    >
      <legend className="sr-only">{dayLabel}</legend>
      <div className="flex shrink-0 items-center gap-3 @min-[34rem]:h-[var(--field-height-sm)] @min-[34rem]:w-32">
        <Switch
          aria-labelledby={groupId}
          checked={isOpen}
          disabled={disabled}
          onCheckedChange={handleToggle}
          ref={switchRef}
        />
        <span className="font-medium text-sm" id={groupId}>
          {dayLabel}
        </span>
      </div>

      {isOpen ? (
        <div className="flex min-w-0 flex-col gap-2 @min-[34rem]:min-w-fit @min-[34rem]:flex-1">
          {ranges.map((range, index) => (
            <Field
              aria-invalid={Boolean(errors[index])}
              className="min-w-0 gap-1.5"
              data-invalid={!!errors[index]}
              data-slot="weekly-hours-range"
              // Ranges are positional and two rows can hold identical times,
              // so the index is the only stable identity available here.
              // biome-ignore lint/suspicious/noArrayIndexKey: positional rows
              key={index}
            >
              <div className="flex min-w-0 items-center gap-1.5 tabular-figures">
                <label className="sr-only" htmlFor={`${fieldId}-${index}-start`}>
                  {labels.startTime(dayLabel)}
                </label>
                <TimePicker
                  className="flex-1 whitespace-nowrap pl-3"
                  size="sm"
                  disabled={disabled}
                  hour12={hour12}
                  id={`${fieldId}-${index}-start`}
                  locale={locale}
                  onValueChange={(start) => handleRangeChange(index, { start })}
                  step={step}
                  value={range.start}
                />
                <span
                  aria-hidden="true"
                  className="h-0.5 w-1.5 shrink-0 rounded-full bg-muted-foreground"
                />
                <label className="sr-only" htmlFor={`${fieldId}-${index}-end`}>
                  {labels.endTime(dayLabel)}
                </label>
                <TimePicker
                  className="flex-1 whitespace-nowrap pl-3"
                  size="sm"
                  disabled={disabled}
                  hour12={hour12}
                  id={`${fieldId}-${index}-end`}
                  locale={locale}
                  min={minEnd(range.start, step)}
                  onValueChange={(end) => handleRangeChange(index, { end })}
                  step={step}
                  value={range.end}
                />
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <Button
                        aria-label={labels.removeRange(dayLabel, range.start, range.end)}
                        className="shrink-0"
                        disabled={disabled}
                        onClick={() => handleRemove(index)}
                        size="icon"
                        type="button"
                        variant="ghost"
                      />
                    }
                  >
                    <XIcon />
                  </TooltipTrigger>
                  <TooltipContent>{labels.removeRangeShort}</TooltipContent>
                </Tooltip>
              </div>
              {errors[index] && <FieldError>{errors[index]}</FieldError>}
            </Field>
          ))}
        </div>
      ) : (
        <div className="flex min-w-0 items-center @min-[34rem]:h-[var(--field-height-sm)]">
          <span className="text-muted-foreground text-sm">{labels.noHours}</span>
        </div>
      )}

      <div className="flex shrink-0 items-start gap-2 @min-[34rem]:ms-auto @min-[34rem]:h-[var(--field-height-sm)] @min-[34rem]:items-center">
        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                aria-label={labels.addRange(dayLabel)}
                disabled={!canAdd}
                onClick={handleAdd}
                ref={addRef}
                size="icon"
                type="button"
                variant="outline"
              />
            }
          >
            <PlusIcon />
          </TooltipTrigger>
          <TooltipContent>{labels.addRangeShort}</TooltipContent>
        </Tooltip>

        <DropdownMenu
          onOpenChange={(open) => {
            setCopyOpen(open);
            if (!open) {
              setCopyTargets([]);
            }
          }}
          open={copyOpen}
        >
          <Tooltip>
            <DropdownMenuTrigger
              render={
                <TooltipTrigger
                  render={
                    <Button
                      aria-label={labels.copyTo(dayLabel)}
                      disabled={disabled || !isOpen}
                      size="icon"
                      type="button"
                      variant="outline"
                    />
                  }
                />
              }
            >
              <SquareBehindSquare1Icon />
            </DropdownMenuTrigger>
            <TooltipContent>{labels.copyToHeading}</TooltipContent>
          </Tooltip>
          <DropdownMenuContent align="end" className="w-auto min-w-56">
            {/* Base UI throws if a GroupLabel has no Group ancestor. */}
            <DropdownMenuGroup>
              <DropdownMenuLabel>{labels.copyToHeading}</DropdownMenuLabel>
              <DropdownMenuCheckboxItem
                checked={copyTargets.length === targetDays.length}
                closeOnClick={false}
                onCheckedChange={(checked) => setCopyTargets(checked ? targetDays : [])}
              >
                {labels.selectAll}
              </DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              {targetDays.map((target) => (
                <DropdownMenuCheckboxItem
                  checked={copyTargets.includes(target)}
                  closeOnClick={false}
                  key={target}
                  onCheckedChange={(checked) =>
                    setCopyTargets((current) =>
                      checked
                        ? [...current, target]
                        : current.filter((selected) => selected !== target),
                    )
                  }
                >
                  {labels.days[target]}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled={copyTargets.length === 0} onClick={handleApplyCopy}>
              {labels.copyApply}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </fieldset>
  );
};

const WeeklyHours = ({
  className,
  disabled,
  hour12,
  labels: labelOverrides,
  locale,
  maxRangesPerDay = 4,
  onValueChange,
  step = 15,
  value,
  weekStartsOn = 1,
  ...props
}: WeeklyHoursProps) => {
  const labels = React.useMemo<WeeklyHoursLabels>(
    () => ({
      ...DEFAULT_LABELS,
      ...labelOverrides,
      days: { ...DEFAULT_LABELS.days, ...labelOverrides?.days },
    }),
    [labelOverrides],
  );

  const orderedDays = React.useMemo(
    () => Array.from({ length: 7 }, (_, i) => WEEKDAYS[(i + weekStartsOn) % 7]),
    [weekStartsOn],
  );

  return (
    <div className={cn("@container flex flex-col", className)} data-slot="weekly-hours" {...props}>
      {orderedDays.map((day) => (
        <WeeklyHoursDay
          day={day}
          disabled={disabled}
          hour12={hour12}
          key={day}
          labels={labels}
          locale={locale}
          maxRangesPerDay={maxRangesPerDay}
          onCopy={(targets) => {
            const next = { ...value };
            for (const target of targets) {
              next[target] = value[day].map((range) => ({ ...range }));
            }
            onValueChange(next);
          }}
          onRangesChange={(ranges) => onValueChange({ ...value, [day]: ranges })}
          orderedDays={orderedDays}
          ranges={value[day]}
          step={step}
        />
      ))}
    </div>
  );
};

export { WeeklyHours };
export type { TimeRange, Weekday, WeeklyHoursLabels, WeeklyHoursProps, WeeklyHoursValue };
