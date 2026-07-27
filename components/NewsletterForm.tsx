"use client";

import { useState, FormEvent } from "react";
import Button from "./Button";

const INPUT_CLASS =
  "w-full rounded-full border border-white/20 bg-white/5 px-6 py-3.5 font-sans text-sm text-white outline-none transition-colors placeholder:text-white/40 focus:border-blue-sky";

export default function NewsletterForm() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, email }),
      });
      if (res.ok) {
        setStatus("success");
        setFirstName("");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-md flex-col gap-6"
    >
      <input
        type="text"
        placeholder="First name"
        aria-label="First name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
        className={INPUT_CLASS}
      />
      <input
        type="email"
        placeholder="Email address"
        aria-label="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className={INPUT_CLASS}
      />

      <Button
        type="submit"
        variant="secondary"
        size="lg"
        disabled={status === "loading"}
        className="w-full"
      >
        {status === "loading" ? "Subscribing…" : "Subscribe"}
      </Button>

      {status === "success" && (
        <p className="font-sans text-sm text-blue-sky">
          Thank you for subscribing.
        </p>
      )}
      {status === "error" && (
        <p className="font-sans text-sm text-red-400">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
