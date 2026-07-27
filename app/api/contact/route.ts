import { NextResponse } from "next/server";

/**
 * Church-specific subjects get the church's own inbox CC'd alongside the general
 * ministry inbox. The lookup is resolved here already so that wiring Resend up is
 * a one-line change; nothing is actually sent yet.
 */
const CHURCH_INBOXES: Record<string, string> = {
  "Church Information (BHCC)": "Info.buildinghousecc@gmail.com",
  "Church Information (BLCN)": "blcnglobal@gmail.com",
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, phone, subject, message, newsletter } = body;

    const cc = CHURCH_INBOXES[subject as string] ?? null;

    // TODO: Integrate with email / CRM service — send to the general ministry
    // inbox, CC'ing `cc` when the subject names a church.
    console.log("Contact form submission:", {
      fullName,
      email,
      phone,
      subject,
      message,
      newsletter,
      cc,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request" },
      { status: 400 }
    );
  }
}
