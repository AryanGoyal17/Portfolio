import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import LogoMark from "./LogoMark";
import { useActiveSection } from "../hooks/useActiveSection";

const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

const ALL_SECTION_IDS = ["home", "about", "projects", "skills", "experience", "contact"];

export default function Navbar({ onOpenCommandPalette, isLogoDocked = true }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState("");

  const activeSection = useActiveSection(ALL_SECTION_IDS);

  // Live clock for terminal/developer vibe
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour12: false }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Handle scroll state for background blur
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape" && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/85 py-3.5 backdrop-blur-md"
          : "bg-transparent py-5",
      ].join(" ")}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        {/* LEFT: Branding & Dock Target */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            {/* Dock container for the intro mark animation */}
            <div id="navbar-logo-dock" className="flex items-center">
              <div
                id="navbar-logo-target"
                className={`flex items-center transition-opacity duration-300 ${
                  isLogoDocked ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                <LogoMark className="h-7 w-7 transition-transform hover:scale-105" />
              </div>
            </div>
            <a
              href="#home"
              className="font-display text-base font-bold tracking-wide text-foreground transition-opacity hover:opacity-80"
            >
              Aryan Goyal
            </a>
          </div>
          <span className="hidden font-mono text-[10px] text-muted lg:inline-block">
            {time}
          </span>
        </div>

        {/* CENTER: Navigation with Active-Link Highlighting */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-8">
            {NAV_LINKS.map(({ id, label }) => {
              const isActive = activeSection === id;
              return (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className={[
                      "relative font-mono text-[11px] font-medium uppercase tracking-[0.2em] transition-colors",
                      isActive
                        ? "text-foreground font-semibold"
                        : "text-muted hover:text-foreground",
                    ].join(" ")}
                  >
                    {isActive && (
                      <span className="absolute -left-3 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-accent" />
                    )}
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* RIGHT: Actions */}
        <div className="flex items-center gap-5">
          <div className="hidden items-center gap-5 sm:flex">
            <ThemeToggle />
            <div className="h-3 w-px bg-border"></div>
            {/* Cmd/Ctrl+K trigger */}
            <button
              type="button"
              onClick={onOpenCommandPalette}
              className="group flex cursor-pointer items-center gap-2 font-mono text-[11px] text-muted transition-colors hover:text-foreground"
              aria-label="Open command palette"
            >
              <span className="hidden lg:inline">PRESS</span>
              <kbd className="rounded border border-border bg-background-elevated px-1.5 py-0.5 text-[10px] font-bold text-foreground transition-colors group-hover:border-foreground">
                CTRL+K
              </kbd>
            </button>
          </div>

          <a
            href="#contact"
            className="hidden rounded-full bg-foreground px-5 py-2 font-body text-sm font-medium text-background transition-transform hover:scale-105 sm:inline-block"
          >
            Let's Talk →
          </a>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="cursor-pointer text-foreground md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="absolute inset-x-0 top-full flex flex-col border-b border-border bg-background/95 px-6 pb-6 pt-4 backdrop-blur-lg md:hidden">
          <ul className="flex flex-col gap-4">
            {NAV_LINKS.map(({ id, label }) => {
              const isActive = activeSection === id;
              return (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={() => setMobileOpen(false)}
                    className={[
                      "flex items-center gap-2 font-mono text-sm uppercase tracking-widest transition-colors",
                      isActive
                        ? "font-semibold text-accent"
                        : "text-muted hover:text-foreground",
                    ].join(" ")}
                  >
                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    )}
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="mt-6 flex items-center justify-between border-t border-border pt-6">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenCommandPalette?.();
              }}
              className="flex items-center gap-2 font-mono text-xs text-muted"
            >
              <span>Commands</span>
              <kbd className="rounded border border-border px-1.5 py-0.5 text-[10px] text-foreground">
                CTRL+K
              </kbd>
            </button>
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background"
            >
              Let's Talk →
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
