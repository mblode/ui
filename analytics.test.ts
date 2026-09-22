import posthog from "posthog-js";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { observeSectionViews } from "./analytics";

vi.mock("posthog-js", () => ({ default: { __loaded: true, capture: vi.fn() } }));

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

function BlockedObserver() {
  throw new Error("blocked");
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
    vi.mocked(posthog.capture).mockClear();
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

  it("never throws", () => {
    vi.stubGlobal("window", {
      IntersectionObserver: BlockedObserver,
    });
    expect(() => observeSectionViews([{ element, id: "faq" }])()).not.toThrow();

    vi.stubGlobal("window", { IntersectionObserver: FakeObserver });
    vi.mocked(posthog.capture).mockImplementation(() => {
      throw new Error("capture failed");
    });
    observeSectionViews([{ element, id: "faq" }]);
    fire([entry(0)]);
    expect(() => fire([entry(1)])).not.toThrow();
  });
});
