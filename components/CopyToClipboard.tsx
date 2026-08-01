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
    <div className="flex items-center justify-between gap-4 border-b border-white/10 py-4 last:border-b-0">
      <div className="min-w-0">
        <p className="font-sans text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-white/40">
          {label}
        </p>
        <p
          className={`mt-1 break-words font-sans text-base font-semibold text-white ${
            mono ? "tabular-nums tracking-wide" : ""
          }`}
        >
          {value}
        </p>
      </div>

      <button
        type="button"
        onClick={copy}
        aria-label={copied ? `${label} copied` : `Copy ${label}`}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-blue-sky hover:text-blue-sky"
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
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
        text: "Join us in celebrating Pastor Ayodele's birthday — share a testimony and sow a seed of honour.",
        url,
      });
    } catch {
      // The user dismissed the sheet, or it is unavailable — copying is the
      // sensible consolation either way.
      copy();
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
      <Button
        onClick={canShare ? share : copy}
        variant="wine"
        size="lg"
        disabled={!url}
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
          className="text-white"
          external
        >
          Share on WhatsApp
        </Button>
      )}
    </div>
  );
}
