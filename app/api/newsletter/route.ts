import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, email } = body;

    // TODO: Integrate with email marketing service (e.g., Mailchimp, ConvertKit)
    console.log("Newsletter subscription:", { firstName, email });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request" },
      { status: 400 }
    );
  }
}
