'use client';

import React, { useEffect, useRef } from 'react';

export default function ScrollStitchProgress() {
  const pathRef = useRef<SVGPathElement | null>(null);
  const dotRef = useRef<SVGCircleElement | null>(null);

  useEffect(() => {
    const path = pathRef.current;
    const dot = dotRef.current;
    if (!path || !dot) return;

    let length = 1000;
    try {
      length = path.getTotalLength();
    } catch {
      length = 1000;
    }
    path.style.strokeDasharray = String(length);
    path.style.strokeDashoffset = String(length);

    const onScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      const progress = Math.min(Math.max(window.scrollY / scrollHeight, 0), 1);

      path.style.strokeDashoffset = String(length * (1 - progress));
      try {
        const point = path.getPointAtLength(length * progress);
        dot.setAttribute('cx', String(point.x));
        dot.setAttribute('cy', String(point.y));
      } catch {}
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <svg
      id="sp"
      viewBox="0 0 30 1000"
      preserveAspectRatio="none"
      aria-hidden="true"
      className="fixed left-2 sm:left-4 top-0 h-screen w-7 sm:w-8 z-50 pointer-events-none"
    >
      <path
        ref={pathRef}
        d="M15 0 C 30 100,0 200,15 300 S 30 500,15 600 S 0 800,15 1000"
        fill="none"
        stroke="#8E3B55"
        strokeWidth="2"
        strokeLinecap="round"
        style={{ opacity: 0.85 }}
      />
      <circle
        ref={dotRef}
        r="4.5"
        fill="#8E3B55"
        cx="15"
        cy="0"
        style={{ filter: 'drop-shadow(0 0 5px rgba(142,59,85,0.9))' }}
      />
    </svg>
  );
}
