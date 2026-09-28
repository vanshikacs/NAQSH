'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CheckCircle, AlertCircle, XCircle, Play, RotateCcw, ChevronRight, Zap } from 'lucide-react';

const DEMO_SCENARIOS = [
  {
    number: '01',
    id: 'NQ-2026-001',
    title: 'Genuine Handwork',
    description: 'Verified chikankari — high consistency with hand embroidery references.',
    status: 'consistent' as const,
    color: '#2d6a2d',
    bg: '#f0f9f0',
    icon: CheckCircle,
    artisan: 'Amina Begum',
    craft: 'Bakhiya · Jali',
  },
  {
    number: '02',
    id: 'NQ-2026-002',
    title: 'Machine-made Lookalike',
    description: 'Inconsistent with hand embroidery — flagged for cooperative review.',
    status: 'inconsistent' as const,
    color: '#8a2c2c',
    bg: '#fdf0f0',
    icon: XCircle,
    artisan: 'Demo Garment',
    craft: 'Machine embroidery',
  },
  {
    number: '03',
    id: 'NQ-2026-003',
    title: 'Cloned QR Attack',
    description: 'Duplicate digital identity detected — physical seal verification required.',
    status: 'duplicate' as const,
    color: '#8a4a00',
    bg: '#fdf4ec',
    icon: AlertCircle,
    artisan: 'Zainab Noor',
    craft: 'Jali · Bakhiya',
  },
  {
    number: '04',
    id: 'NQ-2026-004',
    title: 'Low-confidence Review',
    description: 'AI assessment inconclusive — cooperative review recommended.',
    status: 'review' as const,
    color: '#8a6b00',
    bg: '#fef9ec',
    icon: AlertCircle,
    artisan: 'Roshni Bano',
    craft: 'Mixed stitches',
  },
];

const ANALYSIS_STEPS = [
  { label: 'Uploading fabric image...', duration: 700 },
  { label: 'Analyzing stitch structure...', duration: 1200 },
  { label: 'Comparing verified references...', duration: 1800 },
  { label: 'Generating assessment...', duration: 2400 },
];

export default function DemoPage() {
  const [killerDemoState, setKillerDemoState] = useState<
    'idle' | 'analyzing' | 'revealed'
  >('idle');
  const [analysisStep, setAnalysisStep] = useState(0);
  const [showJudgeMode, setShowJudgeMode] = useState(false);

  const runKillerDemo = async () => {
    setKillerDemoState('analyzing');
    setAnalysisStep(0);

    for (let i = 0; i < ANALYSIS_STEPS.length; i++) {
      setAnalysisStep(i);
      await new Promise((r) => setTimeout(r, ANALYSIS_STEPS[i].duration - (i === 0 ? 0 : ANALYSIS_STEPS[i - 1].duration)));
    }

    await new Promise((r) => setTimeout(r, 600));
    setKillerDemoState('revealed');
  };

  const resetDemo = () => {
    setKillerDemoState('idle');
    setAnalysisStep(0);
  };

  return (
    <div className="min-h-screen bg-ivory">
      <Navbar />

      <main className="pt-20 pb-20 px-4">
        <div className="max-w-5xl mx-auto">

          {/* ─── Header ─── */}
          <div className="text-center mb-14">
            <p
              className="text-xs font-body font-medium tracking-widest uppercase text-rose mb-4"
              style={{ fontSize: '10px', letterSpacing: '0.18em' }}
            >
              Experience NAQSH
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl text-ink mb-4">Demo Mode</h1>
            <p className="font-body text-sm text-ink-muted max-w-md mx-auto">
              Explore each scenario. All data is seeded and deterministic for reliable presentation.
            </p>
          </div>

          {/* ─── Scenario Cards ─── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
            {DEMO_SCENARIOS.map((scenario) => {
              const Icon = scenario.icon;
              return (
                <motion.div
                  key={scenario.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: parseInt(scenario.number) * 0.1 }}
                  className="card-naqsh p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span
                      className="font-serif text-3xl font-light"
                      style={{ color: 'var(--blush-mid)' }}
                      aria-hidden="true"
                    >
                      {scenario.number}
                    </span>
                    <div
                      className="flex items-center gap-1.5 text-xs font-body font-medium px-2.5 py-1 rounded"
                      style={{ color: scenario.color, backgroundColor: scenario.bg }}
                      role="status"
                    >
                      <Icon size={12} aria-hidden="true" />
                      <span>
                        {scenario.status === 'consistent'
                          ? 'Verified'
                          : scenario.status === 'review'
                          ? 'Review'
                          : scenario.status === 'inconsistent'
                          ? 'Inconsistent'
                          : 'Duplicate'}
                      </span>
                    </div>
                  </div>
                  <h2 className="font-serif text-xl text-ink mb-2">{scenario.title}</h2>
                  <p className="text-sm font-body text-ink-muted mb-1">{scenario.description}</p>
                  <p className="text-xs font-body text-ink-muted mb-5">
                    {scenario.artisan} · {scenario.craft}
                  </p>
                  <Link
                    href={`/verify/${scenario.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-body font-medium text-wine hover:text-burgundy transition-colors"
                  >
                    Open verification certificate <ChevronRight size={12} aria-hidden="true" />
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* ─── Killer Demo ─── */}
          <section className="mb-16">
            <div className="card-naqsh p-8 sm:p-10">
              <div className="text-center mb-8">
                <p
                  className="text-xs font-body font-medium tracking-widest uppercase text-rose mb-3"
                  style={{ fontSize: '10px', letterSpacing: '0.18em' }}
                >
                  The Core Demo
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl text-ink mb-3">
                  Can you tell which one<br />is handmade?
                </h2>
                <p className="text-sm font-body text-ink-muted">
                  Two garments. One genuine. One machine-made. NAQSH examines the object.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {/* Garment A */}
                <div className="card-naqsh p-4">
                  <p
                    className="text-xs font-body font-semibold text-ink-muted tracking-widest uppercase mb-3"
                    style={{ fontSize: '10px' }}
                  >
                    Garment A
                  </p>
                  <div className="relative aspect-square rounded overflow-hidden bg-blush mb-3">
                    <Image
                      src="/images/chikankari-ivory-pink.jpg"
                      alt="Garment A — fabric sample for analysis"
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 45vw, 200px"
                    />
                    {killerDemoState === 'analyzing' && (
                      <div className="absolute inset-0 bg-ink/10">
                        <div
                          className="absolute left-0 right-0 h-0.5 bg-rose/80 scan-line"
                          aria-hidden="true"
                        />
                      </div>
                    )}
                    {killerDemoState === 'revealed' && (
                      <div className="absolute inset-0 bg-green-900/40 flex items-center justify-center">
                        <CheckCircle size={36} className="text-white" aria-hidden="true" />
                      </div>
                    )}
                  </div>
                  <AnimatePresence>
                    {killerDemoState === 'revealed' && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                      >
                        <p className="text-xs font-body font-semibold text-green-700">
                          ✓ Consistent with verified handwork
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Garment B */}
                <div className="card-naqsh p-4">
                  <p
                    className="text-xs font-body font-semibold text-ink-muted tracking-widest uppercase mb-3"
                    style={{ fontSize: '10px' }}
                  >
                    Garment B
                  </p>
                  <div className="relative aspect-square rounded overflow-hidden bg-blush mb-3">
                    <Image
                      src="/images/chikankari-green.jpg"
                      alt="Garment B — fabric sample for analysis"
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 45vw, 200px"
                    />
                    {killerDemoState === 'analyzing' && (
                      <div className="absolute inset-0 bg-ink/10">
                        <div
                          className="absolute left-0 right-0 h-0.5 bg-rose/80 scan-line"
                          aria-hidden="true"
                        />
                      </div>
                    )}
                    {killerDemoState === 'revealed' && (
                      <div className="absolute inset-0 bg-red-900/40 flex items-center justify-center">
                        <XCircle size={36} className="text-white" aria-hidden="true" />
                      </div>
                    )}
                  </div>
                  <AnimatePresence>
                    {killerDemoState === 'revealed' && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                      >
                        <p className="text-xs font-body font-semibold text-red-700">
                          ⚠ Inconsistent — review recommended
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Analysis steps */}
              {killerDemoState === 'analyzing' && (
                <div className="text-center mb-6">
                  <div className="space-y-2">
                    {ANALYSIS_STEPS.map((step, i) => (
                      <motion.p
                        key={step.label}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: i <= analysisStep ? 1 : 0.2 }}
                        className={`text-sm font-body transition-colors ${
                          i === analysisStep ? 'text-wine font-medium' : 'text-ink-muted'
                        }`}
                      >
                        {i < analysisStep ? '✓ ' : i === analysisStep ? '◆ ' : '○ '}
                        {step.label}
                      </motion.p>
                    ))}
                  </div>
                </div>
              )}

              {/* Reveal message */}
              <AnimatePresence>
                {killerDemoState === 'revealed' && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-6 p-5 bg-ivory-deep rounded-lg"
                  >
                    <p className="font-serif text-xl text-ink mb-2">NAQSH Vision</p>
                    <p className="font-body text-sm text-ink-muted italic">
                      "NAQSH doesn't verify a claim. It examines the object."
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* CTA */}
              <div className="flex flex-wrap justify-center gap-3">
                {killerDemoState === 'idle' && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={runKillerDemo}
                    className="flex items-center gap-2 px-6 py-3 bg-burgundy text-white font-body font-medium rounded hover:bg-wine transition-colors text-sm"
                    aria-label="Start NAQSH Vision analysis of both garments"
                  >
                    <Play size={15} aria-hidden="true" /> Analyze Both
                  </motion.button>
                )}
                {killerDemoState === 'revealed' && (
                  <>
                    <button
                      onClick={resetDemo}
                      className="flex items-center gap-2 px-5 py-2.5 border border-wine text-wine font-body font-medium rounded hover:bg-wine/5 transition-colors text-sm"
                    >
                      <RotateCcw size={14} aria-hidden="true" /> Reset
                    </button>
                    <Link
                      href="/verify/NQ-2026-001"
                      className="flex items-center gap-2 px-5 py-2.5 bg-burgundy text-white font-body font-medium rounded hover:bg-wine transition-colors text-sm"
                    >
                      View Certificate <ChevronRight size={14} aria-hidden="true" />
                    </Link>
                  </>
                )}
              </div>
            </div>
          </section>

          {/* ─── Judge Mode ─── */}
          <section className="mb-16">
            <div className="card-naqsh p-8 border-wine/30 border-2">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Zap size={16} className="text-wine" aria-hidden="true" />
                    <p className="font-body font-semibold text-ink text-sm">Judge Mode</p>
                  </div>
                  <p className="text-sm text-ink-muted font-body">
                    Full NAQSH story in under 3 minutes. Each step links directly.
                  </p>
                </div>
                <button
                  onClick={() => setShowJudgeMode(!showJudgeMode)}
                  className="flex-shrink-0 px-4 py-2 bg-burgundy text-white font-body text-sm rounded hover:bg-wine transition-colors font-medium"
                  aria-expanded={showJudgeMode}
                >
                  {showJudgeMode ? 'Collapse' : 'Launch'}
                </button>
              </div>

              <AnimatePresence>
                {showJudgeMode && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-blush pt-5 space-y-3">
                      {JUDGE_STEPS.map((step, i) => (
                        <div key={i} className="flex items-start gap-4">
                          <span className="font-mono text-xs text-ink-muted w-5 flex-shrink-0 mt-0.5">{i + 1}.</span>
                          <div className="flex-1">
                            <p className="text-sm font-body font-medium text-ink mb-0.5">{step.title}</p>
                            <p className="text-xs text-ink-muted font-body">{step.description}</p>
                          </div>
                          {step.href && (
                            <Link
                              href={step.href}
                              className="flex-shrink-0 text-xs font-body text-wine hover:text-burgundy font-medium"
                            >
                              Open →
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>

          {/* ─── Fraud Demo link ─── */}
          <section>
            <div
              className="rounded-lg p-6 border border-amber-300 bg-amber-50"
              role="region"
              aria-label="QR fraud demonstration"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-body font-semibold text-amber-800 mb-1">QR Cloning Attack — Demo</p>
                  <p className="text-sm text-amber-700 font-body">
                    See what happens when someone copies a NAQSH QR code onto a counterfeit garment.
                  </p>
                </div>
                <Link
                  href="/demo/fraud"
                  className="flex-shrink-0 px-4 py-2 bg-amber-700 text-white font-body text-sm rounded hover:bg-amber-800 transition-colors font-medium"
                >
                  Demo Fraud
                </Link>
              </div>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}

const JUDGE_STEPS = [
  {
    title: 'Verify a garment',
    description: 'Scan QR or enter garment ID to open the verification certificate.',
    href: '/scan',
  },
  {
    title: 'AI analyzes the reverse fabric',
    description: 'NAQSH Vision examines stitch structure and thread tension.',
    href: '/scan',
  },
  {
    title: 'View verification result',
    description: 'See the full AI assessment — verdict, confidence, and reasoning.',
    href: '/verify/NQ-2026-001',
  },
  {
    title: 'Meet the artisan',
    description: 'Amina Begum — 18 years of chikankari, Chowk, Lucknow.',
    href: '/artisan/AMN-018',
  },
  {
    title: 'Earnings transparency',
    description: 'What the artisan recorded receiving for this piece.',
    href: '/verify/NQ-2026-001',
  },
  {
    title: 'Voice story',
    description: 'Hear the artisan\'s story in their own words.',
    href: '/artisan/AMN-018',
  },
  {
    title: 'Physical seal',
    description: 'The seal binds garment to digital identity.',
    href: '/verify/NQ-2026-001',
  },
  {
    title: 'Ledger record',
    description: 'Tamper-evident provenance record.',
    href: '/ledger/NQ-2026-001',
  },
  {
    title: 'QR cloning attack demo',
    description: 'Possible duplicate detected — system explains what this means.',
    href: '/demo/fraud',
  },
];
