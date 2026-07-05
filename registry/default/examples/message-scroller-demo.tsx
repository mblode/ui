"use client";

import * as React from "react";

import { Bubble, BubbleContent } from "@/registry/default/ui/bubble";
import { Button } from "@/registry/default/ui/button";
import { Message, MessageContent } from "@/registry/default/ui/message";
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/registry/default/ui/message-scroller";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
}

const initialMessages: ChatMessage[] = [
  { id: "m-1", role: "user", text: "What makes a good streaming chat feel calm?" },
  {
    id: "m-2",
    role: "assistant",
    text: "It only moves when you ask it to. If you're at the live edge it follows the reply, and the moment you scroll away it holds your place.",
  },
  { id: "m-3", role: "user", text: "Show me what streaming looks like." },
];

const reply =
  "Each new turn anchors near the top, then the answer streams in below it. New chunks arrive without yanking you around, so you can read at your own pace while the response keeps growing token by token.";

export default function MessageScrollerDemo() {
  const [messages, setMessages] = React.useState(initialMessages);
  const [isStreaming, setIsStreaming] = React.useState(false);

  const startStream = () => {
    if (isStreaming) {
      return;
    }
    setIsStreaming(true);
    const id = `m-${Date.now()}`;
    setMessages((prev) => [...prev, { id, role: "assistant", text: "" }]);

    const tokens = reply.split(" ");
    let index = 0;
    const interval = setInterval(() => {
      index += 1;
      setMessages((prev) =>
        prev.map((message) =>
          message.id === id ? { ...message, text: tokens.slice(0, index).join(" ") } : message,
        ),
      );
      if (index >= tokens.length) {
        clearInterval(interval);
        setIsStreaming(false);
      }
    }, 90);
  };

  return (
    <div className="flex h-140 w-full max-w-md flex-col gap-3">
      <MessageScrollerProvider autoScroll>
        <MessageScroller className="flex-1 rounded-xl border bg-card">
          <MessageScrollerViewport>
            <MessageScrollerContent className="gap-4 p-4">
              {messages.map((message) => {
                const isUser = message.role === "user";
                return (
                  <MessageScrollerItem
                    key={message.id}
                    messageId={message.id}
                    scrollAnchor={isUser}
                  >
                    <Message align={isUser ? "end" : "start"}>
                      <MessageContent>
                        <Bubble variant={isUser ? "default" : "muted"}>
                          <BubbleContent>{message.text || "…"}</BubbleContent>
                        </Bubble>
                      </MessageContent>
                    </Message>
                  </MessageScrollerItem>
                );
              })}
            </MessageScrollerContent>
          </MessageScrollerViewport>
          <MessageScrollerButton />
        </MessageScroller>
      </MessageScrollerProvider>
      <Button
        className="w-full"
        disabled={isStreaming}
        onClick={startStream}
        type="button"
        variant="secondary"
      >
        {isStreaming ? "Streaming…" : "Stream a reply"}
      </Button>
    </div>
  );
}
