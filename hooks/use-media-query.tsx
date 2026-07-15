import React from "react";

// useSyncExternalStore is the intended primitive for reading an external
// browser store: it subscribes without mirroring `matches` into state, so there
// is no setState-in-effect and no extra render on mount. getServerSnapshot
// returns false so SSR and hydration agree.
export function useMediaQuery(query: string) {
  const subscribe = React.useCallback(
    (onStoreChange: () => void) => {
      const result = matchMedia(query);
      result.addEventListener("change", onStoreChange);
      return () => result.removeEventListener("change", onStoreChange);
    },
    [query],
  );

  return React.useSyncExternalStore(
    subscribe,
    () => matchMedia(query).matches,
    () => false,
  );
}
