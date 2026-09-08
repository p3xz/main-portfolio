'use client';

import Link from "next/link";
import { Github, Linkedin, Mail, Instagram, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer role="contentinfo" className="relative z-10 py-12 px-6 sm:px-8 border-t border-white/[0.08] bg-[#09090b]">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-neutral-400">
        
        {/* Left: Identity & Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
          <Link href="/" className="inline-flex items-center gap-2 text-white font-semibold hover:text-neutral-200 transition-colors">
            <div className="w-5 h-5 rounded-md bg-white/[0.08] border border-white/15 flex items-center justify-center text-white">
              <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current text-white" aria-hidden="true">
                <path d="M5 19V5L15 15.5V5H19V19L9 8.5V19H5Z" />
              </svg>
            </div>
            Namish Yadav
          </Link>
          <span className="hidden sm:inline text-neutral-600">/</span>
          <p className="text-xs text-neutral-400">
            © {new Date().getFullYear()} Namish Yadav. All rights reserved.
          </p>
        </div>

        {/* Center/Right: Social & Back to Top */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/p3xz"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-md text-neutral-400 hover:text-white hover:bg-white/[0.05] transition-colors"
            aria-label="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>

          <a
            href="https://www.linkedin.com/in/namish-yadav-639769408/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-md text-neutral-400 hover:text-white hover:bg-white/[0.05] transition-colors"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          <a
            href="mailto:nam4sh@gmail.com"
            className="p-2 rounded-md text-neutral-400 hover:text-white hover:bg-white/[0.05] transition-colors"
            aria-label="Send Email"
          >
            <Mail className="w-4 h-4" />
          </a>

          <a
            href="https://instagram.com/namishyadv"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-md text-neutral-400 hover:text-white hover:bg-white/[0.05] transition-colors"
            aria-label="Instagram Profile"
          >
            <Instagram className="w-4 h-4" />
          </a>

          <div className="h-4 w-px bg-white/10 mx-1" />

          <button
            type="button"
            onClick={scrollToTop}
            className="p-2 rounded-md text-neutral-400 hover:text-white hover:bg-white/[0.05] transition-colors"
            aria-label="Scroll to top of page"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
}
