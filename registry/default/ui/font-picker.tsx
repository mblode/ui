"use client";

import { CircleAlertIcon } from "blode-icons-react";
import * as React from "react";

import { cn } from "@/lib/utils";
import {
  fetchGoogleFonts,
  GoogleFontsError,
  loadGoogleFontPreview,
} from "@/registry/default/lib/google-fonts";
import type {
  GoogleFont,
  GoogleFontCategory,
  GoogleFontsErrorCode,
  GoogleFontSort,
} from "@/registry/default/lib/google-fonts";
import { Button } from "@/registry/default/ui/button";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/registry/default/ui/combobox";
import { Spinner } from "@/registry/default/ui/spinner";

/**
 * How far beyond the visible rows to start loading previews, so a row is already
 * in its own typeface by the time a scroll brings it into view.
 *
 * Previews are viewport-driven rather than capped at the top of the list. The
 * list is not virtualised — the full catalogue is ~1950 rows in the DOM against
 * roughly nine visible at a time — so a fixed "first N" cap leaves everything
 * the user actually scrolls to rendered in the interface font. An observer
 * instead ties the cost to what is on screen, which is a small constant no
 * matter how large the catalogue or how far down the user goes.
 */
const PREVIEW_ROOT_MARGIN = "240px";

interface FontPickerBaseProps extends Omit<React.ComponentProps<"div">, "onChange"> {
  /** Keeps only these categories. Defaults to every category. */
  categories?: GoogleFontCategory[];
  /** Disables the picker. */
  disabled?: boolean;
  /** Id for the input, so an external label can point at it. */
  id?: string;
  /** Caps how many families are offered. */
  limit?: number;
  /** Called with the newly selected family name. */
  onValueChange: (family: string) => void;
  /** Order to request from the API. Defaults to `"popularity"`. */
  sort?: GoogleFontSort;
  /** Keeps only families covering every one of these subsets. */
  subsets?: string[];
  /** The selected family name, or an empty string for none. */
  value: string;
  /** Keeps only families offering every one of these variants. */
  variants?: string[];
}

/**
 * Where the catalogue comes from. Exactly one of the three, so a picker that
 * can never populate does not type-check.
 */
type FontPickerSourceProps =
  | {
      /**
       * A Google Fonts Developer API key, called straight from the browser.
       * Public by design — it travels in the query string of a browser request —
       * so restrict it by HTTP referrer in the Google Cloud Console. Prefer
       * `endpoint` if you have a server to hide it behind.
       */
      apiKey: string;
      endpoint?: never;
      fonts?: never;
    }
  | {
      apiKey?: never;
      /**
       * A URL on your own origin that proxies the Google Fonts Developer API.
       * The key stays on your server and the response can be cached once for
       * every visitor. It must answer with `{ items }` whose rows carry
       * `category`, `family`, `subsets`, and `variants`.
       */
      endpoint: string;
      fonts?: never;
    }
  | {
      apiKey?: never;
      endpoint?: never;
      /**
       * Supplies the catalogue directly and skips the network entirely. For
       * tests, offline previews, and seeding a known list on the server.
       */
      fonts: GoogleFont[];
    };

type FontPickerProps = FontPickerBaseProps & FontPickerSourceProps;

const ERROR_MESSAGES: Record<GoogleFontsErrorCode, string> = {
  "missing-key": "Add a Google Fonts API key or endpoint to load the font list.",
  network: "Could not reach Google Fonts. Check your connection and try again.",
  "rate-limited": "Google Fonts is rate limiting this key. Try again in a moment.",
  "request-failed": "Google Fonts could not return the font list.",
};

const FontPicker = ({
  apiKey,
  categories,
  className,
  disabled,
  endpoint,
  fonts: fontsOverride,
  id,
  limit,
  onValueChange,
  sort = "popularity",
  subsets,
  value,
  variants,
  ...props
}: FontPickerProps) => {
  const [fetched, setFetched] = React.useState<GoogleFont[]>([]);
  const [fetchError, setFetchError] = React.useState<GoogleFontsErrorCode | null>(null);
  const [fetching, setFetching] = React.useState(true);
  const [attempt, setAttempt] = React.useState(0);

  // A supplied catalogue wins outright, so the fetch state is derived rather
  // than mirrored — nothing can drift out of sync with the `fonts` prop.
  const usingOverride = fontsOverride !== undefined;
  const fonts = fontsOverride ?? fetched;
  const loading = !usingOverride && fetching;
  const errorCode = usingOverride ? null : fetchError;

  // Array props are new objects on every render, so the effect keys off their
  // contents rather than their identity.
  const filterKey = JSON.stringify({ categories, limit, sort, subsets, variants });

  React.useEffect(() => {
    if (usingOverride) {
      return;
    }

    const controller = new AbortController();
    const options = JSON.parse(filterKey) as {
      categories?: GoogleFontCategory[];
      limit?: number;
      sort: GoogleFontSort;
      subsets?: string[];
      variants?: string[];
    };

    const load = async () => {
      setFetching(true);
      setFetchError(null);
      try {
        const result = await fetchGoogleFonts({
          ...options,
          apiKey,
          endpoint,
          signal: controller.signal,
        });
        setFetched(result);
        setFetching(false);
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }
        setFetchError(error instanceof GoogleFontsError ? error.code : "request-failed");
        setFetched([]);
        setFetching(false);
      }
    };

    void load();

    return () => controller.abort();
  }, [apiKey, attempt, endpoint, filterKey, usingOverride]);

  const families = React.useMemo(() => fonts.map((font) => font.family), [fonts]);

  // Which rows are on screen. Populated by the observer below rather than by
  // slicing the list, so scrolling to row 900 previews row 900.
  const [onScreen, setOnScreen] = React.useState<ReadonlySet<string>>(() => new Set());
  const observerRef = React.useRef<IntersectionObserver | null>(null);
  const familyOf = React.useRef(new WeakMap<Element, string>());

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setOnScreen((current) => {
          const next = new Set(current);
          let changed = false;
          for (const entry of entries) {
            const family = familyOf.current.get(entry.target);
            if (!family) {
              continue;
            }
            if (entry.isIntersecting) {
              if (!next.has(family)) {
                next.add(family);
                changed = true;
              }
            } else if (next.delete(family)) {
              changed = true;
            }
          }
          return changed ? next : current;
        });
      },
      { rootMargin: PREVIEW_ROOT_MARGIN },
    );
    observerRef.current = observer;
    return () => {
      observer.disconnect();
      observerRef.current = null;
    };
  }, []);

  // One stable callback per family, cached. A fresh closure per render would be
  // a new ref identity, so React would detach and reattach every row on every
  // render — and since detaching unobserves and reattaching observes, the
  // observer would fire, set state, and render again, forever.
  const itemRefs = React.useRef(new Map<string, React.RefCallback<HTMLElement>>());

  const observeItem = React.useCallback((family: string) => {
    const cache = itemRefs.current;
    const cached = cache.get(family);
    if (cached) {
      return cached;
    }
    const ref: React.RefCallback<HTMLElement> = (node) => {
      const observer = observerRef.current;
      if (!(node && observer)) {
        return;
      }
      familyOf.current.set(node, family);
      observer.observe(node);
      return () => {
        // Unobserving cancels any pending notification, so a row that unmounts
        // while still intersecting would otherwise stay in `onScreen` — and its
        // stylesheet in `<head>` — for the life of the picker.
        observer.unobserve(node);
        setOnScreen((current) => {
          if (!current.has(family)) {
            return current;
          }
          const next = new Set(current);
          next.delete(family);
          return next;
        });
      };
    };
    cache.set(family, ref);
    return ref;
  }, []);

  // The selected family is previewed whether or not its row is on screen: it is
  // what the trigger and any sample text the consumer renders are set in, and
  // the popup is closed most of the time.
  const previewFamilies = React.useMemo(() => {
    const next = new Set(onScreen);
    if (value) {
      next.add(value);
    }
    return next;
  }, [onScreen, value]);

  // Diffed rather than torn down and rebuilt, so a family that survives a scroll
  // keeps its stylesheet instead of flashing back to the fallback.
  const previewsRef = React.useRef(new Map<string, () => void>());

  React.useEffect(() => {
    const active = previewsRef.current;
    for (const [family, release] of active) {
      if (!previewFamilies.has(family)) {
        release();
        active.delete(family);
      }
    }
    for (const family of previewFamilies) {
      if (!active.has(family)) {
        active.set(family, loadGoogleFontPreview(family));
      }
    }
  }, [previewFamilies]);

  React.useEffect(() => {
    const active = previewsRef.current;
    return () => {
      for (const release of active.values()) {
        release();
      }
      active.clear();
    };
  }, []);

  if (errorCode) {
    return (
      <div
        className={cn(
          "flex items-center gap-2 rounded-[var(--field-radius)] border border-destructive/40 bg-card px-3 py-2",
          className,
        )}
        data-slot="font-picker"
        role="alert"
        {...props}
      >
        <CircleAlertIcon className="size-4 shrink-0 text-destructive" />
        <span className="min-w-0 flex-1 text-sm">{ERROR_MESSAGES[errorCode]}</span>
        {errorCode !== "missing-key" && (
          <Button
            onClick={() => setAttempt((current) => current + 1)}
            size="sm"
            type="button"
            variant="outline"
          >
            Try again
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-1.5", className)} data-slot="font-picker" {...props}>
      <Combobox
        disabled={disabled || loading}
        items={families}
        onValueChange={(next) => onValueChange(next ?? "")}
        value={value || null}
      >
        <ComboboxInput
          disabled={disabled || loading}
          id={id}
          placeholder={loading ? "Loading fonts…" : "Search fonts"}
          // The selection reads in its own typeface too, not just the rows. Its
          // stylesheet is always loaded — `previewFamilies` adds `value`
          // unconditionally — so this holds with the popup closed.
          style={
            value
              ? { fontFamily: `"${value}", var(--font-sans, ui-sans-serif), sans-serif` }
              : undefined
          }
        />
        <ComboboxContent>
          <ComboboxEmpty>No fonts match that search.</ComboboxEmpty>
          <ComboboxList>
            {(family: string) => (
              <ComboboxItem
                key={family}
                ref={observeItem(family)}
                style={
                  previewFamilies.has(family)
                    ? { fontFamily: `"${family}", var(--font-sans, ui-sans-serif), sans-serif` }
                    : undefined
                }
                value={family}
              >
                {family}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>

      {loading && (
        <output className="flex items-center gap-2 text-muted-foreground text-sm">
          <Spinner size={14} />
          Loading fonts…
        </output>
      )}

      {!loading && families.length === 0 && (
        <output className="text-muted-foreground text-sm">No fonts match these filters.</output>
      )}
    </div>
  );
};

export { FontPicker };
export type { FontPickerProps };
