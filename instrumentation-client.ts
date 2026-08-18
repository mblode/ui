import type { CaptureResult } from "posthog-js";
import posthog from "posthog-js";

const isLocalHost = () => {
  if (typeof window === "undefined") {
    return false;
  }
  const host = window.location.hostname;
  return host === "localhost" || host === "127.0.0.1" || host.endsWith(".localhost");
};

/**
 * Markers that only appear in exceptions thrown by browser extensions.
 *
 * The one that prompted this: "Invalid call to runtime.sendMessage(). Tab not
 * found." arriving from Mobile Safari on iOS, where `chrome.runtime` does not
 * exist at all, so nothing on the page could have called it. It reaches us
 * because an injected content script throws, the string bubbles up through
 * `window.onerror`, and posthog-js autocaptures it as a stackless synthetic
 * `$exception` attributed to whichever page the visitor was on.
 */
const EXTENSION_EXCEPTION_MARKERS = [
  "runtime.sendMessage",
  "Extension context invalidated",
  "chrome-extension://",
  "moz-extension://",
  "safari-extension://",
  "safari-web-extension://",
  "adoptedStyleSheets",
  "WNAdoptedStylesManager",
  "_makeContainerForSrcDocIFrame",
];

const NOISE_MESSAGE_MARKERS = [
  "AbortError",
  "The user aborted a request",
  "NetworkError",
  "A network error occurred",
  "Script error.",
  "Internal Next.js error",
];

const matchesMarker = (value: unknown, markers: string[]) =>
  typeof value === "string" && markers.some((m) => value.includes(m));

const hasStackFrames = (exception: { stacktrace?: { frames?: unknown[] } }): boolean => {
  const frames = exception?.stacktrace?.frames;
  return Array.isArray(frames) && frames.length > 0;
};

const framePointsAtUs = (frames: { abs_path?: unknown; filename?: unknown }[]): boolean => {
  if (typeof window === "undefined") {
    return true;
  }

  const { hostname, origin } = window.location;

  return frames.some((frame) => {
    const path = String(frame?.filename ?? frame?.abs_path ?? "");
    if (!path || path === "<anonymous>") {
      return false;
    }

    if (path.startsWith("/") || path.startsWith("./") || path.startsWith("_next/")) {
      return true;
    }

    return path.includes(origin) || path.includes(hostname) || path.includes("blode.co");
  });
};

const isStacklessNoise = (exception: {
  type?: unknown;
  value?: unknown;
  stacktrace?: { frames?: unknown[] };
}): boolean => {
  if (hasStackFrames(exception)) {
    return false;
  }

  if (exception?.type === "AbortError") {
    return true;
  }

  if (exception?.type === "NetworkError") {
    return true;
  }

  return exception?.value === "Script error.";
};

const isNoisyException = (event: CaptureResult): boolean => {
  if (event.event !== "$exception") {
    return false;
  }
  const exceptions = event.properties?.$exception_list;
  if (!Array.isArray(exceptions)) {
    return false;
  }

  return exceptions.some((exception) => {
    if (
      matchesMarker(exception?.value, EXTENSION_EXCEPTION_MARKERS) ||
      matchesMarker(exception?.type, EXTENSION_EXCEPTION_MARKERS) ||
      matchesMarker(exception?.value, NOISE_MESSAGE_MARKERS) ||
      matchesMarker(exception?.type, NOISE_MESSAGE_MARKERS)
    ) {
      return true;
    }

    const frames = exception?.stacktrace?.frames;

    if (
      Array.isArray(frames) &&
      frames.some(
        (frame: { abs_path?: unknown; filename?: unknown }) =>
          matchesMarker(frame?.filename, EXTENSION_EXCEPTION_MARKERS) ||
          matchesMarker(frame?.abs_path, EXTENSION_EXCEPTION_MARKERS) ||
          (typeof frame?.filename === "string" &&
            frame.filename.includes("node_modules/next/dist/client")) ||
          (typeof frame?.abs_path === "string" &&
            frame.abs_path.includes("node_modules/next/dist/client")),
      )
    ) {
      return true;
    }

    if (Array.isArray(frames) && frames.length > 0 && !framePointsAtUs(frames)) {
      return true;
    }

    return isStacklessNoise(exception);
  });
};

if (!isLocalHost()) {
  posthog.init("phc_yYatHXysbRxjTyfmyCKSUyMSQpgepJPuxegz2HtpfX35", {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    before_send: (event) => {
      if (event && isNoisyException(event)) {
        return null;
      }
      return event;
    },
    defaults: "2026-05-30",
    ui_host: "https://us.posthog.com",
  });
}
