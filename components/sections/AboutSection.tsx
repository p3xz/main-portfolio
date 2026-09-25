'use client';

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Database, Layout, Server } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    name: "Frontend Engineering",
    icon: Layout,
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML5", "CSS3/PostCSS"],
  },
  {
    name: "Backend & Systems",
    icon: Server,
    items: ["Node.js", "REST APIs"],
  },
  {
    name: "Databases & Storage",
    icon: Database,
    items: ["MongoDB"],
  },
  {
    name: "DevOps & Tooling",
    icon: Code2,
    items: ["Git", "GitHub", "VS Code", "Vercel"],
  },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const cardsEl = cardsRef.current;
    if (!sectionEl || !cardsEl) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsEl.children,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsEl,
            start: 'top 85%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative py-28 px-6 sm:px-8 border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-14">
          <span className="font-mono text-xs text-neutral-400 uppercase tracking-wider block mb-2">
            About Me
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Background & Technical Focus
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Left Column — Portrait & Quick Overview */}
          <div className="lg:col-span-5 flex flex-col items-start gap-6">
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-square rounded-xl overflow-hidden border border-white/10 bg-white/[0.02] shadow-lg">
              <Image
                src="/pfp.jpg"
                alt="Namish Yadav"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 320px"
              />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">Namish Yadav</h3>
              <p className="text-sm text-neutral-400">
                BCA student learning full-stack development by building real projects.
              </p>
            </div>
          </div>

          {/* Right Column — Narrative & Skill Matrix */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            {/* Bio */}
            <div className="space-y-4 text-neutral-300 text-sm sm:text-base leading-relaxed">
              <p>
                I'm an 18-year-old BCA student learning software engineering by building real projects. My working stack is TypeScript, Next.js, Tailwind CSS, and MongoDB. I care about clean, type-safe code and understanding every layer of what I ship.
              </p>
              <p className="text-neutral-400">
                Right now I'm focused on fundamentals done right: how frontends talk to APIs, how data is modeled and validated, and how to keep interfaces fast and simple. I document what I learn in public.
              </p>
            </div>

            {/* Technical Skills Grid */}
            <div className="space-y-4">
              <h3 className="text-sm font-mono text-neutral-400 uppercase tracking-wider">
                Core Competencies
              </h3>

              <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {skillCategories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <div
                      key={category.name}
                      className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-white/20 transition-colors space-y-3"
                    >
                      <div className="flex items-center gap-2.5 text-white text-sm font-semibold">
                        <Icon className="w-4 h-4 text-neutral-400" />
                        <span>{category.name}</span>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {category.items.map((item) => (
                          <span
                            key={item}
                            className="px-2.5 py-1 rounded-md text-xs font-mono bg-white/[0.04] text-neutral-300 border border-white/10"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
