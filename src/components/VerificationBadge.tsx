'use client';

import { cn } from '@/lib/utils';
import { VerificationVerdict } from '@/lib/data/seedData';
import { CheckCircle, AlertCircle, XCircle, AlertTriangle } from 'lucide-react';

interface VerificationBadgeProps {
  verdict: VerificationVerdict | 'duplicate';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

const VERDICT_CONFIG = {
  consistent: {
    label: 'Verified',
    sublabel: 'Consistent with hand embroidery',
    icon: CheckCircle,
    className: 'badge-verified',
    color: '#2d6a2d',
    bg: '#f0f9f0',
    border: '#b8d8b8',
  },
  review: {
    label: 'Review',
    sublabel: 'AI assessment inconclusive',
    icon: AlertCircle,
    className: 'badge-review',
    color: '#8a6b00',
    bg: '#fef9ec',
    border: '#e8d488',
  },
  inconsistent: {
    label: 'Review Recommended',
    sublabel: 'Inconsistent with hand embroidery reference',
    icon: XCircle,
    className: 'badge-inconsistent',
    color: '#8a2c2c',
    bg: '#fdf0f0',
    border: '#e8b8b8',
  },
  duplicate: {
    label: 'Possible Duplicate',
    sublabel: 'Digital identity reuse detected',
    icon: AlertTriangle,
    className: 'badge-duplicate',
    color: '#8a4a00',
    bg: '#fdf4ec',
    border: '#e8c888',
  },
} as const;

export default function VerificationBadge({
  verdict,
  size = 'md',
  showLabel = true,
  className,
}: VerificationBadgeProps) {
  const config = VERDICT_CONFIG[verdict] ?? VERDICT_CONFIG.review;
  const Icon = config.icon;

  const iconSize = size === 'sm' ? 14 : size === 'lg' ? 22 : 17;
  const textSize = size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm';

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 rounded px-3 py-1.5 font-body font-medium',
        textSize,
        config.className,
        className
      )}
      style={{ backgroundColor: config.bg, color: config.color, borderColor: config.border }}
      role="status"
      aria-label={`Verification status: ${config.label}`}
    >
      <Icon size={iconSize} aria-hidden="true" />
      {showLabel && (
        <span>{config.label}</span>
      )}
    </div>
  );
}

export function VerificationStatusCard({
  verdict,
  confidence,
  mode,
}: {
  verdict: VerificationVerdict | 'duplicate';
  confidence?: number;
  mode?: 'demo' | 'live';
}) {
  const config = VERDICT_CONFIG[verdict] ?? VERDICT_CONFIG.review;
  const Icon = config.icon;

  return (
    <div
      className="rounded-lg p-6 border text-center"
      style={{ backgroundColor: config.bg, borderColor: config.border }}
      role="status"
    >
      <Icon
        size={44}
        style={{ color: config.color }}
        className="mx-auto mb-3"
        aria-hidden="true"
      />
      <p
        className="font-serif text-2xl font-semibold mb-1"
        style={{ color: config.color }}
      >
        {config.label}
      </p>
      <p className="text-sm font-body" style={{ color: config.color, opacity: 0.8 }}>
        {config.sublabel}
      </p>
      {confidence !== undefined && (
        <p
          className="text-xs mt-2 font-body"
          style={{ color: config.color, opacity: 0.7 }}
        >
          AI confidence: {Math.round(confidence * 100)}%
        </p>
      )}
      {mode && (
        <p
          className="text-xs mt-1 font-body"
          style={{ color: config.color, opacity: 0.6 }}
        >
          {mode === 'demo' ? 'NAQSH Vision — Demo mode' : 'NAQSH Vision — Live assessment'}
        </p>
      )}
    </div>
  );
}
