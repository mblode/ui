"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { useInstallPrompt } from "@/registry/default/hooks/use-install-prompt";
import { Button } from "@/registry/default/ui/button";
import { CopyButton } from "@/registry/default/ui/copy-button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/registry/default/ui/sheet";

type AddToHomescreenPlatform = "android" | "desktop" | "ios";

type AddToHomescreenBrowser =
  | "chrome"
  | "edge"
  | "facebook"
  | "firefox"
  | "instagram"
  | "linkedin"
  | "safari"
  | "samsung"
  | "twitter"
  | "unknown";

/** One numbered instruction. `glyph` is drawn inline, mid-sentence. */
interface AddToHomescreenStep {
  /** Small picture of the control the sentence names, shown inline. */
  glyph?: React.ReactNode;
  /** Sentence for this step. */
  text: React.ReactNode;
}

interface AddToHomescreenMessages {
  /** Body of the fallback panel, when no recipe matches this browser. */
  fallbackBody: string;
  /** Heading of the fallback panel. */
  fallbackTitle: string;
  /** Accessible name of the copy-link button in the fallback panel. */
  copyLink: string;
  /** Label of the one-tap install button, where the browser offers one. */
  install: string;
  /** Sub-heading shown alongside the one-tap install button. */
  installSubtitle: string;
  /** Sub-heading under the title. */
  subtitle: string;
  /** Heading of the instruction panel. */
  title: (appName: string) => string;
}

const DEFAULT_MESSAGES: AddToHomescreenMessages = {
  copyLink: "Copy link",
  fallbackBody:
    "Open this page in Safari on iOS, or Chrome on Android, to add it to your home screen.",
  fallbackTitle: "Add this app to your home screen",
  install: "Install",
  installSubtitle: "It opens in its own window, like an app.",
  subtitle: "Two steps, and it opens like an app.",
  title: (appName) => `Add ${appName} to your home screen`,
};

/*
 * Glyphs are drawn rather than imported so the item installs as one file. The
 * registry has no mechanism for copying assets, so a consumer of an <img>-based
 * version would get broken links.
 */

const ShareGlyph = () => (
  <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
    <title>Share</title>
    <path
      d="M12 3v12M12 3 8.5 6.5M12 3l3.5 3.5"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
    />
    <path
      d="M6 11H5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1h-1"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
    />
  </svg>
);

const MenuGlyph = () => (
  <svg aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
    <title>Menu</title>
    <circle cx="12" cy="5" r="1.7" />
    <circle cx="12" cy="12" r="1.7" />
    <circle cx="12" cy="19" r="1.7" />
  </svg>
);

const AddSquareGlyph = () => (
  <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
    <title>Add to Home Screen</title>
    <rect height="16" rx="4" stroke="currentColor" strokeWidth="1.6" width="16" x="4" y="4" />
    <path d="M12 8.5v7M8.5 12h7" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" />
  </svg>
);

/** The bouncing pointer. Rotated by its wrapper, so it always draws upward. */
const ArrowGlyph = () => (
  <svg aria-hidden="true" fill="none" viewBox="0 0 24 32">
    <title>Arrow</title>
    <path
      d="M12 30V4M12 4 5 11M12 4l7 7"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.4"
    />
  </svg>
);

const testUserAgent = (pattern: RegExp): boolean => {
  if (typeof window === "undefined" || !window.navigator) {
    return false;
  }

  const brands = (
    window.navigator as Navigator & {
      userAgentData?: { brands: { brand: string }[] };
    }
  ).userAgentData?.brands;

  return (
    Boolean(brands?.some((entry) => pattern.test(entry.brand))) ||
    pattern.test(window.navigator.userAgent)
  );
};

const detectIsIos = (): boolean => {
  if (typeof window === "undefined") {
    return false;
  }

  // iPadOS 13+ reports itself as a Mac, and only the touch count gives it away.
  const isIpad = window.navigator.platform === "MacIntel" && window.navigator.maxTouchPoints > 1;
  return testUserAgent(/iPad|iPhone|iPod/u) || isIpad;
};

const referrerMatches = (fragment: string): boolean =>
  typeof document !== "undefined" && document.referrer.includes(fragment);

/**
 * Instagram and Threads render their in-app browser shorter than the screen and
 * do not brand the user agent, so the height gap is the only tell. It is a
 * heuristic: a browser with a persistent toolbar can produce the same gap.
 */
const looksLikeMetaInAppBrowser = (): boolean => {
  if (typeof window === "undefined") {
    return false;
  }

  if (referrerMatches("//l.instagram.com/")) {
    return true;
  }

  return (
    testUserAgent(/iPhone/u) &&
    Boolean(window.screen.height) &&
    Boolean(window.outerHeight) &&
    window.outerHeight < window.screen.height
  );
};

const detectBrowser = (platform: AddToHomescreenPlatform): AddToHomescreenBrowser => {
  // In-app webviews impersonate the system browser, so they are tested first.
  if (testUserAgent(/FBAN|FBAV/u)) {
    return "facebook";
  }
  if (testUserAgent(/LinkedInApp/u)) {
    return "linkedin";
  }

  if (platform === "ios") {
    if (referrerMatches("//t.co/")) {
      return "twitter";
    }
    if (testUserAgent(/CriOS/u)) {
      return "chrome";
    }
    if (testUserAgent(/FxiOS/u)) {
      return "firefox";
    }
    if (testUserAgent(/EdgiOS/u)) {
      return "edge";
    }
    if (looksLikeMetaInAppBrowser()) {
      return "instagram";
    }
    return testUserAgent(/Safari/u) ? "safari" : "unknown";
  }

  if (platform === "android") {
    if (testUserAgent(/SamsungBrowser/u)) {
      return "samsung";
    }
    if (testUserAgent(/EdgA/u)) {
      return "edge";
    }
    if (testUserAgent(/Firefox/u)) {
      return "firefox";
    }
    return testUserAgent(/Chrome/u) ? "chrome" : "unknown";
  }

  // Desktop. Chrome, Edge and Safari can all install a page as an app.
  if (testUserAgent(/EdgA?\b|Edg\//u)) {
    return "edge";
  }
  if (testUserAgent(/Firefox/u)) {
    return "firefox";
  }
  if (testUserAgent(/Chrome|Chromium/u)) {
    return "chrome";
  }
  if (testUserAgent(/Safari/u)) {
    return "safari";
  }
  return "unknown";
};

const detectPlatform = (): AddToHomescreenPlatform => {
  if (detectIsIos()) {
    return "ios";
  }
  return testUserAgent(/Android/u) ? "android" : "desktop";
};

const detectInstalled = (): boolean => {
  if (typeof window === "undefined") {
    return false;
  }

  return (
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true ||
    window.matchMedia("(display-mode: standalone)").matches
  );
};

interface Recipe {
  /**
   * Where the arrow points, or null when the control's position is a user
   * setting we cannot read. A wrong arrow is worse than none: the reader
   * trusts it, looks at the wrong edge, and stops trusting the steps too.
   */
  arrow: "down" | "up" | null;
  /** Which edge of the screen the sheet hugs. */
  edge: "bottom" | "top";
  steps: AddToHomescreenStep[];
}

const MENU_HINT = "You may need to scroll the menu to find it.";

/**
 * Recipes are keyed on where the browser actually keeps its install control,
 * researched per browser rather than assumed:
 *
 * - iOS Safari keeps Share in the bottom toolbar in all three layouts
 *   (Bottom, Top and Compact); Compact only hides it behind a `...` button.
 * - iOS Chrome/Edge/Firefox put Share beside the address bar, which the user
 *   can move to the top or the bottom. Undetectable, so no arrow.
 * - Android and desktop Chromium menus are pinned to the top right.
 * - Desktop Chrome and Edge show an install pill at the end of the address bar.
 * - macOS Safari installs through File > Add to Dock (Sonoma 14 and later).
 */
const getRecipe = (
  platform: AddToHomescreenPlatform,
  browser: AddToHomescreenBrowser,
): Recipe | null => {
  const openInBrowser: Recipe = {
    // The in-app "..." moves between apps and versions, so it is described
    // rather than pointed at.
    arrow: null,
    edge: "top",
    steps: [
      { glyph: <MenuGlyph />, text: "Tap the menu in this app's browser bar." },
      { text: "Choose Open in browser, then install it from there." },
    ],
  };

  if (browser === "facebook" || browser === "linkedin" || browser === "instagram") {
    return openInBrowser;
  }

  if (platform === "ios") {
    if (browser === "twitter") {
      return openInBrowser;
    }
    if (browser === "safari") {
      return {
        arrow: "down",
        edge: "bottom",
        steps: [
          {
            glyph: <ShareGlyph />,
            text: "Tap Share in the toolbar below. In the compact layout, tap the ... button first.",
          },
          { glyph: <AddSquareGlyph />, text: `Choose Add to Home Screen. ${MENU_HINT}` },
        ],
      };
    }
    if (browser === "chrome" || browser === "edge" || browser === "firefox") {
      return {
        arrow: null,
        edge: "bottom",
        steps: [
          // "Beside the address bar" survives the user moving the address bar;
          // "below" would not.
          { glyph: <ShareGlyph />, text: "Tap Share, beside the address bar." },
          { glyph: <AddSquareGlyph />, text: `Choose Add to Home Screen. ${MENU_HINT}` },
        ],
      };
    }
    return null;
  }

  if (platform === "android") {
    if (browser === "chrome" || browser === "edge" || browser === "samsung") {
      return {
        arrow: "up",
        edge: "top",
        steps: [
          { glyph: <MenuGlyph />, text: "Tap the menu at the top right." },
          // Chromium reserves "Add to Home screen" for plain shortcuts and
          // says "Install app" for a page that meets the install criteria.
          { glyph: <AddSquareGlyph />, text: `Choose Install app. ${MENU_HINT}` },
        ],
      };
    }
    if (browser === "firefox") {
      return {
        arrow: "up",
        edge: "top",
        steps: [
          { glyph: <MenuGlyph />, text: "Tap the menu at the top right." },
          { glyph: <AddSquareGlyph />, text: "Choose Install, then Add to home screen." },
        ],
      };
    }
    return null;
  }

  if (browser === "chrome" || browser === "edge") {
    return {
      arrow: "up",
      edge: "top",
      steps: [
        {
          glyph: <AddSquareGlyph />,
          text: "Click the install icon at the right of the address bar.",
        },
        {
          glyph: <MenuGlyph />,
          text: "If it is not there, open the menu and look for Install page as an app.",
        },
      ],
    };
  }

  if (browser === "safari") {
    return {
      arrow: "up",
      edge: "top",
      steps: [
        { glyph: <ShareGlyph />, text: "Open the File menu at the top of the screen." },
        { glyph: <AddSquareGlyph />, text: "Choose Add to Dock, then click Add." },
      ],
    };
  }

  // Desktop Firefox has no install path, and neither does anything unplaced.
  return null;
};

interface Detection {
  browser: AddToHomescreenBrowser;
  href: string;
  installed: boolean;
  platform: AddToHomescreenPlatform;
}

/** The bouncing pointer, placed just inside the edge the sheet hugs. */
const InstallArrow = ({ direction }: { direction: "down" | "up" }) => (
  <div
    aria-hidden="true"
    className={cn(
      "flex text-foreground/70",
      // Safari's share control is centred in the bottom toolbar; the Chromium
      // menus and the desktop install pill sit at the top right, where pr-12
      // also clears the sheet's own close button.
      direction === "down" ? "justify-center pb-1" : "justify-end pr-12",
    )}
    data-slot="add-to-homescreen-arrow"
  >
    <span
      className={cn(
        "block animate-bounce [&_svg]:h-7 [&_svg]:w-5",
        direction === "down" && "rotate-180",
      )}
    >
      <ArrowGlyph />
    </span>
  </div>
);

/**
 * Sniffing runs in an effect, never during render, so the server and the first
 * client render agree on "nothing" instead of flashing the wrong platform.
 */
const useDetection = (
  platformOverride: AddToHomescreenPlatform | undefined,
  browserOverride: AddToHomescreenBrowser | undefined,
): Detection | null => {
  const [detection, setDetection] = React.useState<Detection | null>(null);

  React.useEffect(() => {
    const platform = platformOverride ?? detectPlatform();
    // oxlint-disable-next-line react/react-compiler -- one-shot UA detection must run after mount so SSR and the first client render agree
    setDetection({
      browser: browserOverride ?? detectBrowser(platform),
      href: window.location.href,
      // An override means a demo is driving this, so the real install state
      // must not hide it.
      installed: platformOverride === undefined && detectInstalled(),
      platform,
    });
  }, [browserOverride, platformOverride]);

  return detection;
};

/** The numbered recipe. Three columns, so a wrapped line keeps its indent. */
const InstallSteps = ({ steps }: { steps: AddToHomescreenStep[] }) => (
  <ol className="flex flex-col gap-4 px-4" data-slot="add-to-homescreen-steps">
    {steps.map((step, index) => (
      <li
        className="flex items-start gap-3 text-sm leading-relaxed"
        data-slot="add-to-homescreen-step"
        // Steps are positional and their text may repeat between recipes.
        // biome-ignore lint/suspicious/noArrayIndexKey: positional steps
        key={index}
      >
        <span
          aria-hidden="true"
          className="mt-px flex size-6 shrink-0 items-center justify-center rounded-full bg-muted font-medium text-muted-foreground text-xs tabular-figures"
        >
          {index + 1}
        </span>
        {step.glyph && (
          <span
            aria-hidden="true"
            className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-foreground [&_svg]:size-4"
            data-slot="add-to-homescreen-step-glyph"
          >
            {step.glyph}
          </span>
        )}
        <span className="min-w-0 flex-1">{step.text}</span>
      </li>
    ))}
  </ol>
);

interface TierInput {
  browser: AddToHomescreenBrowser;
  canInstall: boolean;
  platform: AddToHomescreenPlatform;
  platformOverride?: AddToHomescreenPlatform;
  showArrow: boolean;
  stepsOverride?: AddToHomescreenStep[];
}

/**
 * Picks the tier and the geometry that goes with it. Tier 0 is the browser's
 * own prompt: where Chromium has offered one we can replay, a single tap beats
 * any written instruction, so no steps and no arrow are drawn.
 */
const resolveTier = ({
  browser,
  canInstall,
  platform,
  platformOverride,
  showArrow,
  stepsOverride,
}: TierInput) => {
  // An override means a demo is driving this, so the real prompt must not
  // pre-empt the recipe being demonstrated.
  const nativeInstall = canInstall && platformOverride === undefined;
  const recipe = getRecipe(platform, browser);
  const steps = stepsOverride ?? recipe?.steps;
  const direction = recipe?.arrow ?? null;
  // Caller-supplied steps describe an unknown control, so nothing is pointed at.
  const pointable = direction !== null && stepsOverride === undefined;

  return {
    direction,
    nativeInstall,
    side: recipe?.edge ?? "top",
    steps,
    withArrow: showArrow && pointable && !nativeInstall,
  };
};

interface InstallPanelProps {
  appIconUrl?: string;
  detection: Detection;
  heading: string;
  messages: AddToHomescreenMessages;
  nativeInstall: boolean;
  onInstall: () => void;
  steps?: AddToHomescreenStep[];
  subtitle: string;
}

/** Header plus exactly one of the three tiers: install, steps, or copy-link. */
const InstallPanel = ({
  appIconUrl,
  detection,
  heading,
  messages,
  nativeInstall,
  onInstall,
  steps,
  subtitle,
}: InstallPanelProps) => (
  <>
    <SheetHeader className="flex-row items-center gap-3 space-y-0 pb-0">
      {appIconUrl && (
        // biome-ignore lint/performance/noImgElement: registry items must run outside Next
        // eslint-disable-next-line next/no-img-element -- caller-supplied URL, and this file ships without a framework
        <img
          alt=""
          className="size-11 shrink-0 rounded-xl object-cover ring-1 ring-foreground/10"
          src={appIconUrl}
        />
      )}
      <div className="min-w-0 flex-1">
        <SheetTitle className="text-base leading-snug">{heading}</SheetTitle>
        <SheetDescription className="text-sm">{subtitle}</SheetDescription>
      </div>
    </SheetHeader>

    {nativeInstall && (
      <div className="px-4" data-slot="add-to-homescreen-install">
        <Button className="w-full" onClick={onInstall} type="button">
          {messages.install}
        </Button>
      </div>
    )}

    {!nativeInstall && steps ? <InstallSteps steps={steps} /> : null}

    {!(nativeInstall || steps) && (
      <div className="flex items-center gap-2 px-4" data-slot="add-to-homescreen-fallback">
        <span className="min-w-0 flex-1 truncate rounded-lg border border-border bg-background px-3 py-1.5 font-mono text-muted-foreground text-xs">
          {detection.href}
        </span>
        <CopyButton label={messages.copyLink} size="icon-sm" value={detection.href} />
      </div>
    )}
  </>
);

interface AddToHomescreenProps {
  /** Square icon for the app, shown beside the title. Any URL the page can load. */
  appIconUrl?: string;
  /** Name of the app, used in the heading. */
  appName: string;
  /** Forces a browser instead of sniffing it. Meant for docs and tests. */
  browser?: AddToHomescreenBrowser;
  /** Class names merged onto the sheet panel. */
  className?: string;
  /** Open state when uncontrolled. */
  defaultOpen?: boolean;
  /** Overrides for the built-in English strings. */
  messages?: Partial<AddToHomescreenMessages>;
  /** Called when the sheet opens or closes. */
  onOpenChange?: (open: boolean) => void;
  /** Controlled open state. */
  open?: boolean;
  /**
   * Forces a platform instead of sniffing it. Setting either override also
   * skips the already-installed check, so a demo can render deterministically.
   */
  platform?: AddToHomescreenPlatform;
  /**
   * Suppresses the arrow. It can only ever remove one: a recipe whose control
   * position is unknown never draws an arrow, whatever this is set to.
   */
  showArrow?: boolean;
  /** Replaces the detected instructions entirely. */
  steps?: AddToHomescreenStep[];
}

const AddToHomescreen = ({
  appIconUrl,
  appName,
  browser: browserOverride,
  className,
  defaultOpen,
  messages: messageOverrides,
  onOpenChange,
  open,
  platform: platformOverride,
  showArrow = true,
  steps: stepsOverride,
}: AddToHomescreenProps) => {
  const { canInstall, promptInstall } = useInstallPrompt();
  const detection = useDetection(platformOverride, browserOverride);

  const messages = React.useMemo<AddToHomescreenMessages>(
    () => ({ ...DEFAULT_MESSAGES, ...messageOverrides }),
    [messageOverrides],
  );

  if (!detection || detection.installed) {
    return null;
  }

  const { direction, nativeInstall, side, steps, withArrow } = resolveTier({
    browser: detection.browser,
    canInstall,
    platform: detection.platform,
    platformOverride,
    showArrow,
    stepsOverride,
  });

  const known = Boolean(steps) || nativeInstall;
  const heading = known ? messages.title(appName) : messages.fallbackTitle;
  const stepSubtitle = steps ? messages.subtitle : messages.fallbackBody;
  const subtitle = nativeInstall ? messages.installSubtitle : stepSubtitle;

  const arrow = withArrow && direction ? <InstallArrow direction={direction} /> : null;

  return (
    <Sheet defaultOpen={defaultOpen} onOpenChange={onOpenChange} open={open}>
      <SheetContent
        className={cn(
          "gap-4 pb-5 sm:mx-auto sm:max-w-md",
          // Round only the edge facing the page; the edge against the screen
          // stays square, the way drawer.tsx handles its two directions.
          side === "top" ? "rounded-b-lg" : "rounded-t-lg",
          className,
        )}
        data-browser={detection.browser}
        data-platform={detection.platform}
        data-slot="add-to-homescreen"
        side={side}
      >
        {side === "top" && arrow}

        <InstallPanel
          appIconUrl={appIconUrl}
          detection={detection}
          heading={heading}
          messages={messages}
          onInstall={promptInstall}
          nativeInstall={nativeInstall}
          steps={steps}
          subtitle={subtitle}
        />

        {side === "bottom" && arrow}
      </SheetContent>
    </Sheet>
  );
};

export { AddToHomescreen };
export type {
  AddToHomescreenBrowser,
  AddToHomescreenMessages,
  AddToHomescreenPlatform,
  AddToHomescreenProps,
  AddToHomescreenStep,
};
