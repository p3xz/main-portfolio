export interface ProjectFeature {
  title: string;
  description: string;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  year: string;
  category: string;
  role: string;
  image: string;
  technologies: string[];
  link?: string;
  liveUrl?: string;
  githubUrl?: string;
  overview: string;
  architecture: string;
  decisions: string;
  features: ProjectFeature[];
}

export const projects: Project[] = [
  {
    slug: "Brovxi",
    title: "Brovxi",
    tagline: "Design system token engine and automated documentation generator.",
    description: "An open-source design token compiler that parses AST representations of design variables and exports typed token definitions for React, Tailwind CSS, and mobile clients.",
    year: "2024",
    category: "Developer Tools & UI Infrastructure",
    role: "Full Stack Engineer",
    link: "/projects/Brovxi",
    liveUrl: "https://Brovxi-demo.vercel.app",
    githubUrl: "https://github.com/p3xz/Brovxi",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2670&auto=format&fit=crop",
    technologies: ["TypeScript", "Next.js", "React 19", "Tailwind CSS", "Node.js", "Zod"],
    overview: "Brovxi was built to bridge the gap between design tokens and production codebases. It provides a deterministic pipeline that takes raw design tokens, validates schema contracts with Zod, and outputs strongly typed theme definitions with zero runtime overhead.",
    architecture: "The core parser utilizes Babel AST transforms to extract style definitions and generates statically verifiable TypeScript interfaces. The web interface provides an interactive component playground with real-time contrast checking and token preview.",
    decisions: "Chose static code generation over runtime CSS-in-JS to eliminate runtime styling overhead and ensure seamless integration with Tailwind CSS v4 and modern React Server Components.",
    features: [
      {
        title: "AST-Based Token Extraction",
        description: "Parses theme definitions into an Abstract Syntax Tree to automatically produce strongly-typed TypeScript definitions and Tailwind utility classes.",
      },
      {
        title: "WCAG Contrast Validation",
        description: "Built-in mathematical color analyzer that flags contrast ratios below WCAG AA/AAA thresholds across dynamic theme palettes.",
      },
      {
        title: "Multi-Platform Export",
        description: "Compiles design tokens simultaneously into CSS custom properties, JSON tokens, and iOS/Android compatible theme structures.",
      },
    ],
  },
  {
    slug: "insidcode",
    title: "InsidCode",
    tagline: "Full-stack competitive programming platform with sandboxed multi-language execution.",
    description: "A high-performance LeetCode-style coding practice system featuring Monaco Editor, isolated remote code compilation via Piston API, hidden server-side test evaluation, OAuth authentication, streak tracking, and admin moderation.",
    year: "2024",
    category: "Full-Stack Web & Sandboxed Execution",
    role: "Full Stack Architect",
    link: "/projects/insidcode",
    liveUrl: "https://insidcode.vercel.app",
    githubUrl: "https://github.com/p3xz/insidcode",
    image: "/projects/insidcode.png",
    technologies: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "MongoDB Atlas", "NextAuth.js", "Monaco Editor", "Piston API", "Zod"],
    overview: "InsidCode was engineered to give developers a distraction-free environment to master programming logic, recursion, arrays, and algorithms before diving into advanced data structures. It features full multi-language code compilation (Python, JavaScript, C, C++, Java) evaluated in an isolated sandbox against server-side hidden test cases.",
    architecture: "Built with Next.js App Router and cached Mongoose connection pools for serverless MongoDB Atlas clusters. Code execution requests are dispatched through sliding-window rate limiters to a sandboxed Piston execution node. Submissions are processed sequentially against hidden test assertions that are strictly projected out of client responses.",
    decisions: "Eliminated client-side test evaluation to safeguard test inputs and solutions against inspection. Chose NextAuth OAuth (Google & GitHub) paired with role-based middleware guards to eliminate password liability while enabling secure admin user moderation and problem management.",
    features: [
      {
        title: "Sandboxed Code Execution Engine",
        description: "Zero-latency remote code execution via Piston API with strict 10s timeouts, memory isolation, and 100KB payload caps.",
      },
      {
        title: "Server-Evaluated Hidden Tests & XP",
        description: "Submissions are validated against hidden test cases without exposing test criteria to client browsers, awarding dynamic XP based on difficulty.",
      },
      {
        title: "Monaco Editor & Gamification Hub",
        description: "Dark-themed Monaco editor paired with 12-month GitHub-style activity heatmaps, timezone-safe streak calculations, and global leaderboards.",
      },
    ],
  },
  {
    slug: "gymsync",
    title: "GymSync",
    tagline: "Premium offline-first fitness tracker with zero dependencies and deterministic workout logic.",
    description: "A modern Apple-inspired fitness tracking platform engineered in pure vanilla JavaScript, HTML5, and CSS3. Features automated workout-split resolution, offline LocalStorage persistence, expandable workout history, and micro-interaction animations.",
    year: "2024",
    category: "Client-Side Engineering & Offline Systems",
    role: "Lead Software Engineer",
    link: "/projects/gymsync",
    liveUrl: "https://p3xz.github.io/gymsyncs/",
    githubUrl: "https://github.com/p3xz/gymsyncs",
    image: "/projects/gymsync.png",
    technologies: ["JavaScript (ES6+)", "HTML5", "CSS3", "LocalStorage API", "Responsive Design", "Web Audio API"],
    overview: "GymSync is an 8-phase engineering project built from scratch without frontend frameworks or backend infrastructure. It provides gym-goers with an ultra-responsive, zero-latency workout companion that persists all workout logs, exercise weights, historical sets, and streak metrics locally on the device.",
    architecture: "Structured around a centralized state resolver (getTodaysWorkout) that dynamically computes weekly training splits (Push/Pull/Legs) based on calendar days. UI views are rendered through declarative DOM mutations, while persistence is abstracted via a LocalStorage schema layer with automated weekly reset heuristics.",
    decisions: "Deliberately built without external frameworks or build tooling to maximize mobile performance, eliminate network failure points in gym environments with poor reception, and maintain sub-16ms frame render times.",
    features: [
      {
        title: "Deterministic Workout Engine",
        description: "Automated weekday-to-split resolver mapping target exercises, rep ranges, and sets from a unified single source of truth.",
      },
      {
        title: "Offline-First Persistence Layer",
        description: "Full local workout logging, streak advancement logic, expandable past-session histories, and weekly completion trackers.",
      },
      {
        title: "Mobile Viewport Micro-Interactions",
        description: "Custom checkbox pops, stat pulse indicators, overscroll containment, and iOS Safari input-zoom prevention techniques.",
      },
    ],
  },
];
