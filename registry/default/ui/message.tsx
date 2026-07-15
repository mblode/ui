import type * as React from "react";

import { cn } from "@/lib/utils";

const MessageGroup = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div
    className={cn("flex min-w-0 flex-col gap-2", className)}
    data-slot="message-group"
    {...props}
  />
);

const Message = ({
  className,
  align = "start",
  ...props
}: React.ComponentProps<"div"> & { align?: "start" | "end" }) => (
  <div
    className={cn(
      "group/message relative flex w-full min-w-0 gap-2 text-sm data-[align=end]:flex-row-reverse",
      className,
    )}
    data-align={align}
    data-slot="message"
    {...props}
  />
);

const MessageAvatar = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div
    className={cn(
      "flex w-fit min-w-8 shrink-0 items-center justify-center self-end overflow-hidden rounded-full bg-muted group-has-data-[slot=message-footer]/message:-translate-y-8",
      className,
    )}
    data-slot="message-avatar"
    {...props}
  />
);

const MessageContent = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div
    className={cn(
      "flex w-full min-w-0 flex-col gap-2.5 wrap-break-word group-data-[align=end]/message:*:data-slot:self-end",
      className,
    )}
    data-slot="message-content"
    {...props}
  />
);

const MessageHeader = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div
    className={cn(
      "flex max-w-full min-w-0 items-center px-3 text-xs font-medium text-muted-foreground group-has-data-[variant=ghost]/message:px-0",
      className,
    )}
    data-slot="message-header"
    {...props}
  />
);

const MessageFooter = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div
    className={cn(
      "flex max-w-full min-w-0 items-center px-3 text-xs font-medium text-muted-foreground group-has-data-[variant=ghost]/message:px-0 group-data-[align=end]/message:justify-end",
      className,
    )}
    data-slot="message-footer"
    {...props}
  />
);

export { MessageGroup, Message, MessageAvatar, MessageContent, MessageFooter, MessageHeader };
