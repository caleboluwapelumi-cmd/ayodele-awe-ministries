import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, phone, subject, message, newsletter } = body;

    // TODO: Integrate with email / CRM service
    console.log("Contact form submission:", {
      fullName,
      email,
      phone,
      subject,
      message,
      newsletter,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request" },
      { status: 400 }
    );
  }
}
