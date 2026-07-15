"use client";

import { ArrowRotateClockwiseIcon } from "blode-icons-react";
import * as React from "react";

import { Bubble, BubbleContent } from "@/registry/default/ui/bubble";
import { Button } from "@/registry/default/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";
import { Marker, MarkerContent } from "@/registry/default/ui/marker";
import { Message, MessageContent, MessageHeader } from "@/registry/default/ui/message";
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/registry/default/ui/message-scroller";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/default/ui/tooltip";

const currentUser = "Grace";

type GroupChatItem =
  | {
      id: string;
      type: "event";
      text: string;
      scrollAnchor?: boolean;
    }
  | {
      id: string;
      type: "message";
      sender: string;
      role: "assistant" | "participant";
      text: string;
      scrollAnchor?: boolean;
    };

const initialItems = [
  {
    id: "group-1",
    role: "participant",
    sender: "Grace",
    text: "@mary, the astrophage line keeps matching Venus energy output. Can you check my math?",
    type: "message",
  },
  {
    id: "group-2",
    role: "assistant",
    sender: "Mary (Agent)",
    text: "Yes. Confirmed. The curve points to a microorganism harvesting stellar energy and breeding near carbon dioxide. If @rocky agrees, this is the clue we need.",
    type: "message",
  },
  {
    id: "group-3",
    role: "participant",
    scrollAnchor: true,
    sender: "Grace",
    text: "ping @rocky",
    type: "message",
  },
] satisfies GroupChatItem[];

const rockyMarker = {
  id: "group-4",
  scrollAnchor: true,
  text: "Rocky has joined the chat",
  type: "event",
} satisfies GroupChatItem;

const rockyMessage = {
  id: "group-5",
  role: "participant",
  sender: "Rocky",
  text: "Amaze. Astrophage eats light, makes heat, goes to carbon dioxide. Rocky has fuel model. Grace is smart.",
  type: "message",
} satisfies GroupChatItem;

const GroupChatMessage = ({ item }: { item: Extract<GroupChatItem, { type: "message" }> }) => {
  const isCurrentUser = item.sender === currentUser;
  let variant: "muted" | "ghost" | "tinted" = "tinted";
  if (isCurrentUser) {
    variant = "muted";
  } else if (item.role === "assistant") {
    variant = "ghost";
  }

  return (
    <MessageScrollerItem messageId={item.id} scrollAnchor={item.scrollAnchor}>
      <Message align={isCurrentUser ? "end" : "start"}>
        <MessageContent>
          {!isCurrentUser && <MessageHeader>{item.sender}</MessageHeader>}
          <Bubble variant={variant}>
            <BubbleContent>{item.text}</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
    </MessageScrollerItem>
  );
};

const GroupChatMarker = ({
  item,
  scrollAnchor = false,
}: {
  item: Extract<GroupChatItem, { type: "event" }>;
  scrollAnchor?: boolean;
}) => (
  <MessageScrollerItem scrollAnchor={scrollAnchor}>
    <Marker variant="separator">
      <MarkerContent>{item.text}</MarkerContent>
    </Marker>
  </MessageScrollerItem>
);

export default function MessageScrollerGroupChat() {
  const [demoKey, setDemoKey] = React.useState(0);
  const [rockyTurn, setRockyTurn] = React.useState<"idle" | "marker" | "message">("idle");

  let items: GroupChatItem[] = initialItems;
  if (rockyTurn === "message") {
    items = [...initialItems, rockyMarker, rockyMessage];
  } else if (rockyTurn === "marker") {
    items = [...initialItems, rockyMarker];
  }

  const buttonLabel = rockyTurn === "idle" ? "Add Rocky" : "Send Message as Rocky";
  const isComplete = rockyTurn === "message";

  return (
    <div className="relative flex flex-col gap-4">
      <Card className="mx-auto h-140 w-full max-w-sm gap-0">
        <CardHeader className="gap-1 border-b">
          <CardTitle>Group Chat</CardTitle>
          <CardDescription>
            A group chat with several participants and an assistant. The Marker is marked as a turn.
          </CardDescription>
          <CardAction>
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    aria-label="Reset conversation"
                    disabled={rockyTurn === "idle"}
                    onClick={() => {
                      setRockyTurn("idle");
                      setDemoKey((key) => key + 1);
                    }}
                    size="icon-sm"
                    type="button"
                    variant="outline"
                  />
                }
              >
                <ArrowRotateClockwiseIcon />
              </TooltipTrigger>
              <TooltipContent>
                <p>Reset</p>
              </TooltipContent>
            </Tooltip>
          </CardAction>
        </CardHeader>
        <CardContent className="min-h-0 flex-1 p-0">
          <MessageScrollerProvider>
            <MessageScroller key={demoKey}>
              <MessageScrollerViewport>
                <MessageScrollerContent className="p-4">
                  {items.map((item) =>
                    item.type === "message" ? (
                      <GroupChatMessage item={item} key={item.id} />
                    ) : (
                      <GroupChatMarker item={item} key={item.id} scrollAnchor={item.scrollAnchor} />
                    ),
                  )}
                </MessageScrollerContent>
              </MessageScrollerViewport>
              <MessageScrollerButton />
            </MessageScroller>
          </MessageScrollerProvider>
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-2 border-t">
          <Button
            className="w-full"
            disabled={isComplete}
            onClick={() => setRockyTurn((turn) => (turn === "idle" ? "marker" : "message"))}
            type="button"
            variant="secondary"
          >
            {buttonLabel}
          </Button>
          <p className="text-muted-foreground text-xs">
            {rockyTurn === "idle"
              ? "This will create a marker and make it the anchor"
              : "Now send Rocky's reply into the conversation"}
          </p>
        </CardFooter>
      </Card>
      <div className="mx-auto max-w-sm text-balance px-0.5 text-center text-muted-foreground text-xs">
        When a user joins, a marker is created. scrollAnchor on the marker marks it as the next turn
      </div>
    </div>
  );
}
