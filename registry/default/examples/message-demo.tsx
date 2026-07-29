import { Avatar, AvatarFallback, AvatarImage } from "@/registry/default/ui/avatar";
import { Bubble, BubbleContent, BubbleGroup, BubbleReactions } from "@/registry/default/ui/bubble";
import { Marker, MarkerContent } from "@/registry/default/ui/marker";
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
} from "@/registry/default/ui/message";

export default function MessageDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6 py-12">
      <Message align="end">
        <MessageAvatar>
          <Avatar>
            <AvatarImage alt="@me" src="https://avatars.githubusercontent.com/u/124599?v=4" />
            <AvatarFallback>ME</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <Bubble>
            <BubbleContent>Deploying to prod real quick.</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <Message>
        <MessageAvatar>
          <Avatar>
            <AvatarImage alt="@rabbit" src="https://avatars.githubusercontent.com/u/6880091?v=4" />
            <AvatarFallback>R</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <Bubble variant="muted">
            <BubbleContent>It&apos;s 4:55 PM. On a Friday.</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <Message align="end">
        <MessageAvatar>
          <Avatar>
            <AvatarImage alt="@me" src="https://avatars.githubusercontent.com/u/124599?v=4" />
            <AvatarFallback>ME</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <Bubble>
            <BubbleContent>It&apos;s a one-line change.</BubbleContent>
          </Bubble>
          <MessageFooter>Delivered</MessageFooter>
        </MessageContent>
      </Message>
      <Message>
        <MessageAvatar>
          <Avatar>
            <AvatarImage alt="@rabbit" src="https://avatars.githubusercontent.com/u/6880091?v=4" />
            <AvatarFallback>R</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <BubbleGroup>
            <Bubble variant="muted">
              <BubbleContent>It&apos;s always a one-line change 😭.</BubbleContent>
            </Bubble>
            <Bubble variant="muted">
              <BubbleContent>Alright, let me take a look.</BubbleContent>
              <BubbleReactions aria-label="Reactions: thumbs up">
                <span>👍</span>
              </BubbleReactions>
            </Bubble>
          </BubbleGroup>
        </MessageContent>
      </Message>
      <Marker render={<output />}>
        <MarkerContent className="shimmer">
          <span className="font-medium">Oliver</span> is typing...
        </MarkerContent>
      </Marker>
    </div>
  );
}
