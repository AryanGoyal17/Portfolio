import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import LogoMark from "./LogoMark";

gsap.registerPlugin(Flip);

export default function PreloaderIntro({ onComplete }) {
  const [percent, setPercent] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const overlayRef = useRef(null);
  const markRef = useRef(null);
  const counterRef = useRef(null);
  const statusRef = useRef(null);
  const startBtnRef = useRef(null);
  const contentWrapperRef = useRef(null);

  // Check reduced motion & session storage early
  useEffect(() => {
    try {
      const alreadySeen = sessionStorage.getItem("portfolio_intro_seen") === "true";
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (alreadySeen || prefersReducedMotion) {
        onComplete();
        return;
      }
    } catch {
      // In case sessionStorage is blocked in iframe/strict privacy
    }

    // Progress counter animation
    const counterObj = { val: 0 };
    const tween = gsap.to(counterObj, {
      val: 100,
      duration: 1.1,
      ease: "power2.out",
      onUpdate: () => {
        setPercent(Math.round(counterObj.val));
      },
      onComplete: () => {
        setIsLoaded(true);
      },
    });

    return () => tween.kill();
  }, [onComplete]);

  // Entrance animation for preloader elements
  useEffect(() => {
    if (!contentWrapperRef.current) return;
    gsap.fromTo(
      contentWrapperRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" }
    );
  }, []);

  const handleStart = () => {
    if (hasStarted) return;
    setHasStarted(true);

    try {
      sessionStorage.setItem("portfolio_intro_seen", "true");
    } catch {
      // ignore
    }

    const markEl = markRef.current;
    const targetEl = document.getElementById("navbar-logo-target");

    const tl = gsap.timeline();

    // 1. Fade out the text, counter, and start button
    tl.to([counterRef.current, statusRef.current, startBtnRef.current], {
      opacity: 0,
      y: 10,
      duration: 0.3,
      ease: "power2.in",
    });

    // 2. Animate the mark element to dock with navbar target
    if (markEl && targetEl) {
      const fromRect = markEl.getBoundingClientRect();
      const toRect = targetEl.getBoundingClientRect();

      const deltaX = toRect.left - fromRect.left;
      const deltaY = toRect.top - fromRect.top;
      const scale = toRect.width / fromRect.width;

      tl.to(
        markEl,
        {
          x: deltaX,
          y: deltaY,
          scale: scale,
          transformOrigin: "top left",
          duration: 0.85,
          ease: "power3.inOut",
        },
        "-=0.1"
      );
    }

    // 3. Fade out overlay and reveal page
    tl.to(
      overlayRef.current,
      {
        opacity: 0,
        duration: 0.6,
        ease: "power2.inOut",
        onComplete: () => {
          onComplete();
        },
      },
      "-=0.45"
    );
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-background px-6 select-none"
    >
      {/* Background subtle technical grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(currentColor 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      <div
        ref={contentWrapperRef}
        className="relative z-10 flex flex-col items-center text-center"
      >
        {/* Centered Mark Element */}
        <div
          ref={markRef}
          id="intro-animated-mark"
          className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center transition-all duration-300"
        >
          <LogoMark className="w-full h-full drop-shadow-md" />
        </div>

        {/* Numeric Percentage & Terminal Status */}
        <div className="mt-8 flex flex-col items-center gap-1.5 min-h-[50px]">
          <span
            ref={counterRef}
            className="font-mono text-2xl font-bold tracking-wider text-foreground sm:text-3xl"
          >
            {String(percent).padStart(3, "0")}%
          </span>
          <span
            ref={statusRef}
            className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted"
          >
            {isLoaded ? "SYSTEM READY" : "INITIALIZING INTERFACE"}
          </span>
        </div>

        {/* Start button — reveals when progress finishes */}
        <div className="mt-8 min-h-[44px]">
          {isLoaded && (
            <button
              ref={startBtnRef}
              type="button"
              onClick={handleStart}
              className="group relative cursor-pointer overflow-hidden rounded-full border border-foreground bg-foreground px-7 py-2.5 font-mono text-xs font-semibold uppercase tracking-widest text-background transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
            >
              <span className="flex items-center gap-2">
                <span>ENTER</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Subtle bottom telemetry info */}
      <div className="absolute bottom-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-muted/60">
        <span>ARYAN GOYAL</span>
        <span>•</span>
        <span>PORTFOLIO OS v2.0</span>
      </div>
    </div>
  );
}
