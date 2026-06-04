"use client";

import { motion } from "motion/react";
import type { HTMLMotionProps } from "motion/react";
import type * as React from "react";

import { cn } from "@/lib/utils";
import { FileThumbnail } from "@/registry/default/ui/file-thumbnail";

interface ChatMessageProps extends Omit<HTMLMotionProps<"div">, "children"> {
  /** Who sent the message. Drives alignment and styling: `user` →
   *  right-aligned tonal bubble, `assistant` → left-aligned plain text. */
  from: "user" | "assistant";
  /** Optional attachments rendered as square thumbnails above the bubble. */
  files?: File[];
  /** Side length of each attachment thumbnail in pixels. Defaults to 64. */
  thumbnailSize?: number;
  /** Timestamp shown in the hover-revealed meta row (user messages only). */
  time?: React.ReactNode;
  /** Icon-only action buttons (copy, edit, regenerate) in the meta row. */
  actions?: React.ReactNode;
  /** Message body. Omit for an attachment-only message. */
  children?: React.ReactNode;
}

// ─── ChatMessage ──────────────────────────────────────────────────────────
// A single transcript entry with baked-in entrance + layout motion. Pairs with
// InputMessage's onSend: render one per sent/received message. `layout="position"`
// lets earlier messages slide up smoothly when a new one is appended.
function ChatMessage({
  from,
  files,
  thumbnailSize = 64,
  time,
  actions,
  children,
  className,
  ref,
  ...props
}: ChatMessageProps) {
  const isUser = from === "user";
  // Timestamps are a user-message affordance; assistant replies show actions only.
  const showTime = isUser && time !== undefined && time !== null;

  return (
    <motion.div
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className={cn(
        "group flex max-w-[80%] flex-col gap-1.5",
        isUser ? "items-end self-end" : "items-start self-start",
        className,
      )}
      data-slot="chat-message"
      initial={{ opacity: 0, scale: 0.96, y: 8 }}
      layout="position"
      ref={ref}
      style={{ transformOrigin: isUser ? "bottom right" : "bottom left" }}
      transition={{ bounce: 0.15, duration: 0.16, type: "spring" }}
      {...props}
    >
      {files && files.length > 0 && (
        <div className={cn("flex flex-wrap gap-1.5", isUser ? "justify-end" : "justify-start")}>
          {files.map((file, i) => (
            <FileThumbnail
              file={file}
              key={`${file.name}-${file.size}-${file.lastModified}-${i}`}
              size={thumbnailSize}
            />
          ))}
        </div>
      )}
      {children !== undefined && children !== null && children !== "" && (
        <div
          className={cn(
            "whitespace-pre-wrap text-pretty break-words py-2 text-sm",
            // User keeps the bubble chrome (rounded tonal fill + padding); the
            // assistant reply is flush-left plain text with no background.
            isUser ? "rounded-2xl bg-accent px-3.5 text-accent-foreground" : "text-foreground",
          )}
        >
          {children}
        </div>
      )}
      {(showTime || (actions !== undefined && actions !== null)) && (
        // Meta row: always rendered (so it reserves height and the gap between
        // bubbles never shifts) but hidden until the message is hovered or an
        // action is focused.
        <div
          className={cn(
            "flex items-center gap-2 px-1 text-muted-foreground text-xs leading-none select-none",
            "pointer-events-none opacity-0 transition-opacity duration-150",
            "group-hover:pointer-events-auto group-hover:opacity-100",
            "group-focus-within:pointer-events-auto group-focus-within:opacity-100",
          )}
        >
          {showTime && <span className="tabular-nums">{time}</span>}
          {actions !== undefined && actions !== null && (
            <span className="flex items-center gap-0.5">{actions}</span>
          )}
        </div>
      )}
    </motion.div>
  );
}

export { ChatMessage };
export type { ChatMessageProps };
