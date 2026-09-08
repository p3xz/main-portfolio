import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Github } from 'lucide-react';
import { projects } from '@/data/projects';
import { ProjectShowcase } from '@/components/ui/project-showcase';
import Navbar from '@/components/Navbar';
import Footer from '@/components/sections/Footer';
import GlobalBackground from '@/components/GlobalBackground';
import SmoothScroll from '@/components/SmoothScroll';

export const metadata = {
  title: 'Projects | Namish Yadav',
  description: 'Selected engineering projects, full-stack web applications, and developer tools by Namish Yadav.',
};

export default function ProjectsPage() {
  return (
    <SmoothScroll>
      <main className="relative min-h-screen bg-[#09090b] text-white overflow-x-hidden">
        <GlobalBackground />
        <Navbar />

        {/* Main Content Container */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 pt-32 pb-24">
          
          {/* Back Navigation Bar */}
          <div className="mb-10 pb-6 border-b border-white/[0.08] flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Back to Home
            </Link>

            <span className="font-mono text-xs text-neutral-400">
              All Projects ({projects.length})
            </span>
          </div>

          {/* Page Header */}
          <header className="mb-14 space-y-3">
            <span className="font-mono text-xs text-neutral-400 uppercase tracking-wider block">
              Project Archive
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              Selected Projects & Case Studies
            </h1>

            <p className="text-neutral-400 text-base max-w-2xl leading-relaxed">
              In-depth breakdowns of full-stack web applications, developer infrastructure, real-time collaboration services, and graphics tools.
            </p>
          </header>

          {/* Project Showcase Component */}
          <div className="mb-20">
            <ProjectShowcase projects={projects} />
          </div>

          {/* GitHub Repositories Banner */}
          <div className="p-6 sm:p-8 rounded-xl bg-white/[0.02] border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-base font-semibold text-white">
                Open Source Repositories
              </h3>
              <p className="text-neutral-400 text-xs sm:text-sm">
                Explore algorithmic prototypes, scripts, and open-source contributions directly on GitHub.
              </p>
            </div>

            <a
              href="https://github.com/p3xz"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white text-neutral-950 hover:bg-neutral-200 text-xs font-semibold transition-colors shrink-0 shadow-sm"
            >
              <Github className="w-4 h-4" />
              GitHub Profile
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

        {/* Global Footer */}
        <Footer />
      </main>
    </SmoothScroll>
  );
}
