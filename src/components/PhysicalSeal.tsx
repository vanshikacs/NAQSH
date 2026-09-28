'use client';

import { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import { Printer, Shield, Check, Info } from 'lucide-react';

interface PhysicalSealProps {
  garmentId: string;
  sealId: string;
  garmentType: string;
  craft: string;
  isDuplicate?: boolean;
}

export default function PhysicalSeal({
  garmentId,
  sealId,
  garmentType,
  craft,
  isDuplicate = false,
}: PhysicalSealProps) {
  const [verifyUrl, setVerifyUrl] = useState(`/verify/${garmentId}`);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setVerifyUrl(`${window.location.origin}/verify/${garmentId}`);
    }
  }, [garmentId]);

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const handleCopyLink = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(verifyUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="card-naqsh p-6 relative overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Shield size={16} className="text-wine" aria-hidden="true" />
          <p
            className="text-xs font-body font-semibold text-ink-muted tracking-widest uppercase"
            style={{ fontSize: '10px', letterSpacing: '0.14em' }}
          >
            Physical Tamper-Evident Seal
          </p>
        </div>
        <span
          className="text-xs font-body px-2.5 py-0.5 rounded-full border border-blush text-ink-muted bg-ivory"
          style={{ fontSize: '10px' }}
        >
          Prototype physical binding
        </span>
      </div>

      <div
        className="mx-auto max-w-sm rounded-lg p-6 relative bg-[#FFFDF9] border-2 border-dashed border-[#D4B8B3] shadow-sm my-3 select-none"
        style={{
          backgroundImage: 'radial-gradient(#E8D7D2 0.75px, transparent 0.75px), radial-gradient(#E8D7D2 0.75px, #FFFDF9 0.75px)',
          backgroundSize: '16px 16px',
          backgroundPosition: '0 0, 8px 8px',
        }}
      >
        <div className="flex justify-between items-center text-[10px] text-ink-muted border-b border-blush/80 pb-3 mb-4">
          <div className="flex items-center gap-1.5">
            <span className="font-serif font-bold text-wine tracking-wider text-sm">NAQSH</span>
            <span className="text-[9px] uppercase tracking-widest text-ink-muted">· ATELIER</span>
          </div>
          <span className="font-mono text-[10px] text-ink-muted tracking-tight">{garmentId}</span>
        </div>

        <div className="flex items-center gap-4 bg-white/90 p-3 rounded border border-blush/60 backdrop-blur-xs">
          <div className="bg-white p-1.5 rounded border border-blush/40 flex-shrink-0 shadow-xs">
            <QRCode
              value={verifyUrl}
              size={84}
              level="M"
              fgColor="#1A1210"
              bgColor="#FFFFFF"
            />
          </div>

          <div className="flex-1 min-w-0 text-left">
            <p className="font-mono text-xs font-semibold text-ink truncate mb-0.5">{sealId}</p>
            <p className="text-[11px] font-body text-ink-muted leading-tight mb-2">
              {garmentType} · {craft}
            </p>
            <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-mono uppercase tracking-wider bg-blush/40 text-wine border border-rose/30">
              <span className="w-1.5 h-1.5 rounded-full bg-wine animate-pulse" />
              Tamper-Evident
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-blush/80 flex items-center justify-between text-[10px] font-mono text-ink-muted">
          <span>SECURE SERIAL #{sealId.split('-').pop()}</span>
          <span className="text-wine">SEAL BREAKS ON REMOVAL</span>
        </div>
      </div>

      <div className="mt-4 flex items-start gap-2 text-xs text-ink-muted font-body leading-relaxed bg-ivory rounded p-3">
        <Info size={14} className="text-wine flex-shrink-0 mt-0.5" aria-hidden="true" />
        <p style={{ fontSize: '11px' }}>
          <strong>Physical Binding Philosophy:</strong> The digital record does not exist in isolation.
          The physical seal is woven onto the reverse seam and is designed to visibly tear upon detachment,
          ensuring the garment cannot be swapped while keeping the digital identity.
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 no-print">
        <button
          onClick={handleCopyLink}
          className="text-xs font-body text-wine hover:text-burgundy transition-colors font-medium flex items-center gap-1.5"
        >
          {copied ? <Check size={13} className="text-green-600" /> : null}
          {copied ? 'QR Link Copied' : 'Copy Verification URL'}
        </button>

        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-ivory-deep border border-blush hover:border-wine hover:text-wine text-xs font-body text-ink transition-colors font-medium"
        >
          <Printer size={13} aria-hidden="true" /> Print / Save Demo Seal
        </button>
      </div>
    </div>
  );
}
