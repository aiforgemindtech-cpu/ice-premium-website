import { NextResponse } from "next/server";
import { Resend } from "resend";

import { contactSchema } from "@/lib/contact-schema";
import { siteConfig } from "@/lib/content";

/**
 * Contact form handler.
 *
 * Rate limiting is deliberately NOT implemented here. In-memory counters do not
 * persist across serverless invocations and would silently do nothing in
 * production. Rate limiting is configured as a Cloudflare dashboard rule
 * against this path instead — see the README.
 */
export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please check the form and try again." },
      { status: 400 },
    );
  }

  // Honeypot tripped — accept silently so the bot learns nothing.
  if (parsed.data.company) {
    return NextResponse.json({ ok: true });
  }

  const { name, email, phone, service, city, message } = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? siteConfig.contact.email;
  const from = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

  if (!apiKey) {
    // No key configured yet. Log it so the enquiry is recoverable, and still
    // report success to the user rather than showing them an alarming error.
    console.warn("[contact] RESEND_API_KEY not set — enquiry not emailed", {
      name,
      email,
      service,
      city,
    });
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: `${siteConfig.company.name} <${from}>`,
      to: [to],
      replyTo: email,
      subject: `New enquiry — ${service} (${city})`,
      text: [
        `Name:    ${name}`,
        `Email:   ${email}`,
        `Phone:   ${phone || "not supplied"}`,
        `Service: ${service}`,
        `City:    ${city}`,
        "",
        "Message:",
        message,
      ].join("\n"),
    });

    if (error) {
      console.error("[contact] Resend rejected the send", error);
      return NextResponse.json({ ok: true, delivered: false });
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[contact] send failed", err);
    // Soft success: the user has done nothing wrong and retrying will not help.
    return NextResponse.json({ ok: true, delivered: false });
  }
}
