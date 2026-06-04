"use client";

import { CheckIcon } from "blode-icons-react";
import { AnimatePresence, motion } from "motion/react";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Badge } from "@/registry/default/ui/badge";
import { Button } from "@/registry/default/ui/button";
import { Textarea } from "@/registry/default/ui/textarea";

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
  /** Show the Skip control. Defaults to true. */
  skippable?: boolean;
  /** Description placement: inline with the title or stacked beneath it. */
  layout?: "inline" | "stacked";
  /** Number-chip placement. */
  chipPosition?: "left" | "right";
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

function NumberChip({ n }: { n: number }) {
  return (
    <Badge className="size-5 shrink-0 justify-center p-0 tabular-nums" variant="secondary">
      {n}
    </Badge>
  );
}

// ─── AskUserQuestions ───────────────────────────────────────────────────────
// A stepped questionnaire: single- or multi-select options with an optional
// free-form answer and skip control. Single-select questions advance on click;
// multi-select (or "other"-enabled) questions advance via Next / Finish.
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
  const chipPosition = current.chipPosition ?? "right";
  const skippable = current.skippable !== false;
  const showConfirm = Boolean(current.multiSelect || current.allowOther);
  const isLast = index === questions.length - 1;
  const otherText = currentAnswer.otherText ?? "";
  const canProceed = currentAnswer.selectedIds.length > 0 || otherText.trim().length > 0;

  const selectOption = (optionId: string) => {
    if (current.multiSelect) {
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
      className={cn("flex w-full max-w-md flex-col gap-3", className)}
      data-slot="ask-user-questions"
      ref={ref}
      {...props}
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-3"
          exit={{ opacity: 0, transition: { duration: 0.12 }, y: -8 }}
          initial={{ opacity: 0, y: 8 }}
          key={current.id}
          transition={{ bounce: 0.15, duration: 0.16, type: "spring" }}
        >
          <h3 className="font-medium text-foreground text-sm leading-snug">{current.title}</h3>

          <div className="flex flex-col gap-2">
            {current.options.map((option, i) => {
              const selected = currentAnswer.selectedIds.includes(option.id);
              return (
                <button
                  aria-pressed={selected}
                  className={cn(
                    "flex w-full items-start gap-3 rounded-xl border p-3 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring/50",
                    selected
                      ? "border-foreground/30 bg-accent"
                      : "border-border hover:bg-accent/60",
                  )}
                  key={option.id}
                  onClick={() => selectOption(option.id)}
                  type="button"
                >
                  {chipPosition === "left" && <NumberChip n={i + 1} />}
                  <span
                    className={cn(
                      "flex min-w-0 flex-1 gap-1",
                      layout === "stacked" ? "flex-col" : "flex-wrap items-baseline",
                    )}
                  >
                    <span className="font-medium text-foreground text-sm">{option.title}</span>
                    {option.description && (
                      <span className="text-muted-foreground text-sm">{option.description}</span>
                    )}
                  </span>
                  {chipPosition === "right" && <NumberChip n={i + 1} />}
                  {selected && <CheckIcon className="mt-0.5 size-4 shrink-0 text-foreground" />}
                </button>
              );
            })}
          </div>

          {current.allowOther && (
            <Textarea
              onChange={(e) => setOtherText(e.target.value)}
              placeholder={current.otherPlaceholder ?? "Describe in your own words…"}
              rows={2}
              value={otherText}
            />
          )}

          <div className="flex items-center justify-between gap-2 pt-1">
            <span className="text-muted-foreground text-xs tabular-nums">
              Question {index + 1} of {questions.length}
            </span>
            <div className="flex items-center gap-2">
              {skippable && (
                <Button onClick={handleSkip} size="sm" variant="ghost">
                  {skipLabel}
                </Button>
              )}
              {showConfirm && (
                <Button disabled={!canProceed} onClick={handleNext} size="sm">
                  {isLast ? "Finish" : "Next"}
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export { AskUserQuestions };
export type { AskUserQuestionsProps, AskUserQuestion, AskUserOption, AskUserAnswer };
