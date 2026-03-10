"use client";

import { useState, FormEvent, useCallback } from "react";
import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";
import SpotifyIcon from "@/components/icons/SpotifyIcon";
import TelegramIcon from "@/components/icons/TelegramIcon";
import YouTubeIcon from "@/components/icons/YouTubeIcon";
import InstagramIcon from "@/components/icons/InstagramIcon";
import FacebookIcon from "@/components/icons/FacebookIcon";

const SUBJECTS = [
  "General Enquiry",
  "Book Minister Awe",
  "Church Information (BHCC)",
  "Church Information (BLCN)",
  "Partnership Enquiry",
  "Prayer Request",
  "Other",
] as const;

const SOCIAL_ICONS = [
  { name: "Instagram", href: "#", Icon: InstagramIcon },
  { name: "Facebook", href: "#", Icon: FacebookIcon },
  { name: "YouTube", href: "#", Icon: YouTubeIcon },
  { name: "Telegram", href: "#", Icon: TelegramIcon },
  { name: "Spotify", href: "#", Icon: SpotifyIcon },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "General Enquiry",
    message: "",
    newsletter: false,
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  function update(field: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  const setSubjectAndScroll = useCallback((subject: string) => {
    setForm((prev) => ({ ...prev, subject }));
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
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
      {/* ── 1. Page Hero ── */}
      <section className="bg-gradient-to-br from-blue-navy via-blue-deep to-wine-deep pt-32 sm:pt-40 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 text-center">
        <p className="font-sans text-xs uppercase tracking-widest text-blue-sky mb-4">Contact</p>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white mb-4">Get In Touch</h1>
        <p className="font-sans text-lg text-white/70 max-w-2xl mx-auto">
          We would love to hear from you — whether you have a question, want to book Minister Awe, or simply want to connect with the ministry
        </p>
      </section>

      {/* ── 2. Contact Grid ── */}
      <section id="contact-form" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-[#EEF3FA]">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Form (3/5) */}
          <div className="lg:col-span-3">
            <p className="font-sans text-xs uppercase tracking-widest text-wine mb-4">Send a Message</p>
            <h2 className="font-serif text-3xl text-blue-navy mb-10">Reach Out to Us</h2>

            {status === "success" ? (
              <div className="bg-cream rounded-lg p-10 text-center border border-blue/10">
                <p className="font-serif text-xl text-wine mb-2">Message Received</p>
                <p className="font-sans text-muted">Your message has been received. We will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block font-sans text-xs uppercase tracking-wider text-muted mb-2">Full Name *</label>
                  <input type="text" required value={form.fullName} onChange={(e) => update("fullName", e.target.value)} className="w-full bg-transparent border-b border-blue-navy/20 px-0 py-3 font-sans text-sm text-blue-navy placeholder-blue-navy/30 focus:outline-none focus:border-blue-sky transition-colors" placeholder="Your full name" />
                </div>
                <div>
                  <label className="block font-sans text-xs uppercase tracking-wider text-muted mb-2">Email Address *</label>
                  <input type="email" required value={form.email} onChange={(e) => update("email", e.target.value)} className="w-full bg-transparent border-b border-blue-navy/20 px-0 py-3 font-sans text-sm text-blue-navy placeholder-blue-navy/30 focus:outline-none focus:border-blue-sky transition-colors" placeholder="you@example.com" />
                </div>
                <div>
                  <label className="block font-sans text-xs uppercase tracking-wider text-muted mb-2">Phone Number</label>
                  <input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} className="w-full bg-transparent border-b border-blue-navy/20 px-0 py-3 font-sans text-sm text-blue-navy placeholder-blue-navy/30 focus:outline-none focus:border-blue-sky transition-colors" placeholder="+44 7000 000000" />
                </div>
                <div>
                  <label className="block font-sans text-xs uppercase tracking-wider text-muted mb-2">Subject</label>
                  <select value={form.subject} onChange={(e) => update("subject", e.target.value)} className="w-full bg-transparent border-b border-blue-navy/20 px-0 py-3 font-sans text-sm text-blue-navy focus:outline-none focus:border-blue-sky transition-colors">
                    {SUBJECTS.map((s) => (<option key={s} value={s}>{s}</option>))}
                  </select>
                </div>
                <div>
                  <label className="block font-sans text-xs uppercase tracking-wider text-muted mb-2">Message *</label>
                  <textarea rows={5} required value={form.message} onChange={(e) => update("message", e.target.value)} className="w-full bg-transparent border-b border-blue-navy/20 px-0 py-3 font-sans text-sm text-blue-navy placeholder-blue-navy/30 focus:outline-none focus:border-blue-sky transition-colors resize-none" placeholder="Your message..." />
                </div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={form.newsletter} onChange={(e) => update("newsletter", e.target.checked)} className="h-4 w-4 rounded border-blue-navy/30 bg-transparent text-wine focus:ring-wine" />
                  <span className="font-sans text-sm text-muted">Subscribe me to the ministry newsletter</span>
                </label>
                <button type="submit" disabled={status === "loading"} className="w-full bg-blue text-white font-sans text-sm font-semibold px-8 py-4 rounded-lg hover:bg-blue-deep transition-colors disabled:opacity-50">
                  {status === "loading" ? "Sending…" : "Send Message"}
                </button>
                {status === "error" && <p className="font-sans text-sm text-red-500 text-center">Something went wrong. Please try again.</p>}
              </form>
            )}
          </div>

          {/* Info (2/5) */}
          <div className="lg:col-span-2">
            <p className="font-sans text-xs uppercase tracking-widest text-wine mb-4">Contact Information</p>
            <h2 className="font-serif text-3xl text-blue-navy mb-10">We Are Here</h2>

            <div className="space-y-6">
              <div className="border-l-2 border-wine/40 pl-6">
                <h3 className="font-sans text-sm font-medium text-blue-navy">Email</h3>
                <p className="font-sans text-xs text-muted mt-0.5">Get in touch via email</p>
                <p className="font-sans text-sm text-wine mt-1">contact@ayodeleaweministries.org</p>
              </div>
              <div className="border-l-2 border-wine/40 pl-6">
                <h3 className="font-sans text-sm font-medium text-blue-navy">Ministry Base</h3>
                <p className="font-sans text-xs text-muted mt-0.5">Our primary locations</p>
                <p className="font-sans text-sm text-blue-navy/80 mt-1">United Kingdom &amp; Nigeria</p>
              </div>
              <div className="border-l-2 border-wine/40 pl-6">
                <h3 className="font-sans text-sm font-medium text-blue-navy">Booking Minister Awe</h3>
                <p className="font-sans text-xs text-muted mt-0.5">For speaking engagements, church visits, conferences</p>
                <button onClick={() => setSubjectAndScroll("Book Minister Awe")} className="font-sans text-sm text-blue-sky hover:text-blue transition-colors mt-1">Submit a Booking Request →</button>
              </div>
              <div className="border-l-2 border-wine/40 pl-6">
                <h3 className="font-sans text-sm font-medium text-blue-navy">Prayer Requests</h3>
                <p className="font-sans text-xs text-muted mt-0.5">We pray over every request submitted</p>
                <button onClick={() => setSubjectAndScroll("Prayer Request")} className="font-sans text-sm text-blue-sky hover:text-blue transition-colors mt-1">Submit a Prayer Request →</button>
              </div>
            </div>

            <div className="my-8 border-t border-blue-navy/10" />

            <div className="flex items-center gap-4">
              {SOCIAL_ICONS.map(({ name, href, Icon }) => (
                <a key={name} href={href} target="_blank" rel="noopener noreferrer" aria-label={name}>
                  <Icon size={32} className="opacity-70 hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Churches Contact ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-deep to-blue text-center">
        <div className="mx-auto max-w-7xl">
          <p className="font-sans text-xs uppercase tracking-widest text-blue-sky mb-4">Find a Church</p>
          <h2 className="font-serif text-3xl text-white mb-12">Connect With Our Churches</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            {/* BHCC */}
            <div className="group bg-blue-deep/50 rounded-lg p-8 border border-white/5">
              <p className="font-sans text-xs uppercase tracking-widest text-blue-sky mb-4">United Kingdom</p>
              <h3 className="font-serif text-xl text-white group-hover:text-blue-sky transition-colors mb-2">Building House Christian Center</h3>
              <p className="font-sans text-sm text-white/50 mb-6">For service times, location, and church-specific enquiries</p>
              <div className="space-y-2 mb-8">
                <p className="font-sans text-sm text-white/60"><span className="text-white font-medium">Location:</span> United Kingdom (full address TBA)</p>
                <p className="font-sans text-sm text-white/60"><span className="text-white font-medium">Services:</span> Contact us for service schedule</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button onClick={() => setSubjectAndScroll("Church Information (BHCC)")} className="font-sans text-sm font-semibold bg-wine text-white px-8 py-3 rounded-lg hover:bg-wine-light transition-colors">Enquire About BHCC</button>
                <Link href="/churches/bhcc" className="font-sans text-sm font-semibold border border-white/20 text-white px-8 py-3 rounded-lg hover:border-white/40 transition-colors text-center">Learn More</Link>
              </div>
            </div>
            {/* BLCN */}
            <div className="group bg-blue-deep/50 rounded-lg p-8 border border-white/5">
              <p className="font-sans text-xs uppercase tracking-widest text-blue-sky mb-4">Nigeria</p>
              <h3 className="font-serif text-xl text-white group-hover:text-blue-sky transition-colors mb-2">Bethel Livingstone Christian Network</h3>
              <p className="font-sans text-sm text-white/50 mb-6">For service times, location, and church-specific enquiries</p>
              <div className="space-y-2 mb-8">
                <p className="font-sans text-sm text-white/60"><span className="text-white font-medium">Location:</span> Nigeria (full address TBA)</p>
                <p className="font-sans text-sm text-white/60"><span className="text-white font-medium">Services:</span> Contact us for service schedule</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button onClick={() => setSubjectAndScroll("Church Information (BLCN)")} className="font-sans text-sm font-semibold bg-wine text-white px-8 py-3 rounded-lg hover:bg-wine-light transition-colors">Enquire About BLCN</button>
                <Link href="/churches/blcn" className="font-sans text-sm font-semibold border border-white/20 text-white px-8 py-3 rounded-lg hover:border-white/40 transition-colors text-center">Learn More</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Booking ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-[#EEF3FA] text-center">
        <div className="mx-auto max-w-3xl">
          <p className="font-sans text-xs uppercase tracking-widest text-wine mb-4">Speaking Engagements</p>
          <h2 className="font-serif text-3xl text-blue-navy mb-6">Book Minister Ayodele Oladapo Awe</h2>
          <p className="font-sans text-muted leading-relaxed mb-16">Minister Awe is available to minister at churches, conferences, retreats, prayer gatherings, and special events across the UK, Nigeria, and beyond. To submit a booking request, use the contact form above and select &ldquo;Book Minister Awe&rdquo; as the subject.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {[
              { title: "Church Services", desc: "Sunday services, special services, anniversary events" },
              { title: "Conferences & Retreats", desc: "Speakers for kingdom-focused gatherings" },
              { title: "Prayer Gatherings", desc: "Corporate prayer and prophetic worship events" },
            ].map((card) => (
              <div key={card.title} className="text-center">
                <h3 className="font-serif text-lg text-wine mb-3">{card.title}</h3>
                <p className="font-sans text-sm text-muted leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
          <button onClick={() => setSubjectAndScroll("Book Minister Awe")} className="font-sans text-sm font-semibold bg-blue text-white px-10 py-4 rounded-lg hover:bg-blue-deep transition-colors">Submit a Booking Request</button>
        </div>
      </section>

      {/* ── 5. Newsletter ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-navy to-blue-deep text-center">
        <div className="mx-auto max-w-lg">
          <p className="font-sans text-xs uppercase tracking-widest text-blue-sky mb-4">Stay Connected</p>
          <h2 className="font-serif text-3xl text-white mb-4">Join Our Mailing List</h2>
          <p className="font-sans text-white/70 mb-10">Get ministry updates, event announcements, and teachings delivered to your inbox.</p>
          <NewsletterForm />
        </div>
      </section>

      {/* ── 6. Scripture ── */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-[#EEF3FA] text-center">
        <div className="mx-auto max-w-3xl">
          <span className="font-serif text-6xl text-wine leading-none block mb-4">&ldquo;</span>
          <p className="font-serif text-lg md:text-xl text-blue-navy/80 leading-relaxed italic mb-6">How beautiful are the feet of those who bring good news!</p>
          <p className="font-sans text-sm text-muted">— Romans 10:15</p>
        </div>
      </section>
    </>
  );
}
