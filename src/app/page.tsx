'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowRight, Check, ChevronDown, Eye, Fingerprint, Info, ShieldCheck, Upload, X } from 'lucide-react';

const trustNodes = [
  ['Craft', 'The technique and tradition behind the piece.'],
  ['Artisan', 'A named maker with a record you can read.'],
  ['Origin', 'Where it was made, and who vouches for it.'],
  ['Material', 'What it is made of, as recorded at the source.'],
  ['Evidence', 'Certificates, images and notes on the record.'],
  ['Provenance', 'Every step since, in order.'],
] as const;

const verificationRows = [
  ['Image analysis', 'Textile detected'],
  ['Material', 'Handwoven fibre'],
  ['Motif', 'Regional motif'],
  ['Region', 'Metadata consistent'],
  ['Document', 'Certificate matched'],
  ['Artisan', 'Record found'],
] as const;

const answers: Record<string, string> = {
  'Why is this piece verified?': 'The certificate ID, artisan record and region agree with the registered entry. One gap remains: no purchase record is on file.',
  'Who made it?': 'The artisan record linked to this sample is Amina Begum, a Lucknow chikankari artisan specialising in Bakhiya and Jali.',
  'What evidence supports this record?': 'Certificate match, artisan record, region and material consistency, plus image similarity to the registered design.',
};

export default function HomePage() {
  const [verificationId, setVerificationId] = useState('');
  const [verificationError, setVerificationError] = useState('');
  const [verificationState, setVerificationState] = useState<'idle' | 'reading' | 'complete'>('idle');
  const [activeRows, setActiveRows] = useState(0);
  const [askOpen, setAskOpen] = useState(false);
  const [answer, setAnswer] = useState('');
  const [copied, setCopied] = useState(false);
  const verifyRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (verificationState !== 'reading') return;
    const rowTimer = window.setInterval(() => setActiveRows((value) => Math.min(value + 1, verificationRows.length)), 450);
    const completeTimer = window.setTimeout(() => setVerificationState('complete'), 3150);
    return () => {
      window.clearInterval(rowTimer);
      window.clearTimeout(completeTimer);
    };
  }, [verificationState]);

  const beginVerification = () => {
    const value = verificationId.trim().toUpperCase();
    if (value && !/^NQ-\d{4}-\d{6}$/.test(value)) {
      setVerificationError('Use the format NQ-2026-000000, as printed on the tag.');
      return;
    }
    setVerificationError('');
    setActiveRows(0);
    setVerificationState('reading');
  };

  const shareCertificate = async () => {
    const url = `${window.location.origin}/verify/NQ-2026-001`;
    if (navigator.share) {
      await navigator.share({ title: 'NAQSH · Verified Chikankari', url });
      return;
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="min-h-screen overflow-hidden bg-ivory text-ink">
      <Navbar />
      <main id="main">
        <section id="top" className="naqsh-hero relative flex min-h-[760px] items-end overflow-hidden pb-20 pt-32 sm:min-h-screen sm:pb-28">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_24%,rgba(243,217,210,.9),transparent_34%),linear-gradient(135deg,#e6efdd_0%,#dce8d2_52%,#fbf6ee_100%)]" />
          <div className="thread-swoop absolute inset-0 opacity-60" aria-hidden="true" />
          <div className="absolute right-[-18%] top-[11%] h-[72vw] max-h-[560px] w-[72vw] max-w-[560px] overflow-hidden rounded-[50%_50%_18%_18%] border border-white/50 opacity-35 shadow-2xl shadow-wine/10 sm:right-0 sm:top-[17%] sm:h-[58vw] sm:w-[42vw] sm:max-h-[680px] sm:max-w-[580px] sm:opacity-100">
            <Image src="/images/chikankari-ivory-pink.jpg" alt="Close-up of chikankari embroidery on ivory fabric" fill priority className="object-cover" sizes="(max-width: 640px) 90vw, 55vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-burgundy/25 via-transparent to-white/10" />
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between border-t border-white/60 pt-3 text-xs text-white"><span>NAQSH · REGISTERED PIECE</span><span className="font-mono">NQ-2026-001</span></div>
          </div>
          <div className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-8"><div className="max-w-[560px]"><p className="mb-5 text-[10px] font-semibold uppercase tracking-[.22em] text-wine">Trust the hand behind the thread</p><h1 className="font-serif text-[clamp(4rem,12vw,9rem)] leading-[.78] tracking-[-.04em]">Every thread<br />has a <em className="text-wine">story.</em></h1><p className="mt-8 max-w-[440px] text-base leading-relaxed text-ink-soft sm:text-lg">NAQSH connects craft, artisan and provenance, so what you wear can be understood, not just admired.</p><div className="mt-8 flex flex-wrap gap-3"><a href="#verify" className="inline-flex items-center gap-2 rounded-full bg-burgundy px-6 py-3 text-sm font-semibold text-ivory transition hover:-translate-y-0.5 hover:bg-wine">Verify a piece <ArrowRight size={16} /></a><a href="#crafts" className="inline-flex items-center gap-2 rounded-full border border-wine px-6 py-3 text-sm font-semibold text-wine transition hover:bg-wine/10">Explore crafts</a></div><p className="mt-5 text-[11px] tracking-wide text-olive">AI-assisted craftsmanship assessment · Piece-level provenance</p></div></div>
          <a href="#story" className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center text-[10px] tracking-[.2em] text-olive">SCROLL <ChevronDown size={15} /></a>
        </section>

        <section id="story" className="naqsh-section bg-ivory"><div className="mx-auto max-w-6xl px-5 sm:px-8"><p className="eyebrow">The gap in the story</p><h2 className="max-w-3xl font-serif text-5xl leading-[.95] sm:text-7xl">Beautiful things can still lose their <em className="text-wine">story.</em></h2><div className="mt-16 grid gap-6 border-t border-rose/50 pt-5 sm:grid-cols-5" aria-label="Craft, maker, origin, evidence and buyer"><div className="story-chain-line" aria-hidden="true" />{['Craft', 'Maker', 'Origin', 'Evidence', 'Buyer'].map((item, index) => <div key={item} className={`relative text-center font-serif text-2xl italic ${index > 1 ? 'text-ink-muted/50' : 'text-wine'}`}><span className="mx-auto mb-3 block h-7 w-7 rounded-full border border-rose bg-blush" />{item}</div>)}</div><p className="mt-8 max-w-xl leading-relaxed text-ink-muted">By the time a piece reaches its buyer, the maker&apos;s name and the proof of origin are usually gone. NAQSH keeps the chain intact.</p></div></section>

        <section className="naqsh-section bg-blush"><div className="mx-auto max-w-6xl px-5 sm:px-8"><p className="eyebrow">The NAQSH promise</p><h2 className="max-w-3xl font-serif text-5xl leading-[.95] sm:text-7xl">Bring the story back into the <em className="text-wine">object.</em></h2><div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{trustNodes.map(([title, copy], index) => <div key={title} className="naqsh-card group"><div className="flex items-start justify-between"><span className="font-serif text-5xl text-rose/60">0{index + 1}</span>{index === 0 ? <Eye className="text-wine" size={22} /> : index === 1 ? <Fingerprint className="text-wine" size={22} /> : <ShieldCheck className="text-wine" size={22} />}</div><h3 className="mt-10 font-serif text-3xl italic text-wine">{title}</h3><p className="mt-2 text-sm leading-relaxed text-ink-muted">{copy}</p></div>)}</div></div></section>

        <section id="crafts" className="naqsh-section bg-ivory"><div className="mx-auto max-w-6xl px-5 sm:px-8"><p className="eyebrow">The hands behind the craft</p><h2 className="max-w-3xl font-serif text-5xl leading-[.95] sm:text-7xl">Explore the hands behind the <em className="text-wine">craft.</em></h2><div className="mt-12 grid gap-5 md:grid-cols-3"><CraftCard image="/images/chikankari-ivory-pink.jpg" title="Chikankari" place="Lucknow, Uttar Pradesh" copy="Fine shadow-work and floral embroidery on muslin and organza." /><CraftCard image="/images/chikankari-green.jpg" title="The reverse" place="Where NAQSH starts" copy="Stitch structure carries evidence a certificate cannot." /><CraftCard image="/images/chikankari-outfit.jpg" title="The maker" place="A living record" copy="A named artisan, work days and a story worth keeping." /></div></div></section>

        <section ref={verifyRef} id="verify" className="naqsh-section bg-sage/60"><div className="mx-auto max-w-6xl px-5 sm:px-8"><p className="eyebrow">The moment of trust</p><h2 className="font-serif text-5xl leading-[.95] sm:text-7xl">Know what you&apos;re <em className="text-wine">holding.</em></h2><div className="my-8 flex flex-wrap gap-2 text-sm"><Step label="1 Identify" active={verificationState === 'idle'} done={verificationState !== 'idle'} /><Step label="2 Inspect" active={verificationState === 'reading'} done={verificationState === 'complete'} /><Step label="3 Evidence" active={activeRows >= 3 && verificationState === 'reading'} done={verificationState === 'complete'} /><Step label="4 Verify" active={verificationState === 'complete'} /></div><div className="naqsh-panel grid gap-8 lg:grid-cols-2"><div className="relative overflow-hidden rounded-2xl border border-rose/40 bg-gradient-to-br from-blush to-ivory p-8 text-center"><b className="font-serif text-4xl font-normal italic">Scan or upload</b><p className="mt-3 text-sm text-ink-muted">Hold the tag&apos;s QR code to your camera, or add a photo or certificate.</p><Link href="/scan" className="mt-6 inline-flex items-center gap-2 rounded-full border border-wine px-5 py-2.5 text-sm font-semibold text-wine hover:bg-wine hover:text-ivory"><Upload size={16} /> Open camera flow</Link></div><div><label htmlFor="verification-id" className="mb-2 block text-sm font-semibold">Or enter a verification ID</label><div className="flex gap-2"><input id="verification-id" value={verificationId} onChange={(event) => { setVerificationId(event.target.value); setVerificationError(''); }} onKeyDown={(event) => event.key === 'Enter' && beginVerification()} placeholder="NQ-2026-000000" className="min-w-0 flex-1 rounded-xl border border-ink/20 bg-white px-4 py-3 font-mono text-sm" /><button type="button" onClick={beginVerification} disabled={verificationState === 'reading'} className="rounded-xl bg-burgundy px-5 py-3 text-sm font-semibold text-ivory disabled:opacity-50">{verificationState === 'reading' ? 'Reading...' : 'Begin'}</button></div><p className="mt-2 min-h-6 text-sm text-red-800" role="alert">{verificationError}</p>{verificationState === 'reading' && <div className="mt-4" aria-live="polite"><span className="demo">DEMO VERIFICATION</span><h3 className="font-serif text-3xl italic">Reading the story of this piece...</h3><ul className="mt-3 space-y-1">{verificationRows.map(([label, value], index) => <li key={label} className={`flex justify-between border-b border-olive/20 py-2 text-sm transition-opacity ${index < activeRows ? 'opacity-100' : 'opacity-30'}`}><b className="text-xs tracking-wider">{label.toUpperCase()}</b><em className="not-italic text-green-800">{index < activeRows ? `✓ ${value}` : 'Waiting'}</em></li>)}</ul></div>}{verificationState === 'complete' && <VerificationResult onReset={() => setVerificationState('idle')} onViewTimeline={() => document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' })} />}</div></div></div></section>

        <section id="timeline" className="naqsh-section bg-ivory"><div className="mx-auto max-w-4xl px-5 sm:px-8"><p className="eyebrow">A record that stays with the piece</p><h2 className="font-serif text-5xl leading-[.95] sm:text-7xl">The life of one <em className="text-wine">piece.</em></h2><div className="mt-12 border-l border-rose pl-8">{[['Made', 'Date, place and artisan appear from the registered record.'], ['Certified', 'Issuing body and document reference.'], ['Registered', 'Entered into NAQSH with reviewer status.'], ['Verified', 'Evidence checked, confidence recorded.'], ['Owned', 'Pending. No purchase record on file.']].map(([title, copy], index) => <div key={title} className="relative pb-9"><span className={`absolute -left-[2.85rem] top-1 h-4 w-4 rounded-full border border-wine ${index === 4 ? 'border-dashed bg-ivory' : 'bg-blush'}`} /><h3 className="font-serif text-3xl italic text-wine">{title}</h3><p className="mt-1 text-sm text-ink-muted">{copy}</p></div>)}</div><Link href="/ledger/NQ-2026-001" className="inline-flex items-center gap-2 text-sm font-semibold text-wine hover:text-burgundy">View technical record <ArrowRight size={15} /></Link></div></section>

        <section id="artisans" className="naqsh-section bg-blush"><div className="mx-auto max-w-4xl px-5 sm:px-8"><p className="eyebrow text-center">A certificate worth keeping</p><h2 className="text-center font-serif text-5xl leading-[.95] sm:text-7xl">Record of <em className="text-wine">provenance.</em></h2><article className="certificate-card mt-12"><div className="border border-gold p-7 outline outline-1 outline-gold outline-offset-[-8px] sm:p-12"><span className="text-xs text-ink-muted">NAQSH · Sample certificate</span><h3 className="mt-2 font-serif text-4xl italic text-wine">NAQSH VERIFIED</h3><dl className="mt-7 grid grid-cols-[minmax(110px,1fr)_1.5fr] gap-3 text-sm"><dt className="text-ink-muted">Verification ID</dt><dd className="font-semibold">NQ-2026-001</dd><dt className="text-ink-muted">Craft</dt><dd className="font-semibold">Lucknow Chikankari</dd><dt className="text-ink-muted">Artisan</dt><dd className="font-semibold">Amina Begum</dd><dt className="text-ink-muted">Assessment</dt><dd className="font-semibold">Consistent with hand embroidery</dd></dl><div className="mt-7 flex items-end justify-between border-t border-gold/50 pt-5"><div className="qr-placeholder" role="img" aria-label="QR code placeholder" /><span className="text-xs text-ink-muted">Issued from registered record</span></div></div></article><div className="mt-6 flex flex-wrap justify-center gap-3"><button type="button" onClick={() => window.print()} className="rounded-full bg-burgundy px-5 py-2.5 text-sm font-semibold text-ivory">Download / print</button><button type="button" onClick={shareCertificate} className="rounded-full border border-wine px-5 py-2.5 text-sm font-semibold text-wine">{copied ? 'Link copied' : 'Share this piece'}</button><button type="button" onClick={() => verifyRef.current?.scrollIntoView({ behavior: 'smooth' })} className="rounded-full border border-wine px-5 py-2.5 text-sm font-semibold text-wine">View evidence</button></div></div></section>

        <section id="community" className="naqsh-section bg-ivory"><div className="mx-auto max-w-6xl px-5 sm:px-8"><p className="eyebrow">NAQSH Craft Commons</p><h2 className="max-w-3xl font-serif text-5xl leading-[.95] sm:text-7xl">Join the people who keep the story <em className="text-wine">going.</em></h2><p className="mt-6 max-w-xl leading-relaxed text-ink-muted">Field notes, artisan stories and new submissions, each marked Submitted, Reviewed or Published so you can see who stands behind it.</p><Link href="/cooperative" className="mt-8 inline-flex items-center gap-2 rounded-full bg-burgundy px-6 py-3 text-sm font-semibold text-ivory hover:bg-wine">Open the collective <ArrowRight size={16} /></Link></div></section>
      </main>
      <Footer />

      <button type="button" onClick={() => setAskOpen(true)} className="fixed bottom-5 right-5 z-30 rounded-full bg-burgundy px-5 py-3 text-sm font-semibold text-ivory shadow-lg shadow-burgundy/20 hover:bg-wine" aria-haspopup="dialog">Ask NAQSH</button>
      {askOpen && <aside className="fixed inset-y-0 right-0 z-40 flex w-full max-w-md flex-col gap-4 overflow-auto bg-ivory p-7 shadow-2xl" role="dialog" aria-modal="true" aria-label="Ask NAQSH"><button type="button" onClick={() => { setAskOpen(false); setAnswer(''); }} className="self-end rounded-full border border-wine p-2 text-wine" aria-label="Close Ask NAQSH"><X size={18} /></button><h2 className="font-serif text-4xl italic">What would you like to know?</h2>{Object.keys(answers).map((question) => <button type="button" key={question} onClick={() => setAnswer(answers[question])} className="rounded-xl border border-wine/30 bg-transparent p-4 text-left text-sm hover:bg-blush">{question}</button>)}{answer && <div className="rounded-xl bg-sage p-4 text-sm leading-relaxed">{answer}<small className="mt-3 block text-olive">Source: demo record NQ-2026-001</small></div>}</aside>}
    </div>
  );
}

function CraftCard({ image, title, place, copy }: { image: string; title: string; place: string; copy: string }) {
  return <Link href="/artisan" className="craft-card group"><div className="relative aspect-[4/5] overflow-hidden"><Image src={image} alt={title} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" /><div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" /><div className="absolute bottom-5 left-5 right-5 text-ivory"><h3 className="font-serif text-4xl italic">{title}</h3><p className="text-xs tracking-wide text-ivory/75">{place}</p><p className="mt-3 text-sm leading-relaxed text-ivory/80">{copy}</p></div></div></Link>;
}

function Step({ label, active, done }: { label: string; active?: boolean; done?: boolean }) {
  return <span className={`rounded-full border px-4 py-2 text-xs ${done ? 'border-green-700 bg-ivory text-green-800' : active ? 'border-wine bg-ivory font-semibold text-wine' : 'border-olive/30 text-olive'}`}>{done ? '✓ ' : ''}{label}</span>;
}

function VerificationResult({ onReset, onViewTimeline }: { onReset: () => void; onViewTimeline: () => void }) {
  return <div className="mt-6 grid gap-6 rounded-2xl bg-ivory p-6 shadow-xl shadow-olive/10 sm:grid-cols-2" aria-live="polite"><div><span className="demo">DEMO VERIFICATION</span><p className="font-serif text-6xl italic leading-none text-green-800">Verified</p><p className="mt-5 font-serif text-5xl text-wine">87%</p><p className="text-sm text-ink-muted">Evidence confidence</p><div className="mt-3 h-1 rounded bg-blush"><i className="block h-full w-[87%] rounded bg-wine" /></div><p className="mt-4 flex gap-2 text-xs leading-relaxed text-ink-muted"><Info size={14} className="shrink-0" /> Confidence reflects evidence on record. It is not a guarantee of authenticity.</p></div><div><h3 className="font-serif text-3xl italic">Why this result</h3><ul className="mt-3 space-y-2 text-sm text-green-800"><li>+ Certificate ID matches the registered record</li><li>+ Artisan record found</li><li>+ Region consistent with craft</li><li>+ Material consistent</li><li className="text-amber-800">! No purchase record on file</li></ul><div className="mt-5 flex flex-wrap gap-3"><button type="button" onClick={onViewTimeline} className="rounded-full bg-burgundy px-4 py-2 text-sm font-semibold text-ivory">See provenance</button><button type="button" onClick={onReset} className="rounded-full border border-wine px-4 py-2 text-sm font-semibold text-wine">Reset</button></div></div></div>;
}
