import { links } from "../data/links";

const CODING_PROFILE_LABELS = {
  codechef: "CodeChef",
  leetcode: "LeetCode",
  codeforces: "Codeforces",
  takeuforward: "TakeUForward",
};

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-5xl px-6 py-24">
      <h2 className="font-display text-sm font-medium uppercase tracking-widest text-accent">
        Contact
      </h2>
      <p className="mt-4 max-w-xl text-lg text-foreground">
        PLACEHOLDER — a short line inviting people to reach out.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={links.github}
          className="rounded-full border border-border px-4 py-2 text-sm text-foreground hover:border-accent"
        >
          GitHub
        </a>
        <a
          href={`mailto:${links.email}`}
          className="rounded-full border border-border px-4 py-2 text-sm text-foreground hover:border-accent"
        >
          Email
        </a>
        <a
          href={links.resume}
          className="rounded-full border border-border px-4 py-2 text-sm text-foreground hover:border-accent"
        >
          Résumé
        </a>
        {Object.entries(links.codingProfiles).map(([key, url]) => (
          <a
            key={key}
            href={url}
            className="rounded-full border border-border px-4 py-2 text-sm text-foreground hover:border-accent"
          >
            {CODING_PROFILE_LABELS[key]}
          </a>
        ))}
      </div>
    </section>
  );
}
