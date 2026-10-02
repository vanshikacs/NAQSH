'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';

const VAKH_FORM_URL =
  process.env.NEXT_PUBLIC_VAKH_FIELD_NOTE_FORM_URL ||
  'https://vakh.com/form/8msr';

const FIELD_NOTES = [
  {
    id: 'fn-001',
    author: 'Priya Mehta',
    role: 'Textile researcher, Delhi',
    date: 'Sep 28, 2026',
    location: 'Chowk Bazaar, Lucknow',
    craft: 'Chikankari',
    note: 'Watched Amina ji complete a full jali motif in under an hour — the thread tension on the reverse side is unmistakeable once you know what to look for. NAQSH scan confirmed: genuine.',
    verdict: 'genuine',
    image: '/images/chikankari-sage-flatlay.jpg',
  },
  {
    id: 'fn-002',
    author: 'Kabir Siddiqui',
    role: 'Buyer, Mumbai',
    date: 'Oct 1, 2026',
    location: 'Online marketplace',
    craft: 'Chikankari (claimed)',
    note: 'Purchased a kurta advertised as handmade chikankari from an online seller. The NAQSH scan flagged inconsistency — flat uniform stitches on reverse, no artisan record. Returned it.',
    verdict: 'flagged',
    image: '/images/chikankari-blush-pink.jpg',
  },
  {
    id: 'fn-003',
    author: 'Fatima Zahra',
    role: 'Cooperative reviewer, Lucknow',
    date: 'Sep 30, 2026',
    location: 'Nakkhas, Lucknow',
    craft: 'Chikankari',
    note: 'Three new artisans submitted their first pieces through NAQSH this week. All three records are now live on the board — buyers can trace each piece back to its maker.',
    verdict: 'registered',
    image: '/images/chikankari-green.jpg',
  },
  {
    id: 'fn-004',
    author: 'Ananya Krishnan',
    role: 'Fashion journalist',
    date: 'Sep 25, 2026',
    location: 'Hazratganj, Lucknow',
    craft: 'Chikankari',
    note: 'Covering a heritage craft fair — every verified stall had NAQSH QR codes. Scanned six pieces, all verified. One seller could not produce a NAQSH ID at all, which told its own story.',
    verdict: 'genuine',
    image: '/images/chikankari-peach-suit.jpg',
  },
];

const VERDICT_STYLES: Record<string, { label: string; color: string; bg: string }> = {
  genuine: { label: '✓ Verified genuine', color: '#3F7A5A', bg: '#DCE8D2' },
  flagged: { label: '⚠ Flagged inconsistent', color: '#8E3B55', bg: '#F3D9D2' },
  registered: { label: '+ Newly registered', color: '#4C5B47', bg: '#DCE8D2' },
};

export default function CommunityPage() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'genuine' | 'flagged' | 'registered'>('all');

  const filtered =
    activeFilter === 'all'
      ? FIELD_NOTES
      : FIELD_NOTES.filter((n) => n.verdict === activeFilter);

  return (
    <div className="min-h-screen bg-ivory text-ink">
      <Navbar />

      <main className="pt-28 pb-20">
        <div className="wrap">
          <div className="max-w-2xl mb-14">
            <span className="inline-block text-xs uppercase tracking-widest font-semibold text-olive border border-olive px-3 py-1 rounded-full mb-5">
              Community · Powered by Vakh
            </span>
            <h1 className="font-serif text-5xl sm:text-6xl font-normal leading-tight mb-5">
              Field notes from the <em className="text-wine italic">people in the field.</em>
            </h1>
            <p className="text-ink-muted text-base leading-relaxed mb-6">
              Buyers, researchers, journalists and cooperative reviewers submit their observations through Vakh.
              Each note is structured, timestamped and linked to the garment record it describes.
            </p>

            <a
              href={VAKH_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-burgundy text-white font-semibold text-sm rounded-full hover:bg-wine transition-all shadow-md"
            >
              Open Form on Vakh ↗
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-sage/60 rounded-2xl p-8 mb-14">
            <div>
              <p className="font-serif text-4xl text-wine opacity-50 mb-2">01</p>
              <h3 className="font-serif text-xl italic font-semibold mb-2">Submit via Vakh</h3>
              <p className="text-xs text-olive leading-relaxed">
                Anyone can submit observations or artisan updates through the official Vakh form.
              </p>
            </div>
            <div>
              <p className="font-serif text-4xl text-wine opacity-50 mb-2">02</p>
              <h3 className="font-serif text-xl italic font-semibold mb-2">Vakh Structures It</h3>
              <p className="text-xs text-olive leading-relaxed">
                Vakh formats the post with author credentials, craft tags, and tamper-evident history.
              </p>
            </div>
            <div>
              <p className="font-serif text-4xl text-wine opacity-50 mb-2">03</p>
              <h3 className="font-serif text-xl italic font-semibold mb-2">NAQSH Displays It</h3>
              <p className="text-xs text-olive leading-relaxed">
                Live field evidence connects directly into provenance timelines for buyers and judges.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap gap-2">
              {(['all', 'genuine', 'flagged', 'registered'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    activeFilter === f
                      ? 'bg-burgundy text-white'
                      : 'border border-wine/30 text-wine hover:bg-wine/10'
                  }`}
                >
                  {f === 'all' ? 'All notes' : f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>

            <a
              href={VAKH_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-wine hover:text-burgundy flex items-center gap-1"
            >
              + Submit a note directly on Vakh ↗
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-16">
            {filtered.map((note) => {
              const vs = VERDICT_STYLES[note.verdict];
              return (
                <article
                  key={note.id}
                  className="bg-ivory border border-wine/15 rounded-2xl overflow-hidden shadow-sm flex flex-col hover:-translate-y-1 transition-transform"
                >
                  <div className="relative h-48 w-full bg-blush">
                    <Image src={note.image} alt={note.craft} fill className="object-cover" />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: vs.bg, color: vs.color }}>
                      {vs.label}
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-baseline mb-2">
                        <h4 className="font-semibold text-ink text-sm">{note.author}</h4>
                        <span className="text-xs text-ink-muted">{note.date}</span>
                      </div>
                      <p className="text-xs text-olive mb-3">{note.role} · {note.location}</p>
                      <p className="text-sm text-ink leading-relaxed">&ldquo;{note.note}&rdquo;</p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-blush/60 flex justify-between items-center text-xs">
                      <span className="text-ink-muted font-medium">{note.craft}</span>
                      <a
                        href={VAKH_FORM_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-wine hover:underline font-semibold"
                      >
                        View on Vakh ↗
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
