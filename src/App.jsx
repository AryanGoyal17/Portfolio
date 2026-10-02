import { useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import PreloaderIntro from "./components/PreloaderIntro";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Experience from "./sections/Experience";
import Contact from "./sections/Contact";

export default function App() {
  const [introDone, setIntroDone] = useState(() => {
    if (typeof window === "undefined") return true;
    try {
      const seen = sessionStorage.getItem("portfolio_intro_seen") === "true";
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      return seen || reducedMotion;
    } catch {
      return false;
    }
  });

  return (
    <ThemeProvider>
      {!introDone && (
        <PreloaderIntro onComplete={() => setIntroDone(true)} />
      )}
      <Navbar isLogoDocked={introDone} />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </main>
      {/* PLACEHOLDER: <CommandPalette /> mounts here once built (Cmd/Ctrl+K) */}
    </ThemeProvider>
  );
}

