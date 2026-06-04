"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "blode-icons-react";
import { AnimatePresence, motion } from "motion/react";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/registry/default/ui/button";

const springs = {
  fast: { bounce: 0, duration: 0.08, type: "spring" as const },
  moderate: { bounce: 0.15, duration: 0.16, type: "spring" as const },
  slow: { bounce: 0.15, duration: 0.24, type: "spring" as const },
};

interface AskUserOption {
  id: string;
  /** Bold option label. */
  title: string;
  /** Secondary descriptive text. */
  description?: string;
}

interface AskUserQuestion {
  id: string;
  /** Question text. */
  title: string;
  options: AskUserOption[];
  /** Allow multiple selections (shows an explicit Next/Finish button). */
  multiSelect?: boolean;
  /** Reveal a textarea for a free-form answer. */
  allowOther?: boolean;
  otherPlaceholder?: string;
  /** Label for the Next button in multi-select mode. Defaults to "Next" / "Finish". */
  nextLabel?: string;
  /** Show the Skip control. Defaults to true. */
  skippable?: boolean;
  /** Description placement: inline with the title or stacked beneath it. */
  layout?: "inline" | "stacked";
}

interface AskUserAnswer {
  questionId: string;
  selectedIds: string[];
  otherText?: string;
  skipped?: boolean;
}

type AnswersMap = Record<string, AskUserAnswer>;

interface AskUserQuestionsProps extends Omit<React.ComponentProps<"div">, "onChange"> {
  questions: AskUserQuestion[];
  currentIndex?: number;
  defaultCurrentIndex?: number;
  onCurrentIndexChange?: (index: number) => void;
  answers?: AnswersMap;
  defaultAnswers?: AnswersMap;
  onAnswersChange?: (answers: AnswersMap) => void;
  onComplete?: (answers: AnswersMap) => void;
  onSkip?: (questionId: string, index: number) => void;
  skipLabel?: string;
}

function useControllable<T>(
  controlled: T | undefined,
  defaultValue: T,
  onChange?: (value: T) => void,
): [T, (value: T) => void] {
  const [uncontrolled, setUncontrolled] = React.useState(defaultValue);
  const isControlled = controlled !== undefined;
  const value = isControlled ? (controlled as T) : uncontrolled;
  const setValue = React.useCallback(
    (next: T) => {
      if (!isControlled) {
        setUncontrolled(next);
      }
      onChange?.(next);
    },
    [isControlled, onChange],
  );
  return [value, setValue];
}

// ─── AskUserQuestions ───────────────────────────────────────────────────────
// A stepped questionnaire rendered as a single card: single- or multi-select
// options with an optional free-form answer and skip control. A morphing
// background slides between options on hover and selection. Single-select
// questions advance on click (an arrow overlays the number chip); multi-select
// (or "other"-enabled) questions advance via the footer Next / Finish button.
function AskUserQuestions({
  questions,
  currentIndex,
  defaultCurrentIndex = 0,
  onCurrentIndexChange,
  answers,
  defaultAnswers,
  onAnswersChange,
  onComplete,
  onSkip,
  skipLabel = "Skip",
  className,
  ref,
  ...props
}: AskUserQuestionsProps) {
  const [index, setIndex] = useControllable(
    currentIndex,
    defaultCurrentIndex,
    onCurrentIndexChange,
  );
  const [answersMap, setAnswersMap] = useControllable(
    answers,
    defaultAnswers ?? {},
    onAnswersChange,
  );
  const [hoverIndex, setHoverIndex] = React.useState<number | null>(null);

  const current = questions[index];

  const currentAnswer: AskUserAnswer = current
    ? (answersMap[current.id] ?? { questionId: current.id, selectedIds: [] })
    : { questionId: "", selectedIds: [] };

  const commit = React.useCallback(
    (answer: AskUserAnswer): AnswersMap => {
      const next = { ...answersMap, [answer.questionId]: answer };
      setAnswersMap(next);
      return next;
    },
    [answersMap, setAnswersMap],
  );

  const goNext = React.useCallback(
    (nextAnswers: AnswersMap) => {
      setHoverIndex(null);
      if (index >= questions.length - 1) {
        onComplete?.(nextAnswers);
        return;
      }
      setIndex(index + 1);
    },
    [index, questions.length, onComplete, setIndex],
  );

  if (!current) {
    return null;
  }

  const layout = current.layout ?? "inline";
  const skippable = current.skippable !== false;
  const isMulti = Boolean(current.multiSelect);
  const showConfirm = Boolean(current.multiSelect || current.allowOther);
  const isLast = index === questions.length - 1;
  const otherText = currentAnswer.otherText ?? "";
  const canProceed = currentAnswer.selectedIds.length > 0 || otherText.trim().length > 0;
  const showBack = index > 0;
  const showSkip = skippable && questions.length > 1;
  const showFooter = showBack || showSkip || showConfirm;

  const selectOption = (optionId: string) => {
    if (isMulti) {
      const selected = currentAnswer.selectedIds.includes(optionId);
      const selectedIds = selected
        ? currentAnswer.selectedIds.filter((id) => id !== optionId)
        : [...currentAnswer.selectedIds, optionId];
      commit({ ...currentAnswer, selectedIds, skipped: false });
      return;
    }

    const answer: AskUserAnswer = {
      ...currentAnswer,
      selectedIds: [optionId],
      skipped: false,
    };
    const next = commit(answer);
    if (!current.allowOther) {
      goNext(next);
    }
  };

  const setOtherText = (text: string) => {
    commit({ ...currentAnswer, otherText: text, skipped: false });
  };

  const handleNext = () => {
    goNext(commit({ ...currentAnswer, skipped: false }));
  };

  const handleBack = () => {
    if (index > 0) {
      setHoverIndex(null);
      setIndex(index - 1);
    }
  };

  const handleSkip = () => {
    const next = commit({
      otherText: "",
      questionId: current.id,
      selectedIds: [],
      skipped: true,
    });
    onSkip?.(current.id, index);
    goNext(next);
  };

  return (
    <div
      className={cn(
        "relative w-full max-w-[520px] overflow-hidden rounded-2xl border border-border bg-card",
        className,
      )}
      data-slot="ask-user-questions"
      ref={ref}
      {...props}
      onKeyDown={(e) => {
        props.onKeyDown?.(e);
        if ((e.metaKey || e.ctrlKey) && e.key === "Enter" && showConfirm && canProceed) {
          e.preventDefault();
          handleNext();
        }
      }}
    >
      {/* Header — progress sits at the top, fixed across questions. */}
      <div className="flex items-center px-4 pt-4 pb-2 text-muted-foreground text-xs tabular-nums sm:px-5 sm:pt-5">
        Question {index + 1} of {questions.length}
      </div>

      <AnimatePresence initial={false} mode="wait">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="px-4 pb-1 sm:px-5"
          exit={{ opacity: 0, transition: { duration: 0.1 }, y: -6 }}
          initial={{ opacity: 0, y: 8 }}
          key={current.id}
          layout
          transition={springs.moderate}
        >
          <h3 className="font-semibold text-base text-foreground leading-snug">{current.title}</h3>

          <div
            className="relative mt-2 flex flex-col gap-0.5"
            onMouseLeave={() => setHoverIndex(null)}
            role={isMulti ? "group" : "radiogroup"}
          >
            {current.options.map((option, i) => {
              const selected = currentAnswer.selectedIds.includes(option.id);
              const hovered = hoverIndex === i;
              const showArrow = !isMulti && hovered;
              return (
                <button
                  aria-checked={selected}
                  className={cn(
                    "relative z-10 flex items-center gap-3 rounded-full px-3 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#6B97FF]",
                    layout === "stacked" ? "min-h-14 py-2" : "min-h-10 py-1.5",
                  )}
                  key={option.id}
                  onClick={() => selectOption(option.id)}
                  onMouseEnter={() => setHoverIndex(i)}
                  role={isMulti ? "checkbox" : "radio"}
                  type="button"
                >
                  {hovered && !selected && (
                    <motion.span
                      aria-hidden="true"
                      className="absolute inset-0 -z-10 rounded-full bg-muted"
                      layoutId="ask-user-hover"
                      transition={springs.fast}
                    />
                  )}
                  {selected &&
                    (isMulti ? (
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 -z-10 rounded-full bg-accent"
                      />
                    ) : (
                      <motion.span
                        aria-hidden="true"
                        className="absolute inset-0 -z-10 rounded-full bg-accent"
                        layoutId="ask-user-selected"
                        transition={springs.moderate}
                      />
                    ))}

                  <span
                    className={cn(
                      "min-w-0 flex-1 text-[13px] leading-snug",
                      layout === "stacked" ? "flex flex-col gap-0.5" : "",
                    )}
                  >
                    <span
                      className={cn("text-foreground", selected ? "font-semibold" : "font-medium")}
                    >
                      {option.title}
                    </span>
                    {option.description &&
                      (layout === "stacked" ? (
                        <span className="text-muted-foreground text-xs leading-snug">
                          {option.description}
                        </span>
                      ) : (
                        <span className="text-muted-foreground"> {option.description}</span>
                      ))}
                  </span>

                  <span className="relative inline-flex size-7 shrink-0 items-center justify-center">
                    <span
                      className={cn(
                        "inline-flex size-5 items-center justify-center text-[11px] transition-opacity",
                        isMulti
                          ? cn(
                              "rounded-full",
                              selected
                                ? "bg-foreground font-semibold text-background"
                                : "border border-border text-muted-foreground",
                            )
                          : selected
                            ? "font-semibold text-foreground"
                            : "text-muted-foreground",
                        showArrow && "opacity-0",
                      )}
                    >
                      {i + 1}
                    </span>
                    <AnimatePresence>
                      {showArrow && (
                        <motion.span
                          animate={{ opacity: 1, scale: 1 }}
                          aria-hidden="true"
                          className="absolute inset-0 inline-flex items-center justify-center rounded-full bg-foreground text-background"
                          exit={{ opacity: 0, scale: 0.6, transition: { duration: 0.06 } }}
                          initial={{ opacity: 0, scale: 0.6 }}
                          transition={springs.fast}
                        >
                          <ArrowRightIcon className="size-3.5" />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </span>
                </button>
              );
            })}

            {current.allowOther && (
              <div
                className={cn(
                  "relative z-10 flex items-start gap-3 rounded-full px-3 py-2",
                  otherText.length > 0 && "bg-accent",
                )}
              >
                <textarea
                  aria-label={current.otherPlaceholder ?? "Describe in your own words"}
                  className="min-h-7 flex-1 resize-none self-center bg-transparent text-[13px] text-foreground leading-snug outline-none [field-sizing:content] placeholder:text-muted-foreground"
                  onChange={(e) => setOtherText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey && !isMulti && otherText.trim()) {
                      e.preventDefault();
                      handleNext();
                    }
                  }}
                  placeholder={current.otherPlaceholder ?? "Describe in your own words…"}
                  rows={1}
                  value={otherText}
                />
                <span
                  className={cn(
                    "inline-flex size-5 shrink-0 items-center justify-center self-center text-[11px]",
                    otherText.length > 0
                      ? "font-semibold text-foreground"
                      : "text-muted-foreground",
                  )}
                >
                  {current.options.length + 1}
                </span>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {showFooter && (
        <div className="flex items-center justify-between gap-2 px-4 pt-1 pb-3 sm:px-5">
          <div>
            {showBack && (
              <Button data-icon="inline-start" onClick={handleBack} size="sm" variant="ghost">
                <ArrowLeftIcon className="hidden sm:block" />
                Back
              </Button>
            )}
          </div>
          <div className="flex items-center gap-2">
            {showSkip && (
              <Button data-icon="inline-end" onClick={handleSkip} size="sm" variant="ghost">
                {skipLabel}
                <ArrowRightIcon className="hidden sm:block" />
              </Button>
            )}
            {showConfirm && (
              <Button disabled={!canProceed} onClick={handleNext} size="sm">
                {current.nextLabel ?? (isLast ? "Finish" : "Next")}
                {isMulti && (
                  <kbd className="-mr-0.5 ml-0.5 inline-flex items-center gap-0.5 rounded-full bg-primary-foreground/15 px-1.5 py-px font-medium text-[10px] text-primary-foreground/90">
                    ⌘↵
                  </kbd>
                )}
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export { AskUserQuestions };
export type { AskUserQuestionsProps, AskUserQuestion, AskUserOption, AskUserAnswer };
