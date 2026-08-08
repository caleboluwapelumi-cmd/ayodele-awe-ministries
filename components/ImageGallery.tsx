"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import AnimateIn from "./AnimateIn";

/**
 * A responsive photo grid whose thumbnails open in a lightbox.
 *
 * Deliberately hand-rolled rather than pulled from a package: the whole thing
 * is a grid, a `fixed` panel and a keydown handler, and the standing rule in
 * CLAUDE.md is that the atmosphere/UI layer must not grow the bundle. It brings
 * in no dependency framer-motion has not already put in the shared chunk.
 *
 * The modal mechanics follow `BirthdayGiving` — escape, backdrop, body-scroll
 * freeze, tab trap, focus return, `useReducedMotion` — because that is the
 * pattern this site already has and there is no reason for a second one.
 */

export type GalleryImage = {
  src: string;
  /** Required. These photographs are the subject, not decoration. */
  alt: string;
  /** Intrinsic size, so the lightbox can lay the image out without a guess. */
  width: number;
  height: number;
};

/** Everything focusable inside the panel, for the tab trap. */
const FOCUSABLE =
  'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])';

export default function ImageGallery({ images }: { images: GalleryImage[] }) {
  /** `null` when closed; otherwise the index being shown. */
  const [openAt, setOpenAt] = useState<number | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  /** Whatever opened the lightbox, so focus can go back there on close. */
  const opener = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();

  const open = useCallback((index: number) => {
    opener.current = document.activeElement as HTMLElement | null;
    setOpenAt(index);
  }, []);

  const close = useCallback(() => {
    setOpenAt(null);
    opener.current?.focus?.();
  }, []);

  const step = useCallback(
    (delta: number) =>
      setOpenAt((i) =>
        i === null ? i : (i + delta + images.length) % images.length,
      ),
    [images.length],
  );

  /**
   * Escape closes, the arrow keys walk the set, and Tab cycles inside the
   * panel. Without the trap, tabbing walks straight out into the grid behind
   * the backdrop while the lightbox is still covering it.
   */
  useEffect(() => {
    if (openAt === null) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        step(1);
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        step(-1);
        return;
      }
      if (event.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;
      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || !panel.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [openAt, close, step]);

  /**
   * Freeze the page behind the lightbox. ⚠️ `<body>` carries `overflow-x-hidden`
   * from a class; an inline `overflow` covers both axes and is removed rather
   * than reset to a value, so the class takes over again on close.
   */
  useEffect(() => {
    if (openAt === null) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [openAt]);

  /** Focus lands on the panel itself, so a screen reader reads the caption. */
  useEffect(() => {
    if (openAt !== null) panelRef.current?.focus();
  }, [openAt]);

  const current = openAt === null ? null : images[openAt];

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
        {images.map((image, i) => (
          /* ⚠️ The stagger is `(i % 4) * 0.1`, not `i * 0.1`. `AnimateIn` fires
             on each element's own scroll-in, so across a grid this long a flat
             index stagger would leave the last tile invisible for nearly two
             seconds after it was already on screen. Four is the widest the grid
             ever gets, so this staggers a row and then repeats. Same exception
             the /events programme grid documents. */
          <AnimateIn key={image.src} delay={(i % 4) * 0.1} className="h-full">
            <button
              type="button"
              onClick={() => open(i)}
              aria-label={`Open larger: ${image.alt}`}
              className="group relative block aspect-[4/5] w-full overflow-hidden bg-brand-blue/5 ring-1 ring-brand-blue/10 transition-shadow duration-300 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
            >
              {/* ⚠️ `sizes` is the real rendered width, not the column
                  fraction, and the difference is most of what these tiles
                  cost. The grid caps at max-w-7xl (1280) less lg:px-16, so
                  four columns and three 24px gaps leave 270px each however
                  wide the viewport gets — the old `25vw` claimed 480px on a
                  1920 screen and the browser dutifully picked a candidate
                  nearly three times the pixel count of the box it was about
                  to be drawn into. Below lg the columns really are
                  proportional, so those two stay in vw, less the padding and
                  gaps: (100vw-96)/3 at sm, (100vw-48)/2 below it.

                  `quality` is the second half of it. A 1800px phone
                  photograph rendered at 270px has detail to spare, so 65
                  costs nothing visible here — the lightbox below is where
                  these are actually looked at, and it stays at the default. */}
              <Image
                src={image.src}
                alt={image.alt}
                fill
                loading="lazy"
                quality={65}
                sizes="(min-width: 1024px) 280px, (min-width: 640px) 31vw, 48vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Enough of a wash on hover to signal the tile is a control. */}
              <span
                aria-hidden
                className="absolute inset-0 bg-brand-navy/0 transition-colors duration-300 group-hover:bg-brand-navy/20"
              />
            </button>
          </AnimateIn>
        ))}
      </div>

      {/* ⚠️ Rendered here, as a sibling of the grid, and never inside one of the
          `AnimateIn` wrappers above. Their `motion.div` carries a transform, and
          a transformed ancestor becomes the containing block for its `fixed`
          descendants — a lightbox mounted in there would size itself against a
          single thumbnail. The same trap the mobile menu panel and the giving
          modal hit; see CLAUDE.md. */}
      <AnimatePresence>
        {current && (
          /* ⚠️ The dialog — and therefore the tab trap's root — is this
             untransformed `fixed` box, NOT the animated figure inside it. The
             three controls are `absolute` against it, which is the whole
             reason they live out here: framer-motion writes a real `transform`
             onto the figure while it animates, and a transformed ancestor
             becomes the containing block for its positioned descendants, so a
             control nested in there would anchor to the photograph instead of
             the viewport. */
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={current.alt}
            tabIndex={-1}
            className="fixed inset-0 z-50 outline-none"
          >
            <motion.div
              aria-hidden
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduced ? 0.1 : 0.25, ease: "easeOut" }}
              className="absolute inset-0 bg-brand-navy/90 backdrop-blur-sm"
            />

            {/* Clicking anywhere off the picture closes, which is what a
                lightbox is expected to do; the figure stops the bubble. */}
            <div
              onClick={close}
              className="absolute inset-0 flex items-center justify-center p-4 sm:p-8"
            >
              <motion.div
                onClick={(event) => event.stopPropagation()}
                initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
                animate={reduced ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
                transition={{ duration: reduced ? 0.1 : 0.28, ease: "easeOut" }}
                className="relative flex max-h-full w-full max-w-5xl flex-col items-center"
              >
                <Image
                  key={current.src}
                  src={current.src}
                  alt={current.alt}
                  width={current.width}
                  height={current.height}
                  sizes="(min-width: 1024px) 1024px, 100vw"
                  className="h-auto max-h-[72vh] w-auto max-w-full object-contain shadow-2xl"
                />

                <p className="mt-4 max-w-2xl text-balance px-2 text-center font-sans text-sm leading-relaxed text-white/70">
                  {current.alt}
                </p>
                <p className="mt-2 font-sans text-xs uppercase tracking-[0.2em] text-white/40">
                  {(openAt ?? 0) + 1} / {images.length}
                </p>
              </motion.div>
            </div>

            {/* 44px controls — tapped on a phone more than anything else here. */}
            <button
              type="button"
              onClick={close}
              aria-label="Close image"
              className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-brand-navy/60 text-white/80 transition-colors hover:border-brand-orange hover:text-brand-orange-light sm:right-6 sm:top-6"
            >
              <X size={20} />
            </button>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous image"
                  className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-brand-navy/60 text-white/80 transition-colors hover:border-brand-orange hover:text-brand-orange-light sm:left-6"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next image"
                  className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-brand-navy/60 text-white/80 transition-colors hover:border-brand-orange hover:text-brand-orange-light sm:right-6"
                >
                  <ChevronRight size={22} />
                </button>
              </>
            )}
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
