"use client";
import { useMemo, useSyncExternalStore } from "react";

const DEFAULT_BREAKPOINTS = {
  "2xs": 400,
  xs: 480,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};
type Breakpoints = typeof DEFAULT_BREAKPOINTS & Record<string, number>;
type BreakpointKey = keyof typeof DEFAULT_BREAKPOINTS | string;
type ScreenSize = Record<BreakpointKey, boolean>;

export const useScreenSize = (customBreakpoints?: Partial<Breakpoints>) => {
  const breakpoints: Breakpoints = useMemo(
    () => ({ ...DEFAULT_BREAKPOINTS, ...customBreakpoints }),
    [customBreakpoints]
  );

  const subscribe = (cb: () => void) => {
    if (typeof window === "undefined") return () => {};
    window.addEventListener("resize", cb);
    return () => window.removeEventListener("resize", cb);
  };

  const getSnapshot = () =>
    typeof window === "undefined" ? 0 : window.innerWidth;

  const getServerSnapshot = () => 0;

  const width = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const isScreenSize = useMemo(() => {
    return Object.entries(breakpoints).reduce((acc, [key, value]) => {
      acc[key as BreakpointKey] = width >= value;
      return acc;
    }, {} as ScreenSize);
  }, [breakpoints, width]);

  return { isScreenSize };
};
