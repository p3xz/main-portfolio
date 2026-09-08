'use client';

import React from 'react';

interface TechnicalLinesProps {
  className?: string;
}

export default function TechnicalLines({ className = '' }: TechnicalLinesProps) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none select-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full opacity-30 text-[#e945f5]"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="tech-line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e945f5" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#8400ff" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <pattern id="grid-dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="#ffffff" fillOpacity="0.07" />
          </pattern>
        </defs>

        {/* Background Dot Grid */}
        <rect width="100%" height="100%" fill="url(#grid-dots)" />

        {/* Perspective Technical Grid Lines */}
        <g stroke="url(#tech-line-grad)" strokeWidth="0.75" opacity="0.6">
          {/* Horizontal Grid Markers */}
          <line x1="40" y1="120" x2="1160" y2="120" strokeDasharray="4 8" />
          <line x1="40" y1="400" x2="1160" y2="400" strokeDasharray="2 12" opacity="0.4" />
          <line x1="40" y1="680" x2="1160" y2="680" strokeDasharray="4 8" />

          {/* Vertical Technical Grid Markers */}
          <line x1="120" y1="40" x2="120" y2="760" strokeDasharray="6 6" opacity="0.3" />
          <line x1="600" y1="40" x2="600" y2="760" strokeDasharray="1 10" opacity="0.2" />
          <line x1="1080" y1="40" x2="1080" y2="760" strokeDasharray="6 6" opacity="0.3" />

          {/* Concentric Technical Orbital Lines */}
          <circle cx="900" cy="400" r="280" stroke="#e945f5" strokeOpacity="0.12" strokeDasharray="3 9" />
          <circle cx="900" cy="400" r="180" stroke="#8400ff" strokeOpacity="0.15" strokeDasharray="8 6" />
          <circle cx="900" cy="400" r="380" stroke="#ffffff" strokeOpacity="0.05" strokeDasharray="2 16" />
        </g>

        {/* Coordinate Corner Crosshairs */}
        <g stroke="#ffffff" strokeOpacity="0.25" strokeWidth="1">
          {/* Top Left Crosshair */}
          <path d="M 60 70 L 60 90 M 50 80 L 70 80" />
          {/* Top Right Crosshair */}
          <path d="M 1140 70 L 1140 90 M 1130 80 L 1150 80" />
          {/* Bottom Left Crosshair */}
          <path d="M 60 710 L 60 730 M 50 720 L 70 720" />
        </g>

        {/* Technical Typography & Labels */}
        <g fill="#ffffff" fillOpacity="0.35" fontSize="10" fontFamily="monospace">
          <text x="75" y="84" letterSpacing="2">SYS.01 // SYSTEM_READY</text>
          <text x="1050" y="84" letterSpacing="1" textAnchor="end">LAT. 28°N / LON. 77°E</text>
          <text x="75" y="724" letterSpacing="1.5">STACK // FULL_STACK_DEV</text>
          <text x="1050" y="724" letterSpacing="1.5" textAnchor="end">BUILD // 2026</text>
        </g>

        {/* Decorative Vector Nodes */}
        <g fill="#e945f5" fillOpacity="0.5">
          <circle cx="120" cy="120" r="2.5" />
          <circle cx="1080" cy="120" r="2.5" />
          <circle cx="120" cy="680" r="2.5" />
          <circle cx="1080" cy="680" r="2.5" />
        </g>
      </svg>
    </div>
  );
}
