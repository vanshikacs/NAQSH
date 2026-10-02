"use client";
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/lib/auth/authContext";
import { db } from "@/lib/db/store";
import { CheckCircle2, AlertCircle, Clock, X, FileText, Shield, ChevronRight } from "lucide-react";

export default function CuratorDashboardPage() {
  const { user } = useAuth();
  const [filter, setFilter] = useState<string>("ALL");
  const [selected, setSelected] = useState<string | null>("NQ-2026-004");
  const [notes, setNotes] = useState("");
  const [actionDone, setActionDone] = useState<string | null>(null);

  const artifacts = db.getArtifacts();
  const filtered = filter === "ALL" ? artifacts : artifacts.filter(a => a.verificationStatus === filter);
  const selectedArtifact = selected ? db.getArtifactById(selected) : null;

  const handleAction = (action: "VERIFIED" | "NEEDS_REVIEW" | "REJECTED") => {
    if (!selected) return;
    db.updateArtifactStatus(selected, action, user?.name || "Curator", notes);
    setActionDone(action);
    setNotes("");
  };

  const statusColor: Record<string, string> = {
    VERIFIED: "bg-emerald-800 text-white", NEEDS_REVIEW: "bg-amber-600 text-white",
    IN_REVIEW: "bg-blue-700 text-white", REJECTED: "bg-red-800 text-white",
    PENDING: "bg-zinc-600 text-white", INSUFFICIENT_EVIDENCE: "bg-orange-700 text-white"
  };

  const filters = ["ALL", "NEEDS_REVIEW", "IN_REVIEW", "VERIFIED", "REJECTED"];

  return (
    <div className="min-h-screen bg-ivory text-ink">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-blush">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-wine bg-blush px-2.5 py-0.5 rounded-full font-bold inline-block mb-2">Curator Review Desk</span>
              <h1 className="font-serif text-3xl sm:text-5xl font-normal text-burgundy">Protocol Inspection</h1>
              <p className="text-sm text-ink-muted mt-1">Logged in as {user?.name} · {user?.title}</p>
            </div>
            <div className="flex items-center gap-2 bg-white border border-wine/20 rounded-2xl px-4 py-2.5 shadow-xs">
              <Shield size={16} className="text-wine" />
              <div className="text-xs"><p className="font-mono font-bold text-burgundy">{artifacts.filter(a => a.verificationStatus === "NEEDS_REVIEW" || a.verificationStatus === "IN_REVIEW").length} Pending</p><p className="text-ink-muted">require your attention</p></div>
            </div>
          </div>

          <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
            {filters.map(f => (
              <button key={f} onClick={() => setFilter(f)} className={`px-4 py-1.5 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider whitespace-nowrap transition-all ${filter === f ? "bg-burgundy text-white shadow-md" : "bg-white border border-wine/20 text-ink-muted hover:text-ink"}`}>{f}</button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* LEFT — Queue */}
            <div className="space-y-3">
              {filtered.map(item => (
                <div key={item.artifactId} onClick={() => { setSelected(item.artifactId); setActionDone(null); }} className={`bg-white border rounded-2xl p-4 cursor-pointer transition-all shadow-xs ${selected === item.artifactId ? "border-wine ring-1 ring-wine/30" : "border-wine/15 hover:border-wine/40"}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-blush">
                        <Image src={item.coverImage} alt={item.title} fill className="object-cover" sizes="48px" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-ink-muted">{item.artifactId}</span>
                        <h3 className="font-serif text-base font-semibold text-ink leading-tight">{item.title}</h3>
                        <p className="text-[11px] text-olive mt-0.5">{item.artisanName} · {item.district}</p>
                      </div>
                    </div>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold shrink-0 ${statusColor[item.verificationStatus]}`}>{item.verificationStatus.replace("_", " ")}</span>
                  </div>
                  <div className="flex items-center gap-4 mt-3 text-[11px] text-ink-muted">
                    <span>Evidence: {item.evidenceCompleteness}%</span>
                    <span>AI: {item.verificationConfidence}% confidence</span>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT — Inspection Panel */}
            {selectedArtifact ? (
              <div className="bg-white border border-wine/15 rounded-2xl shadow-xs overflow-hidden sticky top-28 h-fit">
                <div className="bg-burgundy/10 p-4 flex items-center justify-between border-b border-wine/15">
                  <span className="text-xs font-mono font-bold text-burgundy">{selectedArtifact.artifactId} — {selectedArtifact.craftType}</span>
                  <button onClick={() => setSelected(null)} className="text-ink-muted hover:text-ink"><X size={15} /></button>
                </div>

                <div className="grid grid-cols-2 gap-3 p-4">
                  <div className="relative h-36 bg-blush rounded-xl overflow-hidden">
                    <Image src={selectedArtifact.coverImage} alt="Front" fill className="object-cover" sizes="50vw" />
                    <span className="absolute bottom-1 left-1 text-[9px] font-mono bg-night/80 text-ivory px-1.5 py-0.5 rounded">FRONT VIEW</span>
                  </div>
                  <div className="relative h-36 bg-blush rounded-xl overflow-hidden">
                    <Image src={selectedArtifact.reverseImage || selectedArtifact.coverImage} alt="Reverse" fill className="object-cover" sizes="50vw" />
                    <span className="absolute bottom-1 left-1 text-[9px] font-mono bg-night/80 text-ivory px-1.5 py-0.5 rounded">REVERSE STITCH</span>
                  </div>
                </div>

                <div className="px-4 pb-3 space-y-2">
                  <h3 className="font-serif text-xl font-semibold text-ink">{selectedArtifact.title}</h3>
                  <p className="text-xs text-ink-muted leading-relaxed">{selectedArtifact.description}</p>
                </div>

                <div className="px-4 pb-4">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-ink-muted font-bold mb-2">Gemini 3.8 Flash Findings</p>
                  <div className="space-y-1.5">
                    {[
                      { label: "Stitch Tension Variance", val: `${selectedArtifact.verificationConfidence}%`, status: selectedArtifact.verificationConfidence > 75 ? "good" : "warn" },
                      { label: "Material Consistency", val: selectedArtifact.material.includes("Synthetic") ? "FLAGGED" : "NATURAL FIBERS", status: selectedArtifact.material.includes("Synthetic") ? "bad" : "good" },
                      { label: "Evidence Completeness", val: `${selectedArtifact.evidenceCompleteness}%`, status: selectedArtifact.evidenceCompleteness > 80 ? "good" : "warn" }
                    ].map(s => (
                      <div key={s.label} className="flex items-center justify-between py-1.5 px-2.5 bg-ivory rounded-lg text-xs border border-blush/60">
                        <span className="text-ink-muted">{s.label}</span>
                        <span className={`font-mono font-bold ${s.status === "good" ? "text-emerald-700" : s.status === "warn" ? "text-amber-700" : "text-red-700"}`}>{s.val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="px-4 pb-4">
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-ink-muted font-bold mb-1.5">Curator Rationale</label>
                  <textarea rows={3} value={notes} onChange={e => setNotes(e.target.value)} placeholder="Enter your inspection notes and decision rationale..." className="w-full bg-ivory border border-blush rounded-xl p-3 text-xs" />
                </div>

                {actionDone ? (
                  <div className="mx-4 mb-4 p-3 bg-sage/40 rounded-xl border border-olive/30 text-xs text-olive font-semibold flex items-center gap-2">
                    <CheckCircle2 size={14} /> Status updated to <strong>{actionDone}</strong>. Audit log recorded.
                  </div>
                ) : (
                  <div className="px-4 pb-5 grid grid-cols-3 gap-2">
                    <button onClick={() => handleAction("VERIFIED")} className="px-3 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl text-[11px] font-bold flex items-center justify-center gap-1"><CheckCircle2 size={12} /> Approve</button>
                    <button onClick={() => handleAction("NEEDS_REVIEW")} className="px-3 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-[11px] font-bold flex items-center justify-center gap-1"><AlertCircle size={12} /> Request</button>
                    <button onClick={() => handleAction("REJECTED")} className="px-3 py-2 bg-red-800 hover:bg-red-700 text-white rounded-xl text-[11px] font-bold flex items-center justify-center gap-1"><X size={12} /> Reject</button>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white border border-wine/10 rounded-2xl p-10 text-center text-ink-muted flex flex-col items-center justify-center h-64">
                <FileText size={32} className="mb-3 opacity-40" />
                <p className="text-sm">Select a submission from the queue to begin inspection.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}