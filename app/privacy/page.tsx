import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import BubbleMenu from "@/components/BubbleMenu";
import Footer from "@/components/sections/Footer";
import GlobalBackground from "@/components/GlobalBackground";

export const metadata = {
  title: "Privacy Policy",
  description: "How namishhh.vercel.app handles your data. Short version: it barely handles any.",
};

const SECTIONS = [
  {
    title: "What this site collects",
    body: [
      "This is a personal portfolio. It has no user accounts, no sign-in, and no comment system. It does not track you across the web.",
      "The contact form asks for your name, email address, and message. When you submit it, that information is forwarded to namishyadavv@gmail.com so I can reply. It is transmitted through FormSubmit, a third-party email forwarding service, and is not stored in a database I control.",
    ],
  },
  {
    title: "Cookies",
    body: [
      "This site sets no cookies of its own. There is no advertising, no third-party trackers, and no analytics that require cookies.",
      "The site uses Vercel Analytics for basic page-view counts, which does not set cookies in your browser.",
    ],
  },
  {
    title: "What stays in your browser",
    body: [
      "Some preferences, like the site theme, are saved in your browser's localStorage so the site remembers them. That data never leaves your device and you can clear it anytime through your browser settings.",
    ],
  },
  {
    title: "External links",
    body: [
      "This site links to third-party services (GitHub, LinkedIn, Instagram, project demos). When you click one of those links, that service's own privacy policy applies, not this one.",
    ],
  },
  {
    title: "Contact",
    body: [
      "If you have questions about this policy, email namishyadavv@gmail.com.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="relative min-h-screen bg-[#09090b] text-neutral-200">
      <GlobalBackground />
      <BubbleMenu />
      <main className="relative z-10 mx-auto max-w-3xl px-6 pt-32 pb-24 sm:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back home
        </Link>

        <p className="mt-8 text-xs uppercase tracking-[0.25em] text-neutral-500">
          Legal
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-neutral-400">
          Last updated: October 2026. Plain language, no legal fog. This page
          describes what this site actually does with your data.
        </p>

        <div className="mt-12 space-y-10">
          {SECTIONS.map((s) => (
            <section key={s.title} className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-6">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
                {s.title}
              </h2>
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-neutral-400">
                {s.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
