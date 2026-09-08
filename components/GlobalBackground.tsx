"use client";

import React from "react";

interface GlobalBackgroundProps {
  className?: string;
}

export default function GlobalBackground({ className = "" }: GlobalBackgroundProps) {
  return (
    <div
      className={`fixed inset-0 z-0 pointer-events-none overflow-hidden select-none ${className}`}
      aria-hidden="true"
    >
      {/* Subtle Ambient Radial Glow */}
      <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-white/[0.025] rounded-full blur-[120px] pointer-events-none" />
      
      {/* Subtle Dot Grid */}
      <div 
        className="absolute inset-0 opacity-[0.15]" 
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />

      {/* Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#09090b]/40 to-[#09090b]" />
    </div>
  );
}
