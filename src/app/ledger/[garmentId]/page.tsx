import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { GARMENTS, getGarmentById, getArtisanById } from '@/lib/data/seedData';
import { truncateHash, formatDateTime } from '@/lib/utils';
import { ArrowLeft, ExternalLink, Shield, Info } from 'lucide-react';

export async function generateStaticParams() {
  return GARMENTS.map((g) => ({ garmentId: g.id }));
}

export default async function LedgerPage({
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
          <h1 className="font-serif text-3xl text-ink mb-3">Record not found</h1>
          <Link href="/" className="text-sm font-body text-wine">← Return to NAQSH</Link>
        </main>
        <Footer />
      </div>
    );
  }

  const artisan = getArtisanById(garment.artisanId);
  const lr = garment.ledgerRecord;
  const isDemo = lr.status === 'demo';

  return (
    <div className="min-h-screen bg-ivory">
      <Navbar />

      <main className="pt-16 pb-20 px-4">
        <div className="max-w-2xl mx-auto">

          {/* Back */}
          <div className="pt-6 pb-4">
            <Link
              href={`/verify/${garment.id}`}
              className="inline-flex items-center gap-1.5 text-xs font-body text-ink-muted hover:text-wine transition-colors"
            >
              <ArrowLeft size={12} /> Back to certificate
            </Link>
          </div>

          {/* Header */}
          <div className="text-center py-6 border-b border-blush mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Shield size={16} className="text-wine" aria-hidden="true" />
              <p
                className="text-xs font-body font-medium tracking-widest uppercase text-ink-muted"
                style={{ fontSize: '10px', letterSpacing: '0.16em' }}
              >
                NAQSH RECORD
              </p>
            </div>
            <p className="font-serif text-3xl text-burgundy">Tamper-Evident Ledger</p>
          </div>

          {/* Demo mode banner */}
          {isDemo && (
            <div className="mb-6 p-4 rounded-lg bg-amber-50 border border-amber-200">
              <div className="flex items-start gap-2">
                <Info size={14} className="text-amber-600 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <p className="text-xs font-body text-amber-700 leading-relaxed">
                  <strong>Demo mode:</strong> This record is simulated for the prototype.
                  In production, this record would be confirmed on Polygon Amoy testnet
                  with a real transaction hash.
                </p>
              </div>
            </div>
          )}

          {/* Main record */}
          <div className="card-naqsh p-6 mb-6">
            <div className="space-y-5">

              <RecordRow label="Garment ID">
                <p className="font-mono text-sm text-ink font-medium">{garment.id}</p>
              </RecordRow>

              <RecordRow label="Garment type">
                <p className="text-sm font-body text-ink">{garment.garmentType} · {garment.craft}</p>
              </RecordRow>

              <RecordRow label="Artisan ID">
                <div>
                  <p className="font-mono text-sm text-ink font-medium">{garment.artisanId}</p>
                  {artisan && (
                    <p className="text-xs text-ink-muted font-body mt-0.5">{artisan.name}</p>
                  )}
                </div>
              </RecordRow>

              <div className="border-t border-blush pt-5">
                <RecordRow label="Verification hash">
                  <div>
                    <p className="font-mono text-xs text-ink break-all leading-relaxed">
                      {lr.recordHash}
                    </p>
                  </div>
                </RecordRow>
              </div>

              {lr.txHash && (
                <RecordRow label="Transaction hash">
                  <div className="flex items-center gap-2">
                    <p className="font-mono text-xs text-ink">{truncateHash(lr.txHash)}</p>
                    {!isDemo && (
                      <ExternalLink size={11} className="text-ink-muted" aria-hidden="true" />
                    )}
                  </div>
                </RecordRow>
              )}

              <RecordRow label="Network">
                <p className="text-sm font-body text-ink">{lr.network}</p>
              </RecordRow>

              {lr.blockNumber && (
                <RecordRow label="Block">
                  <p className="font-mono text-sm text-ink">#{lr.blockNumber.toLocaleString()}</p>
                </RecordRow>
              )}

              <RecordRow label="Registered">
                <p className="text-sm font-body text-ink">{formatDateTime(lr.timestamp)}</p>
              </RecordRow>

              <RecordRow label="Record status">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: isDemo ? '#8a6b00' : '#2d6a2d' }}
                    aria-hidden="true"
                  />
                  <p className="text-sm font-body font-medium text-ink">
                    {isDemo ? 'Demo Mode' : 'TAMPER-EVIDENT'}
                  </p>
                </div>
              </RecordRow>

            </div>
          </div>

          {/* Why a ledger */}
          <div className="card-naqsh p-6 mb-6" id="why-ledger">
            <p
              className="text-xs font-body font-semibold text-ink-muted tracking-widest uppercase mb-4"
              style={{ fontSize: '10px', letterSpacing: '0.14em' }}
            >
              Why a Ledger?
            </p>
            <p className="text-sm font-body text-ink-muted leading-relaxed mb-4">
              Most of NAQSH works perfectly well without blockchain.
            </p>
            <p className="text-sm font-body text-ink-muted leading-relaxed mb-6">
              We use a tamper-evident ledger only for the record that matters:{' '}
              <strong>who registered the garment, what was assessed, and when.</strong>
            </p>

            <div className="space-y-3">
              {[
                { label: 'AI', desc: 'Assesses the physical craftsmanship' },
                { label: 'Seal', desc: 'Binds the garment to its digital identity' },
                { label: 'Ledger', desc: 'Protects the registration record from modification' },
              ].map(({ label, desc }) => (
                <div key={label} className="flex items-start gap-3">
                  <span className="text-xs font-body font-semibold text-rose w-12 flex-shrink-0 mt-0.5">
                    {label}
                  </span>
                  <p className="text-xs font-body text-ink-muted leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-blush">
              <p className="text-xs text-ink-muted font-body leading-relaxed italic" style={{ fontSize: '11px' }}>
                "NAQSH uses a ledger to make the registered record tamper-evident.
                It does not determine whether the embroidery is handmade."
              </p>
            </div>
          </div>

          {/* Back to certificate */}
          <div className="text-center">
            <Link
              href={`/verify/${garment.id}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-burgundy text-white font-body text-sm rounded hover:bg-wine transition-colors font-medium"
            >
              <ArrowLeft size={14} aria-hidden="true" />
              Back to verification certificate
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

function RecordRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[140px_1fr] gap-4 items-start">
      <p className="text-xs font-body text-ink-muted flex-shrink-0 pt-0.5">{label}</p>
      <div>{children}</div>
    </div>
  );
}
