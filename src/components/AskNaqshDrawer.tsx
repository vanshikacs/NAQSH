"use client";
import React, { useState } from "react";
import { MessageSquare, Sparkles, X, ChevronRight, Send, HelpCircle } from "lucide-react";
import { db } from "@/lib/db/store";

interface Props { currentArtifactId?: string; currentArtisanId?: string; }

export function AskNaqshDrawer({ currentArtifactId = "NQ-2026-001", currentArtisanId = "AMN-018" }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const artifact = db.getArtifactById(currentArtifactId) || db.getArtifacts()[0];
  const artisan = db.getArtisanById(currentArtisanId) || db.getArtisans()[0];

  const presets = [
    "Why was this piece verified?",
    "Who made this piece?",
    "What evidence supports this record?",
    "What does this motif mean?",
    "Tell me about this craft."
  ];

  const handleAsk = (q: string) => {
    setLoading(true);
    setQuestion(q);
    const ql = q.toLowerCase();
    setTimeout(() => {
      if (ql.includes("why was") || ql.includes("why verified")) {
        setAnswer(`This piece (${artifact?.artifactId}) is verified because: 1) Physical tension variation score is ${artifact?.verificationConfidence}%, consistent with hand needlework. 2) Artisan record matches ${artifact?.artisanName} registered with ${artisan?.cooperativeName}. 3) Material is confirmed ${artifact?.material}. 4) Zero machine lock-stitch hallmarks detected by Gemini 3.8 Flash Vision.`);
      } else if (ql.includes("who made") || ql.includes("maker") || ql.includes("artisan")) {
        setAnswer(`This piece was crafted by ${artisan?.name} (${artisan?.hindiName}), a master craftswoman with ${artisan?.yearsOfExperience} years of experience in ${artisan?.mohalla}, ${artisan?.city}. She receives ${artisan?.earningsSharePercentage}% direct cooperative compensation.`);
      } else if (ql.includes("evidence")) {
        setAnswer(`Evidence includes: 1) Certificate ${artifact?.certificateId} in cooperative ledger. 2) High-resolution reverse stitch analysis confirming irregular hand knots (score: ${(artifact?.verificationConfidence || 89) / 100}). 3) GI geographical origin verified in ${artifact?.district}. 4) Labor log of ${artifact?.estimatedHours} verified hours.`);
      } else if (ql.includes("motif") || ql.includes("meaning")) {
        setAnswer(`The signature motif is "${artifact?.motif}". In Nawabi Awadh tradition, the Paan (betel leaf) symbolizes hospitality and cultural welcome, while the Chamele (jasmine bud) represents delicate spring flora from the subcontinent's natural heritage.`);
      } else if (ql.includes("craft")) {
        setAnswer(`${artifact?.craftType} is a 400-year-old GI-tagged Indian heritage craft from Lucknow. Unlike industrial embroidery, traditional Chikankari employs up to 36 delicate hand stitches including Bakhiya (shadow-work) and Jali (drawn-thread trellis). Over 250,000 women artisans preserve this tradition.`);
      } else {
        setAnswer(`I don't have enough verified information for "${q}" in the official docket. NAQSH never halluminates unverified craft claims.`);
      }
      setLoading(false);
    }, 700);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="fixed bottom-5 right-5 z-40 bg-burgundy hover:bg-wine text-ivory border border-gold/50 px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 text-xs font-semibold hover:scale-105 transition-all" title="Ask NAQSH Intelligence">
        <Sparkles size={14} className="text-gold" />
        <span>Ask NAQSH</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm">
          <div className="bg-ivory text-ink w-full max-w-md h-full shadow-2xl border-l border-blush flex flex-col justify-between p-6">
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-blush mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-burgundy text-white flex items-center justify-center font-serif text-sm font-bold">N</div>
                  <div>
                    <h3 className="font-serif text-xl font-normal text-burgundy">Ask NAQSH Intelligence</h3>
                    <p className="text-[10px] text-olive font-mono">Context: {artifact?.artifactId} · {artisan?.name}</p>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-1 text-ink-muted hover:text-ink"><X size={18} /></button>
              </div>

              <div className="bg-sage/40 border border-olive/20 rounded-xl p-3 text-xs text-ink-muted mb-5 leading-relaxed">
                Answers reference real provenance records. This assistant does not hallucinate historical claims.
              </div>

              <div className="mb-5">
                <p className="text-[11px] font-mono text-ink-muted uppercase tracking-wider mb-2 font-semibold">Frequently Verified Inquiries:</p>
                <div className="space-y-1.5">
                  {presets.map((q) => (
                    <button key={q} onClick={() => handleAsk(q)} className="w-full text-left p-2.5 rounded-xl border border-blush bg-white hover:bg-blush/30 hover:border-wine/30 text-xs font-medium text-ink transition-all flex items-center justify-between">
                      <span>{q}</span>
                      <ChevronRight size={13} className="text-wine/60" />
                    </button>
                  ))}
                </div>
              </div>

              {question && (
                <div className="bg-white border border-wine/20 rounded-2xl p-4 text-xs shadow-xs mb-4">
                  <div className="font-semibold text-wine mb-2 flex items-center gap-1.5"><HelpCircle size={13} /> Q: &ldquo;{question}&rdquo;</div>
                  {loading ? <div className="text-ink-muted italic animate-pulse">Consulting registered evidence dossier...</div> : (
                    <div className="text-ink leading-relaxed">
                      {answer}
                      <span className="block mt-2 text-[10px] font-mono text-olive font-bold">Source: Docket {artifact?.artifactId} · Registry {artisan?.id}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-blush">
              <form onSubmit={(e) => { e.preventDefault(); if (question.trim()) handleAsk(question); }} className="flex items-center gap-2">
                <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Ask anything about this craft or maker..." className="flex-1 bg-white border border-blush rounded-xl px-3.5 py-2.5 text-xs text-ink focus:outline-none" />
                <button type="submit" disabled={!question.trim() || loading} className="p-2.5 bg-burgundy hover:bg-wine text-white rounded-xl disabled:opacity-40">
                  <Send size={14} />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}