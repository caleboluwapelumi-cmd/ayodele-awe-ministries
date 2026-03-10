import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Our Churches — Ayodele Oladapo Awe Ministries",
  description:
    "Discover Building House Christian Center (BHCC) in the UK and Bethel Livingstone Christian Network (BLCN) in Nigeria.",
};

export default function ChurchesPage() {
  return (
    <>
      {/* ── 1. Page Hero ── */}
      <section className="bg-gradient-to-br from-blue-navy via-blue-deep to-wine-deep pt-40 pb-24 px-6 lg:px-8 text-center">
        <p className="font-sans text-xs uppercase tracking-widest text-blue-sky mb-4">
          Our Churches
        </p>
        <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">
          Two Churches, One Mandate
        </h1>
        <p className="font-sans text-lg text-white/70 max-w-xl mx-auto">
          Building the house of God in the United Kingdom and Nigeria
        </p>
      </section>

      {/* ── 2. Intro ── */}
      <section className="py-24 px-6 lg:px-8 bg-gradient-to-br from-white to-[#EEF3FA] text-center">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-serif text-3xl text-blue-navy mb-6">
            Ministry Expressions
          </h2>
          <p className="font-sans text-muted leading-relaxed">
            The vision of Ayodele Oladapo Awe Ministries is expressed through
            two distinct but connected church communities. Each church is rooted
            in the Word, driven by worship, and committed to making disciples
            across its nation.
          </p>
        </div>
      </section>

      {/* ── 3. Church Cards ── */}
      <section className="py-24 px-6 lg:px-8 bg-gradient-to-r from-blue-deep to-blue">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* BHCC */}
          <div className="group bg-blue-deep/50 rounded-lg overflow-hidden border border-white/5 hover:border-white/10 transition-all">
            <div className="relative aspect-video overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1470116945706-e6bf5d5a53ca?w=800&q=80"
                alt="BHCC Church"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="p-8">
              <p className="font-sans text-xs uppercase tracking-widest text-blue-sky mb-3">
                BHCC
              </p>
              <h3 className="font-serif text-xl text-white group-hover:text-blue-sky transition-colors mb-1">
                Building House Christian Center
              </h3>
              <p className="font-sans text-sm text-muted mb-3">
                United Kingdom
              </p>
              <p className="font-sans text-sm text-white/60 leading-relaxed mb-6">
                A vibrant church community in the United Kingdom, committed to
                building the house of God through worship, the Word, and
                discipleship.
              </p>
              <Link
                href="/churches/bhcc"
                className="font-sans text-sm font-semibold bg-wine text-white px-8 py-3 rounded-lg hover:bg-wine-light transition-colors inline-flex items-center"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* BLCN */}
          <div className="group bg-blue-deep/50 rounded-lg overflow-hidden border border-white/5 hover:border-white/10 transition-all">
            <div className="relative aspect-video overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80"
                alt="BLCN Church"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="p-8">
              <p className="font-sans text-xs uppercase tracking-widest text-blue-sky mb-3">
                BLCN
              </p>
              <h3 className="font-serif text-xl text-white group-hover:text-blue-sky transition-colors mb-1">
                Bethel Livingstone Christian Network
              </h3>
              <p className="font-sans text-sm text-muted mb-3">
                Nigeria
              </p>
              <p className="font-sans text-sm text-white/60 leading-relaxed mb-6">
                A growing church network in Nigeria, raising believers who are
                rooted in the Word and fired by the Holy Spirit.
              </p>
              <Link
                href="/churches/blcn"
                className="font-sans text-sm font-semibold bg-wine text-white px-8 py-3 rounded-lg hover:bg-wine-light transition-colors inline-flex items-center"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Shared Vision ── */}
      <section className="py-24 px-6 lg:px-8 bg-gradient-to-br from-white to-[#EEF3FA] text-center">
        <div className="mx-auto max-w-7xl">
          <p className="font-sans text-xs uppercase tracking-widest text-wine mb-4">
            One Vision
          </p>
          <h2 className="font-serif text-3xl text-blue-navy mb-16">What Unites Us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { title: "The Word", desc: "Rooted in Scripture, every ministry expression is built on the Word of God." },
              { title: "Worship", desc: "Cultivating atmospheres of genuine encounter with God." },
              { title: "Discipleship", desc: "Making and maturing disciples across both nations." },
              { title: "Mission", desc: "Taking the gospel to the ends of the earth." },
            ].map((card) => (
              <div key={card.title} className="text-center">
                <h3 className="font-serif text-lg text-wine mb-3">{card.title}</h3>
                <p className="font-sans text-sm text-muted leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. CTA Banner ── */}
      <section className="py-20 px-6 lg:px-8 bg-gradient-to-br from-wine-deep via-wine to-wine-light">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl text-white mb-4">
            Find Your Community
          </h2>
          <p className="font-sans text-white/70 mb-10 max-w-xl mx-auto">
            Whether in the UK or Nigeria, you belong here.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/churches/bhcc" className="font-sans text-sm font-semibold bg-white text-wine px-10 py-4 rounded-lg hover:bg-cream transition-colors">
              Visit BHCC
            </Link>
            <Link href="/churches/blcn" className="font-sans text-sm font-semibold border border-white/40 text-white px-10 py-4 rounded-lg hover:border-white transition-colors">
              Visit BLCN
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
