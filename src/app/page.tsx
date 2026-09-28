'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowRight, Shield, Eye, BookOpen, ChevronDown } from 'lucide-react';

// Fade-up animation preset
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-ivory">
      <Navbar />

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-14">
        {/* Background fabric image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/chikankari-ivory-pink.jpg"
            alt="Chikankari embroidery — ivory fabric with hand-stitched floral pattern"
            fill
            className="object-cover object-center opacity-15"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ivory/60 via-ivory/80 to-ivory" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-24">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
            className="max-w-3xl"
          >
            {/* Pre-label */}
            <motion.div variants={fadeUp}>
              <span
                className="inline-block text-xs font-body font-medium tracking-widest uppercase text-rose border border-rose/40 rounded px-3 py-1 mb-6"
                style={{ fontSize: '10px', letterSpacing: '0.18em' }}
              >
                Craft Verification Platform
              </span>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              variants={fadeUp}
              className="font-serif text-6xl sm:text-7xl md:text-8xl text-ink leading-none mb-4"
              style={{ letterSpacing: '-0.03em' }}
            >
              NAQSH
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="font-serif text-xl sm:text-2xl md:text-3xl text-ink-soft italic mb-6"
              style={{ letterSpacing: '-0.01em' }}
            >
              "Every stitch leaves a trace."
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="font-body text-base sm:text-lg text-ink-muted max-w-xl leading-relaxed mb-10"
            >
              AI-assisted verification for hand-crafted chikankari —
              from the hands that made it to the person who wears it.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              <Link
                href="/scan"
                className="flex items-center gap-2 px-6 py-3 bg-burgundy text-white font-body font-medium rounded
                           hover:bg-wine transition-colors text-sm"
              >
                Verify a Garment
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link
                href="/demo"
                className="flex items-center gap-2 px-6 py-3 border border-wine text-wine font-body font-medium rounded
                           hover:bg-wine/5 transition-colors text-sm"
              >
                Experience the Demo
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-ink-muted">
          <span className="text-xs font-body" style={{ fontSize: '10px', letterSpacing: '0.1em' }}>SCROLL</span>
          <ChevronDown size={14} className="naqsh-pulse" aria-hidden="true" />
        </div>
      </section>

      {/* ─── THE PROBLEM ─── */}
      <section className="py-20 sm:py-28 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p
              className="text-xs font-body font-medium tracking-widest uppercase text-rose mb-6"
              style={{ fontSize: '10px', letterSpacing: '0.18em' }}
            >
              The Problem
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ink mb-6 leading-tight">
              How do you know the hand<br />is really behind the stitch?
            </h2>
            <p className="font-body text-base text-ink-muted leading-relaxed max-w-2xl mx-auto">
              Lucknow chikankari is one of India's most celebrated crafts — and one of its most counterfeited.
              Machine-made imitations flood markets at prices that undercut genuine hand work.
              Artisans lose income. Buyers lose trust. The craft loses dignity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── HOW NAQSH WORKS ─── */}
      <section className="py-20 sm:py-28 px-4 bg-ivory-deep">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p
              className="text-xs font-body font-medium tracking-widest uppercase text-rose mb-4"
              style={{ fontSize: '10px', letterSpacing: '0.18em' }}
            >
              How NAQSH works
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-ink">
              Don't verify the paperwork.<br />
              <span className="text-wine">Verify the object.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                number: '01',
                icon: Eye,
                title: 'See',
                description:
                  'NAQSH Vision examines the reverse side of the embroidery — the part that cannot be faked without real hand work. Stitch structure, thread tension, and natural irregularity become evidence.',
              },
              {
                number: '02',
                icon: Shield,
                title: 'Verify',
                description:
                  'AI compares against verified hand-embroidery references. The result is an explainable assessment — not a percentage, but a reasoned visual evaluation with specific indicators.',
              },
              {
                number: '03',
                icon: BookOpen,
                title: 'Trace',
                description:
                  "The artisan's story, work duration, and recorded earnings are attached to the garment. A tamper-evident ledger record protects the registration from modification.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="card-naqsh p-7"
              >
                <div className="flex items-start gap-4 mb-4">
                  <span
                    className="font-serif text-4xl text-blush font-light leading-none"
                    aria-hidden="true"
                  >
                    {item.number}
                  </span>
                  <item.icon size={20} className="mt-2 text-rose" aria-hidden="true" />
                </div>
                <h3 className="font-serif text-xl text-ink mb-2">{item.title}</h3>
                <p className="text-sm font-body text-ink-muted leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── THREE LAYERS OF TRUST ─── */}
      <section className="py-20 sm:py-28 px-4" id="trust-layers">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p
              className="text-xs font-body font-medium tracking-widest uppercase text-rose mb-4"
              style={{ fontSize: '10px', letterSpacing: '0.18em' }}
            >
              Architecture
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-ink mb-3">
              Three Layers of Trust
            </h2>
            <p className="font-body text-sm text-ink-muted">
              Each layer solves a different problem.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TrustLayer
              number="01"
              title="The Hand"
              subtitle="AI examines embroidery texture"
              description="NAQSH Vision analyzes reverse-side stitch structure, thread tension, and natural irregularity — the physical evidence of hand work."
              color="var(--rose)"
              delay={0}
            />
            <TrustLayer
              number="02"
              title="The Seal"
              subtitle="Physical binding to digital identity"
              description="A tamper-evident physical seal binds the garment to its digital record. If removed, the seal visibly breaks — connecting the physical and digital."
              color="var(--gold)"
              delay={0.15}
            />
            <TrustLayer
              number="03"
              title="The Record"
              subtitle="Tamper-evident ledger"
              description="The registration record — what was assessed, by whom, and when — is written to a ledger that cannot be silently modified."
              color="var(--sage)"
              delay={0.3}
            />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center font-body text-sm text-ink-muted mt-10 max-w-xl mx-auto"
          >
            "Others verify the record. NAQSH examines the object."
          </motion.p>
        </div>
      </section>

      {/* ─── FABRIC CLOSE-UP FEATURE ─── */}
      <section className="py-20 sm:py-28 px-4 bg-ivory-deep overflow-hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 md:order-1"
          >
            <p
              className="text-xs font-body font-medium tracking-widest uppercase text-rose mb-4"
              style={{ fontSize: '10px', letterSpacing: '0.18em' }}
            >
              The Artisan
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-ink mb-5 leading-tight">
              Meet the hands<br />behind this piece.
            </h2>
            <p className="font-body text-sm text-ink-muted leading-relaxed mb-6">
              Every verified garment carries its maker's story — their name, their craft,
              how many days they worked, and what they received. Not as a marketing add-on,
              but as a record.
            </p>
            <p className="font-body text-sm text-ink-muted leading-relaxed mb-8">
              Voice stories, where artisans have consented, let buyers hear the craft
              in the maker's own words.
            </p>
            <Link
              href="/artisan"
              className="inline-flex items-center gap-2 text-sm font-body text-wine font-medium hover:text-burgundy transition-colors"
            >
              Explore artisan profiles
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 md:order-2 relative aspect-[4/3] rounded-lg overflow-hidden"
          >
            <Image
              src="/images/chikankari-green.jpg"
              alt="Close-up of hand-embroidered chikankari fabric showing intricate stitch work"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/20 to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* ─── EARNINGS TRANSPARENCY PREVIEW ─── */}
      <section className="py-20 sm:py-28 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p
              className="text-xs font-body font-medium tracking-widest uppercase text-rose mb-4"
              style={{ fontSize: '10px', letterSpacing: '0.18em' }}
            >
              Earnings Transparency
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-ink mb-5">
              What the artisan receives.
            </h2>
            <p className="font-body text-sm text-ink-muted max-w-xl mx-auto mb-10">
              NAQSH records what the artisan reported receiving — not what a garment "should" pay.
              Visibility, not judgment.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="card-naqsh max-w-sm mx-auto p-8 text-left"
          >
            <div className="mb-5 pb-5 border-b border-blush">
              <p className="text-xs text-ink-muted font-body mb-1">Garment price</p>
              <p className="font-serif text-3xl text-ink">₹2,400</p>
            </div>
            <div className="mb-5 pb-5 border-b border-blush">
              <p className="text-xs text-ink-muted font-body mb-1">Artisan receives</p>
              <p className="font-serif text-3xl text-wine">₹720</p>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-ink-muted font-body mb-1">Artisan share</p>
                <p className="font-serif text-2xl text-ink">30%</p>
              </div>
              <div className="h-12 w-12 rounded-full border-4 border-rose flex items-center justify-center">
                <span className="text-xs font-body font-semibold text-rose">30%</span>
              </div>
            </div>
            <p
              className="mt-5 text-xs text-ink-muted font-body border-t border-blush pt-4 leading-relaxed"
              style={{ fontSize: '11px' }}
            >
              Reported by artisan · Cooperative verified
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── DEMO CTA ─── */}
      <section className="py-20 sm:py-28 px-4 bg-burgundy relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 fabric-texture" aria-hidden="true" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-serif text-3xl sm:text-4xl md:text-5xl text-ivory mb-3 leading-tight">
              "Turn over the fabric."
            </p>
            <p className="font-body text-ivory/70 text-base mb-10 max-w-lg mx-auto">
              That's where the truth is. NAQSH turns that manual inspection
              into an AI-assisted visual assessment.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/demo"
                className="px-8 py-3 bg-ivory text-burgundy font-body font-medium rounded
                           hover:bg-blush transition-colors text-sm"
              >
                Launch Demo
              </Link>
              <Link
                href="/verify/NQ-2026-001"
                className="px-8 py-3 border border-ivory/40 text-ivory font-body font-medium rounded
                           hover:bg-ivory/10 transition-colors text-sm"
              >
                View Sample Certificate
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── FINAL MARK ─── */}
      <section className="py-20 sm:py-28 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="font-serif text-5xl sm:text-6xl text-burgundy mb-4">NAQSH</p>
          <p className="font-body text-sm text-ink-muted">
            AI verifies the hand. We preserve the story.
          </p>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}

function TrustLayer({
  number,
  title,
  subtitle,
  description,
  color,
  delay,
}: {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="card-naqsh p-7"
    >
      <div className="mb-4 pb-4 border-b border-blush">
        <span
          className="font-serif text-4xl font-light"
          style={{ color }}
          aria-hidden="true"
        >
          {number}
        </span>
      </div>
      <h3 className="font-serif text-xl text-ink mb-1">{title}</h3>
      <p className="text-xs font-body font-medium mb-3" style={{ color }}>
        {subtitle}
      </p>
      <p className="text-sm font-body text-ink-muted leading-relaxed">{description}</p>
    </motion.div>
  );
}
