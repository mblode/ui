"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import {
  Combobox,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
} from "@/registry/default/ui/combobox";

const MINUTE = 60_000;

/** One IANA zone, ready to render. */
export interface TimeZoneOption {
  /** Humanised city, e.g. `Sao Paulo`. Also what the input displays. */
  label: string;
  /** Short UTC offset, e.g. `GMT+11`. */
  offset: string;
  /** Readable identifier, e.g. `Pacific/Port Moresby`. */
  path: string;
  /** First path segment, e.g. `America`. */
  region: string;
  /** The IANA identifier, e.g. `America/Sao_Paulo`. */
  value: string;
}

interface TimeZoneGroup {
  items: TimeZoneOption[];
  value: string;
}

/** Fallback for engines without `Intl.supportedValuesOf`. */
const FALLBACK_TIME_ZONES = [
  "Africa/Cairo",
  "Africa/Johannesburg",
  "Africa/Lagos",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "America/New_York",
  "America/Sao_Paulo",
  "Asia/Dubai",
  "Asia/Kolkata",
  "Asia/Shanghai",
  "Asia/Singapore",
  "Asia/Tokyo",
  "Australia/Melbourne",
  "Australia/Sydney",
  "Europe/Berlin",
  "Europe/London",
  "Europe/Madrid",
  "Europe/Paris",
  "Pacific/Auckland",
  "UTC",
];

const supportedTimeZones = (): string[] => {
  const { supportedValuesOf } = Intl as unknown as {
    supportedValuesOf?: (key: string) => string[];
  };

  if (typeof supportedValuesOf !== "function") {
    return FALLBACK_TIME_ZONES;
  }

  try {
    return supportedValuesOf("timeZone");
  } catch {
    return FALLBACK_TIME_ZONES;
  }
};

/**
 * An omitted locale resolves against the browser's own UI locale, which tracks
 * the OS region rather than the languages the viewer asked to read in: Chrome
 * hands a reader on `en-US` the `en-GB` formats, and the column comes out
 * 24-hour for someone who has never chosen that. `navigator.languages` is the
 * list the page is actually being read in, so it is what decides between
 * `5:57 pm` and `17:57`.
 */
const preferredLocales = (): string[] | undefined => {
  if (typeof navigator === "undefined" || navigator.languages.length === 0) {
    return;
  }

  return [...navigator.languages];
};

/**
 * `Intl.DateTimeFormat` is expensive to construct and the list runs to roughly
 * four hundred rows, so one formatter per zone is built once and reused on
 * every open and every tick. `null` marks a zone this engine rejects.
 *
 * `timeStyle` rather than explicit `hour`/`minute`: it gives each locale its own
 * short time — `7:23 pm` where the locale is twelve-hour, `19:23` where it is
 * not. The two run to different widths, which is why the column is right
 * aligned rather than padded.
 */
const timeFormatters = new Map<string, Intl.DateTimeFormat | null>();

const timeFormatterFor = (timeZone: string): Intl.DateTimeFormat | null => {
  const cached = timeFormatters.get(timeZone);

  if (cached !== undefined) {
    return cached;
  }

  let formatter: Intl.DateTimeFormat | null = null;

  try {
    formatter = new Intl.DateTimeFormat(preferredLocales(), {
      timeStyle: "short",
      timeZone,
    });
  } catch {
    formatter = null;
  }

  timeFormatters.set(timeZone, formatter);

  return formatter;
};

const offsetOf = (timeZone: string, at: Date): string => {
  try {
    const parts = new Intl.DateTimeFormat(preferredLocales(), {
      timeZone,
      timeZoneName: "shortOffset",
    }).formatToParts(at);

    return parts.find((part) => part.type === "timeZoneName")?.value ?? "";
  } catch {
    return "";
  }
};

const localTimeIn = (timeZone: string, at: Date): string =>
  timeFormatterFor(timeZone)?.format(at) ?? "";

const toOption = (timeZone: string, at: Date): TimeZoneOption => {
  const segments = timeZone.split("/");

  return {
    label: (segments.at(-1) ?? timeZone).replaceAll("_", " "),
    offset: offsetOf(timeZone, at),
    path: timeZone.replaceAll("_", " "),
    region: segments.length > 1 ? segments[0] : "Other",
    value: timeZone,
  };
};

const noop = () => {
  // Nothing to unsubscribe from: the viewer's zone does not change at runtime,
  // and a closed picker has no clock to keep.
};

const noopSubscribe = () => noop;

/**
 * The tick is aligned to the next wall-clock minute rather than a naive 60s
 * interval, which would otherwise drift up to a minute behind the times on
 * screen. A clock is information rather than decoration, so it is not gated on
 * `prefers-reduced-motion`.
 */
const subscribeToMinute = (onChange: () => void) => {
  let interval: ReturnType<typeof setInterval> | undefined;

  const timeout = setTimeout(
    () => {
      onChange();
      interval = setInterval(onChange, MINUTE);
    },
    MINUTE - (Date.now() % MINUTE),
  );

  return () => {
    clearTimeout(timeout);

    if (interval) {
      clearInterval(interval);
    }
  };
};

/**
 * Minute-bucketed so the snapshot is stable between renders within a minute.
 * Only subscribes while the popup is open: the times are unmounted otherwise,
 * so a background timer would rerender the whole picker for nothing.
 */
const useMinuteClock = (active: boolean): Date | null => {
  const minute = React.useSyncExternalStore<number | null>(
    active ? subscribeToMinute : noopSubscribe,
    () => Math.floor(Date.now() / MINUTE),
    () => null,
  );

  return React.useMemo(() => (minute === null ? null : new Date(minute * MINUTE)), [minute]);
};

/**
 * Resolved through `useSyncExternalStore` rather than an effect: the server
 * renders `null`, because the host's zone is not the viewer's.
 */
const useLocalTimeZone = (): string | null =>
  React.useSyncExternalStore<string | null>(
    noopSubscribe,
    () => Intl.DateTimeFormat().resolvedOptions().timeZone,
    () => null,
  );

const optionToLabel = (option: TimeZoneOption) => option.label;
const optionToValue = (option: TimeZoneOption) => option.value;

export interface TimezonePickerProps {
  /** Accessible name, when no visible `FieldLabel` points at the input. */
  "aria-label"?: string;
  /** Id of the element labelling the input. */
  "aria-labelledby"?: string;
  /** Class names merged onto the input. */
  className?: string;
  /**
   * Initial IANA zone. Omit it and the picker resolves the viewer's own zone
   * after mount, which keeps the server and client markup identical.
   */
  defaultValue?: string;
  /** Disables the control. */
  disabled?: boolean;
  /** Id applied to the input, for a `FieldLabel htmlFor`. */
  id?: string;
  /** Field name, for native form submission of the IANA identifier. */
  name?: string;
  /**
   * Called with the selected IANA identifier. Also called once with the
   * viewer's own zone when the picker resolves it for an uncontrolled field.
   */
  onValueChange?: (value: string) => void;
  /** Shown while nothing is selected. */
  placeholder?: string;
  /** Explicit zone list. Defaults to `Intl.supportedValuesOf("timeZone")`. */
  timeZones?: string[];
  /** Selected IANA identifier. Use for a controlled picker. */
  value?: string;
}

const TimezonePicker = ({
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  className,
  defaultValue,
  disabled = false,
  id,
  name,
  onValueChange,
  placeholder = "Search time zones",
  timeZones,
  value,
}: TimezonePickerProps) => {
  const [open, setOpen] = React.useState(false);
  const now = useMinuteClock(open);
  const localTimeZone = useLocalTimeZone();
  const [uncontrolledValue, setUncontrolledValue] = React.useState<string | null>(
    defaultValue ?? null,
  );

  const isControlled = value !== undefined;
  const selectedValue = value ?? uncontrolledValue ?? localTimeZone;
  const announcedRef = React.useRef(false);

  /**
   * The viewer's zone cannot be known until after hydration, so the consumer is
   * told about it once it is. Without this the field shows a zone the parent's
   * own state has never heard of, and an untouched form submits nothing.
   */
  React.useEffect(() => {
    if (announcedRef.current || isControlled || uncontrolledValue !== null) {
      return;
    }

    if (localTimeZone === null) {
      return;
    }

    announcedRef.current = true;
    onValueChange?.(localTimeZone);
  }, [isControlled, localTimeZone, onValueChange, uncontrolledValue]);

  const groups = React.useMemo<TimeZoneGroup[]>(() => {
    // Built once per zone set. Offsets shift only at DST boundaries, which no
    // session outlives, so this does not rerun on every clock tick.
    const reference = new Date();
    const byRegion = new Map<string, TimeZoneOption[]>();

    for (const timeZone of timeZones ?? supportedTimeZones()) {
      const option = toOption(timeZone, reference);
      const bucket = byRegion.get(option.region);

      if (bucket) {
        bucket.push(option);
      } else {
        byRegion.set(option.region, [option]);
      }
    }

    return [...byRegion.entries()]
      .map(([region, items]) => ({
        items: items.toSorted((a, b) => a.label.localeCompare(b.label)),
        value: region,
      }))
      .toSorted((a, b) => a.value.localeCompare(b.value));
  }, [timeZones]);

  const selectedOption = React.useMemo(() => {
    if (!selectedValue) {
      return null;
    }

    for (const group of groups) {
      const match = group.items.find((item) => item.value === selectedValue);

      if (match) {
        return match;
      }
    }

    return toOption(selectedValue, new Date());
  }, [groups, selectedValue]);

  const filter = React.useCallback(
    (item: TimeZoneOption, query: string, itemToString?: (item: TimeZoneOption) => string) => {
      const needle = query.trim().toLowerCase();

      if (needle === "") {
        return true;
      }

      return [
        item.label,
        item.path,
        item.value,
        item.region,
        item.offset,
        itemToString?.(item) ?? "",
      ].some((haystack) => haystack.toLowerCase().includes(needle));
    },
    [],
  );

  const handleValueChange = React.useCallback(
    (next: TimeZoneOption | null) => {
      if (!next) {
        return;
      }

      setUncontrolledValue(next.value);
      onValueChange?.(next.value);
    },
    [onValueChange],
  );

  /**
   * Base UI seeds the input's text from the value it mounts with, so a zone
   * adopted after hydration reaches the field only on a fresh mount. Scoped to
   * that adoption: two states, so it flips once on a closed and untouched
   * picker, never on selection, and never for a controlled or `defaultValue`
   * picker, both of which mount with their value already in hand.
   */
  const isSelfResolving = !(isControlled || defaultValue !== undefined);
  const seedKey = isSelfResolving && selectedValue === null ? "unresolved" : "resolved";

  return (
    <Combobox<TimeZoneOption>
      disabled={disabled}
      key={seedKey}
      filter={filter}
      isItemEqualToValue={(a, b) => a.value === b.value}
      itemToStringLabel={optionToLabel}
      itemToStringValue={optionToValue}
      items={groups}
      name={name}
      onOpenChange={setOpen}
      onValueChange={handleValueChange}
      value={selectedOption}
    >
      <ComboboxInput
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        className={cn(className)}
        data-slot="timezone-picker-input"
        disabled={disabled}
        id={id}
        placeholder={placeholder}
      />
      <ComboboxContent data-slot="timezone-picker-content">
        <ComboboxEmpty>No time zones found.</ComboboxEmpty>
        <ComboboxList>
          {(group: TimeZoneGroup) => (
            <ComboboxGroup items={group.items} key={group.value}>
              {/* Sticky: ten regions across four hundred rows, so the heading
                  has to survive the scroll that takes you away from it. */}
              <ComboboxLabel className="sticky -top-1 z-10 bg-popover pt-2.5 pl-1.5">
                {group.value}
              </ComboboxLabel>
              <ComboboxCollection>
                {/* The shared item reserves a 32px gutter for the check, which
                    strands the time column well short of the popup edge. Give the
                    gutter back to every row and let the one selected row pay for
                    its own check. `data-[selected]` rather than `data-selected:`:
                    shadcn's stylesheet redefines that variant as
                    `[data-selected="true"]`, and Base UI writes the attribute
                    empty, so the shorthand compiles and never matches. */}
                {(option: TimeZoneOption) => (
                  <ComboboxItem
                    className="gap-3 py-1.5 pr-2 data-[selected]:pr-8"
                    key={option.value}
                    value={option}
                  >
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="truncate">{option.label}</span>
                      <span className="flex min-w-0 items-center gap-1.5 text-muted-foreground text-xs">
                        <span className="truncate">{option.path}</span>
                        <span className="tabular-figures shrink-0">{option.offset}</span>
                      </span>
                    </span>
                    <span className="tabular-figures shrink-0 text-right text-muted-foreground text-xs">
                      {now ? localTimeIn(option.value, now) : option.offset}
                    </span>
                  </ComboboxItem>
                )}
              </ComboboxCollection>
            </ComboboxGroup>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
};

export { TimezonePicker };
