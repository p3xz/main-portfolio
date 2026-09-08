"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ProgressiveFluxLoader, ProgressiveFluxPhase } from "@/components/ui/progressive-flux-loader";

const LOADER_PHASES: ProgressiveFluxPhase[] = [
  { at: 0, label: "initializing" },
  { at: 25, label: "loading modules" },
  { at: 60, label: "crafting experience" },
  { at: 85, label: "almost ready" },
  { at: 100, label: "welcome" },
];

interface PageLoaderProps {
  children: React.ReactNode;
}

export default function PageLoader({ children }: PageLoaderProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Smooth progress simulation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const increment = prev < 40 ? 6 : prev < 75 ? 4 : prev < 95 ? 5 : 2;
        return Math.min(100, prev + increment);
      });
    }, 38);

    return () => clearInterval(interval);
  }, []);

  const handleComplete = () => {
    // Brief pause at 100% to display "welcome", then mount site and fade out loader
    setTimeout(() => {
      setIsLoaded(true);
    }, 380);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {!isLoaded && (
          <motion.div
            key="page-preloader"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 1.02,
              filter: "blur(6px)",
              transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
            }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0f] text-white px-6 select-none"
          >
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] bg-gradient-to-tr from-[#e945f5]/15 to-[#8400ff]/15 rounded-full blur-[140px] pointer-events-none" />

            {/* Header Branding */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex items-center gap-3 mb-10"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e945f5] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#e945f5]" />
              </span>
              <span className="font-mono text-xs sm:text-sm tracking-[0.25em] uppercase text-neutral-200 font-semibold">
                Namish Yadav // Portfolio
              </span>
            </motion.div>

            {/* Progressive Flux Loader Bar & Phases */}
            <div className="w-full max-w-sm">
              <ProgressiveFluxLoader
                value={progress}
                phases={LOADER_PHASES}
                onComplete={handleComplete}
                gradient="linear-gradient(90deg, #e945f5 0%, #a855f7 35%, #74e1ff 70%, #e945f5 100%)"
                className="w-full"
                barClassName="bg-white/5 border border-white/10 h-3.5"
                textClassName="text-2xl sm:text-3xl font-bold tracking-tight text-white"
              />
            </div>

            {/* Footer Subtext */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mt-12 text-center"
            >
              <p className="font-mono text-[11px] uppercase tracking-widest text-neutral-500">
                Interactive Experience
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Website contents ONLY render after the loader completes */}
      {isLoaded && children}
    </>
  );
}
