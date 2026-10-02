"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/lib/auth/authContext";
import { db } from "@/lib/db/store";
import { CheckCircle2, ArrowRight, QrCode, TrendingUp } from "lucide-react";

export default function BuyerDashboardPage() {
  const { user } = useAuth();
  const artifacts = db.getArtifacts().filter(a => a.verificationStatus === "VERIFIED");
  const artisans = db.getArtisans();

  return (
    <div className="min-h-screen bg-ivory text-ink">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="wrap max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 pb-6 border-b border-blush">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-olive bg-sage/60 px-2.5 py-0.5 rounded-full font-bold inline-block mb-2">Collector & Buyer Account</span>
              <h1 className="font-serif text-3xl sm:text-5xl font-normal text-burgundy">Welcome back, {user?.name || "Collector"}</h1>
              <p className="text-sm text-ink-muted mt-1">Manage your authenticated pieces, followed artisans, and verification certificates.</p>
            </div>
            <Link href="/scan" className="inline-flex items-center gap-2 px-5 py-2.5 bg-burgundy hover:bg-wine text-white text-xs font-semibold rounded-full shadow-md">
              <QrCode size={15} /> Verify a piece
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { label: "Authenticated Pieces", value: "2", sub: "Digitally certified" },
              { label: "Followed Artisans", value: "3", sub: "Direct craft support" },
              { label: "Field Notes Saved", value: "4", sub: "Vakh community feed" },
              { label: "GI Guilds Supported", value: "2", sub: "Lucknow & Varanasi" }
            ].map(m => (
              <div key={m.label} className="bg-white border border-wine/15 rounded-2xl p-5 shadow-xs">
                <p className="text-xs text-ink-muted font-mono uppercase tracking-wider mb-1">{m.label}</p>
                <p className="font-serif text-3xl text-burgundy font-normal">{m.value}</p>
                <p className="text-[11px] text-olive mt-1">{m.sub}</p>
              </div>
            ))}
          </div>

          <div className="mb-14">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-burgundy">My Verified Collection</h2>
              <Link href="/scan" className="text-xs font-semibold text-wine hover:underline">Add another piece →</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {artifacts.slice(0, 2).map(item => (
                <div key={item.artifactId} className="bg-white border border-wine/15 rounded-2xl overflow-hidden shadow-xs flex flex-col sm:flex-row">
                  <div className="relative w-full sm:w-44 h-48 sm:h-auto bg-blush shrink-0">
                    <Image src={item.coverImage} alt={item.title} fill className="object-cover" sizes="(max-width: 640px) 100vw, 176px" />
                    <span className="absolute top-2 left-2 bg-emerald-800 text-white text-[10px] font-mono px-2 py-0.5 rounded-full font-bold">VERIFIED ({item.verificationConfidence}%)</span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-[11px] font-mono text-olive font-semibold">{item.craftType} · {item.district}</p>
                      <h3 className="font-serif text-xl font-normal text-ink mt-1 mb-2">{item.title}</h3>
                      <p className="text-xs text-ink-muted line-clamp-2 leading-relaxed">{item.description}</p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-blush flex items-center justify-between">
                      <div>
                        <p className="text-[10px] text-ink-muted font-mono">Certificate Ref</p>
                        <p className="text-xs font-mono font-semibold text-wine">{item.certificateId}</p>
                      </div>
                      <Link href={`/verify/${item.artifactId}`} className="px-3.5 py-1.5 bg-sage/60 hover:bg-sage text-olive text-xs font-semibold rounded-full inline-flex items-center gap-1">
                        Inspect <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-14">
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-burgundy mb-6">Artisans You Follow</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {artisans.map(art => (
                <div key={art.id} className="bg-white border border-wine/15 rounded-2xl p-5 flex items-center gap-4 shadow-xs">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 border border-gold/40">
                    <Image src={art.profileImage} alt={art.name} fill className="object-cover" sizes="56px" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-serif text-lg font-semibold text-ink truncate">{art.name}</h4>
                    <p className="text-xs text-olive truncate">{art.specialization}</p>
                    <Link href={`/artisan/${art.id}`} className="text-[11px] font-semibold text-wine hover:underline mt-1 inline-block">View profile →</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}