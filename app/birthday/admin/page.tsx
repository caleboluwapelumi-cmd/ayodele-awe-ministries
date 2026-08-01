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
 */

const SESSION_KEY = "birthday-admin-ok";

const FIELD =
  "w-full rounded-full border border-white/20 bg-white/5 px-6 py-3.5 font-sans text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-blue-sky";

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
  const [unlocked, setUnlocked] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [gateError, setGateError] = useState("");
  const [checking, setChecking] = useState(false);

  const [testimonies, setTestimonies] = useState<Testimony[] | null>(null);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    setUnlocked(sessionStorage.getItem(SESSION_KEY) === "true");
  }, []);

  const load = useCallback(async () => {
    setLoadError("");
    try {
      const res = await fetch("/api/birthday-testimony", { cache: "no-store" });
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
    if (unlocked) load();
  }, [unlocked, load]);

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
        sessionStorage.setItem(SESSION_KEY, "true");
        setUnlocked(true);
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
    setUnlocked(false);
    setTestimonies(null);
  }

  if (unlocked === null) {
    return <div className="min-h-screen bg-blue-navy" />;
  }

  if (!unlocked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-navy to-blue-deep px-4 py-24">
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-navy to-blue-deep px-4 py-16 sm:px-6 lg:px-16">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl font-bold leading-tight text-white">
              Birthday Testimonies
            </h1>
            <p className="mt-2 font-sans text-sm text-white/50">
              {testimonies === null
                ? "Loading…"
                : `${testimonies.length} received · most recent first`}
            </p>
          </div>
          <div className="flex gap-3">
            <Button onClick={load} variant="outline" className="text-white">
              Refresh
            </Button>
            <Button onClick={lock} variant="outline" className="text-white">
              Lock
            </Button>
          </div>
        </div>

        {loadError && (
          <p className="mb-8 border-l-4 border-red-400 bg-white/5 p-6 font-sans text-sm text-red-300">
            {loadError}
          </p>
        )}

        {testimonies !== null && testimonies.length === 0 && !loadError && (
          <p className="border-l-4 border-blue-sky bg-white/5 p-6 font-sans text-sm text-white/60">
            No testimonies have been submitted yet.
          </p>
        )}

        <div className="space-y-6">
          {testimonies?.map((t, i) => (
            <article
              key={`${t.submittedAt}-${i}`}
              className="border-t-2 border-blue-sky bg-white/5 p-6 sm:p-8"
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
                      className="underline-offset-4 transition-colors hover:text-blue-sky hover:underline"
                    >
                      {t.email}
                    </a>
                  )}
                </p>
              )}

              <p className="whitespace-pre-wrap font-sans text-base leading-relaxed text-white/80">
                {t.message}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
