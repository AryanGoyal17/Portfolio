import { useState, useEffect } from "react";

/**
 * Tracks which section is currently active in the viewport using IntersectionObserver.
 * Also handles bottom-of-page edge cases to ensure the last section activates properly.
 */
export function useActiveSection(sectionIds, offset = "-25% 0px -55% 0px") {
  const [activeSection, setActiveSection] = useState(sectionIds[0] || "");

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (elements.length === 0) return;

    // Detect if we've scrolled all the way to the bottom
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold = document.documentElement.scrollHeight - 60;
      if (scrollPosition >= threshold && sectionIds.length > 0) {
        setActiveSection(sectionIds[sectionIds.length - 1]);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: offset,
        threshold: 0.1,
      }
    );

    elements.forEach((el) => observer.observe(el));
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sectionIds, offset]);

  return activeSection;
}
