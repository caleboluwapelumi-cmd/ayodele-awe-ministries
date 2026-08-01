"use client";

import { FormEvent, useState } from "react";
import Button from "@/components/Button";
import { GiveButton, useGiving } from "@/components/BirthdayGiving";

/**
 * Testimony submission for /birthday. Plain `useState` like every other form on
 * the site — no React Hook Form. Posts to /api/birthday-testimony, which stores
 * to KV and emails the ministry.
 *
 * ⚠️ The success state is also where giving is offered, and that is the whole
 * shape of the page: there is no giving section any more, so a testimony comes
 * first and the invitation to give follows it. Keep the CTA below the thank-you
 * and behind a rule — it is an aside, not the point. See BirthdayGiving.tsx.
 */

const FIELD_LABEL =
  "mb-2 block font-sans text-xs font-semibold uppercase tracking-[0.2em] text-bday-ink";

/**
 * ⚠️ `text-base` (16px) is not a style choice — iOS Safari zooms the whole
 * viewport on focus for any input under 16px, and the page never zooms back
 * out. Every control here must stay at 16px or larger.
 *
 * `py-4` takes the single-line fields to ~56px, comfortably past the 44px
 * touch-target minimum.
 */
const FIELD_BASE =
  "w-full border border-bday-blue/20 bg-white px-5 py-4 font-sans text-base text-bday-blue outline-none transition-colors placeholder:text-bday-ink/50 focus:border-bday-orange sm:px-6";
const FIELD_INPUT = `${FIELD_BASE} rounded-full`;
const FIELD_TEXTAREA = `${FIELD_BASE} resize-none rounded-3xl`;

const EMPTY = { name: "", location: "", message: "", email: "" };

export default function BirthdayTestimonyForm() {
  // `null` outside a GivingProvider, in which case the giving CTA is simply not
  // offered — the form still works anywhere it is mounted.
  const giving = useGiving();
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
      <div className="border-t-2 border-bday-orange bg-white p-8 text-center shadow-sm sm:p-10">
        <p className="mb-3 text-balance font-serif text-2xl font-bold leading-tight text-bday-blue">
          Thank you — your words have been received
        </p>
        <p className="mx-auto max-w-md font-sans text-base leading-relaxed text-bday-ink">
          They will bless Pastor Ayodele. If you would like to add another
          memory, you are very welcome to.
        </p>
        <Button
          onClick={() => setStatus("idle")}
          variant="outline"
          className="mt-8 w-full text-bday-blue hover:bg-bday-blue/5 sm:w-auto"
        >
          Share another testimony
        </Button>

        {giving && (
          <div className="mt-8 border-t border-bday-blue/10 pt-8">
            <p className="mx-auto mb-6 max-w-md font-sans text-base leading-relaxed text-bday-ink">
              If you would love to give to Pastor Ayodele, please kindly use the
              button below.
            </p>
            <GiveButton className="w-full sm:w-auto">
              Give to Pastor Ayodele
            </GiveButton>
          </div>
        )}
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
        variant="birthday"
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
