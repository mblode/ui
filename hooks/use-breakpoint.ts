/*

Returns the current breakpoint of the theme, like media query max-width

*/

import { useWindowSize } from "usehooks-ts";

export const breakpoints = {
  lg: 1024,
  md: 768,
  sm: 640,
  xl: 1280,
  xs: 500,
  xxs: 400,
};

export function useBreakpoint() {
  const bp = Object.entries(breakpoints).toSorted(([, width1], [, width2]) => width1 - width2);
  const size = useWindowSize();

  if (size?.width >= breakpoints.xl) {
    return "xl";
  }

  for (const breakpoint of bp) {
    if (size?.width < breakpoint[1]) {
      return breakpoint[0] as keyof typeof breakpoints;
    }
  }

  return "sm";
}
