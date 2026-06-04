"use client";

import { ArrowUpIcon, CrossSmallIcon } from "blode-icons-react";
import { AnimatePresence, motion } from "motion/react";
import * as React from "react";
import TextareaAutosize from "react-textarea-autosize";

import { cn } from "@/lib/utils";
import { Button } from "@/registry/default/ui/button";
import { FileThumbnail } from "@/registry/default/ui/file-thumbnail";

const DEFAULT_ACCEPT = "image/png,image/jpeg,application/pdf";

interface InputMessageSlotContext {
  /** Opens the native file picker. Pass `acceptOverride` (e.g. `"image/*"`) to
   *  scope the picker to a subset of the accept types for this invocation. */
  openFilePicker: (acceptOverride?: string) => void;
  /** Currently-attached files (controlled). */
  files: File[];
}

type InputMessageSlot = React.ReactNode | ((ctx: InputMessageSlotContext) => React.ReactNode);

interface InputMessageProps extends Omit<React.ComponentProps<"div">, "onChange"> {
  /** Controlled textarea value. */
  value: string;
  /** Called with the new value on every textarea change. */
  onValueChange: (value: string) => void;
  /** Fired on submit (Enter or send button) with the trimmed value + files. */
  onSend?: (value: string, files: File[]) => void;
  /** Placeholder shown when empty. Swaps to a drop hint while dragging files. */
  placeholder?: string;
  /** Bottom-left action area. May be a render fn receiving `{ openFilePicker, files }`. */
  leftSlot?: InputMessageSlot;
  /** Bottom-right action area, before the built-in send button. Same render-fn shape. */
  rightSlot?: InputMessageSlot;
  /** Disables the textarea, send button, and drag-and-drop. */
  disabled?: boolean;
  /** Minimum visible rows before the textarea grows. Defaults to 1. */
  minRows?: number;
  /** Maximum visible rows before the textarea scrolls. Defaults to 8. */
  maxRows?: number;
  /** When false, clicking the container won't refocus the textarea. */
  clickToFocus?: boolean;
  /** Accessible label for the send button. */
  sendLabel?: string;
  /** Controlled attached files. When undefined, attachment behavior is disabled. */
  files?: File[];
  /** Called when files are added (drag-drop or picker) or removed. */
  onFilesChange?: (files: File[]) => void;
  /** Accepted MIME types as a comma-separated string. Defaults to PNG / JPEG / PDF. */
  accept?: string;
  /** Maximum number of files. Extra files beyond the limit are dropped. */
  maxFiles?: number;
  /** Side of each preview tile in pixels. Defaults to 80. */
  filePreviewSize?: number;
  /** Extra props forwarded to the underlying textarea. */
  textareaProps?: Omit<
    React.ComponentProps<"textarea">,
    "value" | "onChange" | "onKeyDown" | "disabled" | "placeholder" | "rows" | "style"
  >;
}

// ─── File preview tile ──────────────────────────────────────────────────────
interface FilePreviewTileProps {
  file: File;
  onRemove: () => void;
  size: number;
}

function FilePreviewTile({ file, onRemove, size }: FilePreviewTileProps) {
  return (
    <motion.div
      animate={{ opacity: 1, scale: 1 }}
      className="group/tile relative shrink-0 cursor-default"
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.06 } }}
      initial={{ opacity: 0, scale: 0.9 }}
      layout
      transition={{ bounce: 0, duration: 0.08, type: "spring" }}
    >
      <FileThumbnail file={file} size={size} />
      <button
        aria-label={`Remove ${file.name}`}
        className="absolute top-1 right-1 flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground opacity-0 outline-none transition-opacity duration-100 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-ring/50 group-hover/tile:opacity-100"
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        type="button"
      >
        <CrossSmallIcon className="size-3" />
      </button>
    </motion.div>
  );
}

// ─── InputMessage ───────────────────────────────────────────────────────────
function InputMessage({
  value,
  onValueChange,
  onSend,
  placeholder = "Ask me anything…",
  leftSlot,
  rightSlot,
  disabled,
  minRows = 1,
  maxRows = 8,
  clickToFocus = true,
  sendLabel = "Send",
  files,
  onFilesChange,
  accept = DEFAULT_ACCEPT,
  maxFiles,
  filePreviewSize = 80,
  textareaProps,
  className,
  ref,
  ...props
}: InputMessageProps) {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = React.useState(false);

  const filesArr = React.useMemo(() => files ?? [], [files]);
  const supportsFiles = onFilesChange !== undefined;

  const trimmed = value.trim();
  const canSend = !disabled && (trimmed.length > 0 || filesArr.length > 0);

  const handleSend = React.useCallback(() => {
    if (!canSend) {
      return;
    }
    onSend?.(trimmed, filesArr);
  }, [canSend, onSend, trimmed, filesArr]);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.nativeEvent.isComposing) {
        return;
      }
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend],
  );

  const handleContainerMouseDown = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!clickToFocus || disabled) {
        return;
      }
      const target = e.target as HTMLElement;
      if (target === textareaRef.current) {
        return;
      }
      if (
        target.closest('button, a, input, select, textarea, [contenteditable], [role="button"]')
      ) {
        return;
      }
      e.preventDefault();
      textareaRef.current?.focus();
    },
    [clickToFocus, disabled],
  );

  // ── File helpers ──────────────────────────────────────────────────────────
  const acceptTokens = React.useMemo(
    () =>
      accept
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    [accept],
  );

  const matchesAccept = React.useCallback(
    (file: File) =>
      acceptTokens.some((token) => {
        if (token.endsWith("/*")) {
          return file.type.startsWith(token.slice(0, -1));
        }
        if (token.startsWith(".")) {
          return file.name.toLowerCase().endsWith(token.toLowerCase());
        }
        return file.type === token;
      }),
    [acceptTokens],
  );

  const addFiles = React.useCallback(
    (incoming: File[]) => {
      if (!onFilesChange) {
        return;
      }
      // name + size + lastModified is a unique-enough identity to dedupe
      // "dropped the same file twice" without colliding distinct files.
      const fingerprint = (f: File) => `${f.name}-${f.size}-${f.lastModified}`;
      const existing = new Set(filesArr.map(fingerprint));
      const accepted: File[] = [];
      for (const f of incoming) {
        if (!matchesAccept(f)) {
          continue;
        }
        const fp = fingerprint(f);
        if (existing.has(fp)) {
          continue;
        }
        existing.add(fp);
        accepted.push(f);
      }
      if (accepted.length === 0) {
        return;
      }
      const next = [...filesArr, ...accepted];
      onFilesChange(maxFiles === undefined ? next : next.slice(0, maxFiles));
    },
    [onFilesChange, filesArr, matchesAccept, maxFiles],
  );

  const removeFile = React.useCallback(
    (idx: number) => {
      onFilesChange?.(filesArr.filter((_, i) => i !== idx));
    },
    [onFilesChange, filesArr],
  );

  const openFilePicker = React.useCallback(
    (overrideAccept?: string) => {
      const el = fileInputRef.current;
      if (!el) {
        return;
      }
      if (overrideAccept) {
        el.accept = overrideAccept;
        el.click();
        queueMicrotask(() => {
          if (fileInputRef.current) {
            fileInputRef.current.accept = accept;
          }
        });
        return;
      }
      el.click();
    },
    [accept],
  );

  // ── Slot rendering ────────────────────────────────────────────────────────
  const slotCtx = React.useMemo<InputMessageSlotContext>(
    () => ({ files: filesArr, openFilePicker }),
    [openFilePicker, filesArr],
  );
  const leftContent = typeof leftSlot === "function" ? leftSlot(slotCtx) : leftSlot;
  const rightContent = typeof rightSlot === "function" ? rightSlot(slotCtx) : rightSlot;

  // ── Drag-and-drop ─────────────────────────────────────────────────────────
  const handleDragOver = React.useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      if (!supportsFiles || disabled) {
        return;
      }
      if (!Array.from(e.dataTransfer.types).includes("Files")) {
        return;
      }
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";
      setDragOver(true);
    },
    [supportsFiles, disabled],
  );

  const handleDragLeave = React.useCallback((e: React.DragEvent<HTMLDivElement>) => {
    const wrapper = e.currentTarget;
    const next = e.relatedTarget as Node | null;
    if (next && wrapper.contains(next)) {
      return;
    }
    setDragOver(false);
  }, []);

  const handleDrop = React.useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragOver(false);
      if (!supportsFiles || disabled) {
        return;
      }
      addFiles(Array.from(e.dataTransfer.files));
    },
    [supportsFiles, disabled, addFiles],
  );

  const handleFileInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) {
        return;
      }
      addFiles(Array.from(e.target.files));
      e.target.value = "";
    },
    [addFiles],
  );

  return (
    <div
      className={cn(
        "flex flex-col gap-1 rounded-[var(--field-radius)] border bg-surface p-2 shadow-input transition-colors",
        dragOver ? "border-ring ring-2 ring-ring/20" : "border-input focus-within:border-ring",
        clickToFocus && !disabled && "cursor-text",
        disabled && "pointer-events-none opacity-50",
        className,
      )}
      data-slot="input-message"
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onMouseDown={handleContainerMouseDown}
      ref={ref}
      {...props}
    >
      {supportsFiles && (
        <input
          accept={accept}
          aria-hidden="true"
          className="hidden"
          multiple={maxFiles === undefined || maxFiles > 1}
          onChange={handleFileInputChange}
          ref={fileInputRef}
          tabIndex={-1}
          type="file"
        />
      )}

      <AnimatePresence initial={false}>
        {filesArr.length > 0 && (
          <motion.div
            animate={{ height: "auto", opacity: 1 }}
            className="overflow-hidden"
            exit={{ height: 0, opacity: 0 }}
            initial={{ height: 0, opacity: 0 }}
            key="preview-row"
            transition={{ bounce: 0, duration: 0.16, type: "spring" }}
          >
            <div className="flex flex-wrap gap-2 pb-1">
              <AnimatePresence initial={false} mode="popLayout">
                {filesArr.map((file, i) => (
                  <FilePreviewTile
                    file={file}
                    key={`${file.name}-${file.size}-${file.lastModified}`}
                    onRemove={() => removeFile(i)}
                    size={filePreviewSize}
                  />
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <TextareaAutosize
        aria-label={textareaProps?.["aria-label"] ?? "Message"}
        className="w-full resize-none bg-transparent px-2 py-2 text-foreground text-sm outline-none placeholder:text-muted-foreground"
        disabled={disabled}
        maxRows={maxRows}
        minRows={minRows}
        onChange={(e) => onValueChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={dragOver && supportsFiles ? "Drop files here to add to chat" : placeholder}
        ref={textareaRef}
        value={value}
        {...textareaProps}
      />

      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-1.5">{leftContent}</div>
        <div className="flex shrink-0 items-center gap-1.5">
          {rightContent}
          <Button
            aria-label={sendLabel}
            disabled={!canSend}
            onClick={handleSend}
            size="icon-sm"
            type="button"
          >
            <ArrowUpIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}

export { InputMessage };
export type { InputMessageProps, InputMessageSlotContext };
