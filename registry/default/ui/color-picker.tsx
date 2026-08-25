"use client";

import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import { CheckIcon, EyedropperIcon } from "blode-icons-react";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/registry/default/ui/button";
import { Input } from "@/registry/default/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/default/ui/popover";
import { Separator } from "@/registry/default/ui/separator";

/** A named colour offered in the suggested grid. */
export interface ColorSwatch {
  /** Human-readable name, used as the swatch's accessible name. */
  name: string;
  /** Hex value, e.g. `#D9544B`. */
  value: string;
}

/**
 * Six neutrals and a twelve-step spectrum held at a constant OKLCH lightness
 * and chroma, so no single hue jumps forward in the grid. These are data, not
 * theme tokens: the colour a user picks belongs to their content, not to Blode.
 */
const defaultColorSwatches: ColorSwatch[] = [
  { name: "Black", value: "#0A0A0A" },
  { name: "Graphite", value: "#333333" },
  { name: "Slate", value: "#636363" },
  { name: "Silver", value: "#989898" },
  { name: "Mist", value: "#D7D7D7" },
  { name: "White", value: "#FFFFFF" },
  { name: "Red", value: "#D9544B" },
  { name: "Orange", value: "#CF6400" },
  { name: "Amber", value: "#B27C00" },
  { name: "Lime", value: "#809100" },
  { name: "Green", value: "#24A042" },
  { name: "Teal", value: "#00A584" },
  { name: "Cyan", value: "#009FB9" },
  { name: "Azure", value: "#0091DE" },
  { name: "Blue", value: "#587EEB" },
  { name: "Violet", value: "#936BDE" },
  { name: "Magenta", value: "#BA5BBB" },
  { name: "Rose", value: "#D25188" },
];

const SWATCH_COLUMNS = 6;
const HEX_PATTERN = /^#?(?:[0-9a-f]{3}|[0-9a-f]{6})$/iu;
const SRGB_LINEAR_CUTOFF = 0.04045;
const MAX_HUE = 360;
const HUE_SECTOR = 60;
const PERCENT = 100;

/** Expands `#RGB` to `#RRGGBB` and upper-cases it. Returns null when unparseable. */
const normalizeHex = (input: string): string | null => {
  const trimmed = input.trim();

  if (!HEX_PATTERN.test(trimmed)) {
    return null;
  }

  const digits = trimmed.replace("#", "");
  const expanded =
    digits.length === 3 ? [...digits].map((digit) => digit + digit).join("") : digits;

  return `#${expanded.toUpperCase()}`;
};

const toChannels = (hex: string): [number, number, number] => {
  const digits = hex.replace("#", "");

  return [0, 2, 4].map((offset) => Number.parseInt(digits.slice(offset, offset + 2), 16) / 255) as [
    number,
    number,
    number,
  ];
};

/**
 * Near-black or near-white ink for the selected marker, chosen from the
 * swatch's own luminance. The swatch is arbitrary user data, so no token can
 * know which way to go.
 */
const readableInk = (hex: string): string => {
  const [red, green, blue] = toChannels(hex).map((channel) =>
    channel <= SRGB_LINEAR_CUTOFF ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
  );

  return 0.2126 * red + 0.7152 * green + 0.0722 * blue > 0.4 ? "#0A0A0A" : "#FFFFFF";
};

/** Hue in degrees, saturation and value as percentages. */
interface Hsv {
  h: number;
  s: number;
  v: number;
}

const hexToHsv = (hex: string): Hsv => {
  const [red, green, blue] = toChannels(hex);
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const span = max - min;

  let sextant = 0;

  if (span !== 0) {
    if (max === red) {
      sextant = (green - blue) / span;
    } else if (max === green) {
      sextant = (blue - red) / span + 2;
    } else {
      sextant = (red - green) / span + 4;
    }
  }

  return {
    h: (sextant * HUE_SECTOR + MAX_HUE) % MAX_HUE,
    s: max === 0 ? 0 : (span / max) * PERCENT,
    v: max * PERCENT,
  };
};

const hsvToHex = ({ h, s, v }: Hsv): string => {
  const saturation = s / PERCENT;
  const value = v / PERCENT;
  const chroma = value * saturation;
  const sector = (((h % MAX_HUE) + MAX_HUE) % MAX_HUE) / HUE_SECTOR;
  const mid = chroma * (1 - Math.abs((sector % 2) - 1));
  const ramps: [number, number, number][] = [
    [chroma, mid, 0],
    [mid, chroma, 0],
    [0, chroma, mid],
    [0, mid, chroma],
    [mid, 0, chroma],
    [chroma, 0, mid],
  ];
  const base = value - chroma;
  const channels = ramps[Math.floor(sector) % 6].map((channel) =>
    Math.round((channel + base) * 255)
      .toString(16)
      .padStart(2, "0"),
  );

  return `#${channels.join("")}`.toUpperCase();
};

const clamp01 = (input: number) => Math.min(1, Math.max(0, input));

interface EyeDropperResult {
  sRGBHex: string;
}

type EyeDropperConstructor = new () => {
  open: (options?: { signal?: AbortSignal }) => Promise<EyeDropperResult>;
};

const noop = () => {
  // Nothing to unsubscribe from: the capability never changes at runtime.
};

const noopSubscribe = () => noop;

/**
 * Feature-detected through `useSyncExternalStore` rather than an effect, so the
 * server snapshot is `false` and hydration matches before the real answer
 * arrives on the client.
 */
const useHasEyeDropper = () =>
  React.useSyncExternalStore(
    noopSubscribe,
    () => "EyeDropper" in window,
    () => false,
  );

/**
 * The white ring alone disappears against the white corner of the saturation
 * area, so every thumb carries a dark outer ring as well.
 */
const THUMB_CLASSES =
  "pointer-events-none rounded-full border-2 border-white bg-transparent ring-1 ring-black/25 shadow-sm";

export interface ColorPickerProps {
  /** Accessible name for the trigger. The current value is appended to it. */
  "aria-label"?: string;
  /** Class names merged onto the trigger button. */
  className?: string;
  /** Disables the trigger and the whole popover. */
  disabled?: boolean;
  /** Id applied to the trigger button, for a `FieldLabel htmlFor`. */
  id?: string;
  /**
   * Called once a gesture settles — pointer release, `Enter` or blur in the hex
   * field, a swatch click. Use it for writes too expensive to run per frame.
   */
  onValueCommit?: (value: string) => void;
  /** Called with a normalised `#RRGGBB` string whenever the colour changes. */
  onValueChange?: (value: string) => void;
  /** Swatches offered under “Suggested”. Defaults to Blode's neutral and spectrum set. */
  swatches?: ColorSwatch[];
  /** The selected colour as a hex string. */
  value: string;
}

const ColorPicker = ({
  "aria-label": ariaLabel = "Colour",
  className,
  disabled = false,
  id,
  onValueChange,
  onValueCommit,
  swatches = defaultColorSwatches,
  value,
}: ColorPickerProps) => {
  const parsedValue = normalizeHex(value);
  // White is only a render fallback. Without the flag below an unparseable
  // value looks like a deliberate white, hiding the caller's mistake.
  const normalizedValue = parsedValue ?? "#FFFFFF";
  const valueIsInvalid = parsedValue === null;
  const hasEyeDropper = useHasEyeDropper();
  const [open, setOpen] = React.useState(false);
  // `null` means "mirror the committed value", so a new `value` prop shows up
  // in the input without an effect syncing the two.
  const [draft, setDraft] = React.useState<string | null>(null);
  const [focusedIndex, setFocusedIndex] = React.useState<number | null>(null);
  const swatchRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const areaRef = React.useRef<HTMLDivElement | null>(null);
  const saturationRef = React.useRef<HTMLInputElement | null>(null);

  // HSV is the working state, not a value derived per render. Black and white
  // carry no hue, so re-deriving would snap the rail back to red the moment a
  // user dragged into either corner.
  const [hsv, setHsv] = React.useState<Hsv>(() => hexToHsv(normalizedValue));
  const [syncedValue, setSyncedValue] = React.useState(normalizedValue);

  if (syncedValue !== normalizedValue) {
    setSyncedValue(normalizedValue);

    // Only re-derive when the new colour is genuinely a different one; echoing
    // our own hex back must not round-trip away the hue we are holding.
    if (hsvToHex(hsv) !== normalizedValue) {
      setHsv(hexToHsv(normalizedValue));
    }
  }

  const selectedIndex = swatches.findIndex(
    (swatch) => (normalizeHex(swatch.value) ?? swatch.value) === normalizedValue,
  );
  const activeIndex = focusedIndex ?? Math.max(0, selectedIndex);
  const draftValue = draft ?? normalizedValue;
  const draftIsInvalid = draftValue.trim() !== "" && normalizeHex(draftValue) === null;

  const applyHsv = (next: Hsv) => {
    const hex = hsvToHex(next);

    setHsv(next);
    setSyncedValue(hex);
    setDraft(null);
    onValueChange?.(hex);

    return hex;
  };

  const commitHsv = (next: Hsv) => {
    onValueCommit?.(applyHsv(next));
  };

  const applyHex = (hex: string) => {
    const next = hexToHsv(hex);

    setHsv(next);
    setSyncedValue(hex);
    setDraft(null);
    onValueChange?.(hex);
    onValueCommit?.(hex);
  };

  const focusSwatch = (index: number) => {
    const clamped = Math.max(0, Math.min(swatches.length - 1, index));

    setFocusedIndex(clamped);
    swatchRefs.current[clamped]?.focus();
  };

  const handleSwatchKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const moves: Record<string, number> = {
      ArrowDown: index + SWATCH_COLUMNS,
      ArrowLeft: index - 1,
      ArrowRight: index + 1,
      ArrowUp: index - SWATCH_COLUMNS,
      End: swatches.length - 1,
      Home: 0,
    };
    const next = moves[event.key];

    if (next === undefined) {
      return;
    }

    event.preventDefault();
    focusSwatch(next);
  };

  const commitDraft = () => {
    const normalized = normalizeHex(draftValue);

    // An unparseable entry reverts rather than clearing the colour, so a
    // half-typed hex never destroys the caller's value.
    setDraft(null);

    if (normalized) {
      applyHex(normalized);
    }
  };

  const pickFromScreen = async () => {
    const { EyeDropper } = window as unknown as { EyeDropper?: EyeDropperConstructor };

    if (!EyeDropper) {
      return;
    }

    try {
      const result = await new EyeDropper().open();
      const normalized = normalizeHex(result.sRGBHex);

      if (normalized) {
        applyHex(normalized);
      }
    } catch {
      // The picker was dismissed; the current colour stands.
    }
  };

  const trackPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = areaRef.current?.getBoundingClientRect();

    if (!rect) {
      return hsv;
    }

    const next = {
      h: hsv.h,
      s: clamp01((event.clientX - rect.left) / rect.width) * PERCENT,
      v: (1 - clamp01((event.clientY - rect.top) / rect.height)) * PERCENT,
    };

    applyHsv(next);

    return next;
  };

  const hueColor = hsvToHex({ h: hsv.h, s: PERCENT, v: PERCENT });
  const areaValueText = `${Math.round(hsv.s)}% saturation, ${Math.round(hsv.v)}% brightness, ${normalizedValue}`;

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger
        aria-invalid={valueIsInvalid || undefined}
        aria-label={
          valueIsInvalid ? `${ariaLabel}, invalid value` : `${ariaLabel}, ${normalizedValue}`
        }
        data-invalid={valueIsInvalid || undefined}
        disabled={disabled}
        id={id}
        render={<Button className={cn("justify-start", className)} size="input" variant="input" />}
      >
        <span
          aria-hidden="true"
          className="size-5 shrink-0 rounded-sm inset-ring-1 inset-ring-foreground/15"
          data-slot="color-picker-swatch"
          style={{ backgroundColor: normalizedValue }}
        />
        <span className="tabular-figures text-sm">{normalizedValue}</span>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className="flex w-64 flex-col gap-3 p-3"
        data-slot="color-picker-content"
      >
        {/* Two hidden range inputs rather than a keydown handler on the div:
            each axis then carries real slider semantics, and arrow keys, Home,
            End and Page Up/Down all come from the platform. */}
        {/* oxlint-disable jsx-a11y/prefer-tag-over-role -- a <fieldset> is the rule's suggested tag, but its anonymous content box makes the thumb's percentage `top` resolve against an indefinite height, pinning the thumb to 0 while `left` resolves normally */}
        <div
          aria-label={`${ariaLabel} saturation and brightness`}
          className="relative h-40 w-full touch-none select-none rounded-sm inset-ring-1 inset-ring-foreground/10"
          data-slot="color-picker-area"
          role="group"
          onPointerDown={(event) => {
            if (disabled) {
              return;
            }

            // Suppressing the compatibility mousedown stops the popup from
            // pulling focus onto itself, which would undo the focus() below.
            event.preventDefault();
            event.currentTarget.setPointerCapture(event.pointerId);
            // The gradient is not itself focusable, so without this a drag
            // leaves focus behind and arrow keys cannot continue the gesture.
            saturationRef.current?.focus();
            trackPointer(event);
          }}
          onPointerMove={(event) => {
            if (event.currentTarget.hasPointerCapture(event.pointerId)) {
              trackPointer(event);
            }
          }}
          onPointerUp={(event) => {
            event.currentTarget.releasePointerCapture(event.pointerId);
            commitHsv(trackPointer(event));
          }}
          ref={areaRef}
          style={{
            backgroundColor: hueColor,
            backgroundImage:
              "linear-gradient(0deg, #000000, transparent), linear-gradient(90deg, #FFFFFF, transparent)",
          }}
        >
          <input
            aria-label="Saturation"
            aria-valuetext={areaValueText}
            className="peer/saturation sr-only"
            disabled={disabled}
            max={PERCENT}
            min={0}
            onBlur={() => onValueCommit?.(hsvToHex(hsv))}
            onChange={(event) => applyHsv({ ...hsv, s: event.target.valueAsNumber })}
            ref={saturationRef}
            step={1}
            type="range"
            value={Math.round(hsv.s)}
          />
          <input
            aria-label="Brightness"
            aria-valuetext={areaValueText}
            className="peer/brightness sr-only"
            disabled={disabled}
            max={PERCENT}
            min={0}
            onChange={(event) => applyHsv({ ...hsv, v: event.target.valueAsNumber })}
            onBlur={() => onValueCommit?.(hsvToHex(hsv))}
            step={1}
            type="range"
            value={Math.round(hsv.v)}
          />
          <span
            className={cn(
              THUMB_CLASSES,
              "absolute size-5 -translate-x-1/2 -translate-y-1/2 peer-focus-visible/brightness:outline-2 peer-focus-visible/brightness:outline-ring peer-focus-visible/brightness:outline-offset-2 peer-focus-visible/saturation:outline-2 peer-focus-visible/saturation:outline-ring peer-focus-visible/saturation:outline-offset-2",
            )}
            data-slot="color-picker-area-thumb"
            style={{ left: `${hsv.s}%`, top: `${PERCENT - hsv.v}%` }}
          />
        </div>
        {/* oxlint-enable jsx-a11y/prefer-tag-over-role */}

        <SliderPrimitive.Root
          disabled={disabled}
          largeStep={10}
          max={MAX_HUE}
          min={0}
          onValueChange={(next) => applyHsv({ ...hsv, h: next as number })}
          onValueCommitted={(next) => commitHsv({ ...hsv, h: next as number })}
          step={1}
          value={Math.round(hsv.h)}
        >
          <SliderPrimitive.Control
            className="relative flex h-6 w-full touch-none select-none items-center data-disabled:opacity-50"
            data-slot="color-picker-hue"
          >
            {/* Literal sRGB stops: this is the hue wheel itself, not chrome, so
                no theme token can stand in for it. */}
            <SliderPrimitive.Track className="relative h-3 w-full rounded-full bg-[linear-gradient(90deg,#FF0000,#FFFF00,#00FF00,#00FFFF,#0000FF,#FF00FF,#FF0000)] inset-ring-1 inset-ring-foreground/10" />
            <SliderPrimitive.Thumb
              aria-label="Hue"
              className={cn(
                THUMB_CLASSES,
                "pointer-events-auto size-6 focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2",
              )}
              data-slot="color-picker-hue-thumb"
              style={{ backgroundColor: hueColor }}
            />
          </SliderPrimitive.Control>
        </SliderPrimitive.Root>

        <div className="flex items-center gap-2" data-slot="color-picker-custom">
          <Input
            aria-invalid={draftIsInvalid || undefined}
            aria-label="Hex colour"
            autoComplete="off"
            className="tabular-figures h-9 rounded-lg text-sm"
            disabled={disabled}
            maxLength={7}
            onBlur={commitDraft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                commitDraft();
              }
            }}
            spellCheck={false}
            value={draftValue}
          />
          {hasEyeDropper && (
            <Button
              aria-label="Pick a colour from the screen"
              disabled={disabled}
              onClick={pickFromScreen}
              size="icon-sm"
              type="button"
              variant="outline"
            >
              <EyedropperIcon />
            </Button>
          )}
        </div>

        {swatches.length > 0 && (
          <>
            <Separator />

            <div className="flex flex-col gap-2">
              <span
                className="text-muted-foreground text-xs"
                id={`${id ?? "color-picker"}-suggested`}
              >
                Suggested
              </span>

              {/* oxlint-disable jsx-a11y/prefer-tag-over-role -- role="radio" on a button keeps grid arrow-keys (Up/Down move a row, not one swatch) and Enter/Space-to-select; a native radio group moves linearly and selects on focus, which would change the colour while merely browsing it */}
              <div
                aria-labelledby={`${id ?? "color-picker"}-suggested`}
                className="grid grid-cols-6 gap-2"
                data-slot="color-picker-swatches"
                role="radiogroup"
              >
                {swatches.map((swatch, index) => {
                  const swatchValue = normalizeHex(swatch.value) ?? swatch.value;
                  const isSelected = swatchValue === normalizedValue;

                  return (
                    <button
                      aria-checked={isSelected}
                      aria-label={swatch.name}
                      className={cn(
                        "relative flex size-7 items-center justify-center rounded-sm outline-none inset-ring-1 inset-ring-foreground/15 transition-[box-shadow,transform] duration-150 ease-out hover:scale-105 focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2",
                        isSelected && "ring-2 ring-foreground ring-offset-2 ring-offset-popover",
                      )}
                      disabled={disabled}
                      key={`${swatch.name}-${swatch.value}`}
                      // A swatch is a starting point to refine, not a final
                      // answer, so selecting one leaves the popover open.
                      onClick={() => applyHex(swatchValue)}
                      onKeyDown={(event) => handleSwatchKeyDown(event, index)}
                      ref={(node) => {
                        swatchRefs.current[index] = node;
                      }}
                      role="radio"
                      style={{ backgroundColor: swatchValue }}
                      tabIndex={index === activeIndex ? 0 : -1}
                      type="button"
                    >
                      {/* A ring alone would be the only cue on a light swatch, so the
                          selected state also carries a mark. */}
                      {isSelected && (
                        <CheckIcon
                          className="size-3.5"
                          data-slot="color-picker-swatch-indicator"
                          style={{ color: readableInk(swatchValue) }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
              {/* oxlint-enable jsx-a11y/prefer-tag-over-role */}
            </div>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
};

export { ColorPicker, defaultColorSwatches, hexToHsv, hsvToHex, normalizeHex };
