import { CopyIcon, RefreshCwIcon } from "blode-icons-react";

import { Button } from "@/registry/default/ui/button";
import { ChatMessage } from "@/registry/default/ui/chat-message";

export default function ChatMessageDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <ChatMessage from="user" time="Wednesday 6:08 PM">
        Can you summarize the Q3 report for me?
      </ChatMessage>
      <ChatMessage
        actions={
          <>
            <Button aria-label="Copy" size="icon-xs" variant="ghost">
              <CopyIcon />
            </Button>
            <Button aria-label="Regenerate" size="icon-xs" variant="ghost">
              <RefreshCwIcon />
            </Button>
          </>
        }
        from="assistant"
      >
        Revenue grew 14% quarter-over-quarter, driven mostly by the new self-serve plan. Churn held
        steady at 2.1%.
      </ChatMessage>
    </div>
  );
}
