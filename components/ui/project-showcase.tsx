"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/data/projects";

interface ProjectShowcaseProps {
  projects: Project[];
  className?: string;
}

export function ProjectShowcase({ projects, className = "" }: ProjectShowcaseProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const animate = () => {
      setSmoothPosition((prev) => ({
        x: lerp(prev.x, mousePosition.x, 0.18),
        y: lerp(prev.y, mousePosition.y, 0.18),
      }));
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mousePosition]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setIsVisible(false);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`relative w-full ${className}`}
    >
      {/* Floating Preview Image Container (Desktop) */}
      <div
        className="pointer-events-none absolute z-40 overflow-hidden rounded-xl shadow-2xl transition-opacity duration-200 ease-out border border-white/15 hidden md:block"
        style={{
          left: 0,
          top: 0,
          transform: `translate3d(${smoothPosition.x + 28}px, ${smoothPosition.y - 110}px, 0)`,
          opacity: isVisible ? 1 : 0,
        }}
      >
        <div className="relative w-[300px] h-[190px] bg-neutral-900 rounded-xl overflow-hidden">
          {projects.map((project, index) => (
            <img
              key={project.slug}
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ease-out"
              style={{
                opacity: hoveredIndex === index ? 1 : 0,
              }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Project List */}
      <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
        {projects.map((project, index) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            scroll={true}
            className="group block relative py-8 px-4 -mx-4 rounded-xl hover:bg-white/[0.025] transition-colors focus-visible:outline-2 focus-visible:outline-white/40"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="flex-1 min-w-0 pr-4">
                {/* Header row */}
                <div className="flex items-center gap-2 mb-1.5">
                  <h3 className="text-white font-semibold text-xl tracking-tight group-hover:text-white transition-colors">
                    {project.title}
                  </h3>
                  <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>

                {/* Tagline / Subtitle */}
                <p className="text-sm font-medium text-neutral-300 mb-2">
                  {project.tagline}
                </p>

                {/* Description */}
                <p className="text-neutral-400 text-sm leading-relaxed max-w-2xl">
                  {project.description}
                </p>

                {/* Technologies */}
                {project.technologies && (
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-white/[0.04] text-neutral-300 border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Image Thumbnail */}
              <div className="md:hidden relative w-full aspect-video rounded-lg overflow-hidden border border-white/10 mt-2 bg-neutral-900">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </div>

              {/* Year & Category Badge */}
              <div className="hidden md:flex flex-col items-end gap-1 shrink-0 pt-1">
                <span className="text-xs font-mono text-neutral-400 tabular-nums px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/10">
                  {project.year}
                </span>
                <span className="text-[11px] font-mono text-neutral-500">
                  {project.category.split("&")[0]}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProjectShowcase;
