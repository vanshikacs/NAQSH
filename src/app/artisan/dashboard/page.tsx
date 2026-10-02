"use client";
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/lib/auth/authContext";
import { db } from "@/lib/db/store";
import { Plus, BookOpen, CheckCircle2, Clock, AlertCircle, FileText, Sparkles, ArrowRight, TrendingUp } from "lucide-react";

export default function ArtisanDashboardPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"pieces" | "documents" | "stories">("pieces");
  const [showStory, setShowStory] = useState(false);
  const [storyTitle, setStoryTitle] = useState("");
  const [storyContent, setStoryContent] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const artisan = db.getArtisanById("AMN-018");
  const myArtifacts = db.getArtifactsByArtisan("AMN-018");

  const generateDraft = () => {
    setAiLoading(true);
    setTimeout(() => {
      setStoryTitle("Passing the Jali Needle: 34 Years in Chowk");
      setStoryContent("In the narrow lanes of Chowk, Old Lucknow, my grandmother taught me how to push the needle through sheer muslin without cutting a single thread. Today, 42 younger women sit in our courtyard circle. Through NAQSH and our cooperative guild, every stitch on our reverse work is digitally recorded, proving that human hands held the needle.");
      setAiLoading(false);
    }, 1200);
  };

  const getBadge = (status: string) => {
    if (status === "VERIFIED") return <span className="bg-emerald-800 text-white text-[10px] font-mono px-2 py-0.5 rounded-full font-bold inline-flex items-center gap-1"><CheckCircle2 size={10} /> VERIFIED</span>;
    if (status === "NEEDS_REVIEW") return <span className="bg-amber-600 text-white text-[10px] font-mono px-2 py-0.5 rounded-full font-bold inline-flex items-center gap-1"><AlertCircle size={10} /> NEEDS REVIEW</span>;
    return <span className="bg-wine/80 text-white text-[10px] font-mono px-2 py-0.5 rounded-full font-bold inline-flex items-center gap-1"><Clock size={10} /> IN REVIEW</span>;
  };

  return (
    <div className="min-h-screen bg-ivory text-ink">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="wrap max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-blush">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-gold shrink-0">
                <Image src={artisan?.profileImage || "/images/chikankari-outfit.jpg"} alt="Artisan" fill className="object-cover" sizes="64px" />
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-wine bg-blush px-2.5 py-0.5 rounded-full font-bold">Master Artisan Portal</span>
                <h1 className="font-serif text-3xl sm:text-4xl font-normal text-burgundy mt-1">{artisan?.name} ({artisan?.hindiName})</h1>
                <p className="text-xs text-ink-muted">{artisan?.specialization} · {artisan?.mohalla}</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2.5">
              <button onClick={() => setShowStory(true)} className="inline-flex items-center gap-2 px-4 py-2 border border-wine text-wine text-xs font-semibold rounded-full hover:bg-wine/10">
                <BookOpen size={14} /> Tell Your Story
              </button>
              <Link href="/artisan/onboard" className="inline-flex items-center gap-2 px-5 py-2 bg-burgundy hover:bg-wine text-white text-xs font-semibold rounded-full shadow-md">
                <Plus size={15} /> Add a Craft Piece
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
            <div className="bg-white border border-wine/15 rounded-2xl p-5 shadow-xs">
              <div className="flex justify-between items-center mb-2">
                <p className="text-xs text-ink-muted font-mono uppercase tracking-wider">Profile Completion</p>
                <span className="text-xs font-mono font-bold text-olive">94%</span>
              </div>
              <div className="w-full bg-blush/40 h-2 rounded-full overflow-hidden mb-3"><div className="bg-olive h-full w-[94%] rounded-full" /></div>
              <p className="text-[11px] text-ink-muted">Identity, bank slip & cooperative badge verified.</p>
            </div>
            <div className="bg-white border border-wine/15 rounded-2xl p-5 shadow-xs">
              <p className="text-xs text-ink-muted font-mono uppercase tracking-wider mb-1">Direct Earnings Share</p>
              <p className="font-serif text-3xl text-burgundy font-normal">{artisan?.earningsSharePercentage}%</p>
              <p className="text-[11px] text-green-700 mt-1 flex items-center gap-1"><TrendingUp size={12} /> Guaranteed direct payout</p>
            </div>
            <div className="bg-white border border-wine/15 rounded-2xl p-5 shadow-xs">
              <p className="text-xs text-ink-muted font-mono uppercase tracking-wider mb-1">Verified Pieces</p>
              <p className="font-serif text-3xl text-burgundy font-normal">{myArtifacts.length}</p>
              <p className="text-[11px] text-olive mt-1">Active on public registry</p>
            </div>
            <div className="bg-white border border-wine/15 rounded-2xl p-5 shadow-xs">
              <p className="text-xs text-ink-muted font-mono uppercase tracking-wider mb-1">Cooperative Cluster</p>
              <p className="font-serif text-3xl text-burgundy font-normal">42</p>
              <p className="text-[11px] text-olive mt-1">Artisans in Chowk unit</p>
            </div>
          </div>

          <div className="flex gap-2 border-b border-blush mb-8 pb-1">
            {(["pieces","documents","stories"] as const).map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 text-xs font-semibold capitalize rounded-t-lg transition-all ${activeTab === tab ? "border-b-2 border-burgundy text-burgundy font-bold" : "text-ink-muted hover:text-ink"}`}>{tab}</button>
            ))}
          </div>

          {activeTab === "pieces" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {myArtifacts.map(piece => (
                <div key={piece.artifactId} className="bg-white border border-wine/15 rounded-2xl p-5 flex flex-col justify-between shadow-xs">
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <span className="text-[10px] font-mono text-ink-muted">{piece.artifactId}</span>
                        <h3 className="font-serif text-xl font-normal text-ink">{piece.title}</h3>
                      </div>
                      {getBadge(piece.verificationStatus)}
                    </div>
                    <p className="text-xs text-ink-muted mb-4 line-clamp-2 leading-relaxed">{piece.description}</p>
                    <div className="grid grid-cols-2 gap-3 text-xs bg-ivory p-3 rounded-xl border border-blush/60 mb-4">
                      <div><span className="text-[10px] text-ink-muted font-mono block">Labor Hours</span><span className="font-semibold">{piece.estimatedHours} hrs</span></div>
                      <div><span className="text-[10px] text-ink-muted font-mono block">Compensation</span><span className="font-semibold text-green-700">₹{piece.artisanEarningsInr.toLocaleString("en-IN")}</span></div>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-blush flex items-center justify-between">
                    <span className="text-xs font-mono text-wine font-semibold">{piece.certificateId}</span>
                    <Link href={`/verify/${piece.artifactId}`} className="text-xs font-semibold text-olive hover:underline flex items-center gap-1">View certificate <ArrowRight size={12} /></Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "documents" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Geographical Indication Registry Card", desc: "Registration #GI-119-UP-0881. Verifies authentic Lucknow craft zone origin.", badge: "✓ VERIFIED BY REGISTRAR" },
                { title: "Cooperative Membership Badge", desc: "Awadh Mahila Craft Guild. Membership since 2012.", badge: "✓ ACTIVE GUILD MEMBER" },
                { title: "Direct Bank Account Verification", desc: "Fair-trade escrow account linked for zero-commission payouts.", badge: "✓ ESCROW LINKED" }
              ].map(d => (
                <div key={d.title} className="bg-white border border-wine/15 rounded-2xl p-6 shadow-xs">
                  <FileText className="text-wine mb-3" size={24} />
                  <h4 className="font-serif text-lg font-semibold mb-1">{d.title}</h4>
                  <p className="text-xs text-ink-muted mb-4">{d.desc}</p>
                  <span className="text-[10px] font-mono bg-sage/60 text-olive px-2.5 py-1 rounded-full font-bold">{d.badge}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === "stories" && (
            <div className="bg-white border border-wine/15 rounded-2xl p-6 shadow-xs">
              <span className="text-[10px] font-mono uppercase bg-blush px-2 py-0.5 rounded text-wine font-bold">Published Story</span>
              <h3 className="font-serif text-2xl font-normal text-burgundy mt-2 mb-2">The Geometry of Awadhi Jali: Why No Machine Can Pierce This Pattern</h3>
              <p className="text-xs text-ink-muted leading-relaxed mb-4">"When you cut a fabric to make a hole, it frays in the wash. True Jali is different: you spread the warp and weft with a dull bone needle and bind the open space with fine silk. It breathes like skin..."</p>
              <Link href="/community" className="text-xs font-semibold text-wine hover:underline">View on Community Feed →</Link>
            </div>
          )}
        </div>
      </main>

      {showStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-ivory text-ink rounded-3xl border border-wine/30 max-w-xl w-full p-7 sm:p-8 shadow-2xl">
            <div className="flex justify-between items-center pb-3 border-b border-blush mb-4">
              <h3 className="font-serif text-2xl font-normal text-burgundy">Record Your Heritage Story</h3>
              <button onClick={() => setShowStory(false)} className="text-ink-muted hover:text-ink">✕</button>
            </div>
            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle2 size={40} className="text-green-600 mx-auto mb-3" />
                <h4 className="font-serif text-2xl font-normal mb-2">Story Submitted for Review</h4>
                <p className="text-xs text-ink-muted mb-6">Your story has been routed to the NAQSH community editorial desk.</p>
                <button onClick={() => { setSubmitted(false); setShowStory(false); }} className="px-5 py-2 bg-burgundy text-white text-xs font-semibold rounded-full">Done</button>
              </div>
            ) : (
              <div>
                <div className="mb-4 bg-blush/40 border border-wine/20 rounded-xl p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2"><Sparkles size={14} className="text-wine" /><span className="text-xs font-semibold text-burgundy">AI Story Assistant</span></div>
                  <button onClick={generateDraft} disabled={aiLoading} className="px-3 py-1 bg-wine text-white text-[11px] font-semibold rounded-lg hover:bg-burgundy disabled:opacity-50">{aiLoading ? "Drafting..." : "Generate draft"}</button>
                </div>
                <div className="space-y-3 mb-6">
                  <div>
                    <label className="block text-xs font-semibold mb-1">Story Title</label>
                    <input type="text" value={storyTitle} onChange={e => setStoryTitle(e.target.value)} placeholder="e.g. 34 Years of Jali Needlework in Chowk" className="w-full bg-white border border-blush rounded-xl px-3.5 py-2 text-xs" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-semibold">Story</label>
                      {storyContent && <span className="text-[10px] font-mono text-wine bg-blush px-2 py-0.5 rounded">AI-assisted draft · Edit freely</span>}
                    </div>
                    <textarea rows={5} value={storyContent} onChange={e => setStoryContent(e.target.value)} placeholder="Describe your craft lineage and technique..." className="w-full bg-white border border-blush rounded-xl p-3 text-xs leading-relaxed" />
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-3 border-t border-blush">
                  <button onClick={() => setShowStory(false)} className="px-4 py-2 text-xs border border-ink/20 rounded-full font-medium">Cancel</button>
                  <button disabled={!storyTitle || !storyContent} onClick={() => setSubmitted(true)} className="px-5 py-2 bg-burgundy hover:bg-wine text-white text-xs font-semibold rounded-full disabled:opacity-40">Submit Story</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}