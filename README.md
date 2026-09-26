# Aryan Goyal — Portfolio

Vite + React + Tailwind v4 starter, scaffolded to match the agreed plan
(single-page, anchor-based nav, light/dark mode, react-three-fiber for the
hero, GSAP/ScrollTrigger for scroll animation, cmdk for the command
palette).

## Run it

```
npm install
npm run dev
```

## Structure

```
src/
  components/   Reusable UI (Navbar, ThemeToggle, later: CommandPalette)
  sections/     One file per page section (Hero, About, Projects, ...)
  context/      ThemeContext — light/dark, persisted to localStorage,
                defaults to OS preference on first visit
  three/        (empty for now) isolated Three.js/react-three-fiber scenes
  hooks/        (empty for now) custom hooks
  data/         Content as plain JS objects — projects.js, experience.js,
                skills.js, links.js. Edit these, not the components, when
                swapping placeholder content for the real thing.
```

## Design tokens

All colors/fonts live as CSS variables in `src/index.css` (`:root` for
light, `[data-theme="dark"]` for dark), registered with Tailwind's
`@theme` so they're usable as utilities (`bg-background`,
`text-foreground`, `text-accent`, `border-border`, `font-display`,
`font-mono`, etc.). These are placeholder values — once the Figma/Stitch
mockup is final, update this one file and the whole site retheme.

## What's still a placeholder

- All copy marked `PLACEHOLDER` in `src/data/*.js` and the section files
- `public/resume.pdf` — currently an empty file, drop your real résumé in
  with this exact filename
- Command palette (`cmdk` is installed, not wired up yet)
- The Three.js hero element (`three` / `@react-three/fiber` / `@react-three/drei`
  are installed, `src/three/` is empty)
- GSAP scroll-reveal animations (installed, not added yet)
