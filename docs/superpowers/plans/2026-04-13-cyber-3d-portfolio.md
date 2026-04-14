# Cyber 3D Portfolio Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace current 2D portfolio with a Three.js cyber grid world where users free-roam and click nodes to open content overlays.

**Architecture:** Three.js scene with 5 glowing nodes on a cyber grid; clicking a node flies camera in and opens a frosted-glass overlay panel with portfolio content. Mobile (<1024px) gets enhanced 2D fallback.

**Tech Stack:** Three.js r160 (CDN), Three.js OrbitControls, GSAP 3 (existing)

---

### Task 1: Restructure HTML shell
- [ ] Replace `index.html` body with: full-screen `<canvas id="world">`, overlay container `<div id="overlay-root">`, mobile container `<div id="mobile-root">`, loader `<div id="loader">`. Add Three.js CDN scripts. Keep existing fonts/GSAP.
- [ ] Commit: `chore: restructure HTML shell for 3D world`

### Task 2: Loader (`js/loader.js`)
- [ ] Terminal boot sequence: cycle through `INITIALIZING GRID... LOADING ASSETS... ESTABLISHING CONNECTION...` with typewriter effect, then fade out and call `onDone()`.
- [ ] Commit: `feat: terminal boot loader`

### Task 3: Three.js World (`js/world.js`)
- [ ] Create scene, camera (PerspectiveCamera, elevated angle), renderer (full-screen, antialias).
- [ ] Add `GridHelper` (100×100, purple `#6e56ff`) + `FogExp2` dark purple.
- [ ] Add star field (1000 random points above fog line).
- [ ] Add 5 node meshes at fixed positions (octahedron, box, sphere, cone, small sphere). Each with point light + hover sine float.
- [ ] Add `OrbitControls` (azimuth only, clamped zoom).
- [ ] Raycaster for hover (scale 1.2×, show label) and click (trigger overlay).
- [ ] Idle auto-rotate after 5s.
- [ ] Scanline CSS overlay on canvas.
- [ ] Commit: `feat: Three.js cyber grid world`

### Task 4: Overlay System (`js/overlays.js`)
- [ ] Panel HTML template: frosted glass div, `> SECTION.exe` header with blinking cursor, content area, close button, prev/next arrows.
- [ ] `openPanel(id)`: camera lerp toward node (GSAP), node dissolves, panel slides in from right.
- [ ] `closePanel()`: panel slides out, camera pulls back, node reappears.
- [ ] `←/→` keyboard + button navigation between sections.
- [ ] `ESC` key closes.
- [ ] Content for all 5 panels: About, Experience, Skills, Projects, Contact (port existing HTML content).
- [ ] Animate metrics counters on panel open (reuse GSAP counter logic).
- [ ] Commit: `feat: overlay panel system`

### Task 5: Mobile Fallback (`js/mobile.js`)
- [ ] Detection: `window.innerWidth < 1024 || matchMedia('(pointer:coarse)').matches` → skip Three.js, render `#mobile-root`.
- [ ] Port current 2D site into `#mobile-root` with cyber upgrades: CSS glitch on hero name, scanline background, `>` section prefix, neon border pulse on cards.
- [ ] Keep GSAP scroll reveals, tilt, magnetic, marquee.
- [ ] Commit: `feat: enhanced 2D mobile fallback`

### Task 6: Style (`style.css`)
- [ ] World styles: canvas full-screen, scanline `::after`, node labels, hint overlay.
- [ ] Overlay styles: frosted glass panel, terminal header, content, nav arrows.
- [ ] Mobile styles: glitch keyframes, scanline grid, neon pulse.
- [ ] Commit: `feat: cyber world + overlay styles`

### Task 7: Wire up & polish
- [ ] `index.html` boot: detect mobile → branch to `mobile.js` or `loader.js` → `world.js` + `overlays.js`.
- [ ] `cursor.js`: port existing cursor, skip on touch.
- [ ] Test all 5 panels open/close, keyboard nav, mobile layout.
- [ ] Commit: `feat: wire up and polish`
