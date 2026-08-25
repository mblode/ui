"use client";

import { SearchIcon, XIcon } from "blode-icons-react";
import type * as React from "react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/registry/default/ui/input-group";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/** Joins the placeholder list into one dependency so a fresh array literal on
 * every render does not restart the typewriter. */
const PHRASE_SEPARATOR = "\n";

const subscribeToReducedMotion = (onStoreChange: () => void) => {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener("change", onStoreChange);
  return () => query.removeEventListener("change", onStoreChange);
};

/**
 * Tracks `prefers-reduced-motion` and re-renders when it changes. The global
 * reduced-motion stylesheet cannot reach a JS timer, so the typewriter has to
 * gate itself. The server snapshot is `true` so no animation runs before the
 * real preference is known.
 */
const usePrefersReducedMotion = () =>
  useSyncExternalStore(
    subscribeToReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => true,
  );

export interface SearchInputProps extends Omit<
  React.ComponentProps<"input">,
  "onChange" | "placeholder" | "type" | "value"
> {
  /** Accessible name for the clear button (default: "Clear search"). */
  clearLabel?: string;
  /** Milliseconds between removed characters while cycling (default: 100). */
  deletingSpeed?: number;
  /** Called after the value is cleared by the clear button. */
  onClear?: () => void;
  /** Called with the next search string on every keystroke. */
  onValueChange: (value: string) => void;
  /** Milliseconds a completed phrase rests before deleting (default: 1000). */
  pauseDuration?: number;
  /** Milliseconds between typed characters while cycling (default: 150). */
  typingSpeed?: number;
  /**
   * The stable placeholder. Also the accessible description exposed through
   * `aria-placeholder` while the animated placeholder is cycling.
   */
  placeholder?: string;
  /**
   * Phrases to type and delete in the placeholder. Decorative: cycling stops
   * on focus, on a non-empty value, and under reduced motion.
   */
  placeholders?: string[];
  /** The current search string. */
  value: string;
}

const SearchInput = ({
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  className,
  clearLabel = "Clear search",
  deletingSpeed = 100,
  id,
  onBlur,
  onClear,
  onFocus,
  onValueChange,
  pauseDuration = 1000,
  placeholder = "Search",
  placeholders,
  typingSpeed = 150,
  value,
  ...props
}: SearchInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isFocused, setIsFocused] = useState(false);
  const [typed, setTyped] = useState("");

  // Empty entries are dropped: a zero-length phrase never reaches its own
  // length in the typing branch, so the timer would reschedule forever.
  const phrasesKey = placeholders?.filter(Boolean).join(PHRASE_SEPARATOR) ?? "";
  // A moving placeholder under a typing user is hostile, so cycling pauses
  // while the field is focused or holds a value.
  const isCycling = phrasesKey !== "" && !prefersReducedMotion && !isFocused && value === "";

  useEffect(() => {
    if (!isCycling) {
      return;
    }

    const phrases = phrasesKey.split(PHRASE_SEPARATOR);
    let timeout: ReturnType<typeof setTimeout>;
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const tick = () => {
      const phrase = phrases[phraseIndex];

      if (isDeleting) {
        charIndex -= 1;
        setTyped(phrase.slice(0, charIndex));

        if (charIndex === 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
        }

        timeout = setTimeout(tick, deletingSpeed);
        return;
      }

      charIndex += 1;
      setTyped(phrase.slice(0, charIndex));

      if (charIndex === phrase.length) {
        isDeleting = true;
        timeout = setTimeout(tick, pauseDuration);
        return;
      }

      timeout = setTimeout(tick, typingSpeed);
    };

    timeout = setTimeout(tick, typingSpeed);

    return () => {
      clearTimeout(timeout);
      // Rewind so the next run starts from an empty placeholder rather than
      // flashing the phrase the last run had reached.
      setTyped("");
    };
  }, [deletingSpeed, isCycling, pauseDuration, phrasesKey, typingSpeed]);

  const handleClear = () => {
    onValueChange("");
    onClear?.();
    inputRef.current?.focus();
  };

  // Only name the input ourselves when nothing else does. An `id` implies an
  // external <label htmlFor>, and overriding a visible label breaks
  // label-in-name for voice control.
  const hasExternalName = Boolean(ariaLabel ?? ariaLabelledBy ?? id);

  return (
    <InputGroup className={className} data-slot="search-input">
      <InputGroupAddon align="inline-start">
        <SearchIcon />
      </InputGroupAddon>

      <InputGroupInput
        aria-label={hasExternalName ? ariaLabel : placeholder}
        aria-labelledby={ariaLabelledBy}
        aria-placeholder={placeholder}
        autoComplete="off"
        className="[&::-webkit-search-cancel-button]:appearance-none"
        id={id}
        onBlur={(event) => {
          setIsFocused(false);
          onBlur?.(event);
        }}
        onChange={(event) => onValueChange(event.target.value)}
        onFocus={(event) => {
          setIsFocused(true);
          onFocus?.(event);
        }}
        placeholder={isCycling ? typed : placeholder}
        type="search"
        value={value}
        {...props}
        ref={inputRef}
      />

      {value !== "" && (
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            aria-label={clearLabel}
            data-slot="search-input-clear"
            onClick={handleClear}
            size="icon-xs"
          >
            <XIcon />
          </InputGroupButton>
        </InputGroupAddon>
      )}
    </InputGroup>
  );
};

export { SearchInput };
