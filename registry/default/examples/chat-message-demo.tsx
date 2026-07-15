import {
  ArrowRotateCounterClockwiseIcon,
  PencilIcon,
  SquareBehindSquare1Icon,
} from "blode-icons-react";

import { Button } from "@/registry/default/ui/button";
import { ChatMessage } from "@/registry/default/ui/chat-message";

// Icon-only action buttons for the hover-revealed meta row. Assistant replies
// get copy + regenerate; user messages get copy + edit. Illustrative only —
// the buttons carry no behaviour in this demo.
const MessageActions = ({ from }: { from: "user" | "assistant" }) => (
  <>
    <Button aria-label="Copy message" size="icon-xs" variant="ghost">
      <SquareBehindSquare1Icon />
    </Button>
    {from === "user" ? (
      <Button aria-label="Edit message" size="icon-xs" variant="ghost">
        <PencilIcon />
      </Button>
    ) : (
      <Button aria-label="Regenerate response" size="icon-xs" variant="ghost">
        <ArrowRotateCounterClockwiseIcon />
      </Button>
    )}
  </>
);

export default function ChatMessageDemo() {
  return (
    <div className="flex w-full max-w-xl flex-col gap-2">
      <ChatMessage actions={<MessageActions from="user" />} from="user" time="Wednesday 6:06 PM">
        What does &ldquo;good design&rdquo; actually mean? Everyone says it, no one defines it.
      </ChatMessage>
      <ChatMessage actions={<MessageActions from="assistant" />} from="assistant">
        Good design is mostly invisible — you only notice it when it&apos;s missing. It&apos;s less
        about how something looks and more about how effortlessly it lets you do what you came to
        do.
      </ChatMessage>
      <ChatMessage actions={<MessageActions from="user" />} from="user" time="Wednesday 6:07 PM">
        So function over form?
      </ChatMessage>
      <ChatMessage actions={<MessageActions from="assistant" />} from="assistant">
        Not quite. Form is part of function — something that feels good to use is, in a real sense,
        working better. The split between the two is mostly a myth.
      </ChatMessage>
      <ChatMessage actions={<MessageActions from="user" />} from="user" time="Wednesday 6:08 PM">
        That reframes it completely.
      </ChatMessage>
    </div>
  );
}
