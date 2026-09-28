import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Eye, BookOpen, Shield, ChevronRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <Navbar />

      <main className="pt-20 pb-20 px-4">
        <div className="max-w-3xl mx-auto">

          {/* Hero */}
          <div className="text-center py-14 border-b border-blush mb-14">
            <p
              className="text-xs font-body font-medium tracking-widest uppercase text-rose mb-4"
              style={{ fontSize: '10px', letterSpacing: '0.18em' }}
            >
              About
            </p>
            <h1 className="font-serif text-5xl sm:text-6xl text-ink mb-4">NAQSH</h1>
            <p className="font-serif text-xl text-ink-soft italic mb-4">
              AI verifies the hand. We preserve the story.
            </p>
            <p className="font-body text-sm text-ink-muted max-w-lg mx-auto leading-relaxed">
              A heritage-tech authenticity and provenance platform for Lucknow chikankari.
              Built for artisans, cooperatives, and conscious buyers.
            </p>
          </div>

          {/* Why Vision */}
          <section className="mb-14" id="why-ai">
            <p
              className="text-xs font-body font-medium tracking-widest uppercase text-rose mb-4"
              style={{ fontSize: '10px', letterSpacing: '0.18em' }}
            >
              Why Vision?
            </p>
            <h2 className="font-serif text-3xl text-ink mb-5">
              AI-assisted visual assessment
            </h2>
            <p className="font-body text-sm text-ink-muted leading-relaxed mb-4">
              Buyers of chikankari have always inspected the reverse side of garments to look
              for the natural stitch variation that indicates hand embroidery. NAQSH turns that
              manual inspection into an AI-assisted visual assessment.
            </p>
            <p className="font-body text-sm text-ink-muted leading-relaxed mb-8">
              The reverse side of hand-embroidered chikankari shows natural thread tension
              variation, organic stitch irregularity, and characteristic float patterns — details
              that machine embroidery cannot replicate accurately at scale.
            </p>

            {/* Flow */}
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center mb-6">
              {[
                { label: 'Human heuristic', desc: 'Inspect the reverse side' },
                { label: 'Photograph', desc: 'Capture stitch structure' },
                { label: 'Computer vision', desc: 'Analyze against references' },
                { label: 'Explainable result', desc: 'Reasoned assessment' },
              ].map((step, i) => (
                <div key={step.label} className="flex items-center gap-3 flex-1">
                  <div className="card-naqsh p-3 flex-1 min-w-0">
                    <p className="text-xs font-body font-semibold text-ink mb-0.5">{step.label}</p>
                    <p className="text-xs text-ink-muted font-body">{step.desc}</p>
                  </div>
                  {i < 3 && (
                    <ChevronRight size={14} className="text-blush-mid flex-shrink-0 hidden sm:block" aria-hidden="true" />
                  )}
                </div>
              ))}
            </div>

            <div className="bg-ivory-deep border border-blush rounded-lg p-5">
              <p className="text-sm font-body text-ink-muted leading-relaxed italic">
                "NAQSH never claims absolute authenticity. The AI provides an assessment —
                high consistency, flagged for review, or inconsistent — based on visual comparison
                with verified reference samples. This is scientifically and legally appropriate."
              </p>
            </div>
          </section>

          {/* Why Ledger */}
          <section className="mb-14" id="why-ledger">
            <p
              className="text-xs font-body font-medium tracking-widest uppercase text-rose mb-4"
              style={{ fontSize: '10px', letterSpacing: '0.18em' }}
            >
              Why a Ledger?
            </p>
            <h2 className="font-serif text-3xl text-ink mb-5">
              Tamper-evident provenance
            </h2>
            <p className="font-body text-sm text-ink-muted leading-relaxed mb-4">
              Most of NAQSH works perfectly well without blockchain.
            </p>
            <p className="font-body text-sm text-ink-muted leading-relaxed mb-6">
              We use a tamper-evident ledger only for the record that matters: who registered
              the garment, what was assessed, and when. This creates a registration history
              that cannot be silently modified.
            </p>

            <div className="card-naqsh p-5 mb-5">
              <div className="space-y-4">
                {[
                  {
                    icon: Eye,
                    label: 'AI assesses craftsmanship',
                    desc: 'Examines the physical embroidery against verified reference samples.',
                  },
                  {
                    icon: Shield,
                    label: 'Seal binds identity physically',
                    desc: 'Connects the garment to its digital record in the physical world.',
                  },
                  {
                    icon: BookOpen,
                    label: 'Ledger protects the record',
                    desc: 'Makes the registration tamper-evident. Cannot be silently changed.',
                  },
                ].map(({ icon: Icon, label, desc }) => (
                  <div key={label} className="flex items-start gap-4">
                    <Icon size={16} className="text-rose mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-body font-semibold text-ink mb-0.5">{label}</p>
                      <p className="text-xs text-ink-muted font-body leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-sm font-body text-ink-muted italic">
              "NAQSH uses a ledger to make the registered record tamper-evident.
              It does not determine whether the embroidery is handmade."
            </p>
          </section>

          {/* Three Layers */}
          <section className="mb-14" id="trust-layers">
            <p
              className="text-xs font-body font-medium tracking-widest uppercase text-rose mb-4"
              style={{ fontSize: '10px', letterSpacing: '0.18em' }}
            >
              Architecture
            </p>
            <h2 className="font-serif text-3xl text-ink mb-3">Three Layers of Trust</h2>
            <p className="text-sm font-body text-ink-muted mb-6">Each layer solves a different problem.</p>

            <div className="space-y-4">
              {[
                {
                  n: '01', title: 'The Hand', color: 'var(--rose)',
                  body: 'AI examines the reverse-side stitch structure of the embroidery — thread tension variation, stitch-length irregularity, and float patterns characteristic of hand work. This is the physical evidence that cannot be easily faked.',
                },
                {
                  n: '02', title: 'The Seal', color: 'var(--gold)',
                  body: 'A tamper-evident physical seal binds the garment to its digital record. The seal is designed to visibly break if removed. This creates a physical-digital link that QR copying alone cannot replicate.',
                },
                {
                  n: '03', title: 'The Record', color: 'var(--sage)',
                  body: 'The registration record is written to a tamper-evident ledger. This means the record of what was assessed, when, and by whom cannot be silently changed after the fact.',
                },
              ].map(({ n, title, color, body }) => (
                <div key={n} className="card-naqsh p-5 flex gap-5">
                  <span className="font-serif text-4xl font-light flex-shrink-0" style={{ color }} aria-hidden="true">{n}</span>
                  <div>
                    <h3 className="font-serif text-xl text-ink mb-2">{title}</h3>
                    <p className="text-sm font-body text-ink-muted leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Tech Stack */}
          <section className="mb-14">
            <p
              className="text-xs font-body font-medium tracking-widest uppercase text-rose mb-4"
              style={{ fontSize: '10px', letterSpacing: '0.18em' }}
            >
              Technology
            </p>
            <h2 className="font-serif text-3xl text-ink mb-6">Architecture</h2>

            <div className="card-naqsh p-6">
              <div className="space-y-4">
                {[
                  { label: 'Frontend', value: 'Next.js 15, TypeScript, Tailwind CSS, Framer Motion' },
                  { label: 'Vision', value: 'Demo adapter (deterministic). Gemini/OpenAI-compatible API when VISION_API_KEY provided.' },
                  { label: 'Ledger', value: 'Demo adapter. Polygon Amoy testnet when POLYGON_RPC_URL provided.' },
                  { label: 'Voice', value: 'Browser Web Speech API. ElevenLabs when ELEVENLABS_API_KEY provided.' },
                  { label: 'QR', value: 'Standard QR codes resolving to /verify/:garmentId' },
                  { label: 'Data', value: 'Seeded demo data. All records are prototype demonstrations.' },
                ].map(({ label, value }) => (
                  <div key={label} className="grid grid-cols-[100px_1fr] gap-4">
                    <p className="text-xs font-body font-semibold text-ink-soft pt-0.5">{label}</p>
                    <p className="text-xs font-body text-ink-muted leading-relaxed">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Disclaimer */}
          <section className="mb-10">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
              <p
                className="text-xs font-body font-semibold text-amber-800 tracking-widest uppercase mb-3"
                style={{ fontSize: '10px', letterSpacing: '0.14em' }}
              >
                Important Disclaimer
              </p>
              <div className="space-y-2.5">
                {[
                  'NAQSH prototype visual AI assessment is not a substitute for laboratory-grade authentication.',
                  'Production deployment requires a properly labeled evaluation dataset and expert validation.',
                  'All data shown in this prototype is simulated for demonstration purposes only.',
                  'No real artisan partnerships, government partnerships, or production deployments are claimed.',
                  'Voice content uses browser speech synthesis — not voice cloning.',
                  'Ledger records are demo mode only — no real blockchain transactions are performed.',
                  'AI confidence scores are illustrative, not calibrated accuracy measurements.',
                ].map((item, i) => (
                  <p key={i} className="text-xs font-body text-amber-700 leading-relaxed">• {item}</p>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <div className="text-center">
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 px-6 py-3 bg-burgundy text-white font-body font-medium rounded hover:bg-wine transition-colors text-sm"
            >
              Experience the Demo <ChevronRight size={14} aria-hidden="true" />
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
