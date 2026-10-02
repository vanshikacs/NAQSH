import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-ivory-deep border-t border-blush mt-20 py-14 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Top row */}
        <div className="flex flex-col md:flex-row justify-between gap-10 mb-12">
          <div className="max-w-sm">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="font-serif text-3xl text-burgundy font-semibold">NAQSH</span>
              <span className="font-urdu text-2xl text-wine font-medium" dir="rtl">نقش</span>
            </div>
            <p className="font-serif italic text-wine text-base mb-2">
              "Har Dhaage Ki Kahani"
            </p>
            <p className="text-xs text-ink-muted leading-relaxed font-body">
              A provenance and trust protocol for Indian heritage textiles and crafts. AI-assisted stitch forensics, verified artisan lineages, and cooperative earnings transparency.
            </p>
            <p className="text-[11px] text-olive mt-3 font-mono">
              Preserving GI-tagged Lucknow Chikankari, Banarasi Brocade & Kadhwa weaving.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs">
            <div>
              <p className="font-mono uppercase tracking-widest text-ink font-bold mb-3 text-[10px]">
                Platform
              </p>
              <ul className="space-y-2.5">
                <FooterLink href="/scan">Verify a Garment</FooterLink>
                <FooterLink href="/artisan">Artisans & Guilds</FooterLink>
                <FooterLink href="/community">Community Commons</FooterLink>
                <FooterLink href="/search">Registry Search</FooterLink>
              </ul>
            </div>

            <div>
              <p className="font-mono uppercase tracking-widest text-ink font-bold mb-3 text-[10px]">
                Portals
              </p>
              <ul className="space-y-2.5">
                <FooterLink href="/dashboard">Buyer Dashboard</FooterLink>
                <FooterLink href="/artisan/dashboard">Artisan Portal</FooterLink>
                <FooterLink href="/curator/dashboard">Curator Review</FooterLink>
                <FooterLink href="/admin/dashboard">Admin Governance</FooterLink>
              </ul>
            </div>

            <div>
              <p className="font-mono uppercase tracking-widest text-ink font-bold mb-3 text-[10px]">
                Protocol
              </p>
              <ul className="space-y-2.5">
                <FooterLink href="/about">How NAQSH Works</FooterLink>
                <FooterLink href="/vakh">Vakh Submission Dossier</FooterLink>
                <FooterLink href="/artisan/onboard">Artisan Onboarding</FooterLink>
                <FooterLink href="/verify/NQ-2026-001">Sample Certificate</FooterLink>
              </ul>
            </div>
          </div>
        </div>

        {/* Stitch divider */}
        <div className="stitch-divider mb-6">
          <span className="text-xs text-blush-mid font-body font-mono">✦ NAQSH · نقش ✦</span>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-ink-muted text-xs">
          <p className="font-mono text-[11px]">
            NAQSH Protocol — Cultural heritage provenance & verification engine.
          </p>
          <p className="text-[11px]">
            AI visual forensics provides probabilistic assessment and does not replace destructive chemical fiber testing.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="text-ink-muted hover:text-burgundy transition-colors font-body"
      >
        {children}
      </Link>
    </li>
  );
}