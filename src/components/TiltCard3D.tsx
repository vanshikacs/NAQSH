'use client';

import React, { useRef } from 'react';

interface TiltCard3DProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  maxTilt?: number;
  className?: string;
}

export default function TiltCard3D({
  children,
  maxTilt = 9,
  className = '',
  ...props
}: TiltCard3DProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const glareRef = useRef<HTMLDivElement | null>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    const glare = glareRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    card.style.transform = `perspective(900px) rotateY(${(x - 0.5) * maxTilt}deg) rotateX(${(0.5 - y) * maxTilt}deg)`;

    if (glare) {
      glare.style.setProperty('--gx', `${x * 100}%`);
      glare.style.setProperty('--gy', `${y * 100}%`);
    }
  };

  const handlePointerLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = '';
  };

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`tilt-3d ${className}`}
      {...props}
    >
      <div ref={glareRef} className="glare-3d" aria-hidden="true" />
      {children}
    </div>
  );
}
