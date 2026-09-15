import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function isDate(value: unknown): value is string {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

function isTime(value: unknown): value is string {
  return typeof value === "string" && /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(value);
}

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"]/g,
    (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[ch] ?? ch
  );
}

async function sendEmailNotification({
  place,
  date,
  time,
}: {
  place: string;
  date: string;
  time: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.NOTIFICATION_EMAIL;
  const from = process.env.EMAIL_FROM || "onboarding@resend.dev";

  if (!apiKey || !recipient || apiKey.includes("your_") || recipient.includes("example.com")) {
    console.warn(
      "[Notification] RESEND_API_KEY or NOTIFICATION_EMAIL not configured. Email skipped."
    );
    return false;
  }

  const safePlace = escapeHtml(place);

  const html = `
    <div style="background:#f6f1f8;color:#514663;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;padding:36px 16px;">
      <div style="max-width:520px;margin:auto;background:#ffffff;border-radius:24px;padding:32px;border:1px solid #d8cbea;box-shadow:0 12px 32px rgba(81,70,99,0.08);">
        <h1 style="margin:0 0 14px;color:#514663;font-size:24px;font-weight:600;">Someone said YES! 💜</h1>
        <div style="background:#fcfafc;border:1px solid #e9e1f2;border-radius:16px;padding:20px;margin-bottom:24px;">
          <p style="margin:0 0 10px;font-size:16px;"><strong>Place:</strong> ${safePlace}</p>
          <p style="margin:0 0 10px;font-size:16px;"><strong>Date:</strong> ${date}</p>
          <p style="margin:0;font-size:16px;"><strong>Time:</strong> ${time}</p>
        </div>
        <p style="margin:0;color:#514663;font-size:16px;font-weight:500;">Now it's a plan. 💜<br>I can't wait. 🌷</p>
      </div>
    </div>`;

  const text = `Someone said YES! 💜\n\nPlace: ${place}\nDate: ${date}\nTime: ${time}\n\nNow it's a plan. 💜\nI can't wait. 🌷`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [recipient],
        subject: "💜 New Outing Plan from Anshika",
        html,
        text,
      }),
    });
    if (!res.ok) {
      const errBody = await res.text();
      console.error(`[Resend Error] Status ${res.status}:`, errBody);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[Resend] Network error dispatching email:", err);
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const { place, date, time } = body as Record<string, unknown>;
    const trimmedPlace = typeof place === "string" ? place.trim() : "";

    // 1. Validate inputs
    if (!trimmedPlace || trimmedPlace.length > 200 || !isDate(date) || !isTime(time)) {
      return NextResponse.json(
        { error: "Please provide valid outing details" },
        { status: 400 }
      );
    }

    // 2. Check Supabase credentials
    const supabaseUrl =
      process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
    
    // Check if service role key is provided, otherwise use publishable/anon key
    const rawServiceRole =
      process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
    const hasServiceRole =
      Boolean(rawServiceRole && !rawServiceRole.includes("your_"));

    const supabaseKey = hasServiceRole
      ? rawServiceRole
      : process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error("[Supabase Error] Missing Supabase URL or Key in environment variables.");
      return NextResponse.json(
        { error: "Server database configuration is missing" },
        { status: 500 }
      );
    }

    // 3. Insert into Supabase table public.outings
    const endpoint = `${supabaseUrl.replace(/\/+$/, "")}/rest/v1/outings`;
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        place: trimmedPlace,
        date,
        time,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Supabase outing insert failed:", errText);
      // DO NOT return success if database insert failed!
      return NextResponse.json(
        { error: "Unable to save the plan to the database" },
        { status: 500 }
      );
    }

    console.log(`[Supabase] Outing successfully inserted (Status ${res.status})`);

    // 4. Send email notification via Resend (Failure to send email does NOT fail the saved outing)
    try {
      await sendEmailNotification({
        place: trimmedPlace,
        date,
        time,
      });
    } catch (emailErr) {
      console.error("[Notification] Non-blocking email error:", emailErr);
    }

    // 5. Return success only after confirmed database insert
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("[submit-outing] Server error:", error);
    return NextResponse.json(
      { error: "Unable to save the plan" },
      { status: 500 }
    );
  }
}
