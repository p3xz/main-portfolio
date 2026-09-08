'use client';

import React from 'react';

interface HeroBackgroundProps {
  children?: React.ReactNode;
  className?: string;
}

export default function HeroBackground({ children, className = '' }: HeroBackgroundProps) {
  return (
    <div className={`relative w-full overflow-hidden bg-transparent ${className}`}>
      {/* Subtle Neutral Hero Focus */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}
