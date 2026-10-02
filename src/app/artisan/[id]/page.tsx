import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VerificationBadge from '@/components/VerificationBadge';
import VoicePlayer from '@/components/VoicePlayer';
import {
  ARTISANS,
  GARMENTS,
  getArtisanById,
  getGarmentsByArtisan,
  formatCurrency,
  getEarningsPercentage,
} from '@/lib/data/seedData';
import { formatDate } from '@/lib/utils';
import { ArrowLeft, MapPin, Clock, ChevronRight, VolumeX } from 'lucide-react';

export async function generateStaticParams() {
  return ARTISANS.map((a) => ({ id: a.id }));
}

export default async function ArtisanPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const artisan = getArtisanById(id);

  if (!artisan) {
    return (
      <div className="min-h-screen bg-ivory">
        <Navbar />
        <main className="pt-24 pb-20 px-4 max-w-2xl mx-auto text-center">
          <h1 className="font-serif text-3xl text-ink mb-3">Artisan not found</h1>
          <Link href="/artisan" className="text-sm font-body text-wine">← Back to artisans</Link>
        </main>
        <Footer />
      </div>
    );
  }

  const garments = getGarmentsByArtisan(artisan.id);
  const totalEarnings = garments.reduce((sum, g) => sum + g.artisanEarnings, 0);

  return (
    <div className="min-h-screen bg-ivory">
      <Navbar />

      <main className="pt-16 pb-20 px-4">
        <div className="max-w-3xl mx-auto">

          {/* Back */}
          <div className="pt-6 pb-4">
            <Link
              href="/artisan"
              className="inline-flex items-center gap-1.5 text-xs font-body text-ink-muted hover:text-wine transition-colors"
            >
              <ArrowLeft size={12} /> All Artisans
            </Link>
          </div>

          {/* Hero */}
          <div className="relative h-64 sm:h-80 rounded-xl overflow-hidden mb-8 bg-stone-900 border border-burgundy/15 shadow-sm">
            <Image
              src={artisan.photo}
              alt={`${artisan.name} — chikankari artisan, ${artisan.location}`}
              fill
              unoptimized
              className="object-cover object-top"
              priority
              sizes="(max-width: 768px) 100vw, 768px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
              <p className="font-serif text-4xl text-white mb-1 drop-shadow-sm font-medium">{artisan.name}</p>
              <div className="flex items-center gap-4 text-white/90">
                <span className="flex items-center gap-1.5 text-sm font-body drop-shadow-xs">
                  <MapPin size={13} className="text-gold" aria-hidden="true" /> {artisan.location}
                </span>
                <span className="flex items-center gap-1.5 text-sm font-body drop-shadow-xs">
                  <Clock size={13} className="text-gold" aria-hidden="true" /> {artisan.yearsOfExperience} years of craft
                </span>
              </div>
            </div>
          </div>

          {/* Craft specialties */}
          <div className="card-naqsh p-5 mb-6">
            <p
              className="text-xs font-body font-semibold text-ink-muted tracking-widest uppercase mb-3"
              style={{ fontSize: '10px', letterSpacing: '0.14em' }}
            >
              Her Craft
            </p>
            <div className="flex flex-wrap gap-2">
              {artisan.craftSpecialties.map((c) => (
                <span
                  key={c}
                  className="text-sm font-body px-4 py-1.5 rounded-full border border-rose/40 text-wine bg-rose/5"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Story */}
          <div className="card-naqsh p-6 mb-6">
            <p
              className="text-xs font-body font-semibold text-ink-muted tracking-widest uppercase mb-4"
              style={{ fontSize: '10px', letterSpacing: '0.14em' }}
            >
              Her Story
            </p>
            <blockquote className="pl-4 border-l-2 border-rose">
              <p className="font-serif text-lg text-ink-soft italic leading-relaxed">
                "{artisan.story}"
              </p>
            </blockquote>
          </div>

          {/* Voice Story */}
          <div className="card-naqsh p-5 mb-6">
            <p
              className="text-xs font-body font-semibold text-ink-muted tracking-widest uppercase mb-3"
              style={{ fontSize: '10px', letterSpacing: '0.14em' }}
            >
              Voice Story
            </p>

            {artisan.voiceConsent ? (
              <div>
                <p className="text-sm font-body text-ink-muted mb-4 leading-relaxed">
                  Listen to {artisan.name.split(' ')[0]} tell her story.
                </p>
                <VoicePlayer text={artisan.story} artisanName={artisan.name} />
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs text-ink-muted font-body">
                <VolumeX size={14} aria-hidden="true" />
                <span>
                  Voice story not available — {artisan.name.split(' ')[0]} has not consented to share a voice recording.
                </span>
              </div>
            )}
          </div>

          {/* Registered Garments */}
          {garments.length > 0 && (
            <div className="card-naqsh p-5 mb-6">
              <p
                className="text-xs font-body font-semibold text-ink-muted tracking-widest uppercase mb-4"
                style={{ fontSize: '10px', letterSpacing: '0.14em' }}
              >
                Registered Pieces ({garments.length})
              </p>

              <div className="space-y-3">
                {garments.map((garment) => (
                  <div
                    key={garment.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-ivory-deep border border-blush"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative w-12 h-12 rounded overflow-hidden bg-blush flex-shrink-0">
                        <Image
                          src={garment.frontImage}
                          alt={garment.garmentType}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-body font-medium text-ink mb-0.5">
                          {garment.garmentType} — {garment.craft}
                        </p>
                        <p className="text-xs text-ink-muted font-body">
                          {formatCurrency(garment.artisanEarnings)} · {garment.workDays} days
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <VerificationBadge verdict={garment.verificationStatus} size="sm" />
                      <Link
                        href={`/verify/${garment.id}`}
                        className="text-xs font-body text-wine hover:text-burgundy font-medium"
                        aria-label={`View certificate for ${garment.garmentType}`}
                      >
                        <ChevronRight size={14} aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Earnings Summary */}
          <div className="card-naqsh p-5 mb-6">
            <p
              className="text-xs font-body font-semibold text-ink-muted tracking-widest uppercase mb-4"
              style={{ fontSize: '10px', letterSpacing: '0.14em' }}
            >
              Earnings Summary
            </p>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-ink-muted font-body mb-1">Pieces registered</p>
                <p className="font-serif text-2xl text-ink">{garments.length}</p>
              </div>
              <div>
                <p className="text-xs text-ink-muted font-body mb-1">Total recorded</p>
                <p className="font-serif text-2xl text-wine">{formatCurrency(totalEarnings)}</p>
              </div>
              <div>
                <p className="text-xs text-ink-muted font-body mb-1">Craft</p>
                <p className="font-serif text-sm text-ink leading-tight">
                  {artisan.craftSpecialties.slice(0, 2).join(', ')}
                </p>
              </div>
            </div>
            <p className="text-xs text-ink-muted font-body mt-4 leading-relaxed" style={{ fontSize: '11px' }}>
              NAQSH records amounts reported as received. It does not independently verify whether amounts are fair.
            </p>
          </div>

          {/* Cooperative */}
          <div className="card-naqsh p-5">
            <p
              className="text-xs font-body font-semibold text-ink-muted tracking-widest uppercase mb-2"
              style={{ fontSize: '10px', letterSpacing: '0.14em' }}
            >
              Registered through
            </p>
            <p className="text-sm font-body text-ink">
              {artisan.cooperativeId === 'COOP-LKO-01'
                ? 'Chowk Chikankari Cooperative'
                : 'Aminabad Artisan Collective'}
            </p>
            <p className="text-xs text-ink-muted font-body mt-1">
              Registered: {formatDate(artisan.registeredAt)}
            </p>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
