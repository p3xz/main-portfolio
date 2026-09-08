'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import WireframeBall from '@/components/WireframeBall';
import ButtonWithIconDemo from '@/components/ui/button-witn-icon';
import { Github, Linkedin, Mail, ArrowUpRight, ArrowDown } from 'lucide-react';

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const ballWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const contentEl = contentRef.current;
    const ballEl = ballWrapperRef.current;

    if (!sectionEl || !contentEl || !ballEl) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Clean, fast entry timeline (settles in 0.6s)
      gsap.fromTo(
        contentEl.children,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.08,
          ease: 'power3.out',
        }
      );

      gsap.fromTo(
        ballEl,
        { opacity: 0, scale: 0.94 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.85,
          ease: 'power2.out',
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-[92dvh] flex items-center justify-center pt-28 pb-16 px-6 sm:px-8"
    >
      <div className="w-full max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column — Clean Typographic Content */}
          <div ref={contentRef} className="lg:col-span-7 flex flex-col justify-center gap-6 z-10">
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 w-fit text-xs text-neutral-300 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for Software Engineering Roles</span>
            </div>

            {/* Clear Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08]">
              Software Engineer building performant web applications and distributed systems.
            </h1>

            {/* Description */}
            <p className="text-neutral-400 text-base sm:text-lg leading-relaxed max-w-xl">
              I design and develop robust full-stack software using{' '}
              <span className="text-neutral-200 font-medium">TypeScript, Next.js, Java, Python, and SQL</span>,
              combining clean architectural principles with modern frontend craft.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-white text-neutral-950 hover:bg-neutral-200 text-sm font-semibold transition-colors shadow-sm focus-visible:outline-2 focus-visible:outline-white"
              >
                View Projects
                <ArrowDown className="w-4 h-4" />
              </a>

              <ButtonWithIconDemo
                label="Contact Me"
                href="/contact"
                className="bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/15"
              />

              {/* Social Links */}
              <div className="flex items-center gap-1.5 sm:pl-3 sm:border-l sm:border-white/10">
                <a
                  href="https://github.com/p3xz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-md text-neutral-400 hover:text-white hover:bg-white/[0.05] transition-colors focus-visible:outline-2 focus-visible:outline-white/40"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>

                <a
                  href="https://www.linkedin.com/in/namish-yadav-639769408/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-md text-neutral-400 hover:text-white hover:bg-white/[0.05] transition-colors focus-visible:outline-2 focus-visible:outline-white/40"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>

                <a
                  href="mailto:nam4sh@gmail.com"
                  className="p-2.5 rounded-md text-neutral-400 hover:text-white hover:bg-white/[0.05] transition-colors focus-visible:outline-2 focus-visible:outline-white/40"
                  aria-label="Send Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column — Subtle WebGL Wireframe Anchor */}
          <div
            ref={ballWrapperRef}
            className="lg:col-span-5 relative flex items-center justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[380px] aspect-square">
              <WireframeBall className="w-full h-full" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}