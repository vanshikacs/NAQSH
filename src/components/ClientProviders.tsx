"use client";
import React, { useState } from "react";
import { AuthProvider, useAuth } from "@/lib/auth/authContext";
import { UserRole } from "@/lib/db/types";
import Link from "next/link";
import { Play, Sparkles, X, ChevronRight } from "lucide-react";
import { AskNaqshDrawer } from "./AskNaqshDrawer";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
      <DemoRoleBar />
      <GuidedLiveDemoModal />
      <AskNaqshDrawer />
    </AuthProvider>
  );
}

function DemoRoleBar() {
  const { role, loginAs, user } = useAuth();
  const [minimized, setMinimized] = useState(false);

  const roles: { id: UserRole; label: string }[] = [
    { id: "buyer", label: "Buyer" },
    { id: "artisan", label: "Artisan" },
    { id: "curator", label: "Curator" },
    { id: "admin", label: "Admin" }
  ];

  if (minimized) {
    return (
      <button onClick={() => setMinimized(false)} className="fixed bottom-4 left-4 z-50 flex items-center gap-2 bg-night text-ivory border border-gold/40 px-3.5 py-2 rounded-full text-xs font-mono shadow-2xl">
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="capitalize text-gold font-semibold">{role} Mode</span>
      </button>
    );
  }

  return (
    <aside className="fixed bottom-4 left-4 z-50 bg-night/95 text-ivory border border-gold/40 rounded-2xl p-3 shadow-2xl backdrop-blur-md max-w-sm" aria-label="Demo Role Switcher">
      <div className="flex items-center justify-between gap-3 mb-2 pb-2 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400" />
          <span className="text-[10px] font-mono tracking-widest uppercase text-gold">Judge Demo Controls</span>
        </div>
        <button onClick={() => setMinimized(true)} className="text-ivory/60 hover:text-ivory text-xs px-1">✕</button>
      </div>
      <div className="flex items-center justify-between text-xs mb-2">
        <span className="text-ivory/70 text-[11px]">Logged in as:</span>
        <span className="font-semibold text-ivory truncate max-w-[150px]">{user?.name}</span>
      </div>
      <div className="grid grid-cols-4 gap-1.5">
        {roles.map((r) => (
          <button key={r.id} onClick={() => loginAs(r.id)} className={`px-2 py-1.5 rounded-lg text-[11px] font-medium transition-all ${role === r.id ? "bg-gold text-night font-bold" : "bg-white/5 hover:bg-white/10 text-ivory/80 border border-white/10"}`}>{r.label}</button>
        ))}
      </div>
      <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
        <Link href={role === "buyer" ? "/dashboard" : `/${role}/dashboard`} className="text-gold hover:underline flex items-center gap-1 font-semibold">Open {role} dashboard →</Link>
        <button onClick={() => { const e = new CustomEvent("open-guided-demo"); window.dispatchEvent(e); }} className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-bold">
          <Play size={10} fill="currentColor" /> Live Tour
        </button>
      </div>
    </aside>
  );
}

function GuidedLiveDemoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  React.useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-guided-demo", handleOpen);
    return () => window.removeEventListener("open-guided-demo", handleOpen);
  }, []);

  const steps = [
    { title: "01 Discover Authentic Crafts", desc: "Explore GI-tagged Lucknow Chikankari and Banarasi pit-loom weaving.", path: "/artisan", actionText: "Explore Artisans" },
    { title: "02 Meet Master Craftswoman", desc: "View Amina Begum's profile: 34 years of practice, 86% cooperative wage share.", path: "/artisan/AMN-018", actionText: "Open Amina's Profile" },
    { title: "03 AI Stitch Forensics", desc: "Gemini 3.8 Flash assesses reverse-side tension variance vs mechanical replicas.", path: "/scan", actionText: "Inspect via Scan Page" },
    { title: "04 Curator Review Desk", desc: "See how curators inspect pending submissions and approve certificates.", path: "/curator/dashboard", actionText: "Open Curator Dashboard" },
    { title: "05 Community & Vakh Feed", desc: "Browse field notes from researchers and buyers, powered by Vakh.", path: "/community", actionText: "Open Community Commons" },
    { title: "06 Official Digital Certificate", desc: "The tamper-evident provenance certificate with immutable event timeline.", path: "/verify/NQ-2026-001", actionText: "View Certificate NQ-2026-001" }
  ];

  if (!isOpen) return null;
  const step = steps[currentStep];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-ivory text-ink rounded-3xl border border-gold/50 shadow-2xl max-w-lg w-full p-7 sm:p-8">
        <div className="flex items-center justify-between pb-3 border-b border-blush mb-4">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-wine" />
            <span className="text-xs font-mono uppercase tracking-widest text-wine font-bold">Judge Tour ({currentStep + 1}/{steps.length})</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-ink-muted hover:text-ink text-sm"><X size={18} /></button>
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl font-normal text-burgundy mb-2">{step.title}</h3>
        <p className="text-sm text-ink-muted leading-relaxed mb-6">{step.desc}</p>
        <div className="flex items-center justify-between gap-3 pt-4 border-t border-blush">
          <button disabled={currentStep === 0} onClick={() => setCurrentStep(c => Math.max(0, c - 1))} className="px-3.5 py-2 text-xs font-medium border border-ink/20 rounded-full disabled:opacity-30">← Back</button>
          <Link href={step.path} onClick={() => { if (currentStep < steps.length - 1) setCurrentStep(c => c + 1); else setIsOpen(false); }} className="px-5 py-2 bg-burgundy hover:bg-wine text-white text-xs font-semibold rounded-full inline-flex items-center gap-1.5 shadow-md">
            {step.actionText} <ChevronRight size={14} />
          </Link>
          {currentStep < steps.length - 1 ? (
            <button onClick={() => setCurrentStep(c => c + 1)} className="px-3.5 py-2 text-xs text-ink-muted">Skip</button>
          ) : (
            <button onClick={() => setIsOpen(false)} className="px-3.5 py-2 text-xs font-bold text-green-700">Finish</button>
          )}
        </div>
      </div>
    </div>
  );
}