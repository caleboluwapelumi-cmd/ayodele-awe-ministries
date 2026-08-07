"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import Button, { type ButtonSize, type ButtonVariant } from "@/components/Button";
import SectionLabel from "@/components/SectionLabel";
import { CopyField } from "@/components/CopyToClipboard";
import { CountryFlag, type CountryCode } from "@/components/icons/FlagIcons";

/**
 * Giving on /birthday — the account details, and the modal that is now the only
 * way to reach them.
 *
 * ⚠️ There is deliberately **no giving section on the page**. Account details
 * used to sit inline between the testimony form and the closing section; they
 * were moved behind this modal on 3 August 2026 so the page asks for a
 * testimony first and only then offers a way to give. Bank details presented
 * unprompted read as the point of the page, which is not what it is for.
 *
 * So the flow is: submit a testimony → a quiet CTA appears in the form's own
 * success state → this modal. A second, smaller entry point sits in the closing
 * section for anyone who wants to give without writing anything.
 *
 * ⚠️ Do not put the account cards back on the page. If a giving section is ever
 * wanted again, that is a decision to take with the client, not a refactor.
 */

export type GivingAccount = {
  /**
   * ⚠️ A country code, not a component and not an emoji. It crosses the
   * server→client boundary as a prop, so it has to be serialisable; and the
   * 🇬🇧/🇳🇬 emoji it replaced do not render at all on Windows desktop browsers.
   * See components/icons/FlagIcons.tsx.
   */
  flag: CountryCode;
  region: string;
  fields: { label: string; value: string; mono: boolean }[];
};

type GivingContextValue = { open: () => void };

/**
 * `null` when there is no provider above, so the two call sites can simply not
 * render their CTA rather than crashing. Only /birthday mounts the provider.
 */
const GivingContext = createContext<GivingContextValue | null>(null);

export function useGiving(): GivingContextValue | null {
  return useContext(GivingContext);
}

/** Everything focusable inside the panel, for the tab trap. */
const FOCUSABLE =
  'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])';

export function GivingProvider({
  accounts,
  children,
}: {
  accounts: GivingAccount[];
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  /** Whatever opened the modal, so focus can go back there on close. */
  const opener = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();

  const show = useCallback(() => {
    opener.current = document.activeElement as HTMLElement | null;
    setOpen(true);
  }, []);

  const hide = useCallback(() => {
    setOpen(false);
    opener.current?.focus?.();
  }, []);

  /**
   * Escape closes, and Tab cycles inside the panel. Without the trap, tabbing
   * walks straight out into the page behind the backdrop — where the account
   * fields are the only thing anyone came here for.
   */
  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        hide();
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
  }, [open, hide]);

  /**
   * Freeze the page behind the modal. ⚠️ `<body>` carries `overflow-x-hidden`
   * from a class; an inline `overflow` covers both axes and is removed rather
   * than reset to a value, so the class takes over again on close.
   */
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  /** Focus lands on the panel itself, so a screen reader reads the heading. */
  useEffect(() => {
    if (open) panelRef.current?.focus();
  }, [open]);

  return (
    <GivingContext.Provider value={{ open: show }}>
      {children}

      {/* ⚠️ Rendered here, as a sibling of the page, and not next to either
          trigger. Both triggers sit inside an `AnimateIn`, whose `motion.div`
          carries a transform — and a transformed ancestor becomes the
          containing block for its `fixed` descendants, so a modal mounted in
          there would size itself against that card instead of the viewport.
          The same trap the mobile menu panel hit; see CLAUDE.md. */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50">
            <motion.div
              aria-hidden
              onClick={hide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduced ? 0.1 : 0.25, ease: "easeOut" }}
              className="absolute inset-0 bg-brand-navy/80 backdrop-blur-sm"
            />

            {/* The scroll container, not the panel — a tall panel on a short
                phone in landscape has to be able to scroll past the fold. */}
            <div className="absolute inset-0 flex items-start justify-center overflow-y-auto overscroll-contain p-4 py-8 sm:items-center sm:p-6">
              <motion.div
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="giving-modal-title"
                tabIndex={-1}
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
                animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
                transition={{ duration: reduced ? 0.1 : 0.28, ease: "easeOut" }}
                className="relative w-full max-w-2xl overflow-hidden border-t-2 border-brand-orange bg-gradient-to-br from-brand-blue via-brand-navy to-brand-blue shadow-2xl outline-none"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_100%,rgba(235,100,52,0.22),transparent_60%)]"
                />

                <div className="relative z-10 p-6 sm:p-10">
                  {/* 44px, matching the copy buttons below it. */}
                  <button
                    type="button"
                    onClick={hide}
                    aria-label="Close giving details"
                    className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white/80 transition-colors hover:border-brand-orange hover:text-brand-orange-light sm:right-6 sm:top-6"
                  >
                    <X size={20} />
                  </button>

                  <div className="mb-8 max-w-md pr-12 text-left sm:mb-10">
                    <SectionLabel tone="dark">Giving</SectionLabel>
                    <h2
                      id="giving-modal-title"
                      className="mb-4 text-balance font-serif text-2xl font-bold leading-tight text-white sm:text-3xl"
                    >
                      Give to God&rsquo;s Servant
                    </h2>
                    <p className="font-sans text-base leading-relaxed text-white/75">
                      As we celebrate his life, you may also honour him with a
                      birthday gift of appreciation.
                    </p>
                    <div className="mt-6 h-0.5 w-16 bg-brand-orange" />
                  </div>

                  {/* One column on a phone: two account cards side by side at
                      375px would put the account number on two lines. */}
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-6">
                    {accounts.map((account) => (
                      <div
                        key={account.region}
                        className="flex h-full flex-col border-t-2 border-brand-orange bg-white/[0.07] p-5 backdrop-blur-sm sm:p-6"
                      >
                        <div className="mb-3 flex items-center gap-3 sm:mb-4">
                          {/* 2:1, the ratio both flags are drawn at. */}
                          <CountryFlag
                            code={account.flag}
                            className="h-5 w-10 shrink-0"
                          />
                          <h3 className="font-serif text-lg font-bold leading-tight text-white">
                            {account.region}
                          </h3>
                        </div>

                        <div className="flex-1">
                          {account.fields.map((f) => (
                            <CopyField
                              key={f.label}
                              label={f.label}
                              value={f.value}
                              mono={f.mono}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* ⚠️ NKJV wording, British spelling ("honour", "labour").
                      Don't Americanise it back to a printed NKJV. */}
                  <div className="mt-8 border-t border-white/10 pt-8 text-center sm:mt-10">
                    <p className="text-balance font-serif text-base font-bold italic leading-relaxed text-white/85 sm:text-lg">
                      &ldquo;Let the elders who rule well be counted worthy of
                      double honour, especially those who labour in the word and
                      doctrine.&rdquo;
                    </p>
                    <p className="mt-3 font-sans text-xs uppercase tracking-[0.2em] text-brand-orange-light">
                      1 Timothy 5:17
                    </p>
                  </div>

                  <Button
                    onClick={hide}
                    variant="outline"
                    className="mt-8 w-full text-white sm:w-auto"
                  >
                    Close
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </GivingContext.Provider>
  );
}

/**
 * The only way to open the modal. Renders nothing outside a `GivingProvider`,
 * so a component that offers giving as an aside (the testimony form) can be
 * mounted elsewhere without exploding.
 */
export function GiveButton({
  children,
  variant = "primary",
  size = "lg",
  className = "",
}: {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}) {
  const giving = useGiving();
  if (!giving) return null;

  return (
    <Button
      onClick={giving.open}
      variant={variant}
      size={size}
      className={className}
    >
      {children}
    </Button>
  );
}
