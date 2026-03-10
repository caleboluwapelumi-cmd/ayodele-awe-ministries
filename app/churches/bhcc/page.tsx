import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "BHCC — Building House Christian Center",
  description: "Building House Christian Center — a Spirit-filled church in the United Kingdom.",
};

export default function BHCCPage() {
  return (
    <>
      {/* ── 1. Hero ── */}
      <section
        className="relative flex items-center justify-center min-h-screen overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1920&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
          <p className="font-sans text-xs uppercase tracking-widest text-blue-sky mb-6">United Kingdom</p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-2">Building House Christian Center</h1>
          <p className="font-serif text-2xl sm:text-3xl text-blue-sky mb-6">BHCC</p>
          <p className="font-sans text-base sm:text-lg text-white/70 max-w-2xl mx-auto mb-8 sm:mb-10">Building the House of God in the United Kingdom</p>
          <Link href="/contact" className="font-sans text-sm font-semibold bg-wine text-white px-10 py-4 rounded-lg hover:bg-wine-light transition-colors">Join Us</Link>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-blue-navy to-transparent" />
      </section>

      {/* ── 2. About ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-[#EEF3FA]">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1470116945706-e6bf5d5a53ca?w=800&q=80"
              alt="BHCC Church gathering"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-sans text-xs uppercase tracking-widest text-wine mb-4">About BHCC</p>
            <h2 className="font-serif text-3xl text-blue-navy mb-6">A House Being Built</h2>
            <p className="font-sans text-muted leading-relaxed mb-4">Building House Christian Center (BHCC) is a Spirit-filled church community in the United Kingdom, established under the ministry of Ayodele Oladapo Awe.</p>
            <p className="font-sans text-muted leading-relaxed mb-4">At BHCC, we are committed to building believers through the Word, worship, and fellowship. We believe the local church is God&apos;s primary vehicle for transformation in society.</p>
            <p className="font-sans text-muted leading-relaxed">From our weekly services to our prayer gatherings and community outreaches, BHCC is a place where lives are changed and destinies are shaped by the power of the gospel.</p>
          </div>
        </div>
      </section>

      {/* ── 3. Beliefs ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-deep to-blue text-center">
        <div className="mx-auto max-w-7xl">
          <p className="font-sans text-xs uppercase tracking-widest text-blue-sky mb-4">Our Beliefs</p>
          <h2 className="font-serif text-3xl text-white mb-16">What We Stand For</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "The Bible", desc: "We believe the Bible is the infallible Word of God, the final authority in all matters of faith and conduct." },
              { title: "Salvation", desc: "We believe in the death and resurrection of Jesus Christ as the only means of salvation for all mankind." },
              { title: "The Holy Spirit", desc: "We believe in the person and work of the Holy Spirit, including the gifts and power for ministry today." },
            ].map((card) => (
              <div key={card.title} className="text-center">
                <h3 className="font-serif text-xl text-blue-sky mb-4">{card.title}</h3>
                <p className="font-sans text-sm text-white/70 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Services ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-[#EEF3FA] text-center">
        <div className="mx-auto max-w-5xl">
          <p className="font-sans text-xs uppercase tracking-widest text-wine mb-4">Join Us</p>
          <h2 className="font-serif text-3xl text-blue-navy mb-16">Service Times</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Sunday Service", time: "Time TBC", desc: "Main weekly gathering for worship, Word, and fellowship." },
              { title: "Midweek Bible Study", time: "Time TBC", desc: "Deep dive into the Word of God." },
              { title: "Prayer Meeting", time: "Time TBC", desc: "Corporate prayer and intercession." },
            ].map((svc) => (
              <div key={svc.title} className="bg-cream rounded-lg p-8 text-center border border-blue/10">
                <h3 className="font-serif text-lg text-blue-navy mb-1">{svc.title}</h3>
                <p className="font-sans text-sm text-wine mb-3">{svc.time}</p>
                <p className="font-sans text-sm text-muted leading-relaxed">{svc.desc}</p>
              </div>
            ))}
          </div>
          <p className="font-sans text-sm text-muted mt-10">Contact us for exact times and location details.</p>
          <Link href="/contact" className="inline-flex items-center font-sans text-sm font-semibold bg-blue text-white px-10 py-4 rounded-lg hover:bg-blue-deep transition-colors mt-6">Get in Touch</Link>
        </div>
      </section>

      {/* ── 5. CTA ── */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-wine-deep via-wine to-wine-light">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl text-white mb-4">You Are Welcome Here</h2>
          <p className="font-sans text-white/70 mb-10 max-w-xl mx-auto">BHCC is a family. Come as you are and encounter the living God.</p>
          <Link href="/contact" className="font-sans text-sm font-semibold bg-white text-wine px-10 py-4 rounded-lg hover:bg-cream transition-colors">Contact Us</Link>
        </div>
      </section>
    </>
  );
}
