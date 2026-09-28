import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VerificationBadge from '@/components/VerificationBadge';
import { GARMENTS, getGarmentById, getArtisanById, formatCurrency, getEarningsPercentage } from '@/lib/data/seedData';
import { formatDate, formatDateTime, truncateHash, confidenceToLabel } from '@/lib/utils';
import { ArrowLeft, CheckCircle, AlertCircle, Flag, RefreshCw } from 'lucide-react';

export async function generateStaticParams() {
  return GARMENTS.map((g) => ({ garmentId: g.id }));
}

export default async function CooperativeGarmentPage({
  params,
}: {
  params: Promise<{ garmentId: string }>;
}) {
  const { garmentId } = await params;
  const garment = getGarmentById(garmentId);

  if (!garment) {
    return (
      <div className="min-h-screen bg-ivory">
        <Navbar />
        <main className="pt-24 px-4 max-w-2xl mx-auto text-center">
          <h1 className="font-serif text-3xl text-ink mb-3">Garment not found</h1>
          <Link href="/cooperative" className="text-sm font-body text-wine">← Back to dashboard</Link>
        </main>
        <Footer />
      </div>
    );
  }

  const artisan = getArtisanById(garment.artisanId);
  const vr = garment.verificationResult;
  const earningsPct = getEarningsPercentage(garment);
  const isReview = garment.verificationStatus === 'review';

  return (
    <div className="min-h-screen bg-ivory">
      <Navbar />

      <main className="pt-20 pb-20 px-4">
        <div className="max-w-4xl mx-auto">

          {/* Nav */}
          <div className="pt-2 pb-6 flex items-center justify-between">
            <Link
              href="/cooperative"
              className="inline-flex items-center gap-1.5 text-xs font-body text-ink-muted hover:text-wine transition-colors"
            >
              <ArrowLeft size={12} /> Cooperative Dashboard
            </Link>
            <Link
              href={`/verify/${garment.id}`}
              className="text-xs font-body text-wine hover:text-burgundy font-medium"
            >
              View buyer certificate →
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Main */}
            <div className="lg:col-span-2 space-y-5">

              {/* Status */}
              <div className="card-naqsh p-5">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <p className="font-mono text-sm text-ink font-medium mb-0.5">{garment.id}</p>
                    <p className="text-xs text-ink-muted font-body">{garment.garmentType} · {garment.craft} · {garment.workDays} days</p>
                  </div>
                  <VerificationBadge
                    verdict={garment.activationStatus === 'duplicate_flag' ? 'duplicate' : garment.verificationStatus}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="relative aspect-video rounded overflow-hidden bg-blush">
                    <Image
                      src={garment.frontImage}
                      alt="Garment front"
                      fill
                      className="object-cover"
                      sizes="200px"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-ink/50 text-white text-center py-0.5">
                      <p className="text-xs font-body">Front</p>
                    </div>
                  </div>
                  <div className="relative aspect-video rounded overflow-hidden bg-blush">
                    <Image
                      src={garment.reverseImage}
                      alt="Garment reverse — AI analyzed"
                      fill
                      className="object-cover"
                      sizes="200px"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-ink/50 text-white text-center py-0.5">
                      <p className="text-xs font-body">Reverse ✦ AI</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Analysis */}
              <div className="card-naqsh p-5">
                <p
                  className="text-xs font-body font-semibold text-ink-muted tracking-widest uppercase mb-4"
                  style={{ fontSize: '10px', letterSpacing: '0.14em' }}
                >
                  NAQSH Vision Analysis
                </p>

                <div className="mb-4">
                  <div className="flex justify-between mb-1">
                    <p className="text-xs font-body text-ink-muted">Confidence</p>
                    <p className="text-xs font-body font-medium text-ink">
                      {confidenceToLabel(vr.confidence)} — {Math.round(vr.confidence * 100)}%
                    </p>
                  </div>
                  <div className="h-1.5 bg-blush rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${Math.round(vr.confidence * 100)}%`,
                        backgroundColor:
                          vr.verdict === 'consistent' ? '#2d6a2d' : vr.verdict === 'review' ? '#8a6b00' : '#8a2c2c',
                      }}
                      role="progressbar"
                      aria-valuenow={Math.round(vr.confidence * 100)}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  {vr.reasoning.map((r, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle size={12} className="mt-0.5 flex-shrink-0 text-ink-muted" aria-hidden="true" />
                      <p className="text-xs font-body text-ink-muted leading-relaxed">{r}</p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-blush pt-3 grid grid-cols-1 gap-3">
                  {[
                    { label: 'Stitch variation', value: vr.analysis.stitchVariation },
                    { label: 'Thread texture', value: vr.analysis.threadTexture },
                    { label: 'Reverse-side', value: vr.analysis.reverseSidePattern },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p className="text-xs font-body font-medium text-ink-soft mb-0.5">{label}</p>
                      <p className="text-xs font-body text-ink-muted leading-relaxed">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cooperative Review Actions */}
              {isReview && (
                <div className="card-naqsh p-5 border-amber-200 border-2">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertCircle size={16} className="text-amber-600" aria-hidden="true" />
                    <p className="font-body font-semibold text-sm text-amber-800">Cooperative Review Required</p>
                  </div>
                  <p className="text-sm text-amber-700 font-body mb-5 leading-relaxed">
                    AI assessment is inconclusive for this piece. Human cooperative review is required before certification.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button
                      className="flex items-center gap-1.5 px-4 py-2 bg-green-700 text-white font-body text-sm rounded hover:bg-green-800 transition-colors"
                      aria-label="Approve garment after manual review"
                    >
                      <CheckCircle size={13} aria-hidden="true" /> Approve after review
                    </button>
                    <button
                      className="flex items-center gap-1.5 px-4 py-2 border border-amber-400 text-amber-700 font-body text-sm rounded hover:bg-amber-50 transition-colors"
                      aria-label="Request better image from artisan"
                    >
                      <RefreshCw size={13} aria-hidden="true" /> Request better image
                    </button>
                    <button
                      className="flex items-center gap-1.5 px-4 py-2 border border-red-300 text-red-700 font-body text-sm rounded hover:bg-red-50 transition-colors"
                      aria-label="Flag garment for investigation"
                    >
                      <Flag size={13} aria-hidden="true" /> Flag for investigation
                    </button>
                  </div>
                  <p className="text-xs text-amber-600 font-body mt-3 leading-relaxed" style={{ fontSize: '11px' }}>
                    Responsible AI: NAQSH does not automatically reject garments with low confidence.
                    Human judgment is required for all cooperative review decisions.
                  </p>
                </div>
              )}

              {/* Ledger */}
              <div className="card-naqsh p-5">
                <p
                  className="text-xs font-body font-semibold text-ink-muted tracking-widest uppercase mb-3"
                  style={{ fontSize: '10px', letterSpacing: '0.14em' }}
                >
                  Ledger Record
                </p>
                <div className="space-y-2.5">
                  <div className="flex justify-between">
                    <p className="text-xs font-body text-ink-muted">Record hash</p>
                    <p className="font-mono text-xs text-ink">{truncateHash(garment.ledgerRecord.recordHash)}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-xs font-body text-ink-muted">Network</p>
                    <p className="text-xs font-body text-ink">{garment.ledgerRecord.network}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-xs font-body text-ink-muted">Status</p>
                    <p className="text-xs font-body text-ink capitalize">{garment.ledgerRecord.status}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-xs font-body text-ink-muted">Registered</p>
                    <p className="text-xs font-body text-ink">{formatDateTime(garment.ledgerRecord.timestamp)}</p>
                  </div>
                </div>
                <Link
                  href={`/ledger/${garment.id}`}
                  className="inline-flex items-center gap-1 text-xs font-body text-wine hover:text-burgundy font-medium mt-3"
                >
                  Full ledger record →
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">

              {/* Artisan */}
              {artisan && (
                <div className="card-naqsh p-5">
                  <p
                    className="text-xs font-body font-semibold text-ink-muted tracking-widest uppercase mb-3"
                    style={{ fontSize: '10px', letterSpacing: '0.14em' }}
                  >
                    Artisan
                  </p>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-blush flex-shrink-0">
                      <Image
                        src={artisan.photo}
                        alt={artisan.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div>
                      <p className="font-serif text-base text-ink">{artisan.name}</p>
                      <p className="text-xs text-ink-muted font-body">{artisan.location}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {artisan.craftSpecialties.map((c) => (
                      <span key={c} className="text-xs font-body px-2 py-0.5 rounded bg-blush text-ink-soft">{c}</span>
                    ))}
                  </div>
                  <Link
                    href={`/artisan/${artisan.id}`}
                    className="text-xs font-body text-wine hover:text-burgundy font-medium"
                  >
                    Full profile →
                  </Link>
                </div>
              )}

              {/* Earnings */}
              <div className="card-naqsh p-5">
                <p
                  className="text-xs font-body font-semibold text-ink-muted tracking-widest uppercase mb-3"
                  style={{ fontSize: '10px', letterSpacing: '0.14em' }}
                >
                  Earnings
                </p>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <p className="text-xs text-ink-muted font-body">Price</p>
                    <p className="text-sm font-body text-ink">{formatCurrency(garment.price)}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-xs text-ink-muted font-body">Artisan receives</p>
                    <p className="text-sm font-body text-wine font-medium">{formatCurrency(garment.artisanEarnings)}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-xs text-ink-muted font-body">Share</p>
                    <p className="text-sm font-body text-ink">{earningsPct}%</p>
                  </div>
                </div>
                <p className="text-xs text-ink-muted font-body mt-3" style={{ fontSize: '10px' }}>
                  {garment.earningsSource === 'cooperative_verified' ? 'Cooperative verified' : 'Artisan reported'}
                </p>
              </div>

              {/* QR */}
              <div className="card-naqsh p-5">
                <p
                  className="text-xs font-body font-semibold text-ink-muted tracking-widest uppercase mb-3"
                  style={{ fontSize: '10px', letterSpacing: '0.14em' }}
                >
                  QR / Seal
                </p>
                <div className="bg-ivory-deep border border-blush rounded-lg p-4 text-center">
                  <div className="w-16 h-16 bg-ink rounded mx-auto mb-2 flex items-center justify-center">
                    <p className="font-mono text-white text-xs">QR</p>
                  </div>
                  <p className="font-mono text-xs text-ink-muted">{garment.id}</p>
                  <p className="text-xs text-ink-muted font-body mt-1">
                    Scans: {garment.scanCount}
                  </p>
                </div>
                <p className="font-mono text-xs text-ink-muted mt-3">Seal: {garment.sealId}</p>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
