'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { VerificationStatusCard } from '@/components/VerificationBadge';
import type { VerificationResult } from '@/lib/data/seedData';
import { ArrowRight, Upload, Scan, AlertCircle } from 'lucide-react';

type TabType = 'id' | 'upload';

const DEMO_IDS = [
  { id: 'NQ-2026-001', label: 'Verified Handwork', status: 'consistent' as const },
  { id: 'NQ-2026-002', label: 'Machine Lookalike', status: 'inconsistent' as const },
  { id: 'NQ-2026-003', label: 'Cloned QR', status: 'duplicate' as const },
];

const ANALYSIS_STEPS = [
  'Reading the stitch...',
  'Comparing handwork patterns...',
  'Checking reverse-side texture...',
  'Generating assessment...',
];

export default function ScanPage() {
  const [tab, setTab] = useState<TabType>('id');
  const [garmentId, setGarmentId] = useState('');
  const [idError, setIdError] = useState('');
  const [analysisState, setAnalysisState] = useState<
    'idle' | 'analyzing' | 'done' | 'error'
  >('idle');
  const [currentStep, setCurrentStep] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<VerificationResult | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleIdSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = garmentId.trim().toUpperCase();
    if (!id) {
      setIdError('Please enter a garment ID');
      return;
    }
    window.location.href = `/verify/${id}`;
  };

  const runAnalysis = async (file: File) => {
    setAnalysisState('analyzing');
    setCurrentStep(0);

    // Simulate steps
    for (let i = 0; i < ANALYSIS_STEPS.length; i++) {
      setCurrentStep(i);
      await new Promise((r) => setTimeout(r, 700));
    }

    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await fetch('/api/verify', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.success) {
        setAnalysisResult(data.result);
        setAnalysisState('done');
      } else {
        setAnalysisState('error');
      }
    } catch {
      setAnalysisState('error');
    }
  };

  const handleFile = (file: File) => {
    const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowed.includes(file.type)) {
      setAnalysisState('error');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setAnalysisState('error');
      return;
    }
    runAnalysis(file);
  };

  const reset = () => {
    setAnalysisState('idle');
    setAnalysisResult(null);
    setCurrentStep(0);
    if (fileRef.current) fileRef.current.value = '';
  };

  return (
    <div className="min-h-screen bg-ivory">
      <Navbar />

      <main className="pt-20 pb-20 px-4">
        <div className="max-w-xl mx-auto">

          {/* Header */}
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Scan size={20} className="text-wine" aria-hidden="true" />
              <p
                className="text-xs font-body font-medium tracking-widest uppercase text-rose"
                style={{ fontSize: '10px', letterSpacing: '0.18em' }}
              >
                Verify
              </p>
            </div>
            <h1 className="font-serif text-4xl text-ink mb-3">Verify a Garment</h1>
            <p className="text-sm font-body text-ink-muted">
              Enter a garment ID or upload a fabric image for AI assessment.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex border border-blush rounded-lg overflow-hidden mb-8">
            {(['id', 'upload'] as TabType[]).map((t) => (
              <button
                key={t}
                onClick={() => { setTab(t); reset(); }}
                className={`flex-1 py-2.5 text-sm font-body font-medium transition-colors ${
                  tab === t
                    ? 'bg-burgundy text-white'
                    : 'bg-ivory text-ink-muted hover:bg-ivory-deep'
                }`}
                aria-selected={tab === t}
                role="tab"
              >
                {t === 'id' ? 'Garment ID' : 'Upload Image (Demo)'}
              </button>
            ))}
          </div>

          {/* TAB: ID */}
          {tab === 'id' && (
            <div>
              <form onSubmit={handleIdSubmit} className="mb-6">
                <label htmlFor="garment-id" className="block text-xs font-body font-medium text-ink-soft mb-2">
                  Garment ID
                </label>
                <div className="flex gap-2">
                  <input
                    id="garment-id"
                    type="text"
                    value={garmentId}
                    onChange={(e) => { setGarmentId(e.target.value); setIdError(''); }}
                    placeholder="NQ-2026-001"
                    className="flex-1 border border-blush rounded px-4 py-2.5 text-sm font-mono text-ink bg-mulmul focus:outline-none focus:border-wine focus:ring-1 focus:ring-wine"
                    aria-describedby={idError ? 'id-error' : undefined}
                  />
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-5 py-2.5 bg-burgundy text-white font-body text-sm rounded hover:bg-wine transition-colors font-medium"
                  >
                    Verify <ArrowRight size={14} aria-hidden="true" />
                  </button>
                </div>
                {idError && (
                  <p id="id-error" className="text-xs text-red-600 font-body mt-2 flex items-center gap-1">
                    <AlertCircle size={11} aria-hidden="true" /> {idError}
                  </p>
                )}
              </form>

              {/* Demo quick links */}
              <div>
                <p className="text-xs font-body text-ink-muted mb-3">Demo garments:</p>
                <div className="space-y-2">
                  {DEMO_IDS.map((demo) => (
                    <Link
                      key={demo.id}
                      href={`/verify/${demo.id}`}
                      className="flex items-center justify-between p-3 rounded-lg border border-blush bg-ivory-deep hover:border-wine hover:bg-wine/5 transition-colors group"
                    >
                      <div>
                        <p className="font-mono text-xs text-ink font-medium">{demo.id}</p>
                        <p className="text-xs text-ink-muted font-body">{demo.label}</p>
                      </div>
                      <ArrowRight size={14} className="text-ink-muted group-hover:text-wine transition-colors" aria-hidden="true" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: UPLOAD */}
          {tab === 'upload' && (
            <div>
              <AnimatePresence mode="wait">
                {analysisState === 'idle' && (
                  <motion.div
                    key="upload"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div
                      className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${
                        dragOver
                          ? 'border-wine bg-wine/5'
                          : 'border-blush hover:border-rose hover:bg-rose/5'
                      }`}
                      onClick={() => fileRef.current?.click()}
                      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                      onDragLeave={() => setDragOver(false)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setDragOver(false);
                        const f = e.dataTransfer.files[0];
                        if (f) handleFile(f);
                      }}
                      role="button"
                      tabIndex={0}
                      aria-label="Upload fabric image for AI analysis"
                      onKeyDown={(e) => e.key === 'Enter' && fileRef.current?.click()}
                    >
                      <Upload size={32} className="mx-auto mb-3 text-ink-muted" aria-hidden="true" />
                      <p className="font-body text-sm text-ink-soft mb-1">
                        Drop a fabric image, or click to upload
                      </p>
                      <p className="text-xs text-ink-muted font-body">
                        JPEG, PNG, WebP · Max 10MB
                      </p>
                      <p className="text-xs text-ink-muted font-body mt-2" style={{ fontSize: '10px' }}>
                        Best results: photograph the reverse side of the embroidery
                      </p>
                    </div>
                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      className="sr-only"
                      aria-hidden="true"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) handleFile(f);
                      }}
                    />
                  </motion.div>
                )}

                {analysisState === 'analyzing' && (
                  <motion.div
                    key="analyzing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-10"
                  >
                    <div className="w-16 h-16 rounded-full border-2 border-blush mx-auto mb-5 flex items-center justify-center relative overflow-hidden">
                      <div
                        className="absolute left-0 right-0 h-0.5 bg-rose/60 scan-line"
                        aria-hidden="true"
                      />
                      <span className="font-serif text-2xl text-wine">N</span>
                    </div>
                    <p className="font-serif text-xl text-ink mb-5">NAQSH Vision</p>
                    <div className="space-y-2 max-w-xs mx-auto">
                      {ANALYSIS_STEPS.map((step, i) => (
                        <p
                          key={step}
                          className={`text-sm font-body transition-colors ${
                            i < currentStep
                              ? 'text-green-600'
                              : i === currentStep
                              ? 'text-wine font-medium'
                              : 'text-ink-muted opacity-40'
                          }`}
                        >
                          {i < currentStep ? '✓ ' : i === currentStep ? '◆ ' : '○ '}
                          {step}
                        </p>
                      ))}
                    </div>
                    <p className="text-xs text-ink-muted font-body mt-5">AI-assisted visual assessment</p>
                  </motion.div>
                )}

                {analysisState === 'done' && analysisResult && (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="mb-5">
                      <VerificationStatusCard
                        verdict={analysisResult.verdict}
                        confidence={analysisResult.confidence}
                        mode={analysisResult.mode}
                      />
                    </div>

                    <div className="card-naqsh p-5 mb-5">
                      <p
                        className="text-xs font-body font-semibold text-ink-muted tracking-widest uppercase mb-3"
                        style={{ fontSize: '10px', letterSpacing: '0.14em' }}
                      >
                        Assessment
                      </p>
                      <div className="space-y-2">
                        {analysisResult.reasoning.map((r, i) => (
                          <p key={i} className="text-xs font-body text-ink-muted leading-relaxed">
                            • {r}
                          </p>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={reset}
                        className="flex-1 py-2.5 border border-wine text-wine font-body text-sm rounded hover:bg-wine/5 transition-colors font-medium"
                      >
                        Try another image
                      </button>
                      <Link
                        href="/demo"
                        className="flex-1 py-2.5 text-center bg-burgundy text-white font-body text-sm rounded hover:bg-wine transition-colors font-medium"
                      >
                        Full demo
                      </Link>
                    </div>
                  </motion.div>
                )}

                {analysisState === 'error' && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-8"
                  >
                    <AlertCircle size={36} className="text-red-400 mx-auto mb-3" aria-hidden="true" />
                    <p className="font-body font-medium text-ink mb-1">We couldn't assess this image.</p>
                    <p className="text-sm text-ink-muted font-body mb-5">
                      Try a clearer reverse-side photo with good lighting.
                    </p>
                    <button
                      onClick={reset}
                      className="px-5 py-2.5 bg-burgundy text-white font-body text-sm rounded hover:bg-wine transition-colors font-medium"
                    >
                      Try again
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
