# Main Portfolio

> A production-grade personal portfolio site showcasing projects, technical background, and contact information, built to replace a static page with a fully interactive, easily updatable site.

![Status](https://img.shields.io/badge/status-active-brightgreen) ![License](https://img.shields.io/badge/license-MIT-blue)

Live at [https://namishhh.vercel.app](https://namishhh.vercel.app)

## Features

- **Hero section**: GSAP staggered entry animation with a WebGL wireframe sphere rendered in OGL.
- **About section**: scroll-triggered skill category cards and a technical biography.
- **Projects section**: individual project detail pages generated via Next.js dynamic routing.
- **Contact page**: working form posting to a server-side API route for email submission.
- **Bubble navigation**: floating menu with smooth snap behavior.
- **Dark theme**: global dark background with a subtle dot-grid pattern and vignette effect.
- **Smooth scrolling**: Lenis-powered smooth page scrolling across the single-page layout.
- **Analytics**: full Vercel Analytics integration in production.
- **SEO**: Open Graph and Twitter card metadata for social sharing, plus a generated sitemap and robots.txt.
- **Accessibility**: semantic HTML with ARIA labels and visible focus states; all animations respect the `prefers-reduced-motion` media query.
- **Responsive**: layouts for mobile, tablet, and desktop viewports.

## Tech Stack

![TypeScript](https://skillicons.dev/icons?i=ts) ![Next.js](https://skillicons.dev/icons?i=nextjs) ![React](https://skillicons.dev/icons?i=react) ![Tailwind CSS](https://skillicons.dev/icons?i=tailwind) ![Three.js](https://skillicons.dev/icons?i=threejs) ![Vercel](https://skillicons.dev/icons?i=vercel)

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

**Why we used this:**

- Next.js (App Router): server rendering and SEO support for a public portfolio, including Open Graph metadata, a sitemap, and robots.txt.
- React 19 with TypeScript: component-based UI with full type coverage across sections and the project data file.
- Tailwind CSS v4: utility-first styling for the dark theme, dot-grid background, and responsive layout.
- GSAP with ScrollTrigger: scroll-driven entrance and section animations.
- OGL and Three.js: the WebGL wireframe sphere rendered in the hero section.
- Lenis: smooth scrolling across the single-page layout.
- Radix UI and Lucide React: accessible component primitives and icons.
- Vercel: one-click deployment with Vercel Analytics built in.

## How It Works

- The site is a single-page application composed in `app/page.tsx` from section components (hero, about, projects, footer) wrapped in a shared root layout.
- Projects are defined once in a typed data file (`data/projects.ts`); individual project detail pages are generated via Next.js dynamic routing at `app/projects/[slug]`.
- The contact form posts to an API route that handles email submission server-side.
- The hero renders a WebGL wireframe sphere with OGL, while GSAP ScrollTrigger drives scroll-based section animations; all animations respect the `prefers-reduced-motion` media query.
- A bubble navigation menu provides floating navigation with smooth snap behavior, and Lenis supplies smooth page scrolling.
- SEO is handled in the root layout with Open Graph and Twitter card metadata, plus generated `sitemap.ts` and `robots.ts`.

## Project Structure

```
main-portfolio/
├── app/
│   ├── page.tsx              # Root page: composes all sections
│   ├── layout.tsx            # Root layout, metadata, fonts, analytics
│   ├── globals.css           # Global styles and CSS variables
│   ├── contact/              # Contact page with email form
│   ├── projects/[slug]/      # Dynamic project detail pages
│   ├── api/                  # Server API routes (contact email)
│   ├── privacy/              # Privacy policy page
│   ├── robots.ts             # Generated robots.txt
│   └── sitemap.ts            # Generated sitemap
├── components/
│   ├── sections/             # Hero, about, projects, footer sections
│   ├── BubbleMenu.tsx        # Floating navigation menu
│   ├── SmoothScroll.tsx      # Lenis scroll provider
│   ├── WireframeBall.tsx     # OGL WebGL wireframe sphere
│   ├── GlobalBackground.tsx  # Dot-grid pattern and vignette
│   └── ...                   # Additional visual and UI components
├── data/
│   └── projects.ts           # Typed project definitions (slug, stack, features)
├── hooks/                    # Custom React hooks
├── lib/                      # Shared utilities
└── public/                   # Static assets (images, icons)
```

## Quick Start

### Prerequisites

- Node.js 20 or higher
- npm or pnpm
- Key versions used by this project: Next.js 16, React 19, TypeScript 5.7, Tailwind CSS v4

### Installation

1. Clone the repository:

```bash
git clone https://github.com/p3xz/main-portfolio.git
cd main-portfolio
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open `http://localhost:3000` in a browser.

## Usage

Build and serve the production site:

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

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Credits

Built by Namish Yadav.

- GitHub: https://github.com/p3xz
- LinkedIn: https://www.linkedin.com/in/namish-yadav-639769408/
- Instagram: https://instagram.com/nam7sh
- Email: namishyadavv@gmail.com
