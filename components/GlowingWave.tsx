'use client';

import React, { useEffect, useRef } from 'react';
import './GlowingWave.css';

export interface GlowingWaveProps {
  color1?: string;
  color2?: string;
  waveCount?: number;
  speed?: number;
  amplitude?: number;
  opacity?: number;
  className?: string;
}

export default function GlowingWave({
  color1 = '#7C3AED',
  color2 = '#e945f5',
  waveCount = 4,
  speed = 0.6,
  amplitude = 50,
  opacity = 0.35,
  className = '',
}: GlowingWaveProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = (canvas.width = container.clientWidth || window.innerWidth);
    let height = (canvas.height = container.clientHeight || window.innerHeight);

    let dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const handleResize = () => {
      if (!container || !canvas) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    const ro = new ResizeObserver(handleResize);
    ro.observe(container);

    let animId = 0;
    let isVisible = true;
    let isPageVisible = !document.hidden;
    let time = 0;

    const render = () => {
      if (!isVisible || !isPageVisible) return;

      time += 0.012 * speed;
      ctx.clearRect(0, 0, width, height);

      const basePos = height * 0.55;

      for (let i = 0; i < waveCount; i++) {
        const progress = i / waveCount;
        const currentAmp = amplitude * (0.6 + 0.4 * Math.sin(time * 0.5 + i));
        const freq = 0.0025 + i * 0.0012;
        const phase = time + i * 1.4;

        ctx.beginPath();
        ctx.moveTo(0, height);

        for (let x = 0; x <= width; x += 10) {
          const y = basePos + Math.sin(x * freq + phase) * currentAmp + Math.cos(x * freq * 0.5 + time * 0.8) * (currentAmp * 0.5);
          if (x === 0) ctx.lineTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, basePos - amplitude, width, height);
        grad.addColorStop(0, i % 2 === 0 ? color1 : color2);
        grad.addColorStop(1, 'transparent');

        ctx.fillStyle = grad;
        ctx.globalAlpha = opacity * (0.25 + 0.15 * Math.sin(time + i));
        ctx.fill();

        // Wave stroke line with glow
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = i % 2 === 0 ? color2 : color1;
        ctx.globalAlpha = opacity * 0.6;
        ctx.stroke();
      }

      ctx.globalAlpha = 1.0;

      if (!prefersReducedMotion) {
        animId = requestAnimationFrame(render);
      }
    };

    const tryStart = () => {
      if (isVisible && isPageVisible && !animId) {
        animId = requestAnimationFrame(render);
      }
    };

    const tryStop = () => {
      if (animId) {
        cancelAnimationFrame(animId);
        animId = 0;
      }
    };

    const io = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      isVisible ? tryStart() : tryStop();
    }, { threshold: 0 });
    io.observe(container);

    const onVisibilityChange = () => {
      isPageVisible = !document.hidden;
      isPageVisible ? tryStart() : tryStop();
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    render();

    return () => {
      tryStop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [color1, color2, waveCount, speed, amplitude, opacity]);

  return (
    <div
      ref={containerRef}
      className={`glowing-wave-container ${className}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="block w-full h-full pointer-events-none" />
    </div>
  );
}
