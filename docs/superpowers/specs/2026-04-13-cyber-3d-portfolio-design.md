# Cyber 3D Portfolio — Design Spec
**Date:** 2026-04-13  
**Status:** Approved

---

## Overview

Replace the current 2D portfolio with a fully interactive Three.js cyber grid world (Bruno Simon–inspired). Desktop users free-roam a glowing wireframe city; clicking nodes opens overlay panels containing portfolio content. Mobile users get an enhanced 2D fallback with the same cyber aesthetic.

---

## Architecture

### File Structure

```
index.html          ← shell: canvas + overlay containers, mobile detection
style.css           ← world styles + overlay styles + mobile fallback styles
js/
  world.js          ← Three.js scene, grid, nodes, camera controls
  overlays.js       ← panel open/close system, content rendering
  loader.js         ← boot sequence, asset loading, intro animation
  mobile.js         ← 2D fallback (enhanced current site)
  cursor.js         ← custom cursor (desktop only)
```

### Dependencies

- **Three.js** (r160+) via CDN — core 3D engine
- **Three.js OrbitControls** — camera drag/zoom
- **GSAP 3** (already in project) — camera lerp, overlay transitions, counters
- **Space Grotesk + Space Mono** (already loaded) — unchanged

### Boot Flow

1. `loader.js` — terminal boot sequence: `INITIALIZING GRID...`, `LOADING ASSETS...`, glitching text
2. Three.js scene fades in — cyber grid city visible from elevated orbit angle
3. Hint overlay: `"DRAG TO EXPLORE · CLICK NODE TO ACCESS"`
4. User free-roams; clicking a node triggers camera fly-in + panel open

### Mobile Detection

`matchMedia('(pointer: coarse)')` + viewport width < 1024px → skip Three.js, load `mobile.js` (2D experience). Detection runs before any Three.js import.

---

## 3D World Design

### Scene

- **Grid floor:** `THREE.GridHelper` + custom shader — glowing purple/teal lines, pulse animation radiating from center
- **Fog:** `THREE.FogExp2` deep purple-black, fades geometry at distance
- **Lighting:** ambient dark purple + 5 colored point lights above each node
- **Sky:** particle field (stars/noise) above fog line
- **Scanlines:** CSS `::after` overlay on canvas wrapper (no perf cost)
- **Ambient particles:** data-stream particles rising from grid floor periodically

### Nodes (5 buildings)

| Section | Shape | Color | Label |
|---------|-------|-------|-------|
| About | Octahedron | `#6e56ff` purple | `ABOUT.exe` |
| Experience | Tall box (skyscraper) | `#00e8b0` teal | `EXPERIENCE.log` |
| Skills | Sphere cluster | `#c084fc` pink | `SKILLS.db` |
| Projects | Diamond pyramid | `#00cfff` cyan | `PROJECTS.dir` |
| Contact | Pulsing orb | `#00e8b0` green | `CONTACT.sh` |

**Per-node behavior:**
- Hover sine-wave float animation (continuous)
- Glow halo: `THREE.Sprite` or point light bloom
- On hover: scale 1.2×, cursor change, label appears above node in `Space Mono`
- On click: camera lerps toward node (~0.8s), node dissolves (scale + opacity + particle burst), panel opens

### Camera Controls

- **Drag:** `OrbitControls` — azimuth only (no underground tilt), mouse drag to pan
- **Zoom:** scroll wheel, clamped (min/max distance from center)
- **Idle auto-rotate:** starts after 5s idle, pauses on any interaction
- **Angle:** elevated isometric-ish view — not first-person

---

## Overlay Panel System

### Trigger Sequence

1. Click node → GSAP camera lerp toward it (~0.8s)
2. Node dissolves (scale-out + particle burst)
3. Panel slides in from right (desktop), bottom (tablet)
4. On close: panel slides out, camera pulls back, node reappears

### Panel Visual Style

- Background: `rgba(5,5,5,0.92)` + `backdrop-filter: blur(20px)`
- Border: glowing left edge in node's accent color
- Header: `> ABOUT.exe` in `Space Mono` with blinking cursor
- Section numbers as hex: `0x01`, `0x02`, etc.

### Content Per Panel

| Panel | Content |
|-------|---------|
| `ABOUT.exe` | Bio text, 4 skill cards (Full-Stack, Cloud, DevOps, AI) |
| `EXPERIENCE.log` | 3 experience cards (JPMC, UBS, UBS Intern) with metrics |
| `SKILLS.db` | Skill pills grouped by category with neon glow |
| `PROJECTS.dir` | 2 project rows (Pothole Detection, ParkSafe) as `ls -la` style |
| `CONTACT.sh` | Heading, email/phone/LinkedIn links |

Metrics animate up on panel open (GSAP counters, reuse existing logic).

### Panel Navigation

- `ESC` or `✕` button → close panel
- `←` / `→` arrow buttons → cycle prev/next section without returning to grid
- Bottom hint: `[ESC] CLOSE · [←/→] NAVIGATE`
- Only one panel open at a time; close current before opening next

---

## Mobile Fallback (2D Enhanced)

### Trigger

`matchMedia('(pointer: coarse)') || window.innerWidth < 1024` → load mobile path

### Visual Additions over Current Site

- **Hero:** CSS-only animated scanline grid background replaces particle canvas
- **Glitch effect:** Hero name `"Ayush Salunke"` occasionally glitches to `"4y45h_54lunke"` via CSS keyframes
- **Terminal prefix:** Section headings get `>` prefix styling
- **Loading screen:** Same terminal boot sequence text (no Three.js after)
- **Neon pulse:** Cards get subtle neon border pulse via CSS animation on scroll-into-view
- **Skills pills:** Glow on scroll-into-view

### Kept from Current Site

- GSAP scroll reveals, tilt cards, magnetic elements
- Horizontal scroll for experience
- Marquee tech stack ticker
- Custom cursor (already skips on touch via `hover: none` media query)
- All content, fonts, colors unchanged

---

## Out of Scope

- Sound effects / audio
- WebGL post-processing (bloom shader) — may add later but not in v1
- GitHub/resume PDF link in panels — not in current site, not adding
- Animations between panels (just slide in/out)
