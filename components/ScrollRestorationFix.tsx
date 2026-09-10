'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollRestorationFix() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const scrollToTop = () => {
      const hash = window.location.hash;
      if (hash) {
        const targetEl = document.querySelector(hash);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }

      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

      const win = window as unknown as { __lenis?: { scrollTo: (target: number, opts: { immediate: boolean }) => void } };
      if (win.__lenis && typeof win.__lenis.scrollTo === 'function') {
        win.__lenis.scrollTo(0, { immediate: true });
      }
    };

    scrollToTop();

    const rafId = requestAnimationFrame(scrollToTop);
    const timeoutId = setTimeout(scrollToTop, 60);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
    };
  }, [pathname]);

  return null;
}
