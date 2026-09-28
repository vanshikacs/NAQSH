'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-ivory/95 backdrop-blur-sm border-b border-blush">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group" aria-label="NAQSH home">
          <span
            className="font-serif text-2xl font-semibold text-burgundy tracking-tight"
            style={{ letterSpacing: '-0.02em' }}
          >
            NAQSH
          </span>
          <span
            className="hidden sm:block text-xs text-ink-muted font-body tracking-widest uppercase mt-1"
            style={{ fontSize: '9px', letterSpacing: '0.15em' }}
          >
            Craft Verification
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7">
          <NavLink href="/demo">Demo</NavLink>
          <NavLink href="/cooperative">Dashboard</NavLink>
          <NavLink href="/artisan">Artisans</NavLink>
          <NavLink href="/about">About</NavLink>
          <Link
            href="/scan"
            className="ml-2 px-4 py-1.5 bg-burgundy text-white text-sm font-body rounded font-medium
                       hover:bg-wine transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose"
          >
            Verify Garment
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-ink-soft hover:text-burgundy transition-colors"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-ivory border-t border-blush px-4 py-4 flex flex-col gap-3">
          <MobileNavLink href="/demo" onClick={() => setOpen(false)}>Demo</MobileNavLink>
          <MobileNavLink href="/cooperative" onClick={() => setOpen(false)}>Cooperative Dashboard</MobileNavLink>
          <MobileNavLink href="/artisan" onClick={() => setOpen(false)}>Artisans</MobileNavLink>
          <MobileNavLink href="/about" onClick={() => setOpen(false)}>About NAQSH</MobileNavLink>
          <Link
            href="/scan"
            onClick={() => setOpen(false)}
            className="mt-1 w-full py-2.5 bg-burgundy text-white text-sm font-body rounded font-medium text-center
                       hover:bg-wine transition-colors"
          >
            Verify Garment
          </Link>
        </div>
      )}
    </nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-sm text-ink-muted hover:text-burgundy transition-colors font-body"
    >
      {children}
    </Link>
  );
}

function MobileNavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="py-2 text-base text-ink-soft hover:text-burgundy transition-colors font-body border-b border-blush/50"
    >
      {children}
    </Link>
  );
}
