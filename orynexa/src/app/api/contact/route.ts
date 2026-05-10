import { NextRequest } from "next/server";

type ContactPayload = {
  name: string;
  company?: string;
  country: string;
  email: string;
  phone?: string;
  service: string;
  problem: string;
  budget?: string;
  timeline?: string;
  message?: string;
};

const REQUIRED_FIELDS: (keyof ContactPayload)[] = ["name", "country", "email", "service", "problem"];

export async function POST(request: NextRequest) {
  let body: ContactPayload;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Validate required fields
  const missing = REQUIRED_FIELDS.filter((f) => !body[f]?.toString().trim());
  if (missing.length > 0) {
    return Response.json(
      { error: `Missing required fields: ${missing.join(", ")}` },
      { status: 422 }
    );
  }

  // Basic email format check
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(body.email)) {
    return Response.json({ error: "Invalid email address." }, { status: 422 });
  }

  const lead = {
    name: body.name.trim(),
    company: body.company?.trim() ?? "",
    country: body.country.trim(),
    email: body.email.trim().toLowerCase(),
    phone: body.phone?.trim() ?? "",
    service: body.service.trim(),
    problem: body.problem.trim(),
    budget: body.budget?.trim() ?? "",
    timeline: body.timeline?.trim() ?? "",
    message: body.message?.trim() ?? "",
    submittedAt: new Date().toISOString(),
    source: "orynexa-website",
  };

  // ── CRM / Automation integration point ──────────────────────────────────
  // Set ORYNEXA_CRM_WEBHOOK_URL in your environment to forward leads into
  // your CRM or automation pipeline (e.g. n8n, Make, Zapier, HubSpot, etc.)
  const webhookUrl = process.env.ORYNEXA_CRM_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
      if (!res.ok) {
        console.error(`CRM webhook responded with ${res.status}: ${await res.text()}`);
      }
    } catch (err) {
      // Log but don't block the user — lead is still captured in server logs
      console.error("CRM webhook delivery failed:", err);
    }
  }

  // ── Structured log for self-hosted log aggregation ───────────────────────
  console.log("[ORYNEXA LEAD]", JSON.stringify(lead));

  return Response.json({ ok: true, message: "Lead received." }, { status: 200 });
}
