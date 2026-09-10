'use client';

import { projects } from '@/data/projects';
import { ProjectShowcase } from '@/components/ui/project-showcase';
import { Github, ArrowUpRight } from 'lucide-react';

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative py-28 px-6 sm:px-8 border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-mono text-xs text-neutral-400 uppercase tracking-wider block mb-2">
              Selected Work
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Featured Projects
            </h2>
          </div>
          <p className="text-neutral-400 text-sm sm:text-base max-w-md leading-relaxed">
            Case studies covering motorcycle telemetry, sandboxed code execution, client-side offline engines, Discord bots, and cryptography.
          </p>
        </div>

        {/* Project Showcase */}
        <ProjectShowcase projects={projects} />

        {/* GitHub External CTA */}
        <div className="mt-14 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h3 className="text-sm font-semibold text-white">More Repositories on GitHub</h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Explore open-source contributions, experimental scripts, and algorithm prototypes.
            </p>
          </div>

          <a
            href="https://github.com/p3xz"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-white/40"
          >
            <Github className="w-4 h-4 text-neutral-300" />
            GitHub Profile
            <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
          </a>
        </div>
      </div>
    </section>
  );
}