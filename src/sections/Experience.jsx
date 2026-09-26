import { experience } from "../data/experience";

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-5xl px-6 py-24">
      <h2 className="font-display text-sm font-medium uppercase tracking-widest text-accent">
        Experience
      </h2>
      <ol className="mt-8 space-y-8 border-l border-border pl-6">
        {experience.map((item) => (
          <li key={item.id}>
            <p className="font-mono text-xs text-accent">{item.period}</p>
            <h3 className="mt-1 font-display text-lg font-bold text-foreground">
              {item.org}
            </h3>
            <p className="text-sm text-muted">{item.role}</p>
            <p className="mt-2 max-w-xl text-sm text-foreground">
              {item.detail}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
