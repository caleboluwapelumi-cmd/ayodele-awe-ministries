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
 * The comparison itself lives in `lib/admin-auth.ts`, because PATCH
 * /api/birthday-testimony (archiving) needs the same check — that one is a
 * mutation, so unlike the GET it is not left open.
 *
 * ⚠️ It is still not real auth. GET /api/birthday-testimony has no
 * authentication, so anyone who knows that URL reads every testimony without
 * passing this gate. See CLAUDE.md → "The birthday page".
 */

import { NextResponse } from "next/server";
import { checkAdminPassword } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let password: unknown = "";
  try {
    const body = (await request.json()) as { password?: unknown };
    password = body.password;
  } catch {
    // Falls through to the mismatch below.
  }

  const check = checkAdminPassword(password);
  if (!check.ok) {
    return NextResponse.json(
      { ok: false, error: check.error },
      { status: check.status }
    );
  }

  return NextResponse.json({ ok: true });
}
