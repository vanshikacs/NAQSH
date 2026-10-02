'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowRight, CheckCircle2, Copy, ExternalLink, Layers, MessageSquare, ShieldCheck, Sparkles, FileText, Send } from 'lucide-react';

const VAKH_ARTISAN_FORM_URL =
  process.env.NEXT_PUBLIC_VAKH_ARTISAN_FORM_URL ||
  'https://vakh.com/form/h8ki';

const VAKH_FIELD_NOTE_FORM_URL =
  process.env.NEXT_PUBLIC_VAKH_FIELD_NOTE_FORM_URL ||
  'https://vakh.com/form/8msr';

export default function VakhPage() {
  const [copied, setCopied] = useState(false);

  const copySubmissionText = () => {
    const text = `PROJECT NAME: NAQSH (نقش)
TAGLINE: Har dhaage ki kahani — AI verifies the hand, NAQSH & Vakh protect the story.

WORKING PROJECT LINK: http://localhost:3000
VAKH FORMS:
1. Artisan Craft Declaration: ${VAKH_ARTISAN_FORM_URL}
2. Field Note & Authenticity Observation: ${VAKH_FIELD_NOTE_FORM_URL}

VAKH INTEGRATION EXPLANATION:

1. WHAT PROBLEM DOES THE PROJECT SOLVE?
Lucknow Chikankari is a 400-year-old GI-tagged craft employing over 250,000 women artisans. Today, cheap industrial machine-embroidery is marketed as handmade, causing authentic artisans to lose up to 70% of fair compensation and erasing centuries of craft heritage.

2. WHO IS IT BUILT FOR?
- Rural & suburban craftswomen in Lucknow cooperatives
- Discerning conscious buyers and textile collectors worldwide
- Heritage researchers, field auditors, and cooperative supervisors

3. HOW IS VAKH BEING USED?
Vakh serves as the structured participatory commons for NAQSH. Instead of being an isolated form, Vakh handles:
a) Artisan Craft Declarations: Form h8ki (Artisans/cooperative heads submit craft type, mohalla, stitch count, and time taken).
b) Decentralized Field Notes: Form 8msr (Textile researchers and buyers submit reverse-stitch observations, market reports, and counterfeit flags).
c) Living Provenance Commons: Garment owners record their ownership after scanning physical QR/NFC seals.

4. WHY DID YOU CHOOSE VAKH?
Vakh allows structured posting with explicit fields, permissions, and shareable public boards without building heavy, centralized database silos. It gives artisans and grassroots cooperatives ownership of their public records.

5. HOW DOES VAKH CONTRIBUTE TO THE PROJECT'S CORE WORKFLOW?
Workflow:
User/Artisan Submits on Vakh -> Vakh validates & structures the entry -> NAQSH matches record against Computer Vision stitch analysis -> Public Provenance Ledger displays verified authenticity -> Buyers interact with living garment history.

THE "REMOVAL TEST":
If Vakh were removed, NAQSH would lose its decentralized community verification layer, artisan self-onboarding pathway, and field surveillance mechanism, collapsing into a closed verification utility.`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-ivory text-ink">
      <Navbar />

      <main className="pt-28 pb-24">
        <div className="wrap max-w-5xl mx-auto px-4 sm:px-6">

          {/* Track Header */}
          <div className="max-w-3xl mb-14">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-wine border border-wine/30 px-3.5 py-1.5 rounded-full mb-6 bg-blush/30">
              <Sparkles size={13} className="text-wine" /> Build with Vakh · Track Submission Dossier
            </div>
            <h1 className="font-serif text-5xl sm:text-7xl font-normal leading-tight mb-6">
              AI verifies the hand. <br />
              <em className="text-wine italic">Vakh protects the collective story.</em>
            </h1>
            <p className="text-ink-muted text-lg leading-relaxed">
              NAQSH is a trust and provenance layer for Indian heritage textiles. Vakh operates as the structured,
              decentralized community backbone that captures field observations, artisan registrations, and
              living ownership records.
            </p>

            {/* Live Forms for Judges */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href={VAKH_ARTISAN_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 bg-white border border-wine/25 hover:border-wine rounded-2xl shadow-sm transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-blush rounded-xl text-wine">
                    <FileText size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-olive font-bold">Vakh Form 1 · LIVE</span>
                    <h4 className="font-serif text-lg font-semibold text-ink group-hover:text-wine transition-colors">Artisan Craft Declaration</h4>
                  </div>
                </div>
                <ExternalLink size={16} className="text-wine shrink-0 ml-2" />
              </a>

              <a
                href={VAKH_FIELD_NOTE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 bg-white border border-olive/30 hover:border-olive rounded-2xl shadow-sm transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-sage/60 rounded-xl text-olive">
                    <Send size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-wine font-bold">Vakh Form 2 · LIVE</span>
                    <h4 className="font-serif text-lg font-semibold text-ink group-hover:text-wine transition-colors">Field Note Observation</h4>
                  </div>
                </div>
                <ExternalLink size={16} className="text-wine shrink-0 ml-2" />
              </a>
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/community"
                className="inline-flex items-center gap-2 px-6 py-3 bg-burgundy text-white font-semibold text-sm rounded-full hover:bg-wine transition-all shadow-md"
              >
                View Connected Community Feed <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          {/* Workflow Diagram */}
          <div className="bg-sage/40 border border-olive/20 rounded-3xl p-8 sm:p-10 mb-16 shadow-sm">
            <p className="text-xs uppercase font-mono tracking-widest text-olive font-bold mb-3">Core Workflow Architecture</p>
            <h2 className="font-serif text-3xl font-normal mb-8">How Information Moves Through Vakh & NAQSH</h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
              <div className="bg-white/80 p-5 rounded-2xl border border-olive/20 shadow-xs">
                <span className="text-xs font-mono font-bold text-wine bg-blush px-2 py-0.5 rounded">STEP 01</span>
                <h4 className="font-serif text-lg font-semibold mt-3 mb-2">Participant Submits</h4>
                <p className="text-xs text-ink-muted leading-relaxed">
                  Artisan submits piece declaration on Vakh (form h8ki), or field researcher logs reverse-stitch notes (form 8msr).
                </p>
              </div>

              <div className="bg-white/80 p-5 rounded-2xl border border-olive/20 shadow-xs">
                <span className="text-xs font-mono font-bold text-olive bg-sage px-2 py-0.5 rounded">STEP 02</span>
                <h4 className="font-serif text-lg font-semibold mt-3 mb-2">Vakh Structures</h4>
                <p className="text-xs text-ink-muted leading-relaxed">
                  Vakh validates custom fields: craft type, geo-mohalla, stitch consistency, time spent, and author identity.
                </p>
              </div>

              <div className="bg-white/80 p-5 rounded-2xl border border-olive/20 shadow-xs">
                <span className="text-xs font-mono font-bold text-wine bg-blush px-2 py-0.5 rounded">STEP 03</span>
                <h4 className="font-serif text-lg font-semibold mt-3 mb-2">NAQSH Ingests</h4>
                <p className="text-xs text-ink-muted leading-relaxed">
                  Gemini 3.8 Flash AI vision analysis correlates tension markers against the Vakh record, updating verification state.
                </p>
              </div>

              <div className="bg-white/80 p-5 rounded-2xl border border-olive/20 shadow-xs">
                <span className="text-xs font-mono font-bold text-olive bg-sage px-2 py-0.5 rounded">STEP 04</span>
                <h4 className="font-serif text-lg font-semibold mt-3 mb-2">Public Interacts</h4>
                <p className="text-xs text-ink-muted leading-relaxed">
                  Buyers scan physical QR seal, verifying provenance and artisan fair-wage distribution on the public ledger.
                </p>
              </div>
            </div>
          </div>

          {/* The Removal Test (Judge Requirement) */}
          <div className="bg-gradient-to-r from-blush/60 to-ivory border-2 border-wine/20 rounded-3xl p-8 sm:p-10 mb-16">
            <div className="flex items-center gap-3 mb-3">
              <ShieldCheck className="text-wine" size={24} />
              <h3 className="font-serif text-2xl sm:text-3xl font-normal">The Critical &ldquo;Removal Test&rdquo;</h3>
            </div>
            <p className="text-base text-ink leading-relaxed mb-4 italic">
              &ldquo;If Vakh was removed from NAQSH, would an important part of the product or workflow be affected?&rdquo;
            </p>
            <div className="bg-white/90 rounded-2xl p-6 border border-wine/15 text-sm text-ink-muted space-y-3 leading-relaxed">
              <p className="text-ink font-semibold">
                Yes. Vakh is not an optional add-on — it is the community and participatory spine of NAQSH:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
                <li><strong className="text-ink">No Artisan Self-Service:</strong> Artisans in remote mohallas would lose their zero-friction self-onboarding pathway via Vakh form h8ki.</li>
                <li><strong className="text-ink">Zero Field Surveillance:</strong> Researchers and buyers couldn&apos;t report counterfeit market batches in real time via Vakh form 8msr.</li>
                <li><strong className="text-ink">Broken Provenance Continuity:</strong> Garments would have a static birth certificate without living ownership milestones.</li>
                <li><strong className="text-ink">Closed Silo:</strong> Without Vakh&apos;s public boards, verification data would be locked behind proprietary company servers.</li>
              </ul>
            </div>
          </div>

          {/* Live Touchpoints in this App */}
          <div className="mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl font-normal mb-8">Integrated Product Touchpoints</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/community" className="group bg-white border border-wine/15 rounded-2xl p-6 hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <span className="text-xs uppercase font-mono tracking-wider text-wine font-semibold block mb-2">Touchpoint 01</span>
                  <h4 className="font-serif text-xl font-semibold mb-2 group-hover:text-wine transition-colors">Community Field Notes</h4>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    Live feed of reverse-stitch field checks and authenticity notices directly powered by Vakh form 8msr.
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-wine">
                  Explore /community <ArrowRight size={14} />
                </div>
              </Link>

              <Link href="/artisan/onboard" className="group bg-white border border-wine/15 rounded-2xl p-6 hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <span className="text-xs uppercase font-mono tracking-wider text-olive font-semibold block mb-2">Touchpoint 02</span>
                  <h4 className="font-serif text-xl font-semibold mb-2 group-hover:text-wine transition-colors">Artisan Onboarding</h4>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    Cooperative craftswomen register pieces, work days, and earnings via dedicated Vakh form h8ki.
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-wine">
                  Explore /artisan/onboard <ArrowRight size={14} />
                </div>
              </Link>

              <Link href="/verify/NQ-2026-001" className="group bg-white border border-wine/15 rounded-2xl p-6 hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <span className="text-xs uppercase font-mono tracking-wider text-wine font-semibold block mb-2">Touchpoint 03</span>
                  <h4 className="font-serif text-xl font-semibold mb-2 group-hover:text-wine transition-colors">Buyer Provenance Extension</h4>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    Post-verification CTA allowing garment owners to append ownership proof to the public Vakh record.
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-wine">
                  Explore /verify/NQ-2026-001 <ArrowRight size={14} />
                </div>
              </Link>
            </div>
          </div>

          {/* Hackathon Judge Submission Block */}
          <div className="bg-white border-2 border-wine/20 rounded-3xl p-8 sm:p-10 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="font-serif text-3xl font-normal">Official Hackathon Submission Text</h3>
                <p className="text-xs text-ink-muted mt-1">Pre-formatted answers addressing all track requirements for the judging panel.</p>
              </div>
              <button
                onClick={copySubmissionText}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-burgundy text-white text-xs font-semibold rounded-full hover:bg-wine transition-all"
              >
                {copied ? <CheckCircle2 size={14} /> : <Copy size={14} />}
                {copied ? 'Copied to Clipboard!' : 'Copy Submission Dossier'}
              </button>
            </div>

            <div className="bg-ivory border border-blush rounded-2xl p-6 font-mono text-xs text-ink-muted whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto">
{`PROJECT NAME: NAQSH (نقش)
TAGLINE: Har dhaage ki kahani — AI verifies the hand, NAQSH & Vakh protect the story.

WORKING PROJECT LINK: http://localhost:3000
VAKH FORMS:
1. Artisan Craft Declaration: ${VAKH_ARTISAN_FORM_URL}
2. Field Note & Authenticity Observation: ${VAKH_FIELD_NOTE_FORM_URL}

VAKH INTEGRATION EXPLANATION:

1. WHAT PROBLEM DOES THE PROJECT SOLVE?
Lucknow Chikankari is a 400-year-old GI-tagged craft employing over 250,000 women artisans. Today, cheap industrial machine-embroidery is marketed as handmade, causing authentic artisans to lose up to 70% of fair compensation and erasing centuries of craft heritage.

2. WHO IS IT BUILT FOR?
- Rural & suburban craftswomen in Lucknow cooperatives
- Discerning conscious buyers and textile collectors worldwide
- Heritage researchers, field auditors, and cooperative supervisors

3. HOW IS VAKH BEING USED?
Vakh serves as the structured participatory commons for NAQSH. Instead of being an isolated form, Vakh handles:
a) Artisan Craft Declarations: Form h8ki (Artisans/cooperative heads submit craft type, mohalla, stitch count, and time taken).
b) Decentralized Field Notes: Form 8msr (Textile researchers and buyers submit reverse-stitch observations, market reports, and counterfeit flags).
c) Living Provenance Commons: Garment owners record their ownership after scanning physical QR/NFC seals.

4. WHY DID YOU CHOOSE VAKH?
Vakh allows structured posting with explicit fields, permissions, and shareable public boards without building heavy, centralized database silos. It gives artisans and grassroots cooperatives ownership of their public records.

5. HOW DOES VAKH CONTRIBUTE TO THE PROJECT'S CORE WORKFLOW?
Workflow:
User/Artisan Submits on Vakh -> Vakh validates & structures the entry -> NAQSH matches record against Computer Vision stitch analysis -> Public Provenance Ledger displays verified authenticity -> Buyers interact with living garment history.

THE "REMOVAL TEST":
If Vakh were removed, NAQSH would lose its decentralized community verification layer, artisan self-onboarding pathway, and field surveillance mechanism, collapsing into a closed verification utility.`}
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link href="/" className="inline-flex items-center gap-2 text-wine font-semibold hover:underline text-sm">
              ← Return to NAQSH Home
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}