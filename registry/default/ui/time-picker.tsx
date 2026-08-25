"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select";

const MINUTES_PER_DAY = 24 * 60;

/** Parses `"HH:mm"` into minutes past midnight. Returns null when unparseable. */
const toMinutes = (value: string): number | null => {
  const match = /^(?<hours>\d{1,2}):(?<minutes>\d{2})$/u.exec(value.trim());

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

/** Formats minutes past midnight back into a locale-independent `"HH:mm"`. */
const toTimeString = (minutes: number): string => {
  const wrapped = ((minutes % MINUTES_PER_DAY) + MINUTES_PER_DAY) % MINUTES_PER_DAY;

  return `${String(Math.floor(wrapped / 60)).padStart(2, "0")}:${String(wrapped % 60).padStart(2, "0")}`;
};

export interface TimePickerProps {
  /** Class names merged onto the trigger. */
  className?: string;
  /** Disables the control. */
  disabled?: boolean;
  /**
   * Force a 12- or 24-hour display. Defaults to whatever the locale itself
   * prefers, so an `en-GB` user is not shown AM/PM.
   */
  hour12?: boolean;
  /** Id applied to the trigger, for a `FieldLabel htmlFor`. */
  id?: string;
  /**
   * BCP 47 locale used for display only. Defaults to `navigator.language`. Pass
   * it explicitly when the control is server-rendered, so the server and the
   * client format the same string.
   */
  locale?: string;
  /** Latest selectable time as `"HH:mm"`, inclusive. */
  max?: string;
  /** Earliest selectable time as `"HH:mm"`, inclusive. */
  min?: string;
  /** Called with the new `"HH:mm"` value. */
  onValueChange?: (value: string) => void;
  /** Shown on the trigger while no time is selected. */
  placeholder?: string;
  /** Field height and text size. `"sm"` matches a 40px icon button. */
  size?: "default" | "sm";
  /** Minutes between options. */
  step?: number;
  /** Selected time as a 24-hour `"HH:mm"` string. */
  value?: string;
}

/**
 * Resolving the host locale during render makes the server and the client
 * disagree — Node's ICU default is rarely the browser's — so every
 * server-rendered time is a hydration mismatch. The probe is deferred until
 * after hydration; until then the raw 24-hour value is rendered, which is
 * identical on both sides. Pass `locale` (or `hour12`) to skip the deferral
 * and get a stable string from the first paint.
 */
const subscribeToHydration = () => () => {
  // never changes after mount
};

const useIsHydrated = () =>
  React.useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false,
  );

/**
 * `navigator.language`, not `Intl`'s default locale. Chrome derives the latter
 * from the browser's UI language, which on macOS routinely disagrees with the
 * language the user actually asked pages to be in: a browser reporting
 * `en-US` still resolves `Intl.DateTimeFormat()` to `en-GB`, and renders 24-hour
 * times to someone who has only ever asked for American English. Returns
 * undefined off the browser so `Intl` keeps its own default there.
 */
const hostLocale = (): string | undefined =>
  typeof navigator === "undefined" ? undefined : navigator.languages?.[0] || navigator.language;

const TimePicker = ({
  className,
  disabled = false,
  hour12,
  id,
  locale,
  max = "23:45",
  min = "00:00",
  onValueChange,
  placeholder = "Select a time",
  size = "default",
  step = 15,
  value,
}: TimePickerProps) => {
  const isHydrated = useIsHydrated();
  const canLocalize = locale !== undefined || isHydrated;

  const formatter = React.useMemo(() => {
    if (!canLocalize) {
      return null;
    }

    const resolved = locale ?? hostLocale();
    const resolvedHour12 =
      hour12 ??
      new Intl.DateTimeFormat(resolved, { hour: "numeric" }).resolvedOptions().hour12 ??
      false;

    return new Intl.DateTimeFormat(resolved, {
      hour: "numeric",
      hour12: resolvedHour12,
      minute: "2-digit",
    });
  }, [canLocalize, hour12, locale]);

  const format = React.useCallback(
    (time: string) => {
      const minutes = toMinutes(time);

      if (minutes === null || formatter === null) {
        return time;
      }

      return formatter.format(new Date(2000, 0, 1, Math.floor(minutes / 60), minutes % 60));
    },
    [formatter],
  );

  const options = React.useMemo(() => {
    const start = toMinutes(min) ?? 0;
    const end = toMinutes(max) ?? MINUTES_PER_DAY - 1;
    const interval = Math.max(1, Math.round(step));
    const minutes: number[] = [];

    for (let minute = start; minute <= end; minute += interval) {
      minutes.push(minute);
    }

    // A caller's value that is off the step grid — a time saved before `step`
    // changed, say — is still a real answer, so it joins the list rather than
    // silently disappearing from the trigger.
    const current = value === undefined ? null : toMinutes(value);

    if (current !== null && !minutes.includes(current)) {
      minutes.push(current);
      minutes.sort((a, b) => a - b);
    }

    return minutes.map(toTimeString);
  }, [max, min, step, value]);

  return (
    <Select disabled={disabled} onValueChange={onValueChange} value={value}>
      {/* `font-mono` is what actually swaps the family here and on the items
          below: `tabular-figures` sets one too, but the `font-sans` baked into
          the trigger and the item outranks it, and only `font-mono` is in a
          twMerge group that drops it. */}
      <SelectTrigger
        className={cn("font-mono tabular-figures", size === "sm" && "pr-2.5 text-sm", className)}
        id={id}
        size={size}
      >
        <SelectValue placeholder={placeholder}>
          {(selected: string | null) => (selected ? format(selected) : placeholder)}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem
            className={cn("font-mono tabular-figures", size === "sm" && "text-sm")}
            key={option}
            value={option}
          >
            {format(option)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export { TimePicker };
