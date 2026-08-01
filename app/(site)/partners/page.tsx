"use client";

import { useState, FormEvent } from "react";
import AnimateIn from "@/components/AnimateIn";
import Button from "@/components/Button";
import SectionLabel from "@/components/SectionLabel";

const TIERS = [
  {
    name: "Supporter",
    badge: "Entry Level",
    description: "Sow monthly into the ministry and receive our newsletter, prayer updates, and ministry reports.",
    benefits: ["Monthly newsletter", "Prayer updates", "Ministry reports"],
    buttonText: "Become a Supporter",
    featured: false,
  },
  {
    name: "Partner",
    badge: "Most Popular",
    description: "A deeper level of commitment — partnering with consistent giving and standing with us in prayer and purpose.",
    benefits: ["Everything in Supporter", "Exclusive teaching content", "Partner prayer calls", "Personal prayer coverage"],
    buttonText: "Become a Partner",
    featured: true,
  },
  {
    name: "Covenant Partner",
    badge: "Highest Level",
    description: "A covenant commitment to this ministry — joining us as a spiritual investor in the harvest across nations.",
    benefits: ["Everything in Partner", "Direct access to Pastor Awe", "Special recognition", "Prophetic declarations over your life"],
    buttonText: "Become a Covenant Partner",
    featured: false,
  },
];

const WHY_PARTNER = [
  { title: "Churches Built", desc: "Your partnership sustains and grows BHCC in the UK and BLCN in Nigeria." },
  { title: "Lives Transformed", desc: "Every seed sown reaches souls across two nations." },
  { title: "The Gospel Advancing", desc: "Funding events, teachings, and outreaches that extend the kingdom." },
];

const IMPACT = [
  { title: "Church Growth", desc: "Sustaining and expanding BHCC and BLCN" },
  { title: "Events & Outreaches", desc: "Funding the Norwich Prayer Surge and other gatherings" },
  { title: "Media & Teachings", desc: "Producing and distributing gospel content globally" },
  { title: "Discipleship", desc: "Training and raising the next generation of kingdom builders" },
];

const FIELD_LABEL =
  "mb-2 block font-sans text-xs font-semibold uppercase tracking-[0.2em] text-white/50";
const FIELD_INPUT =
  "w-full rounded-none border-b-2 border-white/20 bg-transparent px-0 py-3 font-sans text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-blue-sky";

export default function PartnersPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    level: "Partner",
    message: "",
    newsletter: true,
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  function update(field: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/partner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) setStatus("success");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      {/* ── 1. Hero ── */}
      {/* Gradient hero, not a photo — see the note on the homepage partnership
          band. This one was `priority`, so it was blocking LCP for an image the
          scrim rendered all but invisible. */}
      <section className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-br from-blue-navy via-blue-deep to-wine-deep">
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-blue-navy via-transparent to-blue-navy/60"
        />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-32 sm:px-6 lg:px-16">
          <AnimateIn direction="up" className="max-w-3xl">
            <SectionLabel tone="dark">Partnership</SectionLabel>
            <h1 className="mb-6 font-serif text-5xl font-bold leading-none tracking-tight text-white sm:text-6xl md:text-7xl">
              Partner With Us
            </h1>
            <div className="mb-8 h-0.5 w-16 bg-blue-sky" />
            <p className="mb-10 max-w-lg font-sans text-lg leading-relaxed text-white/60 sm:text-xl">
              Join a community of believers fuelling the gospel across the UK
              and Nigeria
            </p>
            <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
              <Button href="#partner-form" variant="secondary" size="lg">
                Become a Partner
              </Button>
              <Button href="#why-partner" variant="outline" size="lg" className="text-white">
                Learn More
              </Button>
            </div>
          </AnimateIn>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-blue-navy to-transparent" />
      </section>

      {/* ── 2. Why Partner ── */}
      <section
        id="why-partner"
        className="bg-gradient-to-br from-white to-[#EEF3FA] px-4 py-24 sm:px-6 sm:py-32 lg:px-16"
      >
        <div className="mx-auto max-w-7xl text-center">
          <AnimateIn direction="up" className="mx-auto max-w-3xl">
            <SectionLabel tone="light">Why Partner</SectionLabel>
            <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-blue-navy sm:text-4xl md:text-5xl">
              Your Giving Fuels the Gospel
            </h2>
            <p className="mb-8 font-sans text-base leading-relaxed text-muted sm:text-lg">
              Partnership is not just financial — it is a spiritual alignment
              with the vision God has given to this ministry. When you partner
              with Ayodele Oladapo Awe Ministries, you become a co-labourer in
              the harvest, sharing in every soul saved, every believer built up,
              and every nation touched.
            </p>
            <div className="mx-auto h-0.5 w-16 bg-blue-sky" />
          </AnimateIn>

          <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-3">
            {WHY_PARTNER.map((card, i) => (
              <AnimateIn key={card.title} delay={i * 0.1}>
                <h3 className="mb-3 font-serif text-xl font-bold leading-tight text-wine">
                  {card.title}
                </h3>
                <p className="font-sans text-base leading-relaxed text-muted">
                  {card.desc}
                </p>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Tiers ── */}
      <section className="bg-gradient-to-r from-blue-deep to-blue px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <div className="mx-auto max-w-7xl text-center">
          <AnimateIn direction="up" className="mx-auto max-w-3xl">
            <SectionLabel tone="dark">Partnership Levels</SectionLabel>
            <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
              Find Your Place
            </h2>
            <p className="mb-8 font-sans text-base leading-relaxed text-white/70 sm:text-lg">
              Every level of partnership matters. Choose how you want to be
              involved.
            </p>
          </AnimateIn>

          <div className="mt-12 grid grid-cols-1 items-stretch gap-8 md:grid-cols-3">
            {TIERS.map((tier, i) => (
              <AnimateIn key={tier.name} delay={i * 0.1} className="h-full">
                <div
                  className={`flex h-full flex-col p-8 text-center ${
                    tier.featured
                      ? "relative z-10 bg-blue-deep shadow-2xl ring-2 ring-blue-sky md:scale-105"
                      : "border border-white/5 bg-blue-deep/50"
                  }`}
                >
                  <p
                    className={`mb-4 font-sans text-xs font-semibold uppercase tracking-[0.2em] ${
                      tier.featured ? "text-blue-sky" : "text-white/40"
                    }`}
                  >
                    {tier.badge}
                  </p>
                  <h3 className="mb-4 font-serif text-2xl font-bold leading-tight text-white">
                    {tier.name}
                  </h3>
                  <p className="mb-8 font-sans text-base leading-relaxed text-white/60">
                    {tier.description}
                  </p>
                  <ul className="mb-8 flex-1 space-y-3 text-left">
                    {tier.benefits.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-3 font-sans text-sm text-white/70"
                      >
                        <span className="mt-0.5 text-blue-sky" aria-hidden>
                          ✓
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <Button
                    href="#partner-form"
                    variant={tier.featured ? "secondary" : "outline"}
                    className={tier.featured ? "" : "text-white"}
                  >
                    {tier.buttonText}
                  </Button>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Impact ── */}
      <section className="bg-gradient-to-br from-white to-[#EEF3FA] px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <div className="mx-auto max-w-7xl text-center">
          <AnimateIn direction="up" className="mx-auto max-w-3xl">
            <SectionLabel tone="light">Impact</SectionLabel>
            <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-blue-navy sm:text-4xl md:text-5xl">
              Where Your Seeds Go
            </h2>
            <div className="mx-auto h-0.5 w-16 bg-blue-sky" />
          </AnimateIn>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {IMPACT.map((item, i) => (
              <AnimateIn key={item.title} delay={i * 0.1} className="h-full">
                <div className="h-full border-t-2 border-blue-sky bg-cream p-8 text-center">
                  <h3 className="mb-3 font-serif text-lg font-bold leading-tight text-wine">
                    {item.title}
                  </h3>
                  <p className="font-sans text-base leading-relaxed text-muted">
                    {item.desc}
                  </p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Form ── */}
      <section
        id="partner-form"
        className="bg-gradient-to-b from-blue-navy to-blue-deep px-4 py-24 sm:px-6 sm:py-32 lg:px-16"
      >
        <div className="mx-auto max-w-2xl text-center">
          <AnimateIn direction="up">
            <SectionLabel tone="dark">Join Us</SectionLabel>
            <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
              Register as a Partner
            </h2>
            <p className="mb-8 font-sans text-base leading-relaxed text-white/70 sm:text-lg">
              Fill in your details and we will be in touch with next steps.
            </p>
          </AnimateIn>

          {status === "success" ? (
            <div className="border-t-2 border-blue-sky bg-blue-deep/50 p-10 text-center">
              <p className="mb-2 font-serif text-xl font-bold text-blue-sky">
                Thank you!
              </p>
              <p className="font-sans text-base leading-relaxed text-white/70">
                Thank you for your interest in partnering with us. We will be in
                touch shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-12 space-y-6 text-left">
              <div>
                <label htmlFor="p-name" className={FIELD_LABEL}>Full Name *</label>
                <input id="p-name" type="text" required value={form.fullName} onChange={(e) => update("fullName", e.target.value)} className={FIELD_INPUT} placeholder="Your full name" />
              </div>
              <div>
                <label htmlFor="p-email" className={FIELD_LABEL}>Email Address *</label>
                <input id="p-email" type="email" required value={form.email} onChange={(e) => update("email", e.target.value)} className={FIELD_INPUT} placeholder="you@example.com" />
              </div>
              <div>
                <label htmlFor="p-phone" className={FIELD_LABEL}>Phone Number</label>
                <input id="p-phone" type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} className={FIELD_INPUT} placeholder="+44 7000 000000" />
              </div>
              <div>
                <label htmlFor="p-location" className={FIELD_LABEL}>Location (Country)</label>
                <input id="p-location" type="text" value={form.location} onChange={(e) => update("location", e.target.value)} className={FIELD_INPUT} placeholder="United Kingdom" />
              </div>
              <div>
                <label htmlFor="p-level" className={FIELD_LABEL}>Partnership Level</label>
                <select id="p-level" value={form.level} onChange={(e) => update("level", e.target.value)} className={FIELD_INPUT}>
                  <option value="Supporter" className="bg-blue-navy text-white">Supporter</option>
                  <option value="Partner" className="bg-blue-navy text-white">Partner</option>
                  <option value="Covenant Partner" className="bg-blue-navy text-white">Covenant Partner</option>
                </select>
              </div>
              <div>
                <label htmlFor="p-message" className={FIELD_LABEL}>Message</label>
                <textarea id="p-message" rows={4} value={form.message} onChange={(e) => update("message", e.target.value)} className={`${FIELD_INPUT} resize-none`} placeholder="Tell us anything you'd like us to know" />
              </div>
              <label className="flex cursor-pointer items-center gap-3">
                <input type="checkbox" checked={form.newsletter} onChange={(e) => update("newsletter", e.target.checked)} className="h-5 w-5 shrink-0 rounded-none border-white/30 bg-transparent text-wine focus:ring-wine" />
                <span className="font-sans text-sm text-white/60">I would like to receive the ministry newsletter</span>
              </label>

              <Button type="submit" variant="secondary" size="lg" disabled={status === "loading"} className="w-full">
                {status === "loading" ? "Submitting…" : "Submit Partnership Request"}
              </Button>

              {status === "error" && (
                <p className="text-center font-sans text-sm text-red-400">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          )}
        </div>
      </section>

      {/* ── 6. Scripture ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white to-[#EEF3FA] px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 font-serif text-[200px] leading-none text-blue-navy/5 select-none"
        >
          &ldquo;
        </span>

        <AnimateIn direction="fade" className="relative z-10 mx-auto max-w-3xl text-center">
          <p className="mb-6 font-serif text-xl font-bold italic leading-relaxed text-blue-navy/80 md:text-2xl">
            Now he who supplies seed to the sower and bread for food will also
            supply and increase your store of seed and will enlarge the harvest
            of your righteousness.
          </p>
          <p className="font-sans text-xs uppercase tracking-[0.2em] text-muted">
            2 Corinthians 9:10
          </p>
        </AnimateIn>
      </section>

      {/* ── 7. CTA ── */}
      <section className="bg-gradient-to-br from-wine-deep via-wine to-wine-light px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <AnimateIn direction="up" className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            Questions About Partnership?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl font-sans text-base leading-relaxed text-white/70 sm:text-lg">
            We would love to hear from you and walk you through the process.
          </p>
          <Button href="/contact" variant="wine" size="lg">
            Contact Us
          </Button>
        </AnimateIn>
      </section>
    </>
  );
}
