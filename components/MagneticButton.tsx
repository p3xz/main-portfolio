'use client';

import React from 'react';
import { useMagnetic } from '@/hooks/useMagnetic';

interface MagneticButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

export default function MagneticButton({
  children,
  strength = 0.35,
  className = '',
  ...props
}: MagneticButtonProps) {
  const ref = useMagnetic<HTMLDivElement>({ strength });

  return (
    <div ref={ref} className={`inline-block ${className}`} {...props}>
      {children}
    </div>
  );
}
