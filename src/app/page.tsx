'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowRight, ChevronDown, Eye, Fingerprint, Info, ShieldCheck, Upload, QrCode, Sparkles } from 'lucide-react';

const trustNodes = [
  ['Craft', 'The technique, heritage and regional tradition behind the piece.'],
  ['Artisan', 'A named master maker with a recorded lineage and wage share.'],
  ['Origin', 'Where it was made, and who vouches for its GI geographical boundary.'],
  ['Material', 'Natural mulberry silk, unbleached mulmul, or pure silver zari.'],
  ['Evidence', 'Certificates, reverse-stitch tension scans, and curator notes.'],
  ['Provenance', 'Every milestone from cooperative loom to collector ownership.'],
] as const;

const verificationRows = [
  ['Image analysis', 'Hand embroidery tension variance detected (0.89)'],
  ['Material', 'Natural cotton muslin fiber consistent'],
  ['Motif', 'Traditional Awadhi Paan & Chamele floral pattern'],
  ['Region', 'Lucknow GI geographic protection zone matched'],
  ['Document', 'Cooperative guild certificate AMCG-2026 verified'],
  ['Artisan', 'Master artisan Amina Begum record confirmed in registry'],
] as const;

export default function HomePage() {
  const [verificationId, setVerificationId] = useState('');
  const [verificationError, setVerificationError] = useState('');
  const [verificationState, setVerificationState] = useState<'idle' | 'reading' | 'complete'>('idle');
  const [activeRows, setActiveRows] = useState(0);
  const [copied, setCopied] = useState(false);
  const verifyRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (verificationState !== 'reading') return;
    const rowTimer = window.setInterval(
      () => setActiveRows((value) => Math.min(value + 1, verificationRows.length)),
      450
    );
    const completeTimer = window.setTimeout(() => setVerificationState('complete'), 3150);
    return () => {
      window.clearInterval(rowTimer);
      window.clearTimeout(completeTimer);
    };
  }, [verificationState]);

  const beginVerification = () => {
    const value = verificationId.trim().toUpperCase();
    if (value && !/^NQ-\d{4}-\d{3,6}$/.test(value)) {
      setVerificationError('Use the format NQ-2026-001, as printed on the garment seal.');
      return;
    }
    setVerificationError('');
    setActiveRows(0);
    setVerificationState('reading');
  };

  const shareCertificate = async () => {
    const url = `${typeof window !== 'undefined' ? window.location.origin : ''}/verify/NQ-2026-001`;
    if (navigator.share) {
      await navigator.share({ title: 'NAQSH · Verified Chikankari Provenance', url });
      return;
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="min-h-screen overflow-hidden bg-ivory text-ink">
      <Navbar />

      <main id="main">
        {/* ─── HERO WITH URDU TYPOGRAPHY ─── */}
        <section
          id="top"
          className="naqsh-hero relative flex min-h-[760px] items-end overflow-hidden pb-20 pt-32 sm:min-h-screen sm:pb-28"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_24%,rgba(243,217,210,.9),transparent_34%),linear-gradient(135deg,#e6efdd_0%,#dce8d2_52%,#fbf6ee_100%)]" />
          <div className="thread-swoop absolute inset-0 opacity-60" aria-hidden="true" />

          {/* Featured Artifact Visual Card */}
          <div className="absolute right-[-18%] top-[11%] h-[72vw] max-h-[560px] w-[72vw] max-w-[560px] overflow-hidden rounded-[50%_50%_18%_18%] border border-white/50 opacity-35 shadow-2xl shadow-wine/10 sm:right-0 sm:top-[17%] sm:h-[58vw] sm:w-[42vw] sm:max-h-[680px] sm:max-w-[580px] sm:opacity-100">
            <Image
              src="/images/chikankari-ivory-pink.jpg"
              alt="Close-up of authentic chikankari embroidery on ivory muslin fabric"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 640px) 90vw, 55vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-burgundy/40 via-transparent to-white/10" />
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between border-t border-white/60 pt-3 text-xs text-white">
              <div>
                <span className="font-serif block font-bold text-sm">Awadh Royal Jali Angrakha</span>
                <span className="text-[10px] opacity-80">Amina Begum · Chowk, Lucknow</span>
              </div>
              <span className="font-mono bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-bold">
                NQ-2026-001
              </span>
            </div>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-8">
            <div className="max-w-[580px]">
              {/* Urdu Brand Header */}
              <div className="flex items-center gap-3.5 mb-5 bg-white/60 backdrop-blur-sm border border-wine/20 w-fit px-4 py-2 rounded-full shadow-xs">
                <span className="font-urdu text-2xl sm:text-3xl text-wine font-normal leading-none" dir="rtl">
                  نقش
                </span>
                <span className="h-4 w-px bg-wine/30" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-wine font-bold leading-tight">
                    Har Dhaage Ki Kahani
                  </span>
                  <span className="font-urdu text-[11px] text-olive leading-tight" dir="rtl">
                    ہر دھاگے کی کہانی
                  </span>
                </div>
              </div>

              <h1 className="font-serif text-[clamp(3.8rem,11vw,8.5rem)] leading-[.85] tracking-[-.03em] text-ink">
                Every thread<br />
                has a <em className="text-wine">story.</em>
              </h1>

              <p className="mt-8 max-w-[460px] text-base leading-relaxed text-ink-soft sm:text-lg">
                NAQSH is a trust and provenance protocol for Indian heritage textiles. Connecting master artisans, genuine GI origins, AI stitch forensics, and immutable ownership records.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/scan"
                  className="inline-flex items-center gap-2 rounded-full bg-burgundy px-7 py-3.5 text-sm font-semibold text-ivory transition hover:-translate-y-0.5 hover:bg-wine shadow-md"
                >
                  <QrCode size={16} /> Verify a piece <ArrowRight size={16} />
                </Link>
                <a
                  href="#crafts"
                  className="inline-flex items-center gap-2 rounded-full border border-wine px-6 py-3.5 text-sm font-semibold text-wine transition hover:bg-wine/10"
                >
                  Explore crafts
                </a>
              </div>

              <div className="mt-6 flex items-center gap-2 text-[11px] tracking-wide text-olive font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                <span>Gemini 3.8 Flash Vision · Multi-signal cooperative verification</span>
              </div>
            </div>
          </div>

          <a
            href="#story"
            className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center text-[10px] tracking-[.2em] text-olive hover:text-burgundy transition-colors"
          >
            SCROLL <ChevronDown size={15} />
          </a>
        </section>

        {/* ─── THE PROBLEM ─── */}
        <section id="story" className="naqsh-section bg-ivory">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <p className="eyebrow">The gap in heritage commerce</p>
            <h2 className="max-w-3xl font-serif text-5xl leading-[.95] sm:text-7xl">
              Beautiful things can still lose their <em className="text-wine">story.</em>
            </h2>
            <div className="mt-16 grid gap-6 border-t border-rose/50 pt-5 sm:grid-cols-5" aria-label="Craft, maker, origin, evidence and buyer">
              <div className="story-chain-line" aria-hidden="true" />
              {['Craft', 'Maker', 'Origin', 'Evidence', 'Buyer'].map((item, index) => (
                <div key={item} className={`relative text-center font-serif text-2xl italic ${index > 1 ? 'text-ink-muted/50' : 'text-wine'}`}>
                  <span className="mx-auto mb-3 block h-7 w-7 rounded-full border border-rose bg-blush" />
                  {item}
                </div>
              ))}
            </div>
            <p className="mt-8 max-w-xl leading-relaxed text-ink-muted">
              By the time a piece reaches its buyer, the master artisan&apos;s name and the proof of GI origin are usually stripped away. NAQSH binds physical embroidery to an unbroken digital provenance chain.
            </p>
          </div>
        </section>

        {/* ─── TRUST NODES ─── */}
        <section className="naqsh-section bg-blush">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <p className="eyebrow">The NAQSH architecture</p>
            <h2 className="max-w-3xl font-serif text-5xl leading-[.95] sm:text-7xl">
              Bring the story back into the <em className="text-wine">object.</em>
            </h2>
            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {trustNodes.map(([title, copy], index) => (
                <div key={title} className="naqsh-card group">
                  <div className="flex items-start justify-between">
                    <span className="font-serif text-5xl text-rose/60">0{index + 1}</span>
                    {index === 0 ? <Eye className="text-wine" size={22} /> : index === 1 ? <Fingerprint className="text-wine" size={22} /> : <ShieldCheck className="text-wine" size={22} />}
                  </div>
                  <h3 className="mt-10 font-serif text-3xl italic text-wine">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CRAFTS SHOWCASE ─── */}
        <section id="crafts" className="naqsh-section bg-ivory">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <p className="eyebrow">Living Cultural Traditions</p>
            <h2 className="max-w-3xl font-serif text-5xl leading-[.95] sm:text-7xl">
              Explore the hands behind the <em className="text-wine">craft.</em>
            </h2>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              <CraftCard
                image="/images/chikankari-ivory-pink.jpg"
                title="Chikankari"
                subHindi="لکھنؤ چکن کاری"
                place="Lucknow, Uttar Pradesh (GI-119)"
                copy="400-year-old delicate shadow-work and needle-drawn jali trellis on pure muslin."
              />
              <CraftCard
                image="/images/chikankari-peach-suit.jpg"
                title="Banarasi Kadhwa"
                subHindi="بنارسی کڑھوا"
                place="Varanasi, Uttar Pradesh (GI-99)"
                copy="Discontinuous weft handloom brocade on pit-looms using tested pure silver zari."
              />
              <CraftCard
                image="/images/chikankari-outfit.jpg"
                title="Amina Begum"
                subHindi="امینہ بیگم"
                place="Master Artisan · Chowk, Awadh"
                copy="34 years of needle practice, 86% cooperative wage share, 420 authenticated pieces."
              />
            </div>
          </div>
        </section>

        {/* ─── LIVE VERIFICATION DEMO ─── */}
        <section ref={verifyRef} id="verify" className="naqsh-section bg-sage/60">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <p className="eyebrow">The Moment of Truth</p>
            <h2 className="font-serif text-5xl leading-[.95] sm:text-7xl">
              Know what you&apos;re <em className="text-wine">holding.</em>
            </h2>

            <div className="my-8 flex flex-wrap gap-2 text-sm">
              <Step label="1 Identify" active={verificationState === 'idle'} done={verificationState !== 'idle'} />
              <Step label="2 Inspect" active={verificationState === 'reading'} done={verificationState === 'complete'} />
              <Step label="3 Evidence" active={activeRows >= 3 && verificationState === 'reading'} done={verificationState === 'complete'} />
              <Step label="4 Verify" active={verificationState === 'complete'} />
            </div>

            <div className="naqsh-panel grid gap-8 lg:grid-cols-2">
              <div className="relative overflow-hidden rounded-2xl border border-rose/40 bg-gradient-to-br from-blush to-ivory p-8 text-center flex flex-col justify-between">
                <div>
                  <b className="font-serif text-4xl font-normal italic text-burgundy">Scan or upload</b>
                  <p className="mt-3 text-sm text-ink-muted">
                    Upload a high-resolution textile surface photo or reverse-stitch photo for Gemini 3.8 Flash AI forensics.
                  </p>
                </div>
                <div className="mt-6">
                  <Link
                    href="/scan"
                    className="inline-flex items-center gap-2 rounded-full bg-burgundy hover:bg-wine text-white px-6 py-3 text-sm font-semibold transition-all shadow-md"
                  >
                    <Upload size={16} /> Open AI Vision Scanner
                  </Link>
                </div>
              </div>

              <div>
                <label htmlFor="verification-id" className="mb-2 block text-sm font-semibold">
                  Or lookup a registered benchmark token
                </label>
                <div className="flex gap-2">
                  <input
                    id="verification-id"
                    value={verificationId}
                    onChange={(event) => {
                      setVerificationId(event.target.value);
                      setVerificationError('');
                    }}
                    onKeyDown={(event) => event.key === 'Enter' && beginVerification()}
                    placeholder="e.g. NQ-2026-001"
                    className="min-w-0 flex-1 rounded-xl border border-ink/20 bg-white px-4 py-3 font-mono text-sm focus:outline-none focus:border-wine"
                  />
                  <button
                    type="button"
                    onClick={beginVerification}
                    disabled={verificationState === 'reading'}
                    className="rounded-xl bg-burgundy hover:bg-wine px-6 py-3 text-sm font-semibold text-ivory disabled:opacity-50 transition-colors"
                  >
                    {verificationState === 'reading' ? 'Reading...' : 'Inspect'}
                  </button>
                </div>
                {verificationError && (
                  <p className="mt-2 text-sm text-red-800" role="alert">
                    {verificationError}
                  </p>
                )}

                {verificationState === 'reading' && (
                  <div className="mt-5 bg-white p-5 rounded-xl border border-olive/20" aria-live="polite">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-wine font-bold bg-blush px-2.5 py-0.5 rounded-full inline-block mb-2">
                      Gemini 3.8 Flash + Ledger Cross-Check
                    </span>
                    <h3 className="font-serif text-2xl italic text-burgundy mb-3">Compiling evidence dossier...</h3>
                    <ul className="space-y-2">
                      {verificationRows.map(([label, value], index) => (
                        <li
                          key={label}
                          className={`flex justify-between border-b border-blush/60 py-1.5 text-xs transition-opacity ${
                            index < activeRows ? 'opacity-100' : 'opacity-25'
                          }`}
                        >
                          <b className="font-mono text-ink-muted uppercase">{label}</b>
                          <em className="not-italic text-emerald-800 font-semibold">
                            {index < activeRows ? `✓ ${value}` : 'Evaluating...'}
                          </em>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {verificationState === 'complete' && (
                  <VerificationResult
                    onReset={() => setVerificationState('idle')}
                    onViewTimeline={() => document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' })}
                  />
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ─── PROVENANCE TIMELINE ─── */}
        <section id="timeline" className="naqsh-section bg-ivory">
          <div className="mx-auto max-w-4xl px-5 sm:px-8">
            <p className="eyebrow">Immutable Provenance Trail</p>
            <h2 className="font-serif text-5xl leading-[.95] sm:text-7xl">
              The life of one <em className="text-wine">piece.</em>
            </h2>
            <div className="mt-12 border-l-2 border-wine/30 pl-8">
              {[
                ['01 Made in Chowk', 'Artisan Amina Begum completed 240 hours of Jali & Bakhiya needlework in Chowk, Old Lucknow.'],
                ['02 Cooperative Registration', 'Awadh Mahila Craft Guild issued physical verification slip #AMCG-2026-881 with GI seal.'],
                ['03 AI Stitch Inspection', 'Gemini 3.8 Flash Vision verified organic stitch tension variance (0.89), zero machine lock-stitch hallmarks.'],
                ['04 Curator Physical Review', 'Dr. Sunita Verma physically inspected fabric warp/weft integrity and signed off on GI compliance.'],
                ['05 Verified Certificate Issued', 'Digital tamper-evident certificate CRT-NQ-2026-001 issued with 89% evidence confidence.']
              ].map(([title, copy], index) => (
                <div key={title} className="relative pb-9">
                  <span className="absolute -left-[2.6rem] top-1.5 h-4 w-4 rounded-full border-2 border-burgundy bg-blush" />
                  <h3 className="font-serif text-2xl italic text-wine">{title}</h3>
                  <p className="mt-1 text-sm text-ink-muted leading-relaxed">{copy}</p>
                </div>
              ))}
            </div>
            <Link
              href="/verify/NQ-2026-001"
              className="inline-flex items-center gap-2 text-sm font-semibold text-wine hover:text-burgundy"
            >
              Open complete live dossier <ArrowRight size={15} />
            </Link>
          </div>
        </section>

        {/* ─── CERTIFICATE SHOWCASE ─── */}
        <section id="artisans" className="naqsh-section bg-blush">
          <div className="mx-auto max-w-4xl px-5 sm:px-8">
            <p className="eyebrow text-center">A Certificate Worth Keeping</p>
            <h2 className="text-center font-serif text-5xl leading-[.95] sm:text-7xl">
              Record of <em className="text-wine">provenance.</em>
            </h2>

            <article className="certificate-card mt-12 bg-ivory rounded-2xl shadow-xl overflow-hidden border border-wine/20">
              <div className="border border-gold p-7 outline outline-1 outline-gold outline-offset-[-8px] sm:p-12">
                <div className="flex items-center justify-between pb-3 border-b border-gold/40">
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-2xl font-bold text-burgundy">NAQSH</span>
                    <span className="font-urdu text-xl text-wine" dir="rtl">نقش</span>
                  </div>
                  <span className="text-[10px] font-mono text-ink-muted uppercase">Digital Provenance Credential</span>
                </div>

                <h3 className="mt-4 font-serif text-3xl sm:text-4xl italic text-wine">AUTHENTICATED CRAFT RECORD</h3>

                <dl className="mt-7 grid grid-cols-[minmax(120px,1fr)_1.5fr] gap-3 text-sm">
                  <dt className="text-ink-muted font-mono text-xs uppercase">Certificate ID</dt>
                  <dd className="font-mono font-bold text-wine">CRT-NQ-2026-001</dd>
                  <dt className="text-ink-muted font-mono text-xs uppercase">Craft Tradition</dt>
                  <dd className="font-semibold">Lucknow Chikankari (GI-119)</dd>
                  <dt className="text-ink-muted font-mono text-xs uppercase">Master Artisan</dt>
                  <dd className="font-semibold">Amina Begum (امینہ بیگم) · Awadh Guild</dd>
                  <dt className="text-ink-muted font-mono text-xs uppercase">Evidence Confidence</dt>
                  <dd className="font-semibold text-emerald-800">89% Composite · Hand Embroidery Verified</dd>
                  <dt className="text-ink-muted font-mono text-xs uppercase">Fair Earnings Share</dt>
                  <dd className="font-semibold text-green-700">86% Guaranteed Direct Cooperative Payout</dd>
                </dl>

                <div className="mt-7 flex items-end justify-between border-t border-gold/50 pt-5">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 bg-night text-white rounded-lg flex items-center justify-center p-2 font-mono text-[9px] text-center leading-tight">
                      [QR SEAL]
                    </div>
                    <div className="text-[11px] text-ink-muted font-mono">
                      <p>Seal: NQ-TOKEN-2026001-A9F7</p>
                      <p className="text-olive">Immutable Ledger Entry</p>
                    </div>
                  </div>
                  <span className="text-xs text-ink-muted font-serif italic">Har Dhaage Ki Kahani</span>
                </div>
              </div>
            </article>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => window.print()}
                className="rounded-full bg-burgundy hover:bg-wine px-6 py-2.5 text-xs font-semibold text-ivory transition-colors shadow-sm"
              >
                Download / Print Certificate
              </button>
              <button
                type="button"
                onClick={shareCertificate}
                className="rounded-full border border-wine px-6 py-2.5 text-xs font-semibold text-wine hover:bg-wine/10 transition-colors"
              >
                {copied ? 'Link Copied!' : 'Share This Record'}
              </button>
              <Link
                href="/verify/NQ-2026-001"
                className="rounded-full border border-wine px-6 py-2.5 text-xs font-semibold text-wine hover:bg-wine/10 transition-colors"
              >
                Inspect Full Dossier →
              </Link>
            </div>
          </div>
        </section>

        {/* ─── COMMUNITY COMMONS ─── */}
        <section id="community" className="naqsh-section bg-ivory">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <p className="eyebrow">NAQSH Craft Commons · Powered by Vakh</p>
            <h2 className="max-w-3xl font-serif text-5xl leading-[.95] sm:text-7xl">
              Join the people who keep the story <em className="text-wine">going.</em>
            </h2>
            <p className="mt-6 max-w-xl leading-relaxed text-ink-muted">
              Field observations, reverse-stitch findings, and counterfeit alerts logged by verified researchers and conscious buyers across India, backed by Vakh forms.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/community"
                className="inline-flex items-center gap-2 rounded-full bg-burgundy px-7 py-3 text-sm font-semibold text-ivory hover:bg-wine shadow-md"
              >
                Open Community Feed <ArrowRight size={16} />
              </Link>
              <Link
                href="/vakh"
                className="inline-flex items-center gap-2 rounded-full border border-wine px-6 py-3 text-sm font-semibold text-wine hover:bg-wine/10"
              >
                View Hackathon Dossier
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function CraftCard({
  image,
  title,
  subHindi,
  place,
  copy
}: {
  image: string;
  title: string;
  subHindi?: string;
  place: string;
  copy: string;
}) {
  return (
    <Link href="/artisan" className="craft-card group block">
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
        <div className="absolute bottom-5 left-5 right-5 text-ivory">
          <div className="flex items-baseline justify-between mb-1">
            <h3 className="font-serif text-3xl italic">{title}</h3>
            {subHindi && (
              <span className="font-urdu text-lg text-ivory/80" dir="rtl">
                {subHindi}
              </span>
            )}
          </div>
          <p className="text-xs tracking-wide text-ivory/75 font-mono">{place}</p>
          <p className="mt-2 text-xs leading-relaxed text-ivory/85">{copy}</p>
        </div>
      </div>
    </Link>
  );
}

function Step({ label, active, done }: { label: string; active?: boolean; done?: boolean }) {
  return (
    <span
      className={`rounded-full border px-4 py-2 text-xs font-semibold ${
        done
          ? 'border-emerald-700 bg-emerald-50 text-emerald-800'
          : active
          ? 'border-wine bg-white text-wine shadow-xs'
          : 'border-olive/30 text-olive'
      }`}
    >
      {done ? '✓ ' : ''}
      {label}
    </span>
  );
}

function VerificationResult({ onReset, onViewTimeline }: { onReset: () => void; onViewTimeline: () => void }) {
  return (
    <div className="mt-6 grid gap-6 rounded-2xl bg-white p-6 shadow-xl border border-wine/20 sm:grid-cols-2" aria-live="polite">
      <div>
        <span className="text-[10px] font-mono uppercase bg-emerald-800 text-white px-2 py-0.5 rounded-full font-bold">
          VERIFIED RECORD
        </span>
        <p className="font-serif text-5xl italic leading-none text-emerald-800 mt-2">Verified</p>
        <p className="mt-3 font-serif text-4xl text-burgundy">89%</p>
        <p className="text-xs text-ink-muted font-mono">Evidence confidence composite</p>
        <div className="mt-3 h-1.5 rounded-full bg-blush overflow-hidden">
          <div className="h-full w-[89%] rounded-full bg-emerald-700" />
        </div>
        <p className="mt-4 flex gap-2 text-xs leading-relaxed text-ink-muted">
          <Info size={14} className="shrink-0 text-olive" />
          Tension irregularity (0.89) confirms manual needlework. Zero machine lock-stitches.
        </p>
      </div>

      <div>
        <h3 className="font-serif text-2xl italic text-wine mb-2">Evaluated Evidence</h3>
        <ul className="space-y-1.5 text-xs text-ink">
          <li className="flex items-center gap-1.5 text-emerald-800">
            <span className="font-bold">✓</span> Certificate CRT-NQ-2026-001 found in ledger
          </li>
          <li className="flex items-center gap-1.5 text-emerald-800">
            <span className="font-bold">✓</span> Artisan Amina Begum matched in cooperative
          </li>
          <li className="flex items-center gap-1.5 text-emerald-800">
            <span className="font-bold">✓</span> GI geographic boundary Lucknow UP verified
          </li>
          <li className="flex items-center gap-1.5 text-emerald-800">
            <span className="font-bold">✓</span> Pure Muslin fiber texture confirmed
          </li>
        </ul>

        <div className="mt-5 flex flex-wrap gap-2.5 pt-3 border-t border-blush">
          <Link
            href="/verify/NQ-2026-001"
            className="rounded-full bg-burgundy hover:bg-wine px-4 py-2 text-xs font-semibold text-ivory shadow-xs"
          >
            Open Certificate
          </Link>
          <button
            type="button"
            onClick={onReset}
            className="rounded-full border border-wine px-4 py-2 text-xs font-semibold text-wine hover:bg-wine/10"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}