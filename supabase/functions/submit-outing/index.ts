// @ts-nocheck
/* eslint-disable */
// Supabase Edge Function (executed in Supabase Deno Runtime)
import { createClient } from "jsr:@supabase/supabase-js@2";

type Outing = {
  id: string;
  place: string;
  date: string;
  time: string;
  created_at: string;
};

const localOrigins = ["http://localhost:3000", "http://localhost:3001"];

function corsHeaders(origin: string | null) {
  const configured = (Deno.env.get("ALLOWED_ORIGINS") ?? "")
    .split(",")
    .map((value: string) => value.trim())
    .filter(Boolean);
  const allowed = configured.length ? configured : localOrigins;
  const permitted = origin !== null && (allowed.includes(origin) || allowed.includes("*"));

  return {
    permitted,
    headers: permitted
      ? {
          "Access-Control-Allow-Origin": origin ?? "*",
          "Access-Control-Allow-Headers": "authorization, apikey, content-type, x-client-info",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Vary": "Origin",
        }
      : {},
  };
}

function response(body: Record<string, unknown>, status: number, headers: HeadersInit) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...headers },
  });
}

function isDate(value: unknown): value is string {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

function isTime(value: unknown): value is string {
  return typeof value === "string" && /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(value);
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"]/g, (ch: string) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[ch] ?? ch);
}

function secretKey() {
  const modernKeys = Deno.env.get("SUPABASE_SECRET_KEYS");
  if (modernKeys) {
    try {
      const parsed = JSON.parse(modernKeys) as Record<string, string>;
      if (parsed.default) return parsed.default;
    } catch {
      // Fallback
    }
  }
  return Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || Deno.env.get("SUPABASE_SECRET_KEY");
}

async function sendNotification(outing: { place: string; date: string; time: string }) {
  const apiKey = Deno.env.get("RESEND_API_KEY");
  const recipient = Deno.env.get("NOTIFICATION_EMAIL");
  const from = Deno.env.get("EMAIL_FROM") ?? "onboarding@resend.dev";
  if (!apiKey || !recipient) return false;

  const place = escapeHtml(outing.place);

  const html = `
    <div style="background:#f6f1f8;color:#514663;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;padding:36px 16px;">
      <div style="max-width:520px;margin:auto;background:#ffffff;border-radius:24px;padding:32px;border:1px solid #d8cbea;box-shadow:0 12px 32px rgba(81,70,99,0.08);">
        <h1 style="margin:0 0 14px;color:#514663;font-size:24px;font-weight:600;">Someone said YES! 💜</h1>
        <div style="background:#fcfafc;border:1px solid #e9e1f2;border-radius:16px;padding:20px;margin-bottom:24px;">
          <p style="margin:0 0 10px;font-size:16px;"><strong>Place:</strong> ${place}</p>
          <p style="margin:0 0 10px;font-size:16px;"><strong>Date:</strong> ${outing.date}</p>
          <p style="margin:0;font-size:16px;"><strong>Time:</strong> ${outing.time}</p>
        </div>
        <p style="margin:0;color:#514663;font-size:16px;font-weight:500;">Now it's a plan. 💜<br>I can't wait. 🌷</p>
      </div>
    </div>`;

  const text = `Someone said YES! 💜\n\nPlace: ${outing.place}\nDate: ${outing.date}\nTime: ${outing.time}\n\nNow it's a plan. 💜\nI can't wait. 🌷`;

  const result = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
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
  return result.ok;
}

Deno.serve(async (request: Request) => {
  const origin = request.headers.get("Origin");
  const cors = corsHeaders(origin);
  if (request.method === "OPTIONS") {
    return cors.permitted ? new Response(null, { status: 204, headers: cors.headers }) : response({ error: "Not allowed" }, 403, {});
  }
  if (request.method !== "POST" || (origin !== null && !cors.permitted)) return response({ error: "Not allowed" }, 403, cors.headers);

  try {
    const contentType = request.headers.get("Content-Type") ?? "";
    if (!contentType.includes("application/json")) return response({ error: "Invalid request" }, 400, cors.headers);
    const body = await request.json();
    if (!body || typeof body !== "object") return response({ error: "Invalid request" }, 400, cors.headers);
    const { place, date, time } = body as Record<string, unknown>;
    const trimmedPlace = typeof place === "string" ? place.trim() : "";
    if (!trimmedPlace || trimmedPlace.length > 200 || !isDate(date) || !isTime(time)) {
      return response({ error: "Please provide valid outing details" }, 400, cors.headers);
    }

    const url = Deno.env.get("SUPABASE_URL");
    const key = secretKey();
    if (!url || !key) return response({ error: "Unable to save the plan" }, 500, cors.headers);
    const supabase = createClient(url, key, { auth: { persistSession: false } });

    const { data, error } = await supabase
      .from("outings")
      .insert({ place: trimmedPlace, date, time })
      .select("*")
      .single<Outing>();

    if (error || !data) {
      console.error("Supabase insert error:", error);
      return response({ error: "Unable to save the plan" }, 500, cors.headers);
    }

    await sendNotification(data);

    return response({ success: true, id: data.id }, 200, cors.headers);
  } catch (err) {
    console.error("Edge function error:", err);
    return response({ error: "Unable to save the plan" }, 500, cors.headers);
  }
});
