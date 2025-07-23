export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  message: z.string().min(1, "Message cannot be empty"),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log("[API] /api/contact called", body);

  const parsed = ContactSchema.safeParse(body);

  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    return NextResponse.json({ success: false, errors }, { status: 400 });
  }

  const { name, email, message } = parsed.data;

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY!,
      },
      body: JSON.stringify({
        sender: {
          name: "Neighbour's Voices Contact",
          email: "contact@neighboursvoices.com",
        },
        to: [{ email: process.env.RECEIVER_EMAIL! }],
        replyTo: { email, name },
        subject: "📩 New message from NeighboursVoices.com",
        htmlContent: `
          <p><strong>From:</strong> ${name} (${email})</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
        `,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Brevo API error:", errorText);
      return NextResponse.json({ success: false }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
