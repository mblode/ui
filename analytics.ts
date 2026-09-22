import posthog from "posthog-js";

/**
 * Conversion events for the landing page, on the cross-site contract every
 * Blode product site shares: the same event names and the same `site` property,
 * so one PostHog funnel can compare them. Never rename an event here; add a new
 * one instead, or the history behind every existing insight breaks.
 *
 * PostHog is initialised in `instrumentation-client.ts`, and not at all on
 * localhost. Capturing before init only logs a warning, so each call checks
 * first and development stays quiet. These run inside click, copy and toggle
 * handlers, so a tracking failure is swallowed rather than breaking the UI.
 */
const SITE = "blode-ui";

const capture = (event: string, properties: Record<string, string>) => {
  if (typeof window === "undefined" || !posthog.__loaded) {
    return;
  }
  try {
    posthog.capture(event, { site: SITE, ...properties });
  } catch {
    // A lost event is better than a copy reported as failed or a broken toggle.
  }
};

/** A click on a call to action. `location` is the section, `label` the visible text. */
export const trackCtaClicked = (location: string, label: string) =>
  capture("cta_clicked", { label, location });

/** A successful copy of an install command. `variant` names which command. */
export const trackInstallCommandCopied = (variant: string) =>
  capture("install_command_copied", { variant });

/** The first interaction with the live component wall on a page view. */
export const trackDemoOpened = () => capture("demo_opened", {});

/** An FAQ item opened. */
export const trackFaqOpened = (question: string) => capture("faq_opened", { question });

/** A landing section to report on, keyed by the stable id the page gives it. */
export interface TrackedSection {
  element: Element;
  id: string;
}

/** How much of a section has to be on screen before it counts as seen. */
const SECTION_VISIBLE = 0.5;
// Steps under 0.5 as well, because a section taller than two viewports can
// never reach a 0.5 ratio. It counts once it fills half the viewport instead.
const SECTION_THRESHOLDS = [0, 0.1, 0.2, 0.3, 0.4, SECTION_VISIBLE];

const isHalfVisible = (entry: IntersectionObserverEntry) =>
  entry.isIntersecting &&
  (entry.intersectionRatio >= SECTION_VISIBLE ||
    (entry.rootBounds !== null &&
      entry.intersectionRect.height >= entry.rootBounds.height * SECTION_VISIBLE));

const noop = () => {
  // Nothing was observed, so there is nothing to disconnect.
};

/**
 * `section_viewed` once per section per page view, when half of it is on
 * screen. A section already that visible on the observer's first report was
 * seen on load rather than scrolled to, so it is marked seen without firing;
 * the hero is simply never passed in. Returns a disconnect for an effect
 * cleanup. Without IntersectionObserver it observes nothing, and nothing here
 * can throw into the page.
 */
export const observeSectionViews = (sections: Iterable<TrackedSection>): (() => void) => {
  try {
    if (typeof window === "undefined" || typeof window.IntersectionObserver !== "function") {
      return noop;
    }
    const ids = new Map<Element, string>();
    const reported = new Set<Element>();
    const seen = new Set<string>();
    const observer = new window.IntersectionObserver(
      (entries) => {
        try {
          for (const entry of entries) {
            const id = ids.get(entry.target);
            const onLoad = !reported.has(entry.target);
            reported.add(entry.target);
            if (id === undefined || seen.has(id) || !isHalfVisible(entry)) {
              continue;
            }
            seen.add(id);
            observer.unobserve(entry.target);
            if (!onLoad) {
              capture("section_viewed", { section: id });
            }
          }
        } catch {
          // A lost view is better than an error thrown from a scroll.
        }
      },
      { threshold: SECTION_THRESHOLDS },
    );
    for (const { element, id } of sections) {
      ids.set(element, id);
      observer.observe(element);
    }
    return () => {
      try {
        observer.disconnect();
      } catch {
        // Already gone.
      }
    };
  } catch {
    return noop;
  }
};
