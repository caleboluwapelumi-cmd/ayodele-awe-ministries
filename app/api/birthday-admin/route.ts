/**
 * Password check for /birthday/admin.
 *
 * ⚠️ Why this exists at all, when the brief asked for a plain client-side
 * comparison: a client component cannot read `BIRTHDAY_ADMIN_PASSWORD`. Next
 * only inlines variables prefixed `NEXT_PUBLIC_` into the browser bundle, and
 * anything it does inline is readable by everyone who loads the page — as is
 * anything passed down from a server component, which lands in the RSC payload
 * in plain sight.
 *
 * So the comparison happens here instead. The env var keeps the name the brief
 * specified, the gate behaves identically, and the password itself never
 * reaches the browser. This is the whole of the difference.
 *
 * ⚠️ It is still not real auth. GET /api/birthday-testimony has no
 * authentication, so anyone who knows that URL reads every testimony without
 * passing this gate. See CLAUDE.md → "The birthday page".
 */

import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

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

export async function POST(request: Request) {
  const secret = process.env.BIRTHDAY_ADMIN_PASSWORD;
  if (!secret) {
    console.error("BIRTHDAY_ADMIN_PASSWORD is not set — the admin gate is closed.");
    return NextResponse.json(
      { ok: false, error: "The admin area is not configured." },
      { status: 503 }
    );
  }

  let password = "";
  try {
    const body = (await request.json()) as { password?: unknown };
    password = typeof body.password === "string" ? body.password : "";
  } catch {
    // Falls through to the mismatch below.
  }

  if (!password || !matches(password, secret)) {
    return NextResponse.json(
      { ok: false, error: "Incorrect password." },
      { status: 401 }
    );
  }

  return NextResponse.json({ ok: true });
}
