import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ARTISANS } from '@/lib/data/seedData';
import { MapPin, Clock, Award, Sparkles } from 'lucide-react';

export default function ArtisansPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <Navbar />

      <main className="pt-24 pb-20 px-4">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blush/60 border border-burgundy/15 mb-4 shadow-sm">
              <span className="font-urdu text-base text-burgundy font-medium">دستکار و کاریگر</span>
              <span className="text-xs font-body text-ink-muted uppercase tracking-widest">• Master Makers</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl text-ink mb-3">
              Meet the Artisans <span className="font-urdu text-3xl text-rose font-normal ml-1">دستکار</span>
            </h1>
            <p className="font-urdu text-base text-burgundy/80 mb-2">
              ہر دھاگے کی پشت پر ایک فنکار کا نام اور صدیوں پرانی روایت
            </p>
            <p className="font-body text-sm text-ink-muted max-w-lg mx-auto">
              The hands behind the craft. Every NAQSH-registered artisan has consented to share their story, lineage, and transparent earnings.
            </p>
          </div>

          {/* Artisan grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {ARTISANS.map((artisan) => (
              <Link
                key={artisan.id}
                href={`/artisan/${artisan.id}`}
                className="card-naqsh overflow-hidden group block hover:shadow-lg transition-all duration-300 border border-burgundy/10 rounded-2xl bg-white/70"
                aria-label={`${artisan.name} — artisan profile`}
              >
                {/* Photo */}
                <div className="relative aspect-[3/4] bg-blush overflow-hidden">
                  <Image
                    src={artisan.photo}
                    alt={`${artisan.name} — chikankari artisan, ${artisan.location}`}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent" />

                  {/* Name overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex items-center justify-between mb-0.5">
                      <p className="font-serif text-xl text-white font-medium">{artisan.name}</p>
                      <span className="font-urdu text-xs text-white/80 bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full">دستکار</span>
                    </div>
                    <div className="flex items-center gap-1 text-white/80">
                      <MapPin size={11} aria-hidden="true" />
                      <p className="text-xs font-body">{artisan.location}</p>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5">
                  <div className="flex items-center gap-1.5 text-xs text-ink-muted font-body mb-3">
                    <Clock size={12} className="text-gold" aria-hidden="true" />
                    <span>{artisan.yearsOfExperience} years of master craft</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {artisan.craftSpecialties.map((c) => (
                      <span
                        key={c}
                        className="text-xs font-body px-2.5 py-0.5 rounded-full bg-blush/60 text-ink-soft border border-burgundy/10"
                      >
                        {c}
                      </span>
                    ))}
                  </div>

                  <p className="text-xs font-body text-ink-muted leading-relaxed line-clamp-2">
                    {artisan.shortBio}
                  </p>

                  <div className="mt-4 pt-3 border-t border-blush/40 flex items-center justify-between">
                    <span className="text-xs font-body text-wine font-semibold group-hover:translate-x-0.5 transition-transform">
                      View profile & craft story →
                    </span>
                    {artisan.voiceConsent && (
                      <span className="text-xs font-body text-rose flex items-center gap-1 bg-rose/10 px-2 py-0.5 rounded-full">
                        🎙 Voice Story
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Cooperative context */}
          <div className="card-naqsh p-8 text-center rounded-2xl bg-white/60 border border-burgundy/15 shadow-sm">
            <div className="inline-flex items-center gap-2 mb-3">
              <Award size={16} className="text-gold" />
              <p
                className="text-xs font-body font-medium tracking-widest uppercase text-rose"
                style={{ fontSize: '10px', letterSpacing: '0.18em' }}
              >
                Registered & Certified Through
              </p>
            </div>
            <h2 className="font-serif text-2xl text-ink mb-2">
              Chowk & Aminabad Artisan Cooperatives <span className="font-urdu text-xl text-rose ml-1">انجمن دستکاران</span>
            </h2>
            <p className="text-sm font-body text-ink-muted max-w-lg mx-auto leading-relaxed">
              Artisan registration is cooperative-assisted. Cooperatives verify identities,
              guarantee transparent fair-wage payouts, and curate stories for the NAQSH registry.
            </p>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}