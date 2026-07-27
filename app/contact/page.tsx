"use client";

import { useState, FormEvent, useCallback } from "react";
import NewsletterForm from "@/components/NewsletterForm";
import AnimateIn from "@/components/AnimateIn";
import Button from "@/components/Button";
import PageHero from "@/components/PageHero";
import SectionLabel from "@/components/SectionLabel";
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

const BOOKING_TYPES = [
  { title: "Church Services", desc: "Sunday services, special services, anniversary events" },
  { title: "Conferences & Retreats", desc: "Speakers for kingdom-focused gatherings" },
  { title: "Prayer Gatherings", desc: "Corporate prayer and prophetic worship events" },
];

const FIELD_LABEL =
  "mb-2 block font-sans text-xs font-semibold uppercase tracking-[0.2em] text-muted";
const FIELD_INPUT =
  "w-full rounded-none border-b-2 border-blue-navy/20 bg-transparent px-0 py-3 font-sans text-sm text-blue-navy outline-none transition-colors placeholder:text-blue-navy/30 focus:border-blue-sky";

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
      <PageHero
        label="Contact"
        title="Get In Touch"
        subtitle="We would love to hear from you — whether you have a question, want to book Minister Awe, or simply want to connect with the ministry"
      />

      {/* ── 2. Contact Grid ── */}
      <section
        id="contact-form"
        className="bg-gradient-to-br from-white to-[#EEF3FA] px-4 py-24 sm:px-6 sm:py-32 lg:px-16"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 lg:grid-cols-5">
          {/* Form (3/5) */}
          <AnimateIn direction="left" className="lg:col-span-3">
            <SectionLabel tone="light">Send a Message</SectionLabel>
            <h2 className="mb-10 font-serif text-3xl font-bold leading-tight text-blue-navy sm:text-4xl md:text-5xl">
              Reach Out to Us
            </h2>

            {status === "success" ? (
              <div className="border-t-2 border-blue-sky bg-cream p-10 text-center">
                <p className="mb-2 font-serif text-xl font-bold text-wine">
                  Message Received
                </p>
                <p className="font-sans text-base leading-relaxed text-muted">
                  Your message has been received. We will get back to you
                  shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="c-name" className={FIELD_LABEL}>Full Name *</label>
                  <input id="c-name" type="text" required value={form.fullName} onChange={(e) => update("fullName", e.target.value)} className={FIELD_INPUT} placeholder="Your full name" />
                </div>
                <div>
                  <label htmlFor="c-email" className={FIELD_LABEL}>Email Address *</label>
                  <input id="c-email" type="email" required value={form.email} onChange={(e) => update("email", e.target.value)} className={FIELD_INPUT} placeholder="you@example.com" />
                </div>
                <div>
                  <label htmlFor="c-phone" className={FIELD_LABEL}>Phone Number</label>
                  <input id="c-phone" type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} className={FIELD_INPUT} placeholder="+44 7000 000000" />
                </div>
                <div>
                  <label htmlFor="c-subject" className={FIELD_LABEL}>Subject</label>
                  <select id="c-subject" value={form.subject} onChange={(e) => update("subject", e.target.value)} className={FIELD_INPUT}>
                    {SUBJECTS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="c-message" className={FIELD_LABEL}>Message *</label>
                  <textarea id="c-message" rows={5} required value={form.message} onChange={(e) => update("message", e.target.value)} className={`${FIELD_INPUT} resize-none`} placeholder="Your message..." />
                </div>
                <label className="flex cursor-pointer items-center gap-3">
                  <input type="checkbox" checked={form.newsletter} onChange={(e) => update("newsletter", e.target.checked)} className="h-4 w-4 rounded-none border-blue-navy/30 bg-transparent text-wine focus:ring-wine" />
                  <span className="font-sans text-sm text-muted">Subscribe me to the ministry newsletter</span>
                </label>

                <Button type="submit" variant="primary" size="lg" disabled={status === "loading"} className="w-full">
                  {status === "loading" ? "Sending…" : "Send Message"}
                </Button>

                {status === "error" && (
                  <p className="text-center font-sans text-sm text-red-500">
                    Something went wrong. Please try again.
                  </p>
                )}
              </form>
            )}
          </AnimateIn>

          {/* Info (2/5) */}
          <AnimateIn direction="right" className="lg:col-span-2">
            <SectionLabel tone="light">Contact Information</SectionLabel>
            <h2 className="mb-10 font-serif text-3xl font-bold leading-tight text-blue-navy sm:text-4xl md:text-5xl">
              We Are Here
            </h2>

            <div className="space-y-6">
              <div className="border-l-4 border-blue-sky pl-6">
                <h3 className="font-serif text-lg font-bold leading-tight text-blue-navy">Email</h3>
                <p className="mt-1 font-sans text-sm text-muted">Get in touch via email</p>
                <a href="mailto:contact@ayodeleaweministries.org" className="mt-2 inline-block font-sans text-sm text-wine underline-offset-4 transition-colors hover:text-wine-light hover:underline">
                  contact@ayodeleaweministries.org
                </a>
              </div>

              <div className="border-l-4 border-blue-sky pl-6">
                <h3 className="font-serif text-lg font-bold leading-tight text-blue-navy">Ministry Base</h3>
                <p className="mt-1 font-sans text-sm text-muted">Our primary locations</p>
                <p className="mt-2 font-sans text-sm text-blue-navy/80">United Kingdom &amp; Nigeria</p>
              </div>

              <div className="border-l-4 border-blue-sky pl-6">
                <h3 className="font-serif text-lg font-bold leading-tight text-blue-navy">Booking Minister Awe</h3>
                <p className="mt-1 font-sans text-sm text-muted">For speaking engagements, church visits, conferences</p>
                <button
                  onClick={() => setSubjectAndScroll("Book Minister Awe")}
                  className="group mt-2 inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-widest text-blue-sky transition-colors hover:text-blue"
                >
                  Submit a Booking Request
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                </button>
              </div>

              <div className="border-l-4 border-blue-sky pl-6">
                <h3 className="font-serif text-lg font-bold leading-tight text-blue-navy">Prayer Requests</h3>
                <p className="mt-1 font-sans text-sm text-muted">We pray over every request submitted</p>
                <button
                  onClick={() => setSubjectAndScroll("Prayer Request")}
                  className="group mt-2 inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-widest text-blue-sky transition-colors hover:text-blue"
                >
                  Submit a Prayer Request
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                </button>
              </div>
            </div>

            <div className="my-8 border-t border-blue-navy/10" />

            <div className="flex flex-wrap items-center gap-3">
              {SOCIAL_ICONS.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-blue-navy/20 transition-colors hover:border-blue-sky"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── 3. Churches Contact ── */}
      <section className="bg-gradient-to-r from-blue-deep to-blue px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <div className="mx-auto max-w-7xl text-center">
          <AnimateIn direction="up" className="mx-auto max-w-3xl">
            <SectionLabel tone="dark">Find a Church</SectionLabel>
            <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
              Connect With Our Churches
            </h2>
            <div className="mx-auto h-0.5 w-16 bg-blue-sky" />
          </AnimateIn>

          <div className="mt-16 grid grid-cols-1 gap-8 text-left sm:grid-cols-2">
            {[
              {
                region: "United Kingdom",
                name: "Building House Christian Centre",
                subject: "Church Information (BHCC)",
                enquire: "Enquire About BHCC",
                href: "/churches/bhcc",
                location: "United Kingdom (full address TBA)",
              },
              {
                region: "Nigeria",
                name: "Bethel Livingstone Christian Network",
                subject: "Church Information (BLCN)",
                enquire: "Enquire About BLCN",
                href: "/churches/blcn",
                location: "Nigeria (full address TBA)",
              },
            ].map((church, i) => (
              <AnimateIn key={church.name} delay={i * 0.1} className="h-full">
                <div className="flex h-full flex-col border-t-2 border-blue-sky bg-blue-deep/50 p-8">
                  <SectionLabel tone="dark" className="mb-4">
                    {church.region}
                  </SectionLabel>
                  <h3 className="mb-3 font-serif text-xl font-bold leading-tight text-white">
                    {church.name}
                  </h3>
                  <p className="mb-6 font-sans text-base leading-relaxed text-white/50">
                    For service times, location, and church-specific enquiries
                  </p>
                  <div className="mb-8 flex-1 space-y-2 font-sans text-sm text-white/60">
                    <p>
                      <span className="font-semibold text-white">Location:</span>{" "}
                      {church.location}
                    </p>
                    <p>
                      <span className="font-semibold text-white">Services:</span>{" "}
                      Contact us for service schedule
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Button onClick={() => setSubjectAndScroll(church.subject)} variant="secondary">
                      {church.enquire}
                    </Button>
                    <Button href={church.href} variant="outline" className="text-white">
                      Learn More
                    </Button>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Booking ── */}
      <section className="bg-gradient-to-br from-white to-[#EEF3FA] px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <div className="mx-auto max-w-3xl text-center">
          <AnimateIn direction="up">
            <SectionLabel tone="light">Speaking Engagements</SectionLabel>
            <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-blue-navy sm:text-4xl md:text-5xl">
              Book Minister Ayodele Oladapo Awe
            </h2>
            <p className="mb-8 font-sans text-base leading-relaxed text-muted sm:text-lg">
              Minister Awe is available to minister at churches, conferences,
              retreats, prayer gatherings, and special events across the UK,
              Nigeria, and beyond. To submit a booking request, use the contact
              form above and select &ldquo;Book Minister Awe&rdquo; as the
              subject.
            </p>
            <div className="mx-auto h-0.5 w-16 bg-blue-sky" />
          </AnimateIn>

          <div className="mb-12 mt-16 grid grid-cols-1 gap-12 sm:grid-cols-3">
            {BOOKING_TYPES.map((card, i) => (
              <AnimateIn key={card.title} delay={i * 0.1}>
                <h3 className="mb-3 font-serif text-lg font-bold leading-tight text-wine">
                  {card.title}
                </h3>
                <p className="font-sans text-base leading-relaxed text-muted">
                  {card.desc}
                </p>
              </AnimateIn>
            ))}
          </div>

          <Button onClick={() => setSubjectAndScroll("Book Minister Awe")} variant="primary" size="lg">
            Submit a Booking Request
          </Button>
        </div>
      </section>

      {/* ── 5. Newsletter ── */}
      <section className="bg-gradient-to-b from-blue-navy to-blue-deep px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <AnimateIn direction="up" className="mx-auto max-w-3xl text-center">
          <SectionLabel tone="dark">Stay Connected</SectionLabel>
          <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            Join Our Mailing List
          </h2>
          <p className="mx-auto mb-8 max-w-2xl font-sans text-base leading-relaxed text-white/70 sm:text-lg">
            Get ministry updates, event announcements, and teachings delivered
            to your inbox.
          </p>
          <NewsletterForm />
        </AnimateIn>
      </section>

      {/* ── 6. Scripture ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white to-[#EEF3FA] px-4 py-24 sm:px-6 sm:py-32 lg:px-16">
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 select-none font-serif text-[200px] leading-none text-blue-navy/5"
        >
          &ldquo;
        </span>

        <AnimateIn direction="fade" className="relative z-10 mx-auto max-w-3xl text-center">
          <p className="mb-6 font-serif text-xl font-bold italic leading-relaxed text-blue-navy/80 md:text-2xl">
            How beautiful are the feet of those who bring good news!
          </p>
          <p className="font-sans text-xs uppercase tracking-[0.2em] text-muted">
            Romans 10:15
          </p>
        </AnimateIn>
      </section>
    </>
  );
}
