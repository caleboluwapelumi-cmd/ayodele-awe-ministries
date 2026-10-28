"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { REDUCED_MOTION, useMediaQuery } from "@/lib/motion";

/**
 * A section image that wipes open from the bottom as it enters, then drifts
 * slowly against the scroll.
 *
 * - **Reveal**: `clip-path: inset()` animated from fully clipped to open. Like
 *   `AnimateIn`, the hidden state is in the server markup, so the reveal never
 *   flashes the finished image first.
 * - **Parallax**: the image sits in a layer scaled to PARALLAX_SCALE and moves
 *   ±DRIFT% while the frame crosses the viewport. Motion values only —
 *   scrolling does not re-render React.
 *
 * Under `prefers-reduced-motion` the wipe completes instantly and the drift
 * holds still. The container supplies the shape (`aspect-*`) via `className`
 * and is `overflow-hidden`, so nothing ever spills past the frame — the 390px
 * overflow audit depends on that.
 *
 * Add `group` to `className` to keep the site's hover zoom on the image.
 */
const DRIFT = 6;
const PARALLAX_SCALE = 1.14;

export default function RevealImage({
  src,
  alt,
  sizes,
  className = "",
  imageClassName = "object-center",
  parallax = true,
  priority = false,
  duration = 1.15,
  delay = 0,
  ease = [0.76, 0, 0.24, 1],
  viewportMargin = "0px 0px -12% 0px",
}: {
  src: string;
  alt: string;
  sizes: string;
  /** Container classes — the aspect ratio lives here. */
  className?: string;
  /** Usually just the `object-position` utility. */
  imageClassName?: string;
  parallax?: boolean;
  priority?: boolean;
  /** Wipe timing. Override only to move in step with neighbouring reveals. */
  duration?: number;
  delay?: number;
  ease?: readonly [number, number, number, number];
  /** Scroll margin that triggers the wipe. */
  viewportMargin?: string;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const reduced = useMediaQuery(REDUCED_MOTION);
  const still = useRef(true);
  useEffect(() => {
    still.current = !parallax || reduced;
  }, [parallax, reduced]);

  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, (p) =>
    still.current ? "0%" : `${((p - 0.5) * 2 * DRIFT).toFixed(2)}%`,
  );

  return (
    // ⚠️ The in-view trigger sits on this UNCLIPPED box and the clip-path on
    // a child, never both on one element. Chrome's IntersectionObserver
    // honours clip-path, so a fully clipped element has no visible area: with
    // any negative margin it never "intersects" and the image never appears,
    // and with the old -12% bottom margin it fired only once the image's
    // bottom edge was on screen — well after neighbouring reveals.
    <motion.div
      ref={frameRef}
      className={`relative overflow-hidden ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: viewportMargin }}
    >
      <motion.div
        className="absolute inset-0"
        variants={{
          hidden: { clipPath: "inset(100% 0% 0% 0%)" },
          visible: { clipPath: "inset(0% 0% 0% 0%)" },
        }}
        transition={
          reduced ? { duration: 0 } : { duration, delay, ease: [...ease] }
        }
      >
        <motion.div
          className="absolute inset-0"
          style={parallax ? { y, scale: PARALLAX_SCALE } : undefined}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className={`object-cover transition-transform duration-700 group-hover:scale-105 ${imageClassName}`}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
