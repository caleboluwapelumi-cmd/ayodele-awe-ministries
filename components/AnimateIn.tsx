"use client";

import { motion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";

type Direction = "up" | "left" | "right" | "fade";

const VARIANTS = {
  up: { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } },
  fade: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
} as const;

/**
 * A horizontal reveal only means anything where the layout is actually
 * side-by-side. Below `lg` every two-column grid has collapsed to one column,
 * so a 40px slide on a full-bleed block is both meaningless and harmful: it
 * pushed the block ~24px past the viewport and was the sole reason the site
 * needed `overflow-x-hidden` on <body> to hide a horizontal scrollbar.
 * Below `lg`, `left`/`right` therefore degrade to the vertical `up` reveal.
 */
const SIDE_BY_SIDE = "(min-width: 1024px)";
const REDUCED = "(prefers-reduced-motion: reduce)";

export default function AnimateIn({
  children,
  delay = 0,
  direction = "up",
  className,
}: {
  children: ReactNode;
  delay?: number;
  direction?: Direction;
  /** Passed through so the wrapper can inherit grid/flex sizing from its parent. */
  className?: string;
}) {
  /**
   * Both start `false` so the server render and the first client render agree.
   * The `initial` variant is written into the markup as an inline transform, so
   * disagreeing here is a hydration error rather than a cosmetic one. The real
   * values land in the effect below, long before any of these blocks are
   * scrolled into view.
   */
  const [{ sideBySide, reduced }, setPrefs] = useState({
    sideBySide: false,
    reduced: false,
  });

  useEffect(() => {
    const wide = window.matchMedia(SIDE_BY_SIDE);
    const reduce = window.matchMedia(REDUCED);
    const sync = () =>
      setPrefs({ sideBySide: wide.matches, reduced: reduce.matches });
    sync();
    wide.addEventListener("change", sync);
    reduce.addEventListener("change", sync);
    return () => {
      wide.removeEventListener("change", sync);
      reduce.removeEventListener("change", sync);
    };
  }, []);

  const horizontal = direction === "left" || direction === "right";
  let resolved: Direction = direction;
  if (horizontal && !sideBySide) resolved = "up";
  if (reduced) resolved = "fade";

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: reduced ? 0.2 : 0.6,
        delay: reduced ? 0 : delay,
        ease: "easeOut",
      }}
      variants={VARIANTS[resolved]}
    >
      {children}
    </motion.div>
  );
}
