"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import Button from "@/components/Button";
import type { Testimony } from "@/lib/birthday";

/**
 * Testimony reader for the ministry team. A utility page — no page hero, no
 * scroll reveals, no cinematic treatment. It is not linked from anywhere.
 *
 * ⚠️ KNOWN LIMITATION, accepted for a short-lived page: the gate is cosmetic.
 * The password is verified server-side (see /api/birthday-admin for why), but
 * GET /api/birthday-testimony is itself unauthenticated, so anyone who knows
 * that URL can read every testimony — including submitters' email addresses —
 * without ever seeing this screen. Security here rests on the URL not being
 * published. See CLAUDE.md → "The birthday page".
 *
 * ⚠️ "Delete" here ARCHIVES. Nothing is ever removed from KV: archiving adds
 * the testimony's id to a set that the GET handler subtracts from the list, so
 * the words themselves survive for a possible testimony wall on the main site
 * later. The Archived view below is the whole of the undo.
 */

/**
 * ⚠️ The password itself is held for the session, not a bare "unlocked" flag,
 * because archiving is a mutation and PATCH /api/birthday-testimony requires
 * it. That is a deliberate trade: sessionStorage is same-origin, cleared when
 * the tab closes, and readable only by script already running on this page —
 * whereas an unauthenticated PATCH would let anyone who found the URL hide
 * testimonies from the ministry. If this page ever outlives the birthday,
 * replace both with a real session cookie.
 */
const SESSION_KEY = "birthday-admin-key";

const FIELD =
  "w-full rounded-full border border-white/20 bg-white/5 px-6 py-3.5 font-sans text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-brand-orange";

type View = "active" | "archived";

function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export default function BirthdayAdminPage() {
  /**
   * `null` means "not yet known" — sessionStorage is unavailable during the
   * server render, so resolving this in render would be a hydration mismatch.
   * The gate stays blank for one paint rather than flashing the wrong screen.
   */
  const [secret, setSecret] = useState<string | null | undefined>(undefined);
  const [password, setPassword] = useState("");
  const [gateError, setGateError] = useState("");
  const [checking, setChecking] = useState(false);

  const [view, setView] = useState<View>("active");
  const [testimonies, setTestimonies] = useState<Testimony[] | null>(null);
  const [loadError, setLoadError] = useState("");
  /** The id currently being archived/restored, so only its own button spins. */
  const [busyId, setBusyId] = useState<string | null>(null);
  const [actionError, setActionError] = useState("");

  useEffect(() => {
    setSecret(sessionStorage.getItem(SESSION_KEY));
  }, []);

  const load = useCallback(async (which: View) => {
    setLoadError("");
    setTestimonies(null);
    try {
      const res = await fetch(`/api/birthday-testimony?include=${which}`, {
        cache: "no-store",
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.success) {
        setTestimonies(data.testimonies ?? []);
      } else {
        setTestimonies([]);
        setLoadError(data?.error ?? "Could not load testimonies.");
      }
    } catch {
      setTestimonies([]);
      setLoadError("Could not load testimonies.");
    }
  }, []);

  useEffect(() => {
    if (secret) load(view);
  }, [secret, view, load]);

  async function handleUnlock(e: FormEvent) {
    e.preventDefault();
    setChecking(true);
    setGateError("");
    try {
      const res = await fetch("/api/birthday-admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json().catch(() => null);

      if (res.ok && data?.ok) {
        sessionStorage.setItem(SESSION_KEY, password);
        setSecret(password);
        setPassword("");
      } else {
        setGateError(data?.error ?? "Incorrect password.");
      }
    } catch {
      setGateError("Could not check the password. Please try again.");
    } finally {
      setChecking(false);
    }
  }

  function lock() {
    sessionStorage.removeItem(SESSION_KEY);
    setSecret(null);
    setTestimonies(null);
  }

  /**
   * Archive (or restore) one testimony. The row leaves the current view either
   * way — it no longer belongs to it — so it is dropped locally rather than
   * re-fetching the whole list.
   */
  async function setArchived(testimony: Testimony, archived: boolean) {
    const id = testimony.id;
    if (!id || !secret) return;

    const confirmed =
      !archived ||
      window.confirm(
        `Delete the testimony from ${testimony.name}?\n\n` +
          "It is archived, not destroyed — it stays in storage and can be " +
          "restored from the Archived view."
      );
    if (!confirmed) return;

    setBusyId(id);
    setActionError("");
    try {
      const res = await fetch("/api/birthday-testimony", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: secret, id, archived }),
      });
      const data = await res.json().catch(() => null);

      if (res.ok && data?.success) {
        setTestimonies((prev) => prev?.filter((t) => t.id !== id) ?? prev);
      } else {
        setActionError(
          data?.error ??
            (archived ? "Could not delete that testimony." : "Could not restore it.")
        );
      }
    } catch {
      setActionError(
        archived ? "Could not delete that testimony." : "Could not restore it."
      );
    } finally {
      setBusyId(null);
    }
  }

  if (secret === undefined) {
    return <div className="min-h-screen bg-brand-navy" />;
  }

  if (!secret) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-navy to-brand-blue px-4 py-24">
        <form onSubmit={handleUnlock} className="w-full max-w-sm">
          <h1 className="mb-2 font-serif text-2xl font-bold leading-tight text-white">
            Birthday Testimonies
          </h1>
          <p className="mb-8 font-sans text-sm text-white/50">
            Enter the admin password to continue.
          </p>

          <label htmlFor="admin-password" className="sr-only">
            Admin password
          </label>
          <input
            id="admin-password"
            type="password"
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={FIELD}
            placeholder="Password"
          />

          <Button
            type="submit"
            variant="secondary"
            disabled={checking || !password}
            className="mt-4 w-full"
          >
            {checking ? "Checking…" : "Unlock"}
          </Button>

          {gateError && (
            <p className="mt-4 text-center font-sans text-sm text-red-400">
              {gateError}
            </p>
          )}
        </form>
      </div>
    );
  }

  const archivedView = view === "archived";

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-navy to-brand-blue px-4 py-16 sm:px-6 lg:px-16">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl font-bold leading-tight text-white">
              Birthday Testimonies
            </h1>
            <p className="mt-2 font-sans text-sm text-white/50">
              {testimonies === null
                ? "Loading…"
                : `${testimonies.length} ${
                    archivedView ? "archived" : "received"
                  } · most recent first`}
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => load(view)}
              variant="outline"
              className="text-white"
            >
              Refresh
            </Button>
            <Button onClick={lock} variant="outline" className="text-white">
              Lock
            </Button>
          </div>
        </div>

        {/* Active / Archived. Sharp-cornered pills would fight the buttons
            above, so these are plain text switches. */}
        <div className="mb-10 flex gap-6 border-b border-white/10 pb-3">
          {(["active", "archived"] as View[]).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setView(option)}
              className={`font-sans text-xs font-semibold uppercase tracking-[0.2em] transition-colors ${
                view === option
                  ? "text-brand-orange-light"
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              {option === "active" ? "Active" : "Archived"}
            </button>
          ))}
        </div>

        {loadError && (
          <p className="mb-8 border-l-4 border-red-400 bg-white/5 p-6 font-sans text-sm text-red-300">
            {loadError}
          </p>
        )}

        {actionError && (
          <p className="mb-8 border-l-4 border-red-400 bg-white/5 p-6 font-sans text-sm text-red-300">
            {actionError}
          </p>
        )}

        {testimonies !== null && testimonies.length === 0 && !loadError && (
          <p className="border-l-4 border-brand-orange bg-white/5 p-6 font-sans text-sm text-white/60">
            {archivedView
              ? "Nothing has been archived."
              : "No testimonies have been submitted yet."}
          </p>
        )}

        <div className="space-y-6">
          {testimonies?.map((t, i) => (
            <article
              key={t.id ?? `${t.submittedAt}-${i}`}
              className="border-t-2 border-brand-orange bg-white/5 p-6 sm:p-8"
            >
              <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h2 className="font-serif text-lg font-bold leading-tight text-white">
                  {t.name}
                </h2>
                <span className="font-sans text-xs text-white/40">
                  {formatDate(t.submittedAt)}
                </span>
              </div>

              {(t.location || t.email) && (
                <p className="mb-4 font-sans text-sm text-white/50">
                  {t.location}
                  {t.location && t.email && " · "}
                  {t.email && (
                    <a
                      href={`mailto:${t.email}`}
                      className="underline-offset-4 transition-colors hover:text-brand-orange-light hover:underline"
                    >
                      {t.email}
                    </a>
                  )}
                </p>
              )}

              <p className="whitespace-pre-wrap font-sans text-base leading-relaxed text-white/80">
                {t.message}
              </p>

              <div className="mt-6 flex justify-end border-t border-white/10 pt-4">
                <Button
                  onClick={() => setArchived(t, !archivedView)}
                  variant="outline"
                  disabled={busyId === t.id}
                  className={
                    archivedView ? "text-brand-orange-light" : "text-red-300 hover:bg-red-400/10"
                  }
                >
                  {busyId === t.id
                    ? "Working…"
                    : archivedView
                      ? "Restore"
                      : "Delete"}
                </Button>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-10 border-l-4 border-brand-orange bg-white/5 p-6 font-sans text-sm leading-relaxed text-white/60">
          Deleting archives a testimony rather than destroying it — it is kept in
          storage, out of this list, and can be brought back from the Archived
          view. Nothing shared here is ever lost.
        </p>
      </div>
    </div>
  );
}
