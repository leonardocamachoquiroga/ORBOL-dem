"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ExperienceMotion() {
  const pathname = usePathname();
  useEffect(() => {
    document.documentElement.dataset.experienceReady = "true";
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => { delete document.documentElement.dataset.experienceReady; };
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08 });
    document.querySelectorAll(".section-heading, .feature-vehicle, .advisor-preview, .demo-section__heading, .testimonial-card, .branch-card").forEach(el => observer.observe(el));
    return () => { observer.disconnect(); delete document.documentElement.dataset.experienceReady; };
  }, [pathname]);
  return null;
}
