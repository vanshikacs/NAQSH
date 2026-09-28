'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VerificationBadge from '@/components/VerificationBadge';
import {
  GARMENTS,
  ARTISANS,
  getArtisanById,
  formatCurrency,
  COOPERATIVES,
} from '@/lib/data/seedData';
import { formatDate } from '@/lib/utils';
import { ChevronRight, TrendingUp, Shield } from 'lucide-react';

type FilterType = 'all' | 'consistent' | 'review' | 'inconsistent' | 'duplicate';

export default function CooperativePage() {
  const [filter, setFilter] = useState<FilterType>('all');

  const totalEarnings = GARMENTS.reduce((sum, g) => sum + g.artisanEarnings, 0);
  const verifiedCount = GARMENTS.filter((g) => g.verificationStatus === 'consistent').length;
  const reviewCount = GARMENTS.filter((g) => g.verificationStatus === 'review').length;
  const flaggedCount = GARMENTS.filter((g) => g.activationStatus === 'duplicate_flag').length;
  const inconsistentCount = GARMENTS.filter((g) => g.verificationStatus === 'inconsistent').length;

  const filteredGarments = GARMENTS.filter((g) => {
    if (filter === 'all') return true;
    if (filter === 'duplicate') return g.activationStatus === 'duplicate_flag';
    return g.verificationStatus === filter;
  });

  const FILTERS: { key: FilterType; label: string; count: number }[] = [
    { key: 'all', label: 'All', count: GARMENTS.length },
    { key: 'consistent', label: 'Verified', count: verifiedCount },
    { key: 'review', label: 'Review', count: reviewCount },
    { key: 'inconsistent', label: 'Inconsistent', count: inconsistentCount },
    { key: 'duplicate', label: 'Flagged', count: flaggedCount },
  ];

  return (
    <div className="min-h-screen bg-ivory">
      <Navbar />

      <main className="pt-20 pb-20 px-4">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p
                className="text-xs font-body font-medium tracking-widest uppercase text-rose mb-2"
                style={{ fontSize: '10px', letterSpacing: '0.18em' }}
              >
                NAQSH
              </p>
              <h1 className="font-serif text-3xl sm:text-4xl text-ink">Cooperative Console</h1>
              <p className="text-sm text-ink-muted font-body mt-1">
                {COOPERATIVES[0].name} · {COOPERATIVES[0].location}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Shield size={14} className="text-sage" aria-hidden="true" />
              <p className="text-xs font-body text-ink-muted">Protected by NAQSH Ledger</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
            <StatCard label="Total Pieces" value={GARMENTS.length.toString()} />
            <StatCard label="Verified" value={verifiedCount.toString()} color="#2d6a2d" />
            <StatCard label="Under Review" value={reviewCount.toString()} color="#8a6b00" />
            <StatCard label="Inconsistent" value={inconsistentCount.toString()} color="#8a2c2c" />
            <StatCard label="Artisans" value={ARTISANS.length.toString()} />
            <StatCard
              label="Artisan Earnings"
              value={formatCurrency(totalEarnings)}
              small
            />
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-3 py-1.5 rounded text-xs font-body font-medium transition-colors ${
                  filter === f.key
                    ? 'bg-burgundy text-white'
                    : 'bg-ivory-deep border border-blush text-ink-muted hover:border-wine hover:text-wine'
                }`}
                aria-pressed={filter === f.key}
              >
                {f.label}{' '}
                <span className={filter === f.key ? 'opacity-70' : 'opacity-60'}>
                  ({f.count})
                </span>
              </button>
            ))}
          </div>

          {/* Table - desktop */}
          <div className="hidden md:block card-naqsh overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="w-full" role="table" aria-label="Garments register">
                <thead>
                  <tr className="border-b border-blush bg-ivory-deep">
                    {['Garment', 'Artisan', 'Craft', 'AI Status', 'Work', 'Earnings', 'Registered', ''].map(
                      (h) => (
                        <th
                          key={h}
                          className="px-4 py-3 text-left text-xs font-body font-semibold text-ink-muted tracking-wide"
                          scope="col"
                        >
                          {h}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {filteredGarments.map((garment) => {
                    const artisan = getArtisanById(garment.artisanId);
                    return (
                      <tr
                        key={garment.id}
                        className="border-b border-blush/50 hover:bg-ivory-deep transition-colors"
                      >
                        <td className="px-4 py-3">
                          <div>
                            <p className="font-mono text-xs text-ink font-medium">{garment.id}</p>
                            <p className="text-xs text-ink-muted font-body">{garment.garmentType}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm font-body text-ink">{artisan?.name ?? '—'}</p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm font-body text-ink-muted">{garment.craft}</p>
                        </td>
                        <td className="px-4 py-3">
                          <VerificationBadge
                            verdict={
                              garment.activationStatus === 'duplicate_flag'
                                ? 'duplicate'
                                : garment.verificationStatus
                            }
                            size="sm"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm font-body text-ink-muted">{garment.workDays}d</p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm font-body text-wine">{formatCurrency(garment.artisanEarnings)}</p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-xs font-body text-ink-muted">{formatDate(garment.createdAt)}</p>
                        </td>
                        <td className="px-4 py-3">
                          <Link
                            href={`/cooperative/garments/${garment.id}`}
                            className="text-xs font-body text-wine hover:text-burgundy font-medium flex items-center gap-1"
                            aria-label={`View details for ${garment.id}`}
                          >
                            View <ChevronRight size={12} aria-hidden="true" />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {filteredGarments.length === 0 && (
                <div className="py-10 text-center text-sm text-ink-muted font-body">
                  No garments in this category.
                </div>
              )}
            </div>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3 mb-8">
            {filteredGarments.map((garment) => {
              const artisan = getArtisanById(garment.artisanId);
              return (
                <div key={garment.id} className="card-naqsh p-4">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <p className="font-mono text-xs text-ink font-medium">{garment.id}</p>
                      <p className="text-xs text-ink-muted font-body">{garment.garmentType} · {garment.craft}</p>
                    </div>
                    <VerificationBadge
                      verdict={
                        garment.activationStatus === 'duplicate_flag'
                          ? 'duplicate'
                          : garment.verificationStatus
                      }
                      size="sm"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-ink-muted font-body">{artisan?.name}</p>
                      <p className="text-xs text-wine font-body font-medium">{formatCurrency(garment.artisanEarnings)}</p>
                    </div>
                    <Link
                      href={`/cooperative/garments/${garment.id}`}
                      className="text-xs font-body text-wine hover:text-burgundy font-medium"
                    >
                      View →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary */}
          <div className="card-naqsh p-5">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp size={14} className="text-wine" aria-hidden="true" />
              <p className="text-xs font-body font-semibold text-ink-soft">Earnings Overview</p>
            </div>
            <p className="font-serif text-3xl text-wine">{formatCurrency(totalEarnings)}</p>
            <p className="text-xs text-ink-muted font-body mt-1">
              Total recorded artisan earnings across {GARMENTS.length} pieces · {ARTISANS.length} artisans
            </p>
            <p className="text-xs text-ink-muted font-body mt-2 leading-relaxed" style={{ fontSize: '11px' }}>
              Reported by artisans / cooperative. NAQSH records, does not independently verify.
            </p>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

function StatCard({
  label,
  value,
  color,
  small,
}: {
  label: string;
  value: string;
  color?: string;
  small?: boolean;
}) {
  return (
    <div className="card-naqsh p-4">
      <p className="text-xs font-body text-ink-muted mb-1">{label}</p>
      <p
        className={`font-serif ${small ? 'text-lg' : 'text-2xl'} font-medium`}
        style={{ color: color ?? 'var(--ink)' }}
      >
        {value}
      </p>
    </div>
  );
}
