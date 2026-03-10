import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, phone, location, level, message, newsletter } =
      body;

    // TODO: Integrate with CRM / email service
    console.log("Partnership request:", {
      fullName,
      email,
      phone,
      location,
      level,
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
