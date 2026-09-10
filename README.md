# Namish Yadav's  Portfolio

A production-grade personal portfolio built with Next.js 16, React 19, TypeScript, and Tailwind CSS v4. The site showcases projects, technical background, and contact information with a focus on performance, accessibility, and clean architectural separation.

Live at [https://namishhh.vercel.app](https://namishhh.vercel.app)

## Overview

The portfolio is a single-page application rendered through Next.js App Router with full TypeScript coverage. It features scroll-driven GSAP animations, a WebGL wireframe visual component powered by OGL, smooth scroll via Lenis, and a custom bubble navigation menu. All animations respect the `prefers-reduced-motion` media query.

The project is designed for easy content updates: projects are defined in a single typed data file and all personal information is centralized in layout metadata and section components.

## Features

- Hero section with GSAP staggered entry animation and a WebGL wireframe sphere (OGL)
- About section with scroll-triggered skill category cards and a technical biography
- Projects section with individual project detail pages generated via Next.js dynamic routing
- Contact page with a working API route for email form submission
- Bubble navigation menu with smooth snap behavior
- Global dark background with a subtle dot-grid pattern and vignette effect
- Smooth page scrolling via Lenis
- Full Vercel Analytics integration in production
- Open Graph and Twitter card metadata for social sharing
- Accessible markup with ARIA labels, semantic HTML, and visible focus states
- Responsive layout for mobile, tablet, and desktop viewports

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI Library | React 19 |
| Language | TypeScript 5.7 |
| Styling | Tailwind CSS v4, PostCSS |
| Animations | GSAP 3 (ScrollTrigger), Framer Motion |
| Smooth Scroll | Lenis |
| WebGL | OGL, Three.js |
| Component Primitives | Radix UI |
| Icons | Lucide React |
| Analytics | Vercel Analytics |
| Deployment | Vercel |

## Project Structure

```
portfolio/
├── app/
│   ├── page.tsx              # Root page — composes all sections
│   ├── layout.tsx            # Root layout, metadata, fonts, analytics
│   ├── globals.css           # Global styles and CSS variables
│   ├── contact/              # Contact page with email form
│   └── projects/[slug]/      # Dynamic project detail pages
├── components/
│   ├── sections/
│   │   ├── HeroSection.tsx   # Headline, CTA buttons, social links, WebGL ball
│   │   ├── AboutSection.tsx  # Bio, portrait, skill category grid
│   │   ├── ProjectsSection.tsx
│   │   └── Footer.tsx        # Copyright, social links, scroll-to-top
│   ├── BubbleMenu.tsx        # Floating navigation menu
│   ├── SmoothScroll.tsx      # Lenis scroll provider
│   ├── WireframeBall.tsx     # OGL WebGL wireframe sphere
│   └── GlobalBackground.tsx  # Dot-grid pattern and vignette
├── data/
│   └── projects.ts           # Typed project definitions (slug, stack, features)
├── hooks/                    # Custom React hooks
├── lib/                      # Shared utilities
└── public/                   # Static assets (images, icons)
```

## Getting Started

Prerequisites: Node.js 20 or higher, npm or pnpm.

Clone the repository:

```bash
git clone https://github.com/p3xz/portfolio.git
cd portfolio
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open `http://localhost:3000` in a browser.

Build for production:

```bash
npm run build
npm start
```

## Customization

To update personal information, edit the following files:

| What to change | File |
|---|---|
| Name, title, bio, social links | `components/sections/HeroSection.tsx`, `AboutSection.tsx`, `Footer.tsx` |
| SEO metadata, Open Graph, site URL | `app/layout.tsx` |
| Skills listed in the About section | `components/sections/AboutSection.tsx` (skillCategories array) |
| Projects, descriptions, tech stacks | `data/projects.ts` |
| Profile photo | Replace `public/pfp.jpg` |
| Color scheme | Modify Tailwind tokens in `globals.css` and inline Tailwind classes |

## Deployment

The project is configured for one-click deployment on Vercel. Connect the repository in the Vercel dashboard and deployment is automatic on every push to main.

For other platforms, run `npm run build` and serve the `.next` output with `npm start` or export to static files if server-side features are not required.

## License

MIT License

## Developer

Namish Yadav

- GitHub: https://github.com/p3xz
- LinkedIn: https://www.linkedin.com/in/namish-yadav-639769408/
- Instagram: https://instagram.com/nam7sh
- Email: nam4sh@gmail.com
