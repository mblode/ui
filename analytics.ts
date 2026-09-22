import posthog from "posthog-js";

/**
 * Conversion events for the landing page, on the cross-site contract every
 * Blode product site shares: the same event names and the same `site` property,
 * so one PostHog funnel can compare them. Never rename an event here; add a new
 * one instead, or the history behind every existing insight breaks.
 *
 * PostHog is initialised in `instrumentation-client.ts`, and not at all on
 * localhost. Capturing before init only logs a warning, so each call checks
 * first and development stays quiet.
 */
const SITE = "blode-ui";

const capture = (event: string, properties: Record<string, string>) => {
  if (typeof window === "undefined" || !posthog.__loaded) {
    return;
  }
  posthog.capture(event, { site: SITE, ...properties });
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
