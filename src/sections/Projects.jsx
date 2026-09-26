import { projects } from "../data/projects";

const STATUS_LABEL = {
  project: null,
  building: "Currently building",
  "open-source": "Open source",
};

function ProjectCard({ project }) {
  const badge = STATUS_LABEL[project.status];

  return (
    <article className="rounded-2xl border border-border bg-background-elevated p-6 transition-colors hover:border-accent">
      {badge && (
        <span className="mb-3 inline-block rounded-full border border-accent px-3 py-1 font-mono text-xs text-accent">
          {badge}
        </span>
      )}
      <h3 className="font-display text-xl font-bold text-foreground">
        {project.title}
        {project.subtitle && (
          <span className="block text-sm font-normal text-muted">
            {project.subtitle}
          </span>
        )}
      </h3>
      <p className="mt-2 text-sm text-muted">{project.tagline}</p>
    </article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-24">
      <h2 className="font-display text-sm font-medium uppercase tracking-widest text-accent">
        Projects
      </h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
