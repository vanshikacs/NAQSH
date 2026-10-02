"use client";
import React, { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/db/store";
import { Search, CheckCircle2, AlertCircle, X } from "lucide-react";

const PRESETS = ["Lucknow Chikankari", "Banarasi Silk", "Jali technique", "Amina Begum", "Verified pieces", "Flagged counterfeit"];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(false);

  const artifacts = db.getArtifacts();
  const artisans = db.getArtisans();

  const results = useMemo(() => {
    if (!query.trim()) return { artifacts: [], artisans: [] };
    const q = query.toLowerCase();
    return {
      artifacts: artifacts.filter(a =>
        a.title.toLowerCase().includes(q) || a.craftType.toLowerCase().includes(q) ||
        a.technique.toLowerCase().includes(q) || a.artisanName.toLowerCase().includes(q) ||
        a.material.toLowerCase().includes(q) || a.motif.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q)
      ),
      artisans: artisans.filter(a =>
        a.name.toLowerCase().includes(q) || a.craftName.toLowerCase().includes(q) ||
        a.specialization.toLowerCase().includes(q) || a.mohalla.toLowerCase().includes(q)
      )
    };
  }, [query]);

  const total = results.artifacts.length + results.artisans.length;

  return (
    <div className="min-h-screen bg-ivory text-ink">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="mb-10 text-center">
            <span className="text-[11px] font-mono uppercase tracking-widest text-olive bg-sage/60 px-2.5 py-0.5 rounded-full font-bold inline-block mb-3">NAQSH Registry Search</span>
            <h1 className="font-serif text-4xl sm:text-5xl font-normal text-burgundy mb-2">Search Verified Heritage</h1>
            <p className="text-sm text-ink-muted">Search across artifacts, artisans, craft types, techniques, and regions.</p>
          </div>

          <div className="relative mb-6">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted" />
            <input
              autoFocus
              value={query}
              onChange={e => { setQuery(e.target.value); setActive(true); }}
              onFocus={() => setActive(true)}
              placeholder="e.g. Jali technique, Amina Begum, Banarasi silk..."
              className="w-full bg-white border border-wine/25 focus:border-wine rounded-2xl pl-11 pr-11 py-4 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-wine/20"
            />
            {query && (
              <button onClick={() => { setQuery(""); setActive(false); }} className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink">
                <X size={16} />
              </button>
            )}
          </div>

          {!query && (
            <div className="mb-8">
              <p className="text-[11px] font-mono uppercase tracking-wider text-ink-muted mb-3 font-semibold">Quick searches:</p>
              <div className="flex flex-wrap gap-2">
                {PRESETS.map(p => (
                  <button key={p} onClick={() => setQuery(p)} className="px-4 py-2 bg-white border border-wine/20 rounded-full text-xs font-medium hover:border-wine/50 hover:bg-blush/30 transition-all">{p}</button>
                ))}
              </div>
            </div>
          )}

          {query && (
            <div className="mb-3 text-xs text-ink-muted font-mono">
              <span className="font-bold text-wine">{total}</span> result{total !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
            </div>
          )}

          {results.artisans.length > 0 && (
            <div className="mb-8">
              <p className="text-[11px] font-mono uppercase tracking-widest text-ink-muted font-bold mb-3">Artisans ({results.artisans.length})</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {results.artisans.map(art => (
                  <Link key={art.id} href={`/artisan/${art.id}`} className="bg-white border border-wine/15 hover:border-wine/40 rounded-2xl p-4 flex items-center gap-4 shadow-xs transition-all">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border border-gold/30 bg-blush">
                      <Image src={art.profileImage} alt={art.name} fill className="object-cover" sizes="48px" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-serif text-lg font-semibold text-ink truncate">{art.name}</h4>
                      <p className="text-xs text-olive truncate">{art.specialization}</p>
                      <p className="text-[11px] text-ink-muted">{art.mohalla} · {art.yearsOfExperience} yrs</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {results.artifacts.length > 0 && (
            <div>
              <p className="text-[11px] font-mono uppercase tracking-widest text-ink-muted font-bold mb-3">Artifacts ({results.artifacts.length})</p>
              <div className="space-y-4">
                {results.artifacts.map(item => (
                  <Link key={item.artifactId} href={`/verify/${item.artifactId}`} className="bg-white border border-wine/15 hover:border-wine/40 rounded-2xl p-4 flex gap-4 shadow-xs transition-all">
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 bg-blush">
                      <Image src={item.coverImage} alt={item.title} fill className="object-cover" sizes="80px" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono text-ink-muted">{item.artifactId}</span>
                        {item.verificationStatus === "VERIFIED" && (
                          <span className="text-[10px] font-mono bg-emerald-800 text-white px-2 py-0.5 rounded-full font-bold flex items-center gap-1"><CheckCircle2 size={9} /> VERIFIED</span>
                        )}
                        {item.verificationStatus === "REJECTED" && (
                          <span className="text-[10px] font-mono bg-red-800 text-white px-2 py-0.5 rounded-full font-bold flex items-center gap-1"><AlertCircle size={9} /> FLAGGED</span>
                        )}
                      </div>
                      <h3 className="font-serif text-lg sm:text-xl font-semibold text-ink truncate">{item.title}</h3>
                      <p className="text-xs text-olive">{item.craftType} · {item.technique}</p>
                      <p className="text-[11px] text-ink-muted mt-1 line-clamp-2">{item.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {query && total === 0 && (
            <div className="text-center py-16 text-ink-muted">
              <p className="font-serif text-2xl font-normal mb-2">No results found</p>
              <p className="text-sm">Try searching for a craft technique, artisan name, or region.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}