"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * The Chromium-only event that offers a real one-tap install. It is
 * non-standard, so it is typed here rather than imported from lib.dom.
 */
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<{ outcome: "accepted" | "dismissed" }>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

type InstallOutcome = "accepted" | "dismissed" | "unavailable";

let deferredEvent: BeforeInstallPromptEvent | null = null;
let installed = false;
const listeners = new Set<() => void>();

const emit = () => {
  for (const listener of listeners) {
    listener();
  }
};

/*
 * Registered at module scope rather than on first subscribe, which is unusual
 * for this registry and deliberate: `beforeinstallprompt` fires shortly after
 * load, normally before any component that wants it has mounted. A listener
 * attached inside `subscribe` would miss the only time the event ever fires,
 * and the install button would never appear.
 */
if (typeof window !== "undefined") {
  window.addEventListener("beforeinstallprompt", (event) => {
    // Without this Chromium shows its own mini-infobar and the event is spent.
    event.preventDefault();
    deferredEvent = event as BeforeInstallPromptEvent;
    emit();
  });

  window.addEventListener("appinstalled", () => {
    deferredEvent = null;
    installed = true;
    emit();
  });
}

const subscribe = (onStoreChange: () => void) => {
  listeners.add(onStoreChange);
  return () => {
    listeners.delete(onStoreChange);
  };
};

const getCanInstall = () => deferredEvent !== null;
const getIsInstalled = () => installed;
const getFalse = () => false;

/** True once the browser has offered an install prompt this page can replay. */
const useCanInstall = () => useSyncExternalStore(subscribe, getCanInstall, getFalse);

/** True once this page has been installed during this session. */
const useIsInstalled = () => useSyncExternalStore(subscribe, getIsInstalled, getFalse);

/**
 * Wraps Chromium's deferred install prompt.
 *
 * `canInstall` is false everywhere the event does not exist — every Apple
 * browser, Firefox, and any Chromium page that does not meet the install
 * criteria, which still require a service worker with a fetch handler. Treat
 * it as an enhancement over written instructions, never a replacement.
 */
const useInstallPrompt = () => {
  const canInstall = useCanInstall();
  const isInstalled = useIsInstalled();

  const promptInstall = useCallback(async (): Promise<InstallOutcome> => {
    const event = deferredEvent;

    if (!event) {
      return "unavailable";
    }

    // The event is single-use: whatever the outcome, it cannot be replayed.
    deferredEvent = null;
    emit();

    await event.prompt();
    const { outcome } = await event.userChoice;
    return outcome;
  }, []);

  return { canInstall, isInstalled, promptInstall };
};

export { useInstallPrompt };
export type { InstallOutcome };
