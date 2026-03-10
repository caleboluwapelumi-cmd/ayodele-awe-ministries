"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";

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
    benefits: ["Everything in Partner", "Direct access to Minister Awe", "Special recognition", "Prophetic declarations over your life"],
    buttonText: "Become a Covenant Partner",
    featured: false,
  },
];

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
      <section
        className="relative flex items-center justify-center min-h-screen overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-blue-sky mb-6">Partnership</p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">Partner With Us</h1>
          <p className="font-sans text-base sm:text-lg text-white/70 max-w-2xl mx-auto mb-8 sm:mb-12">Join a community of believers fuelling the gospel across the UK and Nigeria</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#partner-form" className="font-sans text-sm font-semibold bg-wine text-white px-10 py-4 rounded-lg hover:bg-wine-light transition-colors">Become a Partner</a>
            <a href="#why-partner" className="font-sans text-sm font-semibold border border-white/40 text-white px-10 py-4 rounded-lg hover:border-white transition-colors">Learn More</a>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-blue-navy to-transparent" />
      </section>

      {/* ── 2. Why Partner ── */}
      <section id="why-partner" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-[#EEF3FA] text-center">
        <div className="mx-auto max-w-4xl">
          <p className="font-sans text-xs uppercase tracking-widest text-wine mb-4">Why Partner</p>
          <h2 className="font-serif text-3xl text-blue-navy mb-6">Your Giving Fuels the Gospel</h2>
          <p className="font-sans text-muted leading-relaxed mb-16 max-w-3xl mx-auto">Partnership is not just financial — it is a spiritual alignment with the vision God has given to this ministry. When you partner with Ayodele Oladapo Awe Ministries, you become a co-labourer in the harvest, sharing in every soul saved, every believer built up, and every nation touched.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Churches Built", desc: "Your partnership sustains and grows BHCC in the UK and BLCN in Nigeria." },
              { title: "Lives Transformed", desc: "Every seed sown reaches souls across two nations." },
              { title: "The Gospel Advancing", desc: "Funding events, teachings, and outreaches that extend the kingdom." },
            ].map((card) => (
              <div key={card.title} className="text-center">
                <h3 className="font-serif text-xl text-wine mb-3">{card.title}</h3>
                <p className="font-sans text-sm text-muted leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Tiers ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-deep to-blue text-center">
        <div className="mx-auto max-w-7xl">
          <p className="font-sans text-xs uppercase tracking-widest text-blue-sky mb-4">Partnership Levels</p>
          <h2 className="font-serif text-3xl text-white mb-4">Find Your Place</h2>
          <p className="font-sans text-white/70 mb-16">Every level of partnership matters. Choose how you want to be involved.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {TIERS.map((tier) => (
              <div key={tier.name} className={`rounded-lg p-8 text-center flex flex-col ${tier.featured ? "bg-blue-deep/50 ring-1 ring-wine/40 border border-wine/20" : "bg-blue-deep/50 border border-white/5"}`}>
                <p className={`font-sans text-xs uppercase tracking-widest mb-4 ${tier.featured ? "text-wine-light" : "text-white/40"}`}>{tier.badge}</p>
                <h3 className="font-serif text-2xl text-white mb-4">{tier.name}</h3>
                <p className="font-sans text-sm text-white/60 leading-relaxed mb-8">{tier.description}</p>
                <ul className="space-y-3 mb-8 text-left flex-1">
                  {tier.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-3 font-sans text-sm text-white/70">
                      <span className="text-blue-sky mt-0.5">✓</span>{b}
                    </li>
                  ))}
                </ul>
                <a href="#partner-form" className={`font-sans text-sm font-semibold px-8 py-3.5 rounded-lg transition-colors ${tier.featured ? "bg-wine text-white hover:bg-wine-light" : "border border-white/20 text-white hover:border-white/40"}`}>
                  {tier.buttonText}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Impact ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-[#EEF3FA] text-center">
        <div className="mx-auto max-w-7xl">
          <p className="font-sans text-xs uppercase tracking-widest text-wine mb-4">Impact</p>
          <h2 className="font-serif text-3xl text-blue-navy mb-16">Where Your Seeds Go</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Church Growth", desc: "Sustaining and expanding BHCC and BLCN" },
              { title: "Events & Outreaches", desc: "Funding the Norwich Prayer Surge and other gatherings" },
              { title: "Media & Teachings", desc: "Producing and distributing gospel content globally" },
              { title: "Discipleship", desc: "Training and raising the next generation of kingdom builders" },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <h3 className="font-serif text-lg text-wine mb-3">{item.title}</h3>
                <p className="font-sans text-sm text-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Form ── */}
      <section id="partner-form" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-navy to-blue-deep">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-sans text-xs uppercase tracking-widest text-blue-sky mb-4">Join Us</p>
          <h2 className="font-serif text-3xl text-white mb-4">Register as a Partner</h2>
          <p className="font-sans text-white/70 mb-12">Fill in your details and we will be in touch with next steps.</p>

          {status === "success" ? (
            <div className="bg-blue-deep/50 rounded-lg p-10 text-center border border-white/5">
              <p className="font-serif text-xl text-blue-sky mb-2">Thank you!</p>
              <p className="font-sans text-white/70">Thank you for your interest in partnering with us. We will be in touch shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 text-left">
              <div>
                <label className="block font-sans text-xs uppercase tracking-wider text-white/50 mb-2">Full Name *</label>
                <input type="text" required value={form.fullName} onChange={(e) => update("fullName", e.target.value)} className="w-full bg-transparent border-b border-white/20 px-0 py-3 font-sans text-sm text-white placeholder-white/30 focus:outline-none focus:border-blue-sky transition-colors" placeholder="Your full name" />
              </div>
              <div>
                <label className="block font-sans text-xs uppercase tracking-wider text-white/50 mb-2">Email Address *</label>
                <input type="email" required value={form.email} onChange={(e) => update("email", e.target.value)} className="w-full bg-transparent border-b border-white/20 px-0 py-3 font-sans text-sm text-white placeholder-white/30 focus:outline-none focus:border-blue-sky transition-colors" placeholder="you@example.com" />
              </div>
              <div>
                <label className="block font-sans text-xs uppercase tracking-wider text-white/50 mb-2">Phone Number</label>
                <input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} className="w-full bg-transparent border-b border-white/20 px-0 py-3 font-sans text-sm text-white placeholder-white/30 focus:outline-none focus:border-blue-sky transition-colors" placeholder="+44 7000 000000" />
              </div>
              <div>
                <label className="block font-sans text-xs uppercase tracking-wider text-white/50 mb-2">Location (Country)</label>
                <input type="text" value={form.location} onChange={(e) => update("location", e.target.value)} className="w-full bg-transparent border-b border-white/20 px-0 py-3 font-sans text-sm text-white placeholder-white/30 focus:outline-none focus:border-blue-sky transition-colors" placeholder="United Kingdom" />
              </div>
              <div>
                <label className="block font-sans text-xs uppercase tracking-wider text-white/50 mb-2">Partnership Level</label>
                <select value={form.level} onChange={(e) => update("level", e.target.value)} className="w-full bg-transparent border-b border-white/20 px-0 py-3 font-sans text-sm text-white focus:outline-none focus:border-blue-sky transition-colors">
                  <option value="Supporter" className="bg-blue-navy text-white">Supporter</option>
                  <option value="Partner" className="bg-blue-navy text-white">Partner</option>
                  <option value="Covenant Partner" className="bg-blue-navy text-white">Covenant Partner</option>
                </select>
              </div>
              <div>
                <label className="block font-sans text-xs uppercase tracking-wider text-white/50 mb-2">Message</label>
                <textarea rows={4} value={form.message} onChange={(e) => update("message", e.target.value)} className="w-full bg-transparent border-b border-white/20 px-0 py-3 font-sans text-sm text-white placeholder-white/30 focus:outline-none focus:border-blue-sky transition-colors resize-none" placeholder="Tell us anything you'd like us to know" />
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={form.newsletter} onChange={(e) => update("newsletter", e.target.checked)} className="h-4 w-4 rounded border-white/30 bg-transparent text-wine focus:ring-wine" />
                <span className="font-sans text-sm text-white/60">I would like to receive the ministry newsletter</span>
              </label>
              <button type="submit" disabled={status === "loading"} className="w-full bg-wine text-white font-sans text-sm font-semibold px-8 py-4 rounded-lg hover:bg-wine-light transition-colors disabled:opacity-50">
                {status === "loading" ? "Submitting…" : "Submit Partnership Request"}
              </button>
              {status === "error" && <p className="font-sans text-sm text-red-400 text-center">Something went wrong. Please try again.</p>}
            </form>
          )}
        </div>
      </section>

      {/* ── 6. Scripture ── */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-[#EEF3FA] text-center">
        <div className="mx-auto max-w-3xl">
          <span className="font-serif text-6xl text-wine leading-none block mb-4">&ldquo;</span>
          <p className="font-serif text-lg md:text-xl text-blue-navy/80 leading-relaxed italic mb-6">Now he who supplies seed to the sower and bread for food will also supply and increase your store of seed and will enlarge the harvest of your righteousness.</p>
          <p className="font-sans text-sm text-muted">— 2 Corinthians 9:10</p>
        </div>
      </section>

      {/* ── 7. CTA ── */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-wine-deep via-wine to-wine-light">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl text-white mb-4">Questions About Partnership?</h2>
          <p className="font-sans text-white/70 mb-10 max-w-xl mx-auto">We would love to hear from you and walk you through the process.</p>
          <Link href="/contact" className="font-sans text-sm font-semibold bg-white text-wine px-10 py-4 rounded-lg hover:bg-cream transition-colors">Contact Us</Link>
        </div>
      </section>
    </>
  );
}
