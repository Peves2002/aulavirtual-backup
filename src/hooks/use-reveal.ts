"use client";
import { useEffect } from "react";

import { usePathname } from "next/navigation";

export function useReveal() {
  const pathname = usePathname();

  useEffect(() => {
    let io: IntersectionObserver | null = null;
    
    // Very short delay to ensure DOM is ready
    const timeout = setTimeout(() => {
      const els = document.querySelectorAll<HTMLElement>(".reveal:not(.in-view)");

      if (els.length === 0) return;

      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in-view");
              io?.unobserve(e.target);
            }
          });
        },
        { 
          threshold: 0.05,
          rootMargin: "50px" // Trigger slightly before it enters the viewport
        }
      );
      els.forEach((el) => io!.observe(el));
    }, 20);

    return () => {
      clearTimeout(timeout);
      if (io) io.disconnect();
    };
  }, [pathname]);
}
