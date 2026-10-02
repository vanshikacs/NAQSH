'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, MessageSquare, ShieldCheck, PenTool } from 'lucide-react';

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
    craft: 'Chikankari (Jali Motif)',
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
    craft: 'Chikankari (Shadow Work)',
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
    craft: 'Chikankari (Murri Stitch)',
    note: 'Covering a heritage craft fair — every verified stall had NAQSH QR codes. Scanned six pieces, all verified. One seller could not produce a NAQSH ID at all, which told its own story.',
    verdict: 'genuine',
    image: '/images/chikankari-peach-suit.jpg',
  },
];

const VERDICT_STYLES: Record<string, { label: string; color: string; bg: string }> = {
  genuine: { label: '✓ Verified Genuine', color: '#2E6649', bg: '#E2F0E5' },
  flagged: { label: '⚠ Flagged Inconsistent', color: '#8E3F4A', bg: '#FDEEEF' },
  registered: { label: '+ Newly Registered', color: '#4C5B47', bg: '#EBF0E6' },
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

      <main className="pt-24 pb-20">
        <div className="wrap">
          <div className="max-w-3xl mb-12">
            <span className="inline-block text-xs uppercase tracking-widest font-semibold text-olive border border-olive/30 px-3 py-1 rounded-full mb-4 bg-white/50">
              Community · Powered by Vakh
            </span>
            
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight mb-3">
              Field notes from the <em className="text-wine italic">people in the field.</em>
            </h1>
            <p className="text-ink-muted text-base leading-relaxed mb-6">
              Buyers, researchers, journalists and cooperative reviewers submit direct observations through the Vakh protocol.
              Each observation is structured, timestamped and linked to artisan provenance.
            </p>

            <a
              href={VAKH_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-burgundy text-white font-medium text-sm rounded-full hover:bg-wine transition-all shadow-md group"
            >
              <PenTool size={15} />
              Submit Field Note on Vakh
              <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-sage/40 border border-sage/60 rounded-2xl p-7 mb-12 shadow-sm">
            <div>
              <p className="font-serif text-3xl text-wine/60 mb-1">01</p>
              <h3 className="font-serif text-lg font-semibold text-ink mb-1">Submit via Vakh</h3>
              <p className="text-xs text-olive leading-relaxed">
                Anyone can submit field observations, stitch notes, or artisan updates through the official Vakh form (8msr).
              </p>
            </div>
            <div>
              <p className="font-serif text-3xl text-wine/60 mb-1">02</p>
              <h3 className="font-serif text-lg font-semibold text-ink mb-1">Structured Ledger</h3>
              <p className="text-xs text-olive leading-relaxed">
                Vakh verifies the post with author credentials, craft tags, and tamper-evident history.
              </p>
            </div>
            <div>
              <p className="font-serif text-3xl text-wine/60 mb-1">03</p>
              <h3 className="font-serif text-lg font-semibold text-ink mb-1">Live Provenance</h3>
              <p className="text-xs text-olive leading-relaxed">
                Field evidence connects directly into provenance timelines for buyers, cooperatives, and curators.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap gap-2">
              {(['all', 'genuine', 'flagged', 'registered'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                    activeFilter === f
                      ? 'bg-burgundy text-white shadow-sm'
                      : 'border border-wine/25 text-wine hover:bg-wine/10 bg-white/50'
                  }`}
                >
                  {f === 'all' ? 'All Notes' : f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>

            <a
              href={VAKH_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-wine hover:text-burgundy flex items-center gap-1.5 group"
            >
              <span>+ Open Vakh Form directly</span>
              <ExternalLink size={12} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {filtered.map((note) => {
              const vs = VERDICT_STYLES[note.verdict];
              return (
                <article
                  key={note.id}
                  className="bg-white/80 border border-burgundy/15 rounded-2xl overflow-hidden shadow-sm flex flex-col hover:-translate-y-1 hover:shadow-md transition-all duration-300"
                >
                  <div className="relative h-48 w-full bg-blush">
                    <Image src={note.image} alt={note.craft} fill className="object-cover" />
                    <div
                      className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold shadow-sm"
                      style={{ backgroundColor: vs.bg, color: vs.color }}
                    >
                      {vs.label}
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-baseline mb-2">
                        <h4 className="font-serif font-semibold text-ink text-base">{note.author}</h4>
                        <span className="text-xs text-ink-muted">{note.date}</span>
                      </div>
                      <p className="text-xs text-olive font-medium mb-3">{note.role} · {note.location}</p>
                      <p className="text-sm text-ink leading-relaxed">&ldquo;{note.note}&rdquo;</p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-blush/60 flex justify-between items-center text-xs">
                      <span className="text-ink-muted font-medium bg-blush/40 px-2.5 py-0.5 rounded-full">{note.craft}</span>
                      <a
                        href={VAKH_FORM_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-wine hover:text-burgundy font-semibold flex items-center gap-1"
                      >
                        Verify on Vakh ↗
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