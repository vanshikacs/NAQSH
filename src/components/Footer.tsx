import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-ivory-deep border-t border-blush mt-20 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Top row */}
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-10">
          <div className="max-w-xs">
            <p className="font-serif text-2xl text-burgundy font-semibold mb-2">NAQSH</p>
            <p className="text-xs text-ink-muted leading-relaxed font-body">
              AI verifies the hand.<br />We preserve the story.
            </p>
            <p className="text-xs text-ink-muted mt-3 leading-relaxed" style={{ fontSize: '11px' }}>
              Prototype platform for Lucknow chikankari authenticity and artisan provenance.
              All data shown is for demonstration purposes only.
            </p>
          </div>

          <div className="flex gap-12">
            <div>
              <p className="text-xs font-body font-semibold text-ink-soft tracking-widest uppercase mb-3" style={{ fontSize: '10px' }}>
                Platform
              </p>
              <ul className="space-y-2">
                <FooterLink href="/scan">Verify Garment</FooterLink>
                <FooterLink href="/demo">Demo Mode</FooterLink>
                <FooterLink href="/cooperative">Cooperative</FooterLink>
                <FooterLink href="/artisan">Artisans</FooterLink>
              </ul>
            </div>
            <div>
              <p className="text-xs font-body font-semibold text-ink-soft tracking-widest uppercase mb-3" style={{ fontSize: '10px' }}>
                Learn
              </p>
              <ul className="space-y-2">
                <FooterLink href="/about">About NAQSH</FooterLink>
                <FooterLink href="/about#why-ai">Why Vision?</FooterLink>
                <FooterLink href="/about#why-ledger">Why Ledger?</FooterLink>
                <FooterLink href="/about#trust-layers">Three Layers</FooterLink>
              </ul>
            </div>
          </div>
        </div>

        {/* Stitch divider */}
        <div className="stitch-divider mb-6">
          <span className="text-xs text-blush-mid font-body" style={{ fontSize: '10px' }}>✦</span>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <p className="text-xs text-ink-muted font-body" style={{ fontSize: '11px' }}>
            NAQSH Prototype — Hackathon demonstration. All verification data is simulated.
          </p>
          <p className="text-xs text-ink-muted font-body" style={{ fontSize: '11px' }}>
            AI assessment is not a substitute for laboratory-grade authentication.
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
        className="text-sm text-ink-muted hover:text-burgundy transition-colors font-body"
        style={{ fontSize: '13px' }}
      >
        {children}
      </Link>
    </li>
  );
}
