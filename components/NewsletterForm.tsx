"use client";

import { useState, FormEvent } from "react";

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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-4">
        <input
          type="text"
          placeholder="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          className="w-full bg-transparent border-b border-white/20 px-0 py-3 font-sans text-sm text-white placeholder-white/40 focus:outline-none focus:border-blue-sky transition-colors"
        />
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full bg-transparent border-b border-white/20 px-0 py-3 font-sans text-sm text-white placeholder-white/40 focus:outline-none focus:border-blue-sky transition-colors"
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-wine text-white font-sans text-sm font-semibold px-6 py-3.5 rounded-lg hover:bg-wine-light transition-colors disabled:opacity-50"
      >
        {status === "loading" ? "Subscribing…" : "Subscribe"}
      </button>
      {status === "success" && (
        <p className="font-sans text-sm text-blue-sky">Thank you for subscribing.</p>
      )}
      {status === "error" && (
        <p className="font-sans text-sm text-red-400">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
