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
    slug: "brovxi",
    title: "Brovxi",
    tagline: "Connected motorcycle telemetry, cockpit navigation engine, and GPS tracking system.",
    description: "A comprehensive telemetry ecosystem engineered for motorcyclists, combining an Expo React Native mobile tracker with MapLibre vector maps and offline SQLite logging, alongside a React 19 web cockpit featuring Spotify OAuth PKCE, radar alerts, and 6-axis IMU simulation.",
    year: "2024",
    category: "Mobile & Telemetry Infrastructure",
    role: "Lead Systems & Mobile Engineer",
    link: "/projects/brovxi",
    liveUrl: "https://brovxi-seven.vercel.app",
    githubUrl: "https://github.com/p3xz/brovxi",
    image: "/projects/brovxi.png",
    technologies: ["React Native", "Expo SDK", "MapLibre GL", "SQLite", "React 19", "Vite", "TypeScript", "GSAP", "Three.js / OGL", "Spotify Web API"],
    overview: "Brovxi was built around real motorcycle dynamics to solve the challenge of accurate two-wheeled riding telemetry and audio control. It combines a privacy-first mobile tracker running high-frequency GPS logging with SQLite storage, and a browser-based cockpit engine integrating speed-adaptive audio ducking, lean angle HUD simulation, and post-ride ETA pace delta analytics.",
    architecture: "The native mobile client operates on Expo SDK and React Native with an asynchronous TaskManager pipeline performing background GPS filtering via Haversine distance heuristics directly to on-device SQLite tables. The companion web platform is built with React 19, Vite, and GSAP, leveraging Spotify PKCE OAuth to provide cockpit audio with speed camera auto-ducking.",
    decisions: "Kept the mobile logging architecture 100% offline-first with zero mandatory cloud accounts or external telemetry telemetry leaks. Adopted MapLibre GL Native for fast vector map tile caching, and engineered Spotify PKCE authorization so riders can control cockpit music without hosting private developer keys.",
    features: [
      {
        title: "Precision GPS & Local SQLite Telemetry",
        description: "High-frequency background GPS logging with noise reduction, lean-angle estimators, fuel efficiency tracking, and one-tap GPX route export.",
      },
      {
        title: "Spotify Intercom Cockpit & Auto-Ducking",
        description: "Speed-adaptive volume boost at highway speeds (≥100 km/h) and automatic audio ducking (-12dB) during radar speed trap warnings.",
      },
      {
        title: "Post-Ride Telemetry & ETA Pace Delta",
        description: "Analyzes velocity curves, max cornering lean angles, smoothness scoring, and compares actual ride pace against baseline GPS ETA predictions.",
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
  {
    slug: "github-stats-bot",
    title: "GitHub Stats Discord Bot",
    tagline: "High-throughput Discord bot querying real-time GitHub activity via GraphQL and REST.",
    description: "A Java Discord bot built with JDA 5 and OkHttp that queries the GitHub GraphQL API v4 to generate interactive statistical embeds, yearly contribution metrics, language distribution breakdowns, and repo inspection via slash commands.",
    year: "2024",
    category: "Backend Engineering & API Systems",
    role: "Backend Engineer",
    link: "/projects/github-stats-bot",
    githubUrl: "https://github.com/p3xz/github-stats-bot",
    image: "/projects/github-stats-bot.png",
    technologies: ["Java 17", "JDA 5 (Java Discord API)", "Maven", "GitHub GraphQL API v4", "REST API", "OkHttp 4", "Gson"],
    overview: "Engineered to deliver fast, rich developer activity insights directly within Discord servers. The bot registers native Discord application slash commands (/github profile, /github stats, /github repo, /langs) to fetch real-time public GitHub data with rate-limit resiliency and concurrent repository querying.",
    architecture: "Built on Java 17 using JDA (Java Discord API) with an event-driven command listener architecture. Utilizes OkHttp with connection pooling to dispatch GraphQL queries for user contributions and concurrent REST calls for multi-repository language calculations, serialized into structured rich Discord embeds.",
    decisions: "Adopted GitHub GraphQL API v4 rather than REST for user contribution graphs to retrieve commit, PR, issue, and star tallies across an entire 12-month window in a single round-trip, dramatically conserving API quotas.",
    features: [
      {
        title: "GraphQL Contribution Aggregation",
        description: "Queries contributionsCollection across a full 12-month calendar window to summarize commit streaks, merged PRs, and star totals.",
      },
      {
        title: "Concurrent Language Distribution Analyzer",
        description: "Fetches owned repository language byte statistics asynchronously and renders ASCII/Unicode progress bars representing exact percentage splits.",
      },
      {
        title: "Rate-Limit Safe Architecture",
        description: "Supports optional authenticated GitHub PAT integration with graceful fallback for unauthenticated Discord guild lookups.",
      },
    ],
  },
];
