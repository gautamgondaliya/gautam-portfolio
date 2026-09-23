import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

// ---------- helpers ----------

const escapeHtml = (s = "") =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Simple per-instance rate limit. Serverless instances do not share memory,
// so this bounds abuse per instance rather than globally. Good enough for a
// portfolio contact form; the honeypot below catches most bots anyway.
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const entry = hits.get(ip) ?? { count: 0, start: now };
  if (now - entry.start > WINDOW_MS) {
    entry.count = 0;
    entry.start = now;
  }
  entry.count += 1;
  hits.set(ip, entry);
  return entry.count > MAX_PER_WINDOW;
}

function clientIp(request) {
  const fwd = request.headers.get("x-forwarded-for");
  return fwd ? fwd.split(",")[0].trim() : request.headers.get("x-real-ip") || "unknown";
}

function validate(body) {
  const name = String(body?.name ?? "").trim();
  const email = String(body?.email ?? "").trim();
  const message = String(body?.message ?? "").trim();
  const company = String(body?.company ?? "").trim(); // honeypot

  if (company) return { honeypot: true };
  if (!name || !email || !message) return { error: "All fields are required." };
  if (name.length > 100 || email.length > 100 || message.length > 1000) {
    return { error: "Input too long." };
  }
  if (!EMAIL_RE.test(email)) return { error: "Invalid email address." };
  return { data: { name, email, message } };
}

// ---------- channels ----------

async function sendTelegram({ name, email, message }) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return null; // not configured

  const text = `New portfolio message\n\nFrom: ${name}\nEmail: ${email}\n\n${message}`;
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    });
    const json = await res.json().catch(() => ({}));
    return Boolean(json.ok);
  } catch (err) {
    console.error("telegram:", err?.message);
    return false;
  }
}

async function sendEmail({ name, email, message }) {
  const user = process.env.EMAIL_ADDRESS;
  const pass = process.env.GMAIL_PASSKEY;
  if (!user || !pass) return null; // not configured

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: { user, pass },
  });

  const safe = {
    name: escapeHtml(name),
    email: escapeHtml(email),
    message: escapeHtml(message).replace(/\n/g, "<br />"),
  };

  const html = `
    <div style="font-family:Arial,sans-serif;color:#111;padding:24px;background:#f4f4f5">
      <div style="max-width:600px;margin:auto;background:#fff;padding:24px;border-radius:8px">
        <h2 style="margin:0 0 16px;color:#0e7490">New portfolio message</h2>
        <p><strong>Name:</strong> ${safe.name}</p>
        <p><strong>Email:</strong> ${safe.email}</p>
        <p><strong>Message:</strong></p>
        <blockquote style="border-left:4px solid #0e7490;padding-left:12px;margin:0">${safe.message}</blockquote>
      </div>
    </div>`;

  try {
    await transporter.sendMail({
      from: `"Portfolio" <${user}>`,
      to: user,
      replyTo: email,
      subject: `Portfolio: message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html,
    });
    return true;
  } catch (err) {
    console.error("email:", err?.message);
    return false;
  }
}

// ---------- handler ----------

export async function POST(request) {
  const ip = clientIp(request);
  if (rateLimited(ip)) {
    return NextResponse.json(
      { success: false, message: "Too many messages. Please try again later." },
      { status: 429 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request." }, { status: 400 });
  }

  const v = validate(body);
  if (v.honeypot) {
    // Pretend success so bots learn nothing.
    return NextResponse.json({ success: true, message: "Sent." });
  }
  if (v.error) {
    return NextResponse.json({ success: false, message: v.error }, { status: 400 });
  }

  const [telegram, email] = await Promise.all([sendTelegram(v.data), sendEmail(v.data)]);

  if (telegram === null && email === null) {
    return NextResponse.json(
      { success: false, message: "Contact form is not configured yet. Please email me directly." },
      { status: 503 }
    );
  }

  if (telegram || email) {
    return NextResponse.json({ success: true, message: "Sent." });
  }

  return NextResponse.json(
    { success: false, message: "Could not deliver your message. Please email me directly." },
    { status: 502 }
  );
}
