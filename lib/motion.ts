import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import type { RefObject } from "react";

/**
 * Shared motion helpers for the client components that animate.
 *
 * Every looping animation on the main site (the hero slideshows, the marquee,
 * the globe and the drifting dots) obeys two things:
 *
 * 1. `prefers-reduced-motion` — the OS setting, read through
 *    `useMediaQuery(REDUCED_MOTION)`. Nothing loops in that mode.
 * 2. Hover and keyboard focus — a loop holds still while the pointer is over
 *    its section or focus is inside it (`useHoverFocusPause`; the marquee does
 *    the same in CSS).
 *
 * ⚠️ There is no visible pause button and no stored pause preference any
 * more. Both were removed on 22 October 2026 at the client's request — the
 * `MotionToggle` button, the `<html data-motion="paused">` flag and its
 * localStorage key all went. Be aware of what that trades: WCAG 2.2.2 asks for
 * a way to stop motion that runs longer than five seconds, and hover/focus
 * does not cover a touch-only visitor who has not turned on reduced motion.
 * If an audit flags it, the button is the fix — don't add a second mechanism.
 *
 * ⚠️ Both hooks return `false` on the server and during hydration, then the
 * real value. Never read `matchMedia` during render — a value that differs
 * between the server and the first client render is a hydration error.
 */

export const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
/** A real mouse or trackpad. Touch screens fail this, which is the point. */
export const FINE_POINTER = "(hover: hover) and (pointer: fine)";

export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query],
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/**
 * True while the pointer is over the watched element or keyboard focus is
 * inside it.
 *
 * `scope: "parent"` watches the ref's parent instead, for layers that are
 * `pointer-events-none` or sit underneath the content they decorate (the
 * slideshow photographs, the dot field) — the hero section is what a visitor
 * actually hovers.
 *
 * Focus counts only when it is keyboard focus (`:focus-visible`), so a mouse
 * click on a slide control does not pin the rotation once the pointer leaves.
 */
export function useHoverFocusPause(
  ref: RefObject<HTMLElement | null>,
  scope: "self" | "parent" = "self",
): boolean {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const el = scope === "parent" ? ref.current?.parentElement : ref.current;
    if (!el) return;
    const enter = (e: PointerEvent) => {
      if (e.pointerType === "mouse") setHovered(true);
    };
    const leave = () => setHovered(false);
    const focusIn = (e: FocusEvent) => {
      const t = e.target as HTMLElement | null;
      setFocused(Boolean(t?.matches?.(":focus-visible")));
    };
    const focusOut = (e: FocusEvent) => {
      if (!el.contains(e.relatedTarget as Node | null)) setFocused(false);
    };
    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointerleave", leave);
    el.addEventListener("focusin", focusIn);
    el.addEventListener("focusout", focusOut);
    return () => {
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointerleave", leave);
      el.removeEventListener("focusin", focusIn);
      el.removeEventListener("focusout", focusOut);
    };
  }, [ref, scope]);

  return hovered || focused;
}
