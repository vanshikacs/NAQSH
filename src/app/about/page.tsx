import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Eye, BookOpen, Shield, ChevronRight, Sparkles, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <Navbar />

      <main className="pt-24 pb-20 px-4">
        <div className="max-w-3xl mx-auto">

          {/* Hero */}
          <div className="text-center py-12 border-b border-blush/60 mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blush/60 border border-burgundy/15 mb-4 shadow-sm">
              <span className="font-urdu text-base text-burgundy font-medium">نقش</span>
              <span className="text-xs font-body text-ink-muted uppercase tracking-widest">• About NAQSH</span>
            </div>
            <h1 className="font-serif text-5xl sm:text-6xl text-ink mb-3">
              NAQSH <span className="font-urdu text-4xl text-rose font-normal ml-2">نقش</span>
            </h1>
            <p className="font-urdu text-lg sm:text-xl text-burgundy mb-3">
              ہر دھاگے کی کہانی — ہر نقش میں صداقت
            </p>
            <p className="font-serif text-xl text-ink-soft italic mb-4">
              AI verifies the hand. We preserve the story.
            </p>
            <p className="font-body text-sm text-ink-muted max-w-lg mx-auto leading-relaxed">
              A heritage-tech authenticity and provenance platform for Indian crafts and Lucknow chikankari.
              Connecting master artisans, cooperatives, and conscious buyers through verifiable visual AI.
            </p>
          </div>

          {/* Why Vision */}
          <section className="mb-14" id="why-ai">
            <p
              className="text-xs font-body font-medium tracking-widest uppercase text-rose mb-3"
              style={{ fontSize: '10px', letterSpacing: '0.18em' }}
            >
              Why Vision? · بصری تصدیق
            </p>
            <h2 className="font-serif text-3xl text-ink mb-4">
              AI-assisted visual assessment
            </h2>
            <p className="font-body text-sm text-ink-muted leading-relaxed mb-4">
              Connoisseurs of chikankari have always inspected the reverse side of garments to look
              for the natural tension variation and float stitches that indicate genuine hand embroidery. NAQSH turns that
              centuries-old heuristic into an AI-assisted computer vision model powered by Gemini 3.8 Flash.
            </p>
            <p className="font-body text-sm text-ink-muted leading-relaxed mb-8">
              The reverse side of hand-embroidered chikankari exhibits organic stitch irregularity,
              subtle tension differentials, and artisan-specific handwork traces — details
              that automated mechanical embroidery machines cannot replicate at scale.
            </p>

            {/* Flow */}
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center mb-6">
              {[
                { label: 'Human Heuristic', desc: 'Inspect reverse stitch' },
                { label: 'Macro Capture', desc: 'Photograph tension structure' },
                { label: 'Gemini Vision', desc: 'Neural micro-pattern check' },
                { label: 'Explainable Dossier', desc: 'Verifiable evidence score' },
              ].map((step, i) => (
                <div key={step.label} className="flex items-center gap-3 flex-1 w-full">
                  <div className="card-naqsh p-3.5 flex-1 min-w-0 bg-white/70 border border-burgundy/10 rounded-xl">
                    <p className="text-xs font-body font-semibold text-ink mb-0.5">{step.label}</p>
                    <p className="text-[11px] text-ink-muted font-body">{step.desc}</p>
                  </div>
                  {i < 3 && (
                    <ChevronRight size={14} className="text-blush-mid flex-shrink-0 hidden sm:block" aria-hidden="true" />
                  )}
                </div>
              ))}
            </div>

            <div className="bg-ivory-deep border border-blush rounded-xl p-5 shadow-sm">
              <p className="text-sm font-body text-ink-muted leading-relaxed italic">
                &ldquo;NAQSH provides probabilistic, explainable confidence assessments —
                high consistency, review required, or inconsistent — based on visual comparison
                with verified reference artisan archives. Every signal is transparent.&rdquo;
              </p>
            </div>
          </section>

          {/* Why Ledger */}
          <section className="mb-14" id="why-ledger">
            <p
              className="text-xs font-body font-medium tracking-widest uppercase text-rose mb-3"
              style={{ fontSize: '10px', letterSpacing: '0.18em' }}
            >
              Why a Ledger? · غیر متبدل ریکارڈ
            </p>
            <h2 className="font-serif text-3xl text-ink mb-4">
              Tamper-evident provenance
            </h2>
            <p className="font-body text-sm text-ink-muted leading-relaxed mb-4">
              Most of NAQSH works perfectly well without distributed ledgers.
            </p>
            <p className="font-body text-sm text-ink-muted leading-relaxed mb-6">
              We use a tamper-evident cryptographic ledger only for the audit trail that matters: who registered
              the garment, what was assessed, and when. This creates an unalterable craft registration history.
            </p>

            <div className="card-naqsh p-6 mb-5 bg-white/70 border border-burgundy/10 rounded-2xl">
              <div className="space-y-4">
                {[
                  {
                    icon: Eye,
                    label: 'AI assesses craftsmanship',
                    desc: 'Examines the physical reverse-side embroidery against verified master archives.',
                  },
                  {
                    icon: Shield,
                    label: 'Seal binds identity physically',
                    desc: 'Connects the physical garment to its digital record through a tamper-evident identifier.',
                  },
                  {
                    icon: BookOpen,
                    label: 'Ledger protects the record',
                    desc: 'Makes the registration timestamped and immutable. Cannot be silently manipulated.',
                  },
                ].map(({ icon: Icon, label, desc }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-blush/40 text-burgundy mt-0.5 flex-shrink-0">
                      <Icon size={16} aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm font-body font-semibold text-ink mb-0.5">{label}</p>
                      <p className="text-xs text-ink-muted font-body leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Three Layers */}
          <section className="mb-14" id="trust-layers">
            <p
              className="text-xs font-body font-medium tracking-widest uppercase text-rose mb-3"
              style={{ fontSize: '10px', letterSpacing: '0.18em' }}
            >
              Architecture · تین ستون
            </p>
            <h2 className="font-serif text-3xl text-ink mb-2">Three Layers of Trust</h2>
            <p className="text-sm font-body text-ink-muted mb-6">Each layer solves a distinct integrity challenge.</p>

            <div className="space-y-4">
              {[
                {
                  n: '01', title: 'The Hand (دستکاری)', color: 'var(--rose)',
                  body: 'AI examines the reverse-side stitch structure of the embroidery — thread tension variation, stitch irregularity, and float patterns characteristic of hand work. This is the physical evidence that cannot be forged.',
                },
                {
                  n: '02', title: 'The Seal (مہر و شناخت)', color: 'var(--gold)',
                  body: 'A tamper-evident physical identifier binds the garment to its digital passport. This creates a link that simple QR code reproduction cannot fake.',
                },
                {
                  n: '03', title: 'The Record (دستاویز و ریکارڈ)', color: 'var(--sage)',
                  body: 'The registration record is committed to a tamper-evident audit ledger with Vakh field observations, ensuring that provenance cannot be rewritten after creation.',
                },
              ].map(({ n, title, color, body }) => (
                <div key={n} className="card-naqsh p-6 flex gap-5 bg-white/70 border border-burgundy/10 rounded-2xl">
                  <span className="font-serif text-4xl font-light flex-shrink-0" style={{ color }} aria-hidden="true">{n}</span>
                  <div>
                    <h3 className="font-serif text-xl text-ink mb-1.5">{title}</h3>
                    <p className="text-sm font-body text-ink-muted leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Tech Stack */}
          <section className="mb-14">
            <p
              className="text-xs font-body font-medium tracking-widest uppercase text-rose mb-3"
              style={{ fontSize: '10px', letterSpacing: '0.18em' }}
            >
              Technology Stack
            </p>
            <h2 className="font-serif text-3xl text-ink mb-6">Platform Architecture</h2>

            <div className="card-naqsh p-6 bg-white/70 border border-burgundy/10 rounded-2xl">
              <div className="space-y-4">
                {[
                  { label: 'Frontend', value: 'Next.js 16 (App Router, Turbopack), React 19, Tailwind CSS v4' },
                  { label: 'Vision AI', value: 'Gemini 3.8 Flash (Multimodal Generative Vision API) with tension scoring' },
                  { label: 'Community Feed', value: 'Vakh Live Protocol Forms (h8ki Artisan Declaration, 8msr Field Notes)' },
                  { label: 'Ledger Audit', value: 'Cryptographic SHA-256 state chain with audit trail' },
                  { label: 'Typography', value: 'Noto Nastaliq Urdu, Amiri, Cormorant Garamond, Manrope' },
                ].map(({ label, value }) => (
                  <div key={label} className="grid grid-cols-[120px_1fr] gap-4 py-1.5 border-b border-blush/30 last:border-none">
                    <p className="text-xs font-body font-semibold text-burgundy pt-0.5">{label}</p>
                    <p className="text-xs font-body text-ink-muted leading-relaxed">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <div className="text-center pt-4">
            <Link
              href="/scan"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-burgundy text-white font-body font-medium rounded-full hover:bg-wine transition-all shadow-md text-sm"
            >
              <Sparkles size={16} />
              Try Reverse Stitch Verification <ChevronRight size={14} aria-hidden="true" />
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}