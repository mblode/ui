import { Bubble, BubbleContent, BubbleReactions } from "@/registry/default/ui/bubble";

export default function BubbleVariants() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-12 py-12">
      <Bubble>
        <BubbleContent>This is the default primary bubble.</BubbleContent>
      </Bubble>
      <Bubble align="end" variant="secondary">
        <BubbleContent>This is the secondary variant.</BubbleContent>
      </Bubble>
      <Bubble variant="muted">
        <BubbleContent>
          This one is muted. It uses a lower emphasis color for the chat bubble.
        </BubbleContent>
        <BubbleReactions aria-label="Reaction: thumbs up" role="img">
          <span>👍</span>
        </BubbleReactions>
      </Bubble>
      <Bubble align="end" variant="tinted">
        <BubbleContent>
          This one is tinted. The tint is a softer color derived from the primary color.
        </BubbleContent>
      </Bubble>
      <Bubble variant="outline">
        <BubbleContent>We can also use an outlined variant.</BubbleContent>
      </Bubble>
      <Bubble align="end" variant="destructive">
        <BubbleContent>Or a destructive variant with a reaction.</BubbleContent>
        <BubbleReactions aria-label="Reaction: fire" role="img">
          <span>🔥</span>
        </BubbleReactions>
      </Bubble>
      <Bubble variant="ghost">
        <BubbleContent className="flex flex-col gap-3">
          <p>Ghost bubbles work for assistant text and other content that should not be framed.</p>
          <p>
            This is perfect for assistant messages that should not have a frame and can take the
            full width of the container.
          </p>
          <p>Ghost bubbles are full width and can take the full width of the container.</p>
        </BubbleContent>
      </Bubble>
    </div>
  );
}
