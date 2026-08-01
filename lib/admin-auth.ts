/**
 * The `/birthday/admin` password check, shared by the two routes that need it:
 * `/api/birthday-admin` (the gate itself) and the PATCH handler on
 * `/api/birthday-testimony` (archiving a testimony).
 *
 * ⚠️ Server-only. It reads `BIRTHDAY_ADMIN_PASSWORD`, which Next never inlines
 * into the browser bundle — importing this from a client component would resolve
 * the variable to `undefined` and fail every check. See /api/birthday-admin for
 * why the comparison cannot live in the client at all.
 */

import { timingSafeEqual } from "node:crypto";

/** Length-independent comparison, so a wrong guess leaks nothing by timing. */
function matches(candidate: string, secret: string): boolean {
  const a = Buffer.from(candidate);
  const b = Buffer.from(secret);
  if (a.length !== b.length) {
    // Still burn a comparison of equal length, then fail.
    timingSafeEqual(a, a);
    return false;
  }
  return timingSafeEqual(a, b);
}

export type AdminCheck =
  | { ok: true }
  | { ok: false; status: 401 | 503; error: string };

/**
 * `503` means the deploy has no password configured, so nobody can get in —
 * distinct from `401`, a wrong password. Callers surface both verbatim.
 */
export function checkAdminPassword(candidate: unknown): AdminCheck {
  const secret = process.env.BIRTHDAY_ADMIN_PASSWORD;
  if (!secret) {
    console.error("BIRTHDAY_ADMIN_PASSWORD is not set — the admin gate is closed.");
    return { ok: false, status: 503, error: "The admin area is not configured." };
  }

  const password = typeof candidate === "string" ? candidate : "";
  if (!password || !matches(password, secret)) {
    return { ok: false, status: 401, error: "Incorrect password." };
  }

  return { ok: true };
}
