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
    slug: "flux",
    title: "Flux",
    tagline: "High-performance real-time collaborative state synchronization engine.",
    description: "A distributed WebSocket service and client SDK for real-time document editing and multi-user canvas interactions with conflict-free replicated data types (CRDTs).",
    year: "2024",
    category: "Distributed Systems & Real-time Web",
    role: "Backend & Systems Engineer",
    link: "/projects/flux",
    liveUrl: "https://flux-collab.vercel.app",
    githubUrl: "https://github.com/p3xz/flux",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
    technologies: ["Node.js", "TypeScript", "WebSocket", "Redis", "PostgreSQL", "Docker"],
    overview: "Flux is a real-time collaboration engine designed for low-latency state synchronization across distributed clients. It implements hybrid logical clocks and state vector delta compression to allow hundreds of concurrent users to edit shared documents without server-side locking.",
    architecture: "Built on a decoupled architecture where lightweight WebSocket gateway nodes handle client connections and publish state changes to a Redis Pub/Sub cluster. State persistence is asynchronously synced to PostgreSQL with WAL verification.",
    decisions: "Implemented Yjs-compatible CRDT algorithms to ensure eventual consistency across unreliable networks while maintaining sub-20ms broadcast latency across WebSocket clusters.",
    features: [
      {
        title: "Conflict-Free State Sync",
        description: "Employs CRDT mathematical algorithms to guarantee deterministic state convergence across all connected peers without merge conflicts.",
      },
      {
        title: "Distributed Pub/Sub Layer",
        description: "Uses Redis Pub/Sub channels to broadcast delta updates across horizontally scaled WebSocket nodes with minimal memory footprint.",
      },
      {
        title: "Presence & Awareness System",
        description: "Low-overhead heartbeat protocol tracking peer cursors, viewport selections, and live connection status with automatic reconnection backoff.",
      },
    ],
  },
  {
    slug: "prism",
    title: "Prism",
    tagline: "GPU-accelerated WebGL color quantization and image analysis pipeline.",
    description: "An interactive browser tool that uses custom WebGL fragment shaders and spatial k-means clustering to extract dominant color palettes from high-resolution imagery.",
    year: "2023",
    category: "Computer Graphics & WebGL",
    role: "Frontend & Graphics Developer",
    link: "/projects/prism",
    liveUrl: "https://prism-webgl.vercel.app",
    githubUrl: "https://github.com/p3xz/prism",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2670&auto=format&fit=crop",
    technologies: ["WebGL", "GLSL Shaders", "TypeScript", "Canvas API", "Web Workers"],
    overview: "Prism brings desktop-grade color quantization to the web. By offloading image sampling and Euclidean color distance calculations to custom GPU fragment shaders, it processes 4K images in real time directly inside the browser.",
    architecture: "The application uses an offscreen WebGL context rendering to a frame buffer. Texture passes calculate color histograms in parallel, followed by a multi-threaded Web Worker that refines palette clusters using modified median-cut algorithms.",
    decisions: "Avoided CPU-bound image data iterations by compiling dedicated GLSL shader pipelines, achieving real-time 60 FPS performance even when manipulating large raw photographic assets.",
    features: [
      {
        title: "Hardware-Accelerated Sampling",
        description: "Executes image processing kernels on the GPU via custom GLSL fragment shaders for instantaneous color distribution mapping.",
      },
      {
        title: "Spatial Color Clustering",
        description: "Combines modified k-means quantization with Lab color space perception modeling to extract visually harmonious color palettes.",
      },
      {
        title: "Export & CSS Integration",
        description: "Instantly exports extracted schemes as Tailwind configuration objects, CSS custom properties, and ASE Adobe Swatch Exchange files.",
      },
    ],
  },
];
