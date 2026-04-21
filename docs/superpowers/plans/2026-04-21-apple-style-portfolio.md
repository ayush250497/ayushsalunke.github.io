# Apple-Style Portfolio — Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans. Phases use checkbox syntax.

**Goal:** Replace 3D room with tile-based scroll portfolio per spec `2026-04-20-apple-style-portfolio-design.md`.

**Architecture:** Single-page React app. 8 stacked tile sections, Lenis smooth scroll, GSAP ScrollTrigger for pins/scrubs, Framer Motion for in-view + hover. Custom cursor + chapter dots chrome.

**Tech Stack:** Vite, React 18, TypeScript, Tailwind v4, Framer Motion, Lenis, GSAP, fontsource-variable.

---

## Phase 1 — Nuke & deps

- [ ] Delete `src/components/room/`, `src/camera.js`, `src/character.js`, `src/content.js`, `src/main.js`, `src/mobile.js`, `src/objects.js`, `src/scene.js`, `components/ui/portfolio-hero.tsx`.
- [ ] Remove from `package.json`: `@dimforge/rapier3d-compat`, `@react-three/drei`, `@react-three/fiber`, `three`, `motion` (dup of framer-motion), `path`, `lucide-react`.
- [ ] Add to `package.json`: `lenis`, `@fontsource-variable/inter`, `@fontsource-variable/jetbrains-mono`. (`gsap` already present.)
- [ ] `npm install` — verify clean tree.
- [ ] Commit: "chore: nuke 3D room + swap deps for scroll portfolio".

## Phase 2 — Foundation

- [ ] `src/data/resume.ts` — typed exports: `profile`, `stats[]`, `now`, `experiences[]`, `skillCategories[]`, `potholeProject`, `parkSafeProject`, `education[]`, `contact`.
- [ ] `src/lib/useReducedMotion.ts` — hook wrapping `matchMedia('(prefers-reduced-motion: reduce)')`.
- [ ] `src/lib/motion.ts` — Lenis init, wire to `gsap.ticker`, register ScrollTrigger, export `initSmoothScroll()` + `refreshScrollTrigger()`.
- [ ] `src/lib/cursor.ts` — custom cursor DOM element, mousemove lerp, `[data-cursor="hover"]` scale.
- [ ] `src/index.css` — fonts, Tailwind v4 `@theme` tokens (ink/paper/mute/accent-*), base reset, `font-variant-numeric: tabular-nums` for `.num`.
- [ ] Commit: "feat: motion foundation + resume data".

## Phase 3 — Chrome

- [ ] `src/components/chrome/TopNav.tsx` — sticky, shrinks at scrollY>80, anchor links.
- [ ] `src/components/chrome/ChapterDots.tsx` — right-edge fixed column, one dot per tile section id, active dot fills with tile accent var.
- [ ] `src/components/chrome/CustomCursor.tsx` — mounts cursor element, uses `cursor.ts`, respects reduced-motion + touch.
- [ ] Commit: "feat: chrome — nav, chapter dots, cursor".

## Phase 4 — Tiles (one commit per tile)

For each tile: create `src/components/tiles/<Name>Tile.tsx`, wire motion per spec, render resume data, ensure reduced-motion fallback.

- [ ] `HeroTile` — pinned 1.5vh, name letter stagger, role fade, tagline typewriter. Accent `#0a84ff`.
- [ ] `StatsTile` — 2×2 grid, in-view counter tween, scale stagger. Accent `#30d158`.
- [ ] `NowTile` — parallax gradient bg, 3 bullets scrub-fade. Accent `#5e5ce6`.
- [ ] `ExperienceTile` — pin 300vh, horizontal rail 3 panels (JPMorgan/UBS SWE/UBS Intern), year ticks, per-panel fades. Accents `#0b2545` + `#ec0016`.
- [ ] `SkillsTile` — 5 category sub-tiles, marquee chip rows, velocity-linked speed. Accent `#ff375f`.
- [ ] `PotholeTile` — pin 200vh, 3 phase crossfade (problem/CNN/results). Accent `#ff9f0a`.
- [ ] `ProjectEduTile` — 2-up: ParkSafe tilt card + SCU+VIT dual card. Accent `#64d2ff`.
- [ ] `ContactTile` — magnetic buttons, copy-to-clipboard with check bloom. Accent `#0a84ff`.

## Phase 5 — Wire-up

- [ ] Rewrite `src/App.tsx` — mount chrome, render tiles in order, call `initSmoothScroll()` in effect, dispose on unmount.
- [ ] Strip old `src/main.tsx` imports; ensure only React root render.
- [ ] Remove stale `components/` root folder if empty.
- [ ] Commit: "feat: app shell + tile composition".

## Phase 6 — Polish & ship

- [ ] Run `npm run build` — confirm gzipped JS < 500KB.
- [ ] Manual pass: 1920/1440/768/390. Verify every pin releases, no scroll jank, reduced-motion clean.
- [ ] Fix anything broken.
- [ ] Commit: "polish: responsive + reduced-motion fixes".

---

## Files created

```
src/data/resume.ts
src/lib/motion.ts
src/lib/cursor.ts
src/lib/useReducedMotion.ts
src/components/chrome/TopNav.tsx
src/components/chrome/ChapterDots.tsx
src/components/chrome/CustomCursor.tsx
src/components/tiles/HeroTile.tsx
src/components/tiles/StatsTile.tsx
src/components/tiles/NowTile.tsx
src/components/tiles/ExperienceTile.tsx
src/components/tiles/SkillsTile.tsx
src/components/tiles/PotholeTile.tsx
src/components/tiles/ProjectEduTile.tsx
src/components/tiles/ContactTile.tsx
```

## Files deleted

```
src/components/room/**
src/camera.js, character.js, content.js, main.js, mobile.js, objects.js, scene.js
components/ui/portfolio-hero.tsx
```
