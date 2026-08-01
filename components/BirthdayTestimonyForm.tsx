"use client";

import { FormEvent, useState } from "react";
import Button from "@/components/Button";

/**
 * Testimony submission for /birthday. Plain `useState` like every other form on
 * the site — no React Hook Form. Posts to /api/birthday-testimony, which stores
 * to KV and emails the ministry.
 */

const FIELD_LABEL =
  "mb-2 block font-sans text-xs font-semibold uppercase tracking-[0.2em] text-muted";
const FIELD_BASE =
  "w-full border border-blue-navy/20 bg-white px-6 py-3.5 font-sans text-sm text-blue-navy outline-none transition-colors placeholder:text-blue-navy/40 focus:border-blue-sky";
const FIELD_INPUT = `${FIELD_BASE} rounded-full`;
const FIELD_TEXTAREA = `${FIELD_BASE} resize-none rounded-3xl`;

const EMPTY = { name: "", location: "", message: "", email: "" };

export default function BirthdayTestimonyForm() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [error, setError] = useState("");

  function update(field: keyof typeof EMPTY, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/birthday-testimony", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => null);

      if (res.ok && data?.success) {
        setStatus("success");
        setForm(EMPTY);
      } else {
        setError(data?.error ?? "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setError("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="border-t-2 border-blue-sky bg-cream p-10 text-center">
        <p className="mb-3 font-serif text-2xl font-bold leading-tight text-wine">
          Thank you — your words have been received
        </p>
        <p className="mx-auto max-w-md font-sans text-base leading-relaxed text-muted">
          They will bless Pastor Ayodele. If you would like to add another
          memory, you are very welcome to.
        </p>
        <Button
          onClick={() => setStatus("idle")}
          variant="outline"
          className="mt-8 text-blue"
        >
          Share another testimony
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-left">
      <div>
        <label htmlFor="b-name" className={FIELD_LABEL}>
          Full Name *
        </label>
        <input
          id="b-name"
          type="text"
          required
          maxLength={120}
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          className={FIELD_INPUT}
          placeholder="Your full name"
        />
      </div>

      <div>
        <label htmlFor="b-location" className={FIELD_LABEL}>
          Location / Country
        </label>
        <input
          id="b-location"
          type="text"
          maxLength={120}
          value={form.location}
          onChange={(e) => update("location", e.target.value)}
          className={FIELD_INPUT}
          placeholder="Norwich, United Kingdom"
        />
      </div>

      <div>
        <label htmlFor="b-message" className={FIELD_LABEL}>
          Your Testimony *
        </label>
        <textarea
          id="b-message"
          rows={7}
          required
          maxLength={5000}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          className={FIELD_TEXTAREA}
          placeholder="Share a testimony, a memory, or a word of appreciation…"
        />
      </div>

      <div>
        <label htmlFor="b-email" className={FIELD_LABEL}>
          Email Address
        </label>
        <input
          id="b-email"
          type="email"
          maxLength={200}
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          className={FIELD_INPUT}
          placeholder="you@example.com — only if you would like a reply"
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={status === "loading"}
        className="w-full"
      >
        {status === "loading" ? "Sending…" : "Send Your Testimony"}
      </Button>

      {status === "error" && (
        <p className="text-center font-sans text-sm text-red-600">{error}</p>
      )}
    </form>
  );
}
