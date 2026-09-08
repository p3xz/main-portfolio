'use client';

import React, { useEffect, useRef } from 'react';
import './AsciiTiles.css';

export interface AsciiTilesProps {
  characters?: string;
  tileSize?: number;
  color?: string;
  dimColor?: string;
  highlightColor?: string;
  waveSpeed?: number;
  mouseRadius?: number;
  opacity?: number;
  className?: string;
}

export default function AsciiTiles({
  characters = ' .:-=+*#%@',
  tileSize = 24,
  color = '#7C3AED',
  dimColor = 'rgba(255, 255, 255, 0.07)',
  highlightColor = '#e945f5',
  waveSpeed = 0.8,
  mouseRadius = 160,
  opacity = 0.45,
  className = '',
}: AsciiTilesProps) {
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

    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      active: false,
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (prefersReducedMotion) return;
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

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

    const charList = characters.split('');
    const charLen = charList.length;

    const render = () => {
      if (!isVisible || !isPageVisible) return;

      time += 0.015 * waveSpeed;

      // Lerp mouse
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      ctx.clearRect(0, 0, width, height);
      ctx.font = `600 ${tileSize * 0.65}px "Geist Mono", "JetBrains Mono", monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const cols = Math.ceil(width / tileSize);
      const rows = Math.ceil(height / tileSize);

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const posX = x * tileSize + tileSize / 2;
          const posY = y * tileSize + tileSize / 2;

          // Spatial wave pattern
          const nx = x * 0.08;
          const ny = y * 0.08;
          const waveVal = Math.sin(nx + time) * Math.cos(ny + time * 0.8) + Math.sin((nx + ny) * 0.5 + time * 0.5);
          
          // Distance to mouse
          const dx = posX - mouse.x;
          const dy = posY - mouse.y;
          const dist = Math.hypot(dx, dy);
          const mouseFactor = mouse.active ? Math.max(0, 1 - dist / mouseRadius) : 0;

          // Normalized intensity [0, 1]
          let intensity = (waveVal + 2) / 4;
          intensity = Math.min(1, Math.max(0, intensity + mouseFactor * 0.7));

          // Character index based on intensity
          const charIdx = Math.min(charLen - 1, Math.floor(intensity * charLen));
          const char = charList[charIdx] || '.';

          if (mouseFactor > 0.3) {
            ctx.fillStyle = highlightColor;
            ctx.globalAlpha = opacity * (0.5 + mouseFactor * 0.5);
          } else if (intensity > 0.6) {
            ctx.fillStyle = color;
            ctx.globalAlpha = opacity * 0.7;
          } else {
            ctx.fillStyle = dimColor;
            ctx.globalAlpha = opacity * 0.4;
          }

          ctx.fillText(char, posX, posY);
        }
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

    // Initial render
    render();

    return () => {
      tryStop();
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [characters, tileSize, color, dimColor, highlightColor, waveSpeed, mouseRadius, opacity]);

  return (
    <div
      ref={containerRef}
      className={`ascii-tiles-container ${className}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="block w-full h-full pointer-events-none" />
    </div>
  );
}
