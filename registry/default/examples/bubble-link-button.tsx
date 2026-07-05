"use client";

import { toast } from "sonner";

import { Bubble, BubbleContent, BubbleGroup } from "@/registry/default/ui/bubble";

export default function BubbleLinkButton() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-8 py-12">
      <Bubble variant="muted">
        <BubbleContent>How can I help you today?</BubbleContent>
      </Bubble>
      <BubbleGroup>
        <Bubble align="end" variant="tinted">
          <BubbleContent
            render={
              <button
                aria-label="I forgot my password"
                onClick={() => toast("You clicked forgot password")}
                type="button"
              />
            }
          >
            I forgot my password
          </BubbleContent>
        </Bubble>
        <Bubble align="end" variant="tinted">
          <BubbleContent
            render={
              <button
                aria-label="I need help with my subscription"
                onClick={() => toast("You clicked help with subscription")}
                type="button"
              />
            }
          >
            I need help with my subscription
          </BubbleContent>
        </Bubble>
        <Bubble align="end" variant="tinted">
          <BubbleContent
            render={
              <button
                aria-label="Something else. Talk to a human."
                onClick={() => toast("You clicked something else. Talk to a human.")}
                type="button"
              />
            }
          >
            Something else. Talk to a human.
          </BubbleContent>
        </Bubble>
      </BubbleGroup>
    </div>
  );
}
