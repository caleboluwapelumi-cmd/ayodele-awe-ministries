"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import Button from "@/components/Button";

/**
 * Copy-to-clipboard controls for /birthday.
 *
 * Account details are the one thing on that page people will act on from a
 * phone, mid-transfer, so tapping a field has to be quicker and more reliable
 * than selecting text with a fingertip.
 *
 * `navigator.clipboard` needs a secure context. Vercel is HTTPS so it is there
 * in production, but the `execCommand` fallback keeps this working on plain
 * `http://` LAN testing and on older in-app browsers (WhatsApp's, notably).
 */

async function writeToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Fall through to the legacy path.
  }

  try {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(area);
    return ok;
  } catch {
    return false;
  }
}

/** Shared "copied!" latch — resets after two seconds, cancelled on unmount. */
function useCopy(value: string) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const copy = useCallback(async () => {
    const ok = await writeToClipboard(value);
    if (!ok) return;
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  }, [value]);

  return { copied, copy };
}

/**
 * One labelled account field with its own copy control. `mono` gives the value
 * `tabular-nums` — account and sort codes read as digits, not as words.
 */
export function CopyField({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  const { copied, copy } = useCopy(value);

  return (
    <div className="flex items-center justify-between gap-3 border-b border-white/10 py-4 last:border-b-0 sm:gap-4">
      {/* ⚠️ `min-w-0` + `break-words`: without it a long account name is an
          unbreakable flex item and pushes the card past the viewport. */}
      <div className="min-w-0">
        {/* ⚠️ /70, not /50. The card is `bg-white/[0.07]`, so the ground these
            10px labels sit on is *lighter* than the section behind it — /50
            measures 3.6:1 there, /70 is 6.1:1. */}
        <p className="font-sans text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-white/70">
          {label}
        </p>
        <p
          className={`mt-1 break-words font-sans text-base font-semibold text-white sm:text-lg ${
            mono ? "tabular-nums tracking-wide" : ""
          }`}
        >
          {value}
        </p>
      </div>

      {/* 44px — the minimum comfortable touch target, and these are tapped
          mid-transfer on a phone more than anything else on the page. */}
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? `${label} copied` : `Copy ${label}`}
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors ${
          copied
            ? "border-bday-orange bg-bday-orange/15 text-bday-orange-light"
            : "border-white/25 text-white/80 hover:border-bday-orange hover:text-bday-orange-light"
        }`}
      >
        {copied ? <Check size={18} /> : <Copy size={18} />}
      </button>

      {/* Announced to screen readers; the icon swap carries it visually. */}
      <span aria-live="polite" className="sr-only">
        {copied ? `${label} copied to clipboard` : ""}
      </span>
    </div>
  );
}

/**
 * The closing share block: copy the link, or hand it straight to WhatsApp —
 * which is how this page is actually going to travel.
 *
 * Both read the live URL rather than a hard-coded one, so they are correct on a
 * preview deploy, the vercel.app domain and the custom domain alike. Where the
 * browser supports the native share sheet (every current mobile browser) the
 * first button uses it; otherwise it falls back to copying.
 */
export function SharePage() {
  const [url, setUrl] = useState("");
  const [canShare, setCanShare] = useState(false);
  const { copied, copy } = useCopy(url);

  /**
   * `window` and `navigator` do not exist during the server render, and reading
   * them in render would be a hydration mismatch — so both are synced once,
   * post-mount. Same single-shot shape `AnimateIn` and `CountdownTimer` use.
   * The WhatsApp control stays a real `<a href>` because of it, which matters:
   * an anchor can be long-pressed, opened in a new tab and read by assistive
   * tech as a link, none of which a click handler gives you.
   */
  useEffect(() => {
    function syncFromWindow() {
      setUrl(window.location.href);
      setCanShare(typeof navigator.share === "function");
    }
    syncFromWindow();
  }, []);

  async function share() {
    try {
      await navigator.share({
        title: "Celebrating Pastor Ayodele Oladapo Awe 🎉",
        text: "Join us in celebrating Pastor Ayodele's birthday — share a testimony and honour God's servant.",
        url,
      });
    } catch {
      // The user dismissed the sheet, or it is unavailable — copying is the
      // sensible consolation either way.
      copy();
    }
  }

  /**
   * ⚠️ Both controls carry `window.location.href` and nothing else, so what
   * travels is this page — never the site root. That matters more than usual
   * right now: the main site has not launched, and /birthday is the only URL
   * anyone should be arriving at.
   */
  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-stretch justify-center gap-3 sm:max-w-none sm:flex-row sm:items-center">
      <Button
        onClick={canShare ? share : copy}
        variant="birthday"
        size="lg"
        disabled={!url}
        className="w-full sm:w-auto"
      >
        {copied ? <Check size={18} /> : <Copy size={18} />}
        {copied ? "Link copied!" : canShare ? "Share this page" : "Copy link to this page"}
      </Button>

      {url && (
        <Button
          href={`https://wa.me/?text=${encodeURIComponent(
            `Join us in celebrating Pastor Ayodele Oladapo Awe's birthday 🎉 ${url}`
          )}`}
          variant="outline"
          size="lg"
          className="w-full text-bday-blue hover:bg-bday-blue/5 sm:w-auto"
          external
        >
          Share on WhatsApp
        </Button>
      )}
    </div>
  );
}
