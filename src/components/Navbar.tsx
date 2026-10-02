"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, Search, Play } from "lucide-react";
import { useAuth } from "@/lib/auth/authContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { role } = useAuth();

  const dashPath = role === "artisan" ? "/artisan/dashboard"
    : role === "curator" ? "/curator/dashboard"
    : role === "admin" ? "/admin/dashboard"
    : "/dashboard";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-ivory/95 backdrop-blur-sm border-b border-blush">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group" aria-label="NAQSH home">
          <span className="font-serif text-2xl font-semibold text-burgundy tracking-tight" style={{ letterSpacing: "-0.02em" }}>NAQSH</span>
          <span className="hidden sm:block text-ink-muted font-body tracking-widest uppercase mt-1" style={{ fontSize: "9px", letterSpacing: "0.15em" }}>Craft Verification</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <NavLink href="/scan">Verify</NavLink>
          <NavLink href="/artisan">Artisans</NavLink>
          <NavLink href="/community">Community</NavLink>
          <NavLink href="/about">How It Works</NavLink>
          {role !== "visitor" && <NavLink href={dashPath}>My Dashboard</NavLink>}
          <Link href="/search" className="text-ink-muted hover:text-burgundy transition-colors" aria-label="Search"><Search size={16} /></Link>
          <button onClick={() => { const e = new CustomEvent("open-guided-demo"); window.dispatchEvent(e); }} className="ml-1 px-4 py-1.5 bg-burgundy text-white text-xs font-semibold rounded-full hover:bg-wine transition-colors flex items-center gap-1.5 shadow-sm">
            <Play size={12} fill="currentColor" /> Live Demo
          </button>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-ink-soft hover:text-burgundy transition-colors" aria-label={open ? "Close menu" : "Open menu"}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-ivory border-t border-blush px-4 py-4 flex flex-col gap-3">
          <MobileNavLink href="/scan" onClick={() => setOpen(false)}>Verify a Piece</MobileNavLink>
          <MobileNavLink href="/artisan" onClick={() => setOpen(false)}>Artisans</MobileNavLink>
          <MobileNavLink href="/community" onClick={() => setOpen(false)}>Community</MobileNavLink>
          <MobileNavLink href="/search" onClick={() => setOpen(false)}>Search Registry</MobileNavLink>
          <MobileNavLink href="/about" onClick={() => setOpen(false)}>How It Works</MobileNavLink>
          {role !== "visitor" && <MobileNavLink href={dashPath} onClick={() => setOpen(false)}>My Dashboard</MobileNavLink>}
          <button onClick={() => { setOpen(false); const e = new CustomEvent("open-guided-demo"); window.dispatchEvent(e); }} className="mt-1 w-full py-2.5 bg-burgundy text-white text-sm font-semibold rounded-full flex items-center justify-center gap-1.5">
            <Play size={13} fill="currentColor" /> Launch Judge Demo Tour
          </button>
        </div>
      )}
    </nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link href={href} className="text-sm text-ink-muted hover:text-burgundy transition-colors font-body">{children}</Link>;
}

function MobileNavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) {
  return <Link href={href} onClick={onClick} className="py-2 text-base text-ink-soft hover:text-burgundy transition-colors font-body border-b border-blush/50">{children}</Link>;
}