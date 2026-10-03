'use client';

import React, { useState } from 'react';
import { ShoppingBag, Loader2 } from 'lucide-react';

interface BuyButtonProps {
  garmentId: string;
  garmentName: string;
  craft?: string;
  artisanName?: string;
  artisanId?: string;
  amountInr: number;
  className?: string;
  variant?: 'pill' | 'compact' | 'primary';
}

export default function BuyButton({
  garmentId,
  garmentName,
  craft = 'Indian Heritage Craft',
  artisanName = 'Master Artisan',
  artisanId = '',
  amountInr,
  className = '',
  variant = 'pill',
}: BuyButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleBuy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          garmentId,
          garmentName,
          craft,
          artisanName,
          artisanId,
          amountInr,
          returnUrl: typeof window !== 'undefined' ? window.location.href : undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error || 'Failed to start Stripe checkout');
      }

      // Redirect directly to Stripe Checkout
      window.location.href = data.url;
    } catch (err: any) {
      console.error('Buy error:', err);
      setError(err?.message || 'Payment unavailable');
      setLoading(false);
    }
  };

  if (variant === 'compact') {
    return (
      <button
        onClick={handleBuy}
        disabled={loading}
        title={error || `Buy ${garmentName} for ₹${amountInr}`}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold font-body transition-all duration-200 ${
          loading
            ? 'bg-wine/70 text-white cursor-wait'
            : 'bg-burgundy hover:bg-wine text-ivory hover:shadow-md active:scale-95'
        } ${className}`}
      >
        {loading ? (
          <>
            <Loader2 size={12} className="animate-spin" />
            <span>Securing...</span>
          </>
        ) : (
          <>
            <ShoppingBag size={12} />
            <span>Buy</span>
          </>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={handleBuy}
      disabled={loading}
      className={`inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold font-body transition-all duration-200 ${
        loading
          ? 'bg-wine/70 text-white cursor-wait'
          : 'bg-burgundy hover:bg-wine text-ivory shadow-xs hover:shadow-md active:scale-95'
      } ${className}`}
    >
      {loading ? (
        <>
          <Loader2 size={13} className="animate-spin" />
          <span>Connecting Stripe...</span>
        </>
      ) : (
        <>
          <ShoppingBag size={13} />
          <span>Buy · ₹{amountInr.toLocaleString('en-IN')}</span>
        </>
      )}
    </button>
  );
}
