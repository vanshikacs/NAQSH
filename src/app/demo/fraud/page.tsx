'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { AlertTriangle, CheckCircle, XCircle, RotateCcw, ArrowRight, Shield } from 'lucide-react';

type DemoStep = 'original' | 'cloning' | 'detection' | 'comparison' | 'conclusion';

export default function FraudDemoPage() {
  const [step, setStep] = useState<DemoStep>('original');

  const steps: DemoStep[] = ['original', 'cloning', 'detection', 'comparison', 'conclusion'];
  const stepIndex = steps.indexOf(step);

  const goNext = () => {
    if (stepIndex < steps.length - 1) {
      setStep(steps[stepIndex + 1]);
    }
  };

  const reset = () => setStep('original');

  return (
    <div className="min-h-screen bg-ivory">
      <Navbar />

      <main className="pt-20 pb-20 px-4">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <div className="text-center mb-10">
            <p
              className="text-xs font-body font-medium tracking-widest uppercase text-rose mb-3"
              style={{ fontSize: '10px', letterSpacing: '0.18em' }}
            >
              Security Demo
            </p>
            <h1 className="font-serif text-4xl text-ink mb-3">Cloned QR Attack</h1>
            <p className="text-sm font-body text-ink-muted max-w-md mx-auto">
              What happens when someone copies a NAQSH QR code onto a counterfeit garment?
            </p>
          </div>

          {/* Progress */}
          <div className="flex justify-center gap-2 mb-10">
            {steps.map((s, i) => (
              <div
                key={s}
                className="h-1 rounded-full transition-all duration-300"
                style={{
                  width: i === stepIndex ? '32px' : '16px',
                  backgroundColor: i <= stepIndex ? 'var(--wine)' : 'var(--blush)',
                }}
                aria-current={i === stepIndex ? 'step' : undefined}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            {/* STEP 1: Original Garment */}
            {step === 'original' && (
              <motion.div
                key="original"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                className="card-naqsh p-8 mb-6"
              >
                <div className="flex items-center gap-2 mb-5">
                  <CheckCircle size={18} className="text-green-600" aria-hidden="true" />
                  <h2 className="font-serif text-2xl text-ink">Original Garment</h2>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div className="relative aspect-square rounded-lg overflow-hidden bg-blush">
                    <Image
                      src="/images/chikankari-outfit.jpg"
                      alt="Original registered garment"
                      fill
                      className="object-cover"
                      sizes="200px"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-green-900/60 text-white text-center py-1">
                      <p className="text-xs font-body">Original · Verified</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-ink-muted font-body mb-0.5">Garment ID</p>
                      <p className="font-mono text-sm text-ink font-medium">NQ-2026-003</p>
                    </div>
                    <div>
                      <p className="text-xs text-ink-muted font-body mb-0.5">QR Status</p>
                      <span className="inline-flex items-center gap-1 text-xs font-body font-medium px-2 py-0.5 rounded bg-green-50 text-green-700 border border-green-200">
                        <CheckCircle size={10} aria-hidden="true" /> ACTIVE
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-ink-muted font-body mb-0.5">Artisan</p>
                      <p className="text-sm text-ink font-body">Zainab Noor</p>
                    </div>
                    <div>
                      <p className="text-xs text-ink-muted font-body mb-0.5">AI Status</p>
                      <p className="text-xs text-green-700 font-body">Verified — 94% confidence</p>
                    </div>
                  </div>
                </div>

                {/* QR visual */}
                <div className="bg-ivory-deep rounded-lg p-5 text-center border border-blush mb-5">
                  <div className="w-20 h-20 bg-ink rounded mx-auto mb-2 flex items-center justify-center">
                    <p className="font-mono text-white text-xs">QR</p>
                  </div>
                  <p className="font-mono text-xs text-ink-muted">naqsh.app/verify/NQ-2026-003</p>
                </div>

                <p className="text-sm text-ink-muted font-body leading-relaxed mb-5">
                  This garment has been registered, verified by NAQSH Vision, and sealed.
                  The QR code is active and links to the authentic digital record.
                </p>
              </motion.div>
            )}

            {/* STEP 2: Cloning */}
            {step === 'cloning' && (
              <motion.div
                key="cloning"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                className="space-y-4 mb-6"
              >
                <div className="card-naqsh p-6 border-red-200">
                  <div className="flex items-center gap-2 mb-4">
                    <XCircle size={18} className="text-red-600" aria-hidden="true" />
                    <h2 className="font-serif text-2xl text-ink">Counterfeit Garment</h2>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="relative aspect-square rounded-lg overflow-hidden bg-blush">
                      <Image
                        src="/images/chikankari-green.jpg"
                        alt="Counterfeit garment with copied QR code"
                        fill
                        className="object-cover"
                        sizes="200px"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-red-900/60 text-white text-center py-1">
                        <p className="text-xs font-body">Counterfeit · Copied QR</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-ink-muted font-body mb-0.5">QR Code (copied)</p>
                        <p className="font-mono text-sm text-ink font-medium">NQ-2026-003</p>
                      </div>
                      <div className="bg-red-50 border border-red-200 rounded p-2">
                        <p className="text-xs text-red-700 font-body leading-relaxed">
                          Attacker photographs the QR code from the original garment and prints a copy.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Same QR visual */}
                  <div className="bg-red-50 rounded-lg p-5 text-center border border-red-200">
                    <div className="w-20 h-20 bg-ink rounded mx-auto mb-2 flex items-center justify-center">
                      <p className="font-mono text-white text-xs">QR</p>
                    </div>
                    <p className="font-mono text-xs text-red-700">naqsh.app/verify/NQ-2026-003</p>
                    <p className="text-xs text-red-600 font-body mt-1">⚠ Same QR — different physical garment</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Detection */}
            {step === 'detection' && (
              <motion.div
                key="detection"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                className="card-naqsh p-8 mb-6"
              >
                <div className="text-center mb-6">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <AlertTriangle size={48} className="text-amber-500 mx-auto mb-3" aria-hidden="true" />
                  </motion.div>
                  <h2 className="font-serif text-3xl text-ink mb-2">NAQSH Detects</h2>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-300 rounded text-amber-800 text-sm font-body font-semibold">
                    <AlertTriangle size={14} aria-hidden="true" /> POSSIBLE DUPLICATE
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-5 mb-5">
                  <p className="font-body text-sm text-amber-800 leading-relaxed mb-3">
                    <strong>Digital identity reuse detected.</strong>
                    {' '}This QR code has already been activated in a different scan context.
                  </p>
                  <ul className="space-y-1.5">
                    {[
                      'Same digital identity (NQ-2026-003) scanned in multiple contexts',
                      'Scan count has exceeded expected normal use',
                      'Cooperative review triggered automatically',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-amber-500 mt-0.5 flex-shrink-0">◆</span>
                        <p className="text-xs text-amber-700 font-body">{item}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="text-sm text-ink-muted font-body italic text-center">
                  "NAQSH doesn't claim this proves fraud. It flags the pattern for human review."
                </p>
              </motion.div>
            )}

            {/* STEP 4: Comparison */}
            {step === 'comparison' && (
              <motion.div
                key="comparison"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                className="card-naqsh p-8 mb-6"
              >
                <h2 className="font-serif text-2xl text-ink mb-5 text-center">
                  NAQSH shows what's different
                </h2>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-xs font-body font-semibold text-green-700 mb-2 text-center">
                      Original Registered
                    </p>
                    <div className="relative aspect-square rounded-lg overflow-hidden ring-2 ring-green-300">
                      <Image
                        src="/images/chikankari-outfit.jpg"
                        alt="Original registered garment image"
                        fill
                        className="object-cover"
                        sizes="180px"
                      />
                    </div>
                    <p className="text-xs text-ink-muted font-body text-center mt-2">
                      Registered at 2026-09-10
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-body font-semibold text-red-700 mb-2 text-center">
                      Current Scan
                    </p>
                    <div className="relative aspect-square rounded-lg overflow-hidden ring-2 ring-red-300">
                      <Image
                        src="/images/chikankari-green.jpg"
                        alt="Current scan showing different garment"
                        fill
                        className="object-cover"
                        sizes="180px"
                      />
                    </div>
                    <p className="text-xs text-red-600 font-body text-center mt-2">
                      ⚠ Different garment detected
                    </p>
                  </div>
                </div>

                <div className="bg-ivory-deep rounded-lg p-4 text-center">
                  <p className="text-sm font-body text-ink-muted">
                    The fabric images don't match. The cooperative has been notified for investigation.
                  </p>
                </div>
              </motion.div>
            )}

            {/* STEP 5: Conclusion */}
            {step === 'conclusion' && (
              <motion.div
                key="conclusion"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                className="space-y-4 mb-6"
              >
                <div className="card-naqsh p-8">
                  <div className="text-center mb-6">
                    <Shield size={36} className="text-wine mx-auto mb-3" aria-hidden="true" />
                    <h2 className="font-serif text-3xl text-ink mb-2">
                      Digital identity ≠ physical authenticity
                    </h2>
                    <p className="text-sm text-ink-muted font-body">
                      This is the most important concept in NAQSH.
                    </p>
                  </div>

                  <div className="space-y-4 mb-6">
                    {[
                      {
                        title: 'What NAQSH detected',
                        body: 'Reuse of a digital identity in a different scan context — a pattern consistent with QR copying.',
                      },
                      {
                        title: 'What NAQSH doesn\'t claim',
                        body: 'Detection alone doesn\'t prove fraud. The physical seal inspection and cooperative review are essential next steps.',
                      },
                      {
                        title: 'The three-layer answer',
                        body: 'AI detects the physical craftsmanship inconsistency. The seal shows physical tampering. The ledger protects the original record.',
                      },
                    ].map((item) => (
                      <div key={item.title} className="border-l-2 border-rose pl-4">
                        <p className="font-body font-semibold text-sm text-ink mb-1">{item.title}</p>
                        <p className="text-sm text-ink-muted font-body leading-relaxed">{item.body}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3 justify-center">
                    <Link
                      href="/verify/NQ-2026-003"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-burgundy text-white font-body text-sm rounded hover:bg-wine transition-colors font-medium"
                    >
                      View Flagged Certificate <ArrowRight size={14} aria-hidden="true" />
                    </Link>
                    <button
                      onClick={reset}
                      className="inline-flex items-center gap-2 px-5 py-2.5 border border-wine text-wine font-body text-sm rounded hover:bg-wine/5 transition-colors font-medium"
                    >
                      <RotateCcw size={14} aria-hidden="true" /> Restart Demo
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          {step !== 'conclusion' && (
            <div className="flex justify-between items-center">
              <button
                onClick={() => setStep(steps[Math.max(0, stepIndex - 1)])}
                disabled={stepIndex === 0}
                className="text-sm font-body text-ink-muted hover:text-wine transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                ← Back
              </button>
              <button
                onClick={goNext}
                className="px-5 py-2.5 bg-burgundy text-white font-body text-sm rounded hover:bg-wine transition-colors font-medium"
              >
                {stepIndex === steps.length - 2 ? 'See Conclusion' : 'Next →'}
              </button>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
