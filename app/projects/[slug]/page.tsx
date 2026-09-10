import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Github,
  Globe,
  Layers,
  CheckCircle2,
  Cpu,
  Workflow,
} from 'lucide-react';
import { projects } from '@/data/projects';
import Navbar from '@/components/Navbar';
import Footer from '@/components/sections/Footer';
import GlobalBackground from '@/components/GlobalBackground';
import SmoothScroll from '@/components/SmoothScroll';

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: 'Project Not Found | Namish Yadav' };
  return {
    title: `${project.title} | Case Study | Namish Yadav`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const projectIndex = projects.findIndex((p) => p.slug === slug);
  const project = projects[projectIndex];

  if (!project) {
    return (
      <SmoothScroll>
        <main className="relative min-h-screen bg-[#09090b] text-white flex flex-col justify-between">
          <GlobalBackground />
          <Navbar />

          <div className="relative z-10 max-w-3xl mx-auto px-6 py-40 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
              Project Not Found
            </h1>
            <p className="text-neutral-400 text-base max-w-md mx-auto mb-8">
              The requested case study could not be located.
            </p>
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-white text-neutral-950 hover:bg-neutral-200 text-xs font-semibold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Projects
            </Link>
          </div>

          <Footer />
        </main>
      </SmoothScroll>
    );
  }

  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : projects[projects.length - 1];
  const nextProject = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : projects[0];

  return (
    <SmoothScroll>
      <main className="relative min-h-screen bg-[#09090b] text-white overflow-x-hidden">
        <GlobalBackground />
        <Navbar />

        {/* Main Content Container */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 pt-32 pb-24">
          
          {/* Back Navigation */}
          <div className="mb-10 pb-6 border-b border-white/[0.08] flex items-center justify-between">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Back to All Projects
            </Link>

            <span className="font-mono text-xs text-neutral-400">
              0{projectIndex + 1} / 0{projects.length}
            </span>
          </div>

          {/* Project Header */}
          <header className="mb-12 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs text-neutral-300 px-2.5 py-0.5 rounded-md bg-white/[0.05] border border-white/10">
                {project.year}
              </span>
              <span className="font-mono text-xs text-neutral-400 px-2.5 py-0.5 rounded-md bg-white/[0.03] border border-white/10">
                {project.category}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              {project.title}
            </h1>

            <p className="text-lg sm:text-xl text-neutral-300 font-normal leading-relaxed">
              {project.tagline}
            </p>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white text-neutral-950 hover:bg-neutral-200 text-xs font-semibold transition-colors shadow-sm"
                >
                  <Globe className="w-3.5 h-3.5" />
                  Live Preview
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white/[0.05] hover:bg-white/[0.09] text-white text-xs font-medium border border-white/10 hover:border-white/20 transition-colors"
                >
                  <Github className="w-3.5 h-3.5 text-neutral-300" />
                  Source Code
                  <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
                </a>
              )}
            </div>
          </header>

          {/* Project Meta Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-5 rounded-xl bg-white/[0.02] border border-white/[0.08] mb-12 text-sm">
            <div>
              <span className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-1">
                Role
              </span>
              <p className="font-medium text-white">{project.role}</p>
            </div>
            <div>
              <span className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-1">
                Category
              </span>
              <p className="font-medium text-white">{project.category}</p>
            </div>
            <div>
              <span className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-1">
                Year
              </span>
              <p className="font-medium text-white">{project.year}</p>
            </div>
          </div>

          {/* Hero Media Preview Window */}
          <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-14 border border-white/10 bg-neutral-900 shadow-xl">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 896px"
            />
          </div>

          {/* Overview Section */}
          <section className="mb-14 space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Workflow className="w-4 h-4 text-neutral-400" />
              Project Overview
            </h2>
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
              {project.overview}
            </p>
          </section>

          {/* Architecture & Engineering Decisions Split */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
            <div className="p-6 rounded-xl bg-white/[0.02] border border-white/[0.08] space-y-3">
              <div className="flex items-center gap-2 text-white font-semibold text-sm">
                <Cpu className="w-4 h-4 text-neutral-400" />
                Technical Architecture
              </div>
              <p className="text-neutral-400 text-sm leading-relaxed">
                {project.architecture}
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/[0.02] border border-white/[0.08] space-y-3">
              <div className="flex items-center gap-2 text-white font-semibold text-sm">
                <CheckCircle2 className="w-4 h-4 text-neutral-400" />
                Key Engineering Decisions
              </div>
              <p className="text-neutral-400 text-sm leading-relaxed">
                {project.decisions}
              </p>
            </div>
          </section>

          {/* Key Features */}
          <section className="mb-14 space-y-5">
            <h2 className="text-xl font-bold text-white tracking-tight">
              Key Capabilities & Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {project.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.08] space-y-2"
                >
                  <span className="font-mono text-xs text-neutral-400 font-medium">
                    0{idx + 1}.
                  </span>
                  <h3 className="text-sm font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-400 text-xs leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Tech Stack */}
          <section className="p-6 rounded-xl bg-white/[0.02] border border-white/[0.08] mb-16 space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5" />
              Technologies & Infrastructure
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-md text-xs font-mono bg-white/[0.04] text-neutral-300 border border-white/10"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* Next / Previous Project Navigation */}
          <nav className="pt-10 border-t border-white/[0.08]" aria-label="Project Navigation">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href={`/projects/${prevProject.slug}`}
                scroll={true}
                className="group p-5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.08] hover:border-white/20 transition-colors"
              >
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                  <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                  Previous Case Study
                </span>
                <p className="text-base font-semibold text-white">
                  {prevProject.title}
                </p>
                <p className="text-xs text-neutral-400 mt-1 line-clamp-1">
                  {prevProject.tagline}
                </p>
              </Link>

              <Link
                href={`/projects/${nextProject.slug}`}
                scroll={true}
                className="group p-5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.08] hover:border-white/20 transition-colors text-left sm:text-right"
              >
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider flex items-center sm:justify-end gap-1.5 mb-1.5">
                  Next Case Study
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </span>
                <p className="text-base font-semibold text-white">
                  {nextProject.title}
                </p>
                <p className="text-xs text-neutral-400 mt-1 line-clamp-1">
                  {nextProject.tagline}
                </p>
              </Link>
            </div>
          </nav>

        </div>

        {/* Global Footer */}
        <Footer />
      </main>
    </SmoothScroll>
  );
}
