'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function PrecisionCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const targetPos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number>(0);

  useEffect(() => {
    // Only enable on desktop pointer devices (mouse/trackpad), not touch
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!hasFinePointer) return;

    const onMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    // Detect hoverable targets
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('a, button, [role="button"], input, textarea, select, summary, [data-cursor-hover]');
      setIsHovered(!!interactive);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousemove', handleElementHover, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Smooth lerp loop for the trailing ring
    const renderLoop = () => {
      if (prefersReducedMotion) {
        ringPos.current = { ...targetPos.current };
      } else {
        const ease = isHovered ? 0.22 : 0.15;
        ringPos.current.x += (targetPos.current.x - ringPos.current.x) * ease;
        ringPos.current.y += (targetPos.current.y - ringPos.current.y) * ease;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      rafId.current = requestAnimationFrame(renderLoop);
    };

    rafId.current = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousemove', handleElementHover);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible, isHovered]);

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-50 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* Precision Center Pinpoint */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none transition-all duration-150 ${
          isClicking
            ? 'w-1 h-1 bg-[#e945f5] scale-75'
            : isHovered
            ? 'w-1.5 h-1.5 bg-[#e945f5] scale-125'
            : 'w-1.5 h-1.5 bg-white/90'
        }`}
        style={{ willChange: 'transform' }}
      />

      {/* Subtle Precision Trailing Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none transition-[width,height,border-color,background-color,opacity] duration-300 ease-out border ${
          isClicking
            ? 'w-5 h-5 border-[#e945f5]/80 bg-[#e945f5]/15'
            : isHovered
            ? 'w-10 h-10 border-[#e945f5]/50 bg-[#e945f5]/5 backdrop-blur-[0.5px]'
            : 'w-6 h-6 border-white/25 bg-transparent'
        }`}
        style={{ willChange: 'transform' }}
      />
    </div>
  );
}
