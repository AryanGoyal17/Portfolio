export default function Hero() {
  return (
    <section
      id="home"
      className="flex min-h-[90vh] flex-col justify-center px-6"
    >
      {/* PLACEHOLDER: this is where the one Three.js hero element mounts later,
          lazy-loaded via IntersectionObserver once this section is in view */}
      <div className="mx-auto w-full max-w-5xl">
        <p className="font-mono text-sm text-accent">PLACEHOLDER — role/tagline</p>
        <h1 className="mt-3 font-display text-5xl font-bold text-foreground sm:text-7xl">
          Aryan Goyal
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted">
          PLACEHOLDER — one or two sentences on what you build and what you're
          into (AI/DS, full-stack, LEAD society, etc.).
        </p>
      </div>
    </section>
  );
}
