import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VerificationBadge, { VerificationStatusCard } from '@/components/VerificationBadge';
import PhysicalSeal from '@/components/PhysicalSeal';
import {
  GARMENTS,
  getGarmentById,
  getArtisanById,
  formatCurrency,
  getEarningsPercentage,
} from '@/lib/data/seedData';
import { formatDate, formatDateTime, truncateHash, confidenceToLabel } from '@/lib/utils';
import {
  ArrowLeft,
  Shield,
  Clock,
  User,
  ExternalLink,
  Info,
  AlertTriangle,
  ChevronRight,
  CheckCircle,
} from 'lucide-react';

export async function generateStaticParams() {
  return GARMENTS.map((g) => ({ garmentId: g.id }));
}

export default async function VerifyPage({
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
        <main className="pt-24 pb-20 px-4 max-w-2xl mx-auto text-center">
          <p className="text-5xl mb-4" aria-hidden="true">⚠</p>
          <h1 className="font-serif text-3xl text-ink mb-3">Garment not found</h1>
          <p className="font-body text-ink-muted mb-6">
            We couldn't find a garment with ID{' '}
            <code className="font-mono text-sm bg-blush px-2 py-0.5 rounded">{garmentId}</code>.
          </p>
          <p className="text-sm text-ink-muted mb-8">
            Check that the QR code is undamaged and try again, or contact the cooperative.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-burgundy text-white font-body text-sm rounded hover:bg-wine transition-colors"
          >
            <ArrowLeft size={14} /> Return to NAQSH
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const artisan = getArtisanById(garment.artisanId);
  const isDuplicate = garment.activationStatus === 'duplicate_flag';
  const vr = garment.verificationResult;
  const earningsPct = getEarningsPercentage(garment);

  return (
    <div className="min-h-screen bg-ivory">
      <Navbar />

      <main className="pt-16 pb-20 px-4">
        <div className="max-w-2xl mx-auto">

          {/* ─── Back ─── */}
          <div className="pt-6 pb-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-body text-ink-muted hover:text-wine transition-colors"
            >
              <ArrowLeft size={12} /> NAQSH
            </Link>
            <span className="text-xs text-ink-muted mx-2">/</span>
            <span className="text-xs font-body text-ink-muted">Verify</span>
          </div>

          {/* ─── Brand header ─── */}
          <div className="text-center py-6 border-b border-blush mb-6">
            <p className="font-serif text-3xl text-burgundy font-semibold mb-0.5">NAQSH</p>
            <p
              className="text-xs font-body text-ink-muted tracking-widest uppercase"
              style={{ fontSize: '10px', letterSpacing: '0.16em' }}
            >
              Craft Verification
            </p>
          </div>

          {/* ─── Duplicate warning ─── */}
          {isDuplicate && (
            <div className="mb-6 rounded-lg p-5 border border-amber-300 bg-amber-50">
              <div className="flex items-start gap-3">
                <AlertTriangle size={20} className="text-amber-600 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <div>
                  <p className="font-body font-semibold text-amber-800 text-sm mb-1">
                    Possible Duplicate Detected
                  </p>
                  <p className="font-body text-amber-700 text-sm leading-relaxed">
                    This digital identity has already been activated in another scan context.
                    Check the physical NAQSH seal and compare the garment carefully.
                  </p>
                  <Link
                    href="/demo/fraud"
                    className="inline-flex items-center gap-1 text-xs text-amber-700 font-medium mt-2 underline"
                  >
                    Learn about QR cloning <ExternalLink size={10} />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* ─── Status Card ─── */}
          <div className="mb-6">
            <VerificationStatusCard
              verdict={isDuplicate ? 'duplicate' : garment.verificationStatus}
              confidence={vr.confidence}
              mode={vr.mode}
            />
          </div>

          {/* ─── Garment ID ─── */}
          <div className="card-naqsh p-5 mb-6">
            <div className="flex items-center justify-between mb-3">
              <p
                className="text-xs font-body font-semibold text-ink-muted tracking-widest uppercase"
                style={{ fontSize: '10px', letterSpacing: '0.14em' }}
              >
                Garment Record
              </p>
              <span className="text-xs font-body text-ink-muted">
                {formatDate(garment.createdAt)}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-ink-muted font-body mb-0.5">Garment ID</p>
                <p className="font-mono text-sm text-ink font-medium">{garment.id}</p>
              </div>
              <div>
                <p className="text-xs text-ink-muted font-body mb-0.5">Type</p>
                <p className="text-sm text-ink font-body">{garment.garmentType}</p>
              </div>
              <div>
                <p className="text-xs text-ink-muted font-body mb-0.5">Craft</p>
                <p className="text-sm text-ink font-body">{garment.craft}</p>
              </div>
              <div>
                <p className="text-xs text-ink-muted font-body mb-0.5">Work duration</p>
                <p className="text-sm text-ink font-body">{garment.workDays} days</p>
              </div>
            </div>
          </div>

          {/* ─── Fabric Images ─── */}
          <div className="mb-6">
            <p
              className="text-xs font-body font-semibold text-ink-muted tracking-widest uppercase mb-3"
              style={{ fontSize: '10px', letterSpacing: '0.14em' }}
            >
              Registered Fabric
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative aspect-square rounded-lg overflow-hidden bg-blush">
                <Image
                  src={garment.frontImage}
                  alt={`Front view of ${garment.garmentType} — registered chikankari fabric`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 45vw, 200px"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-ink/60 text-white text-center py-1">
                  <p className="text-xs font-body">Front</p>
                </div>
              </div>
              <div className="relative aspect-square rounded-lg overflow-hidden bg-blush">
                <Image
                  src={garment.reverseImage}
                  alt={`Reverse side of ${garment.garmentType} — shows stitch structure used for AI analysis`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 45vw, 200px"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-ink/60 text-white text-center py-1">
                  <p className="text-xs font-body">Reverse ✦ AI analyzed</p>
                </div>
              </div>
            </div>
            <p className="text-xs text-ink-muted font-body mt-2 text-center">
              NAQSH Vision analyzed the reverse-side stitch structure
            </p>
          </div>

          {/* ─── AI Analysis ─── */}
          <div className="card-naqsh p-5 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p
                  className="text-xs font-body font-semibold text-ink-muted tracking-widest uppercase mb-0.5"
                  style={{ fontSize: '10px', letterSpacing: '0.14em' }}
                >
                  NAQSH Vision
                </p>
                <p className="text-sm font-body text-ink-soft">AI-assisted visual assessment</p>
              </div>
              <VerificationBadge verdict={garment.verificationStatus} size="sm" />
            </div>

            {/* Confidence bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-xs font-body text-ink-muted">Assessment confidence</p>
                <p className="text-xs font-body font-medium text-ink">
                  {confidenceToLabel(vr.confidence)}
                </p>
              </div>
              <div className="h-1.5 bg-blush rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${Math.round(vr.confidence * 100)}%`,
                    backgroundColor:
                      vr.verdict === 'consistent'
                        ? '#2d6a2d'
                        : vr.verdict === 'review'
                        ? '#8a6b00'
                        : '#8a2c2c',
                  }}
                  role="progressbar"
                  aria-valuenow={Math.round(vr.confidence * 100)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="AI assessment confidence"
                />
              </div>
            </div>

            {/* Reasoning */}
            <div className="space-y-2 mb-4">
              {vr.reasoning.map((reason, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle
                    size={13}
                    className="mt-0.5 flex-shrink-0"
                    style={{
                      color:
                        vr.verdict === 'consistent'
                          ? '#2d6a2d'
                          : vr.verdict === 'review'
                          ? '#8a6b00'
                          : '#8a2c2c',
                    }}
                    aria-hidden="true"
                  />
                  <p className="text-xs font-body text-ink-muted leading-relaxed">{reason}</p>
                </div>
              ))}
            </div>

            {/* Analysis details */}
            <div className="border-t border-blush pt-4 space-y-3">
              <p
                className="text-xs font-body font-semibold text-ink-muted tracking-widest uppercase"
                style={{ fontSize: '10px', letterSpacing: '0.14em' }}
              >
                Detailed Assessment
              </p>
              <AnalysisItem label="Stitch-length variation" value={vr.analysis.stitchVariation} />
              <AnalysisItem label="Thread tension pattern" value={vr.analysis.threadTexture} />
              <AnalysisItem label="Reverse-side texture" value={vr.analysis.reverseSidePattern} />
              <AnalysisItem label="Structural consistency" value={vr.analysis.regularity} />
            </div>

            {/* Disclaimer */}
            <div className="mt-4 flex items-start gap-2 bg-ivory rounded p-3">
              <Info size={12} className="text-ink-muted mt-0.5 flex-shrink-0" aria-hidden="true" />
              <p className="text-xs text-ink-muted font-body leading-relaxed" style={{ fontSize: '11px' }}>
                AI assessment indicates{' '}
                {vr.verdict === 'consistent'
                  ? 'high consistency with verified hand-embroidery reference samples'
                  : vr.verdict === 'review'
                  ? 'an inconclusive result — cooperative human review recommended'
                  : 'inconsistency with hand-embroidery reference samples — review recommended'}
                . This is not a guarantee of authenticity.
              </p>
            </div>
          </div>

          {/* ─── Stitches ─── */}
          <div className="card-naqsh p-5 mb-6">
            <p
              className="text-xs font-body font-semibold text-ink-muted tracking-widest uppercase mb-3"
              style={{ fontSize: '10px', letterSpacing: '0.14em' }}
            >
              Stitch Techniques
            </p>
            <div className="flex flex-wrap gap-2">
              {garment.stitches.map((stitch) => (
                <span
                  key={stitch}
                  className="text-xs font-body px-3 py-1 rounded-full border border-blush text-ink-soft bg-ivory"
                >
                  {stitch}
                </span>
              ))}
            </div>
          </div>

          {/* ─── Artisan ─── */}
          {artisan && (
            <div className="card-naqsh p-5 mb-6">
              <p
                className="text-xs font-body font-semibold text-ink-muted tracking-widest uppercase mb-4"
                style={{ fontSize: '10px', letterSpacing: '0.14em' }}
              >
                The Maker
              </p>
              <div className="flex items-start gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden bg-blush flex-shrink-0">
                  <Image
                    src={artisan.photo}
                    alt={`${artisan.name} — chikankari artisan`}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-serif text-xl text-ink mb-0.5">{artisan.name}</p>
                  <div className="flex items-center gap-1 text-xs text-ink-muted font-body mb-1">
                    <User size={11} aria-hidden="true" />
                    <span>{artisan.yearsOfExperience} years of craft · {artisan.location}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {artisan.craftSpecialties.map((c) => (
                      <span key={c} className="text-xs font-body px-2 py-0.5 rounded bg-blush text-ink-soft">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {artisan.story && (
                <blockquote className="mt-4 pl-4 border-l-2 border-rose">
                  <p className="font-serif text-sm italic text-ink-soft leading-relaxed">
                    "{artisan.story.slice(0, 200)}
                    {artisan.story.length > 200 ? '...' : ''}"
                  </p>
                </blockquote>
              )}

              <div className="mt-4">
                <Link
                  href={`/artisan/${artisan.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-body text-wine hover:text-burgundy transition-colors font-medium"
                >
                  Full artisan profile <ChevronRight size={12} aria-hidden="true" />
                </Link>
              </div>
            </div>
          )}

          {/* ─── Earnings Transparency ─── */}
          <div className="card-naqsh p-5 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <p
                className="text-xs font-body font-semibold text-ink-muted tracking-widest uppercase"
                style={{ fontSize: '10px', letterSpacing: '0.14em' }}
              >
                Earnings Transparency
              </p>
              <span
                className="text-xs font-body px-2 py-0.5 rounded border border-blush text-ink-muted"
                style={{ fontSize: '10px' }}
              >
                {garment.earningsSource === 'cooperative_verified'
                  ? 'Cooperative verified'
                  : 'Artisan reported'}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-ink-muted font-body mb-1">Garment price</p>
                <p className="font-serif text-xl text-ink">{formatCurrency(garment.price)}</p>
              </div>
              <div>
                <p className="text-xs text-ink-muted font-body mb-1">Artisan receives</p>
                <p className="font-serif text-xl text-wine">{formatCurrency(garment.artisanEarnings)}</p>
              </div>
              <div>
                <p className="text-xs text-ink-muted font-body mb-1">Share</p>
                <p className="font-serif text-xl text-ink">{earningsPct}%</p>
              </div>
            </div>

            <p className="text-xs text-ink-muted font-body mt-4 leading-relaxed" style={{ fontSize: '11px' }}>
              NAQSH records the amount reported as received by the artisan. It does not independently
              determine whether the amount is fair.
            </p>
          </div>

          {/* ─── Physical Seal ─── */}
          <div className="mb-6">
            <PhysicalSeal
              garmentId={garment.id}
              sealId={garment.sealId}
              garmentType={garment.garmentType}
              craft={garment.craft}
              isDuplicate={isDuplicate}
            />
          </div>

          {/* ─── Ledger Record ─── */}
          <div className="card-naqsh p-5 mb-6">
            <div className="flex items-center justify-between mb-4">
              <p
                className="text-xs font-body font-semibold text-ink-muted tracking-widest uppercase"
                style={{ fontSize: '10px', letterSpacing: '0.14em' }}
              >
                Ledger Record
              </p>
              <span
                className="text-xs font-body px-2 py-0.5 rounded border font-medium"
                style={{
                  fontSize: '10px',
                  color:
                    garment.ledgerRecord.status === 'demo'
                      ? '#8a6b00'
                      : garment.ledgerRecord.status === 'confirmed'
                      ? '#2d6a2d'
                      : '#8a4a00',
                  borderColor:
                    garment.ledgerRecord.status === 'demo' ? '#e8d488' : '#b8d8b8',
                  backgroundColor:
                    garment.ledgerRecord.status === 'demo' ? '#fef9ec' : '#f0f9f0',
                }}
              >
                {garment.ledgerRecord.status === 'demo' ? 'Demo mode' : garment.ledgerRecord.status}
              </span>
            </div>

            <div className="space-y-3">
              <LedgerRow label="Network" value={garment.ledgerRecord.network} />
              <LedgerRow
                label="Record hash"
                value={truncateHash(garment.ledgerRecord.recordHash)}
                mono
              />
              {garment.ledgerRecord.txHash && (
                <LedgerRow
                  label="Transaction"
                  value={truncateHash(garment.ledgerRecord.txHash)}
                  mono
                />
              )}
              {garment.ledgerRecord.blockNumber && (
                <LedgerRow
                  label="Block"
                  value={`#${garment.ledgerRecord.blockNumber.toLocaleString()}`}
                  mono
                />
              )}
              <LedgerRow
                label="Registered"
                value={formatDateTime(garment.ledgerRecord.timestamp)}
              />
            </div>

            <div className="mt-4 flex justify-between items-center">
              <Link
                href={`/ledger/${garment.id}`}
                className="inline-flex items-center gap-1.5 text-xs font-body text-wine hover:text-burgundy transition-colors font-medium"
              >
                Full ledger record <ChevronRight size={12} aria-hidden="true" />
              </Link>
              <div className="flex items-center gap-1 text-xs text-ink-muted font-body">
                <Clock size={10} aria-hidden="true" />
                <span>{garment.scanCount} scan{garment.scanCount !== 1 ? 's' : ''} recorded</span>
              </div>
            </div>
          </div>

          {/* ─── Bottom disclaimer ─── */}
          <div className="text-center py-6 border-t border-blush">
            <p className="font-serif text-2xl text-burgundy mb-2">NAQSH</p>
            <p className="text-xs text-ink-muted font-body leading-relaxed max-w-xs mx-auto" style={{ fontSize: '11px' }}>
              AI verifies the hand. We preserve the story.
              <br />
              Prototype platform — all data is for demonstration.
            </p>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

function AnalysisItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-blush/50 pb-3 last:border-0 last:pb-0">
      <p className="text-xs font-body font-medium text-ink-soft mb-1">{label}</p>
      <p className="text-xs font-body text-ink-muted leading-relaxed">{value}</p>
    </div>
  );
}

function LedgerRow({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex justify-between items-center gap-4">
      <p className="text-xs font-body text-ink-muted flex-shrink-0">{label}</p>
      <p className={`text-xs text-ink text-right ${mono ? 'font-mono' : 'font-body'}`}>{value}</p>
    </div>
  );
}
