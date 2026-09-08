"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github, Menu, X, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "About", href: "/#about" },
    { label: "Projects", href: "/#projects" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? "bg-[#09090b]/85 backdrop-blur-md border-b border-white/[0.07] py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Brand */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 text-sm font-semibold tracking-tight text-white focus-visible:outline-2 focus-visible:outline-white/40 rounded-md"
        >
          <div className="w-6 h-6 rounded-md bg-white/[0.08] border border-white/15 flex items-center justify-center text-white shadow-xs group-hover:border-white/30 transition-colors">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current text-white" aria-hidden="true">
              <path d="M5 19V5L15 15.5V5H19V19L9 8.5V19H5Z" />
            </svg>
          </div>
          <span>Namish Yadav</span>
          <span className="hidden sm:inline-block font-mono text-[11px] font-normal text-neutral-400 pl-1 border-l border-white/10">
            Developer
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive =
              link.href === pathname ||
              (link.href.startsWith("/#") && pathname === "/");
            return (
              <Link
                key={link.label}
                href={link.href}
                className="px-3.5 py-1.5 rounded-md text-sm font-medium text-neutral-300 hover:text-white hover:bg-white/[0.05] transition-colors focus-visible:outline-2 focus-visible:outline-white/40"
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Right CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://github.com/p3xz"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-md text-neutral-300 hover:text-white hover:bg-white/[0.05] transition-colors focus-visible:outline-2 focus-visible:outline-white/40"
            aria-label="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>

          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-semibold text-neutral-900 bg-white hover:bg-neutral-200 transition-colors shadow-sm focus-visible:outline-2 focus-visible:outline-white/40"
          >
            Get in Touch
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-md text-neutral-300 hover:text-white hover:bg-white/[0.05] transition-colors focus-visible:outline-2 focus-visible:outline-white/40"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/[0.08] bg-[#09090b]/95 backdrop-blur-xl px-6 py-5 animate-in fade-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col gap-2" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md text-base font-medium text-neutral-200 hover:text-white hover:bg-white/[0.05] transition-colors"
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-3 mt-2 border-t border-white/[0.08] flex items-center justify-between">
              <a
                href="https://github.com/p3xz"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-neutral-300 hover:text-white py-2"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>

              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-xs font-semibold text-neutral-900 bg-white hover:bg-neutral-200 transition-colors"
              >
                Get in Touch
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
