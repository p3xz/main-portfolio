"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ArrowLeft, Home, FolderGit2, Terminal, AlertTriangle } from "lucide-react";
import GlobalBackground from "@/components/GlobalBackground";

export function NotFoundPage() {
  const router = useRouter();
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.children,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="relative min-h-screen bg-[#09090b] text-white flex items-center justify-center px-6 py-16 overflow-hidden font-sans">
      <GlobalBackground />

      <div
        ref={containerRef}
        className="relative z-10 w-full max-w-xl mx-auto text-center flex flex-col items-center gap-6"
      >
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-neutral-300">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          <span>HTTP 404: Page Not Found</span>
        </div>

        {/* Animated Illustration Frame */}
        <div className="relative w-full max-w-md aspect-[16/10] sm:aspect-[16/11] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-white flex items-center justify-center group">
          {/* Animated Background Graphic */}
          <div
            className="absolute inset-0 bg-[url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif')] bg-center bg-no-repeat bg-contain"
            aria-hidden="true"
          />

          {/* Bold 404 Overlay */}
          <div className="absolute top-4 inset-x-0 flex justify-center pointer-events-none">
            <h1 className="text-6xl sm:text-7xl font-bold tracking-tight text-neutral-950/90 font-sans drop-shadow-sm select-none">
              404
            </h1>
          </div>
        </div>

        {/* Headline & Description */}
        <div className="space-y-2 mt-2">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Look like you&apos;re lost
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
            The page you are looking for is not available, has been moved, or does not exist on the server.
          </p>
        </div>

        {/* Technical Diagnostics Box */}
        <div className="w-full max-w-md bg-white/[0.02] border border-white/[0.08] rounded-xl p-3.5 text-left font-mono text-xs space-y-1.5 shadow-lg backdrop-blur-sm">
          <div className="flex items-center gap-2 pb-1.5 border-b border-white/[0.06] text-neutral-400">
            <Terminal className="w-3.5 h-3.5" />
            <span>Diagnostics</span>
          </div>
          <div className="flex justify-between text-neutral-300">
            <span className="text-neutral-400">Request Path:</span>
            <span className="text-neutral-200 truncate max-w-[200px]">{pathname || "/unknown"}</span>
          </div>
          <div className="flex justify-between text-neutral-300">
            <span className="text-neutral-400">Status:</span>
            <span className="text-rose-400 font-semibold">404 Not Found</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-neutral-950 hover:bg-neutral-200 text-sm font-semibold transition-all duration-150 shadow-sm focus-visible:outline-2 focus-visible:outline-white active:scale-95"
          >
            <Home className="w-4 h-4" />
            Go to Home
          </Link>

          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.09] text-white text-sm font-medium border border-white/10 hover:border-white/20 transition-all duration-150 active:scale-95"
          >
            <FolderGit2 className="w-4 h-4 text-neutral-400" />
            View Projects
          </Link>

          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.05] text-sm font-medium transition-all duration-150 active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>

      </div>
    </main>
  );
}

export default NotFoundPage;
