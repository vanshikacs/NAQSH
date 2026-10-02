"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, Search, Play } from "lucide-react";
import { useAuth } from "@/lib/auth/authContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { role } = useAuth();

  const dashPath =
    role === "artisan"
      ? "/artisan/dashboard"
      : role === "curator"
      ? "/curator/dashboard"
      : role === "admin"
      ? "/admin/dashboard"
      : "/dashboard";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-ivory/95 backdrop-blur-md border-b border-blush/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo with Urdu Typography */}
        <Link href="/" className="flex items-center gap-3 group" aria-label="NAQSH home">
          <div className="flex items-baseline gap-1.5">
            <span
              className="font-serif text-2xl sm:text-3xl font-semibold text-burgundy tracking-tight group-hover:text-wine transition-colors"
              style={{ letterSpacing: "-0.02em" }}
            >
              NAQSH
            </span>
            <span
              className="font-urdu text-xl sm:text-2xl text-wine font-normal select-none transition-transform group-hover:scale-105"
              dir="rtl"
              title="نقش"
            >
              نقش
            </span>
          </div>
          <div className="hidden sm:flex flex-col border-l border-blush pl-2.5">
            <span className="text-[9px] font-mono tracking-[0.16em] uppercase text-ink-muted leading-tight font-semibold">
              Har Dhaage Ki Kahani
            </span>
            <span className="text-[9px] font-urdu text-olive/80 leading-tight" dir="rtl">
              ہر دھاگے کی کہانی
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink href="/scan">Verify</NavLink>
          <NavLink href="/artisan">Artisans</NavLink>
          <NavLink href="/community">Community</NavLink>
          <NavLink href="/about">How It Works</NavLink>
          {role !== "visitor" && <NavLink href={dashPath}>My Dashboard</NavLink>}
          <Link
            href="/search"
            className="p-1.5 text-ink-muted hover:text-burgundy transition-colors rounded-full hover:bg-blush/40"
            aria-label="Search Registry"
            title="Search crafts, artisans, and techniques"
          >
            <Search size={16} />
          </Link>
          <button
            onClick={() => {
              const e = new CustomEvent("open-guided-demo");
              window.dispatchEvent(e);
            }}
            className="ml-1 px-4 py-2 bg-burgundy text-white text-xs font-semibold rounded-full hover:bg-wine transition-all flex items-center gap-1.5 shadow-sm hover:shadow-md"
          >
            <Play size={11} fill="currentColor" /> Live Demo
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-ink-soft hover:text-burgundy transition-colors rounded-lg"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="md:hidden bg-ivory border-t border-blush px-5 py-5 flex flex-col gap-3.5 shadow-xl">
          <div className="flex items-center justify-between pb-2 border-b border-blush/60">
            <span className="font-urdu text-lg text-wine" dir="rtl">نقش — ہر دھاگے کی کہانی</span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-olive font-bold">Menu</span>
          </div>
          <MobileNavLink href="/scan" onClick={() => setOpen(false)}>Verify a Piece</MobileNavLink>
          <MobileNavLink href="/artisan" onClick={() => setOpen(false)}>Artisans & Guilds</MobileNavLink>
          <MobileNavLink href="/community" onClick={() => setOpen(false)}>Community & Field Notes</MobileNavLink>
          <MobileNavLink href="/search" onClick={() => setOpen(false)}>Search Registry</MobileNavLink>
          <MobileNavLink href="/about" onClick={() => setOpen(false)}>How It Works</MobileNavLink>
          {role !== "visitor" && (
            <MobileNavLink href={dashPath} onClick={() => setOpen(false)}>
              My Dashboard ({role})
            </MobileNavLink>
          )}
          <button
            onClick={() => {
              setOpen(false);
              const e = new CustomEvent("open-guided-demo");
              window.dispatchEvent(e);
            }}
            className="mt-2 w-full py-3 bg-burgundy text-white text-xs font-semibold rounded-full flex items-center justify-center gap-2 shadow-md"
          >
            <Play size={13} fill="currentColor" /> Launch Judge Demo Tour
          </button>
        </div>
      )}
    </nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-xs font-body font-semibold text-ink-muted hover:text-burgundy transition-colors">
      {children}
    </Link>
  );
}

function MobileNavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="py-2 text-sm text-ink-soft hover:text-burgundy transition-colors font-body font-medium border-b border-blush/30"
    >
      {children}
    </Link>
  );
}