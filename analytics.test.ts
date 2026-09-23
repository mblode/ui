import type { PostHog } from "posthog-js";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { observeSectionViews, setAnalyticsClient } from "./analytics";

// analytics.ts only ever sees the client instrumentation-client.ts hands it.
const posthog = { __loaded: true, capture: vi.fn() };

type Callback = (entries: Partial<IntersectionObserverEntry>[]) => void;

let fire: Callback = () => {
  // Replaced by each observer the helper creates.
};

// A function rather than a class, so `new` returns a plain observer whose
// entries are delivered by hand through `fire`.
function FakeObserver(callback: Callback) {
  fire = callback;
  return { disconnect: vi.fn(), observe: vi.fn(), unobserve: vi.fn() };
}

const element = {} as Element;
const entry = (ratio: number): Partial<IntersectionObserverEntry> => ({
  intersectionRatio: ratio,
  intersectionRect: { height: ratio * 100 } as DOMRectReadOnly,
  isIntersecting: ratio > 0,
  rootBounds: { height: 1000 } as DOMRectReadOnly,
  target: element,
});

describe("observeSectionViews", () => {
  beforeEach(() => {
    posthog.capture.mockReset();
    setAnalyticsClient(posthog as unknown as PostHog);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("fires once per section, and not for one already in view on load", () => {
    vi.stubGlobal("window", { IntersectionObserver: FakeObserver });
    observeSectionViews([{ element, id: "faq" }]);
    fire([entry(0)]);
    fire([entry(0.6)]);
    fire([entry(0.9)]);
    expect(posthog.capture).toHaveBeenCalledTimes(1);
    expect(posthog.capture).toHaveBeenCalledWith("section_viewed", {
      section: "faq",
      site: "blode-ui",
    });

    observeSectionViews([{ element, id: "install" }]);
    fire([entry(0.8)]);
    fire([entry(0.8)]);
    expect(posthog.capture).toHaveBeenCalledTimes(1);
  });

  it("does nothing without IntersectionObserver", () => {
    vi.stubGlobal("window", {});
    const disconnect = observeSectionViews([{ element, id: "faq" }]);
    expect(() => disconnect()).not.toThrow();
    expect(posthog.capture).not.toHaveBeenCalled();
  });

  it("swallows a capture failure inside the observer callback", () => {
    vi.stubGlobal("window", { IntersectionObserver: FakeObserver });
    posthog.capture.mockImplementation(() => {
      throw new Error("capture failed");
    });
    observeSectionViews([{ element, id: "faq" }]);
    fire([entry(0)]);
    expect(() => fire([entry(1)])).not.toThrow();
    expect(posthog.capture).toHaveBeenCalledTimes(1);
  });
});
