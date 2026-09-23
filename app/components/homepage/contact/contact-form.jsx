"use client";

import { isValidEmail } from "@/utils/check-email";
import { useState } from "react";
import { TbMailForward } from "react-icons/tb";

const initial = { name: "", email: "", message: "", company: "" };

function ContactForm() {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState({ state: "idle", text: "" });

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({ state: "error", text: "All fields are required." });
      return;
    }
    if (!isValidEmail(form.email)) {
      setStatus({ state: "error", text: "Please enter a valid email." });
      return;
    }

    setStatus({ state: "loading", text: "" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Something went wrong.");
      }
      setStatus({ state: "success", text: "Sent. I will reply within a day." });
      setForm(initial);
    } catch (err) {
      setStatus({ state: "error", text: err.message || "Something went wrong." });
    }
  };

  const field =
    "w-full rounded-lg border border-line bg-surface-2 px-3 py-2.5 text-sm text-ink placeholder:text-muted/70 focus:border-accent focus:outline-none";

  return (
    <form onSubmit={submit} className="relative min-w-0 rounded-xl border border-line bg-bg/40 p-6" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm text-muted">Name</span>
          <input
            className={field}
            type="text"
            name="name"
            maxLength={100}
            autoComplete="name"
            value={form.name}
            onChange={update("name")}
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm text-muted">Email</span>
          <input
            className={field}
            type="email"
            name="email"
            maxLength={100}
            autoComplete="email"
            value={form.email}
            onChange={update("email")}
          />
        </label>
      </div>

      <label className="mt-4 block">
        <span className="mb-1.5 block text-sm text-muted">Message</span>
        <textarea
          className={field}
          name="message"
          rows={5}
          maxLength={1000}
          value={form.message}
          onChange={update("message")}
        />
      </label>

      {/* Honeypot: real users never see or fill this. */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" value={form.company} onChange={update("company")} />
        </label>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-4">
        <button type="submit" className="btn-primary" disabled={status.state === "loading"}>
          {status.state === "loading" ? "Sending…" : "Send message"}
          <TbMailForward size={18} />
        </button>
        {status.text ? (
          <p
            role="status"
            className={`text-sm ${status.state === "error" ? "text-rose-300" : "text-emerald-300"}`}
          >
            {status.text}
          </p>
        ) : null}
      </div>
    </form>
  );
}

export default ContactForm;
