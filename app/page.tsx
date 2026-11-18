'use client'

import { Github, Mail } from 'lucide-react'
import InkRidges from '@/components/ui/ink-ridges'

export default function Page() {
  return (
    <div className="w-full bg-background text-foreground">
      <InkRidges
        layers={4}
        seed={7}
        horizon={0.62}
        mist={0.6}
        drift={0.05}
        parallax={0.03}
        paintIn={2600}
        sun={true}
        sunColor="#b5402a"
        scrollDepth={0.35}
        glow={0.45}
        clouds={0.35}
        birds={5}
        birdsEvery={14}
        grain={0.3}
        label="An ink landscape of layered mountain ridges in mist, painted by code"
        className="h-[82svh] min-h-[520px] w-full bg-background"
      >
        <div className="flex h-full items-center justify-center px-6 text-center">
          <div>
            <h1 className="text-5xl font-bold tracking-tighter sm:text-7xl md:text-8xl">
              Moving to another website
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              This page was only a placeholder. I rebuilt the portfolio from
              scratch and switched frameworks, from Next.js to React with
              Vite, as a full scroll portfolio with real projects and case
              studies, and an OS mode on the way, so I am moving there soon.
            </p>
          </div>
        </div>
      </InkRidges>

      <section className="mx-auto flex min-h-[60svh] max-w-3xl flex-col items-center justify-center px-6 py-24 text-center md:px-10">
        <h2 className="text-3xl font-bold tracking-tight">Contact me</h2>
        <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row">
          <a
            href="mailto:namishyadavv@gmail.com"
            className="flex items-center gap-2 rounded-full border border-foreground/25 px-4 py-2 text-sm transition-colors hover:bg-foreground hover:text-background"
          >
            <Mail className="h-4 w-4" />
            namishyadavv@gmail.com
          </a>
          <a
            href="https://github.com/p3xz"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full border border-foreground/25 px-4 py-2 text-sm transition-colors hover:bg-foreground hover:text-background"
          >
            <Github className="h-4 w-4" />
            github.com/p3xz
          </a>
        </div>
      </section>
    </div>
  )
}
