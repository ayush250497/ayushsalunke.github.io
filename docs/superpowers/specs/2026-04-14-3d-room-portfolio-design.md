# 3D Developer's Room Portfolio — Design Spec
_Date: 2026-04-14_

## Overview

Full rebuild of ayush-salunke's portfolio as a **3D interactive developer's room** inspired by Bruno Simon's portfolio. Visitors walk a character (WASD/arrow keys) through a low-poly room. Approaching an object shows a prompt; clicking flies the camera into that object, revealing resume content full-screen. ESC flies back out.

Replaces the current cyber-3D Three.js implementation entirely.

---

## 1. Visual Style

**Bold Modern** with a dark room aesthetic:
- Background: deep navy/near-black (`#080818`)
- Primary accent: purple-to-violet gradient (`#667eea → #764ba2`)
- Secondary accents: amber (`#f59e0b`) for contact, teal (`#34d399`) for education, orange (`#f97316`) for impact
- Typography: heavy weight (`font-weight: 900`), tight letter-spacing for headings; system-ui for body
- 3D room: low-poly style, warm ambient point lights, dark floor/walls with subtle emissive accents on interactive objects

---

## 2. Tech Stack

| Layer | Library | Version |
|---|---|---|
| 3D engine | Three.js | latest CDN |
| Physics | Rapier.js (WASM) | latest CDN |
| Camera animation | GSAP | latest CDN |
| Audio (optional) | Howler.js | latest CDN |
| Build | Vite | latest |
| Hosting | GitHub Pages | existing |

No framework. Vanilla JS modules via Vite. All 3D geometry is **procedural** — built from Three.js primitives (BoxGeometry, CylinderGeometry, etc.). No external GLTF/OBJ model files. This avoids an asset pipeline and keeps the repo lightweight.

---

## 3. Room Layout

Single rectangular room. Camera starts at entrance (front-center). Character spawns at entrance.

### Object → Content mapping

| Object | Position | Section | Accent color |
|---|---|---|---|
| 🖥️ Monitor + desk | Center of room | Experience | `#667eea` |
| 📚 Bookshelf | Back-left wall | Skills | `#667eea` |
| 🗒️ Whiteboard | Back-center wall | Projects | `#a78bfa` |
| 🎓 Diploma frames | Back-right wall | Education | `#34d399` |
| 🏆 Trophy shelf | Front-right corner | Impact stats | `#f97316` |
| 📱 Phone on front desk | **Front-center** (near entrance) | Contact | `#f59e0b` |

**Contact is placed front-and-center**, closest to the character's start position — first object reachable, impossible to miss.

---

## 4. Interaction System

### Proximity detection
- Each interactive object has a bounding sphere (radius ~1.5 units)
- Every frame: check distance from character to each object
- On enter: object glows (emissive intensity up), floating label appears ("Press E or Click")
- On exit: glow resets, label hides

### Camera zoom-in (click / press E)
1. GSAP tween: camera position + lookAt animate from room view → 0.3 units in front of object surface
2. Duration: 800ms, ease: `power2.inOut`
3. Character hidden during zoom
4. Content div fades in over zoomed view (opacity 0 → 1, 300ms delay after camera lands)
5. Physics paused during zoom

### Camera zoom-out (ESC or back button)
1. Content fades out
2. GSAP tween: camera flies back to room view
3. Character re-appears
4. Physics resumes

---

## 5. Content per Section

### 🖥️ Experience (Monitor)
Vertical timeline, two entries:

**JP Morgan Chase — Lead Software Engineer** | Jun 2022 – Present
- React UI for deployment platform → 200+ developers on GCP
- 70% reduction in deployment complexity & velocity
- 75% faster CI/CD via Spinnaker & Harness, Maven/Gradle
- Tags: React, Java, Dropwizard, GCP, Spinnaker, Harness

**UBS — Software Developer** | Jul 2019 – Jun 2021
- AI/NLP automation → 80% processing time cut
- Drools engine managing 25,000+ financial regulation rules
- ReactJS + Python gamification platform for 20,000+ global users
- Tags: Java, Python, Drools, ReactJS

**UBS — Software Developer Intern** | Jul 2018 – Nov 2018
- Selenium + Java testing framework → 2M+ test scenarios

### 📚 Skills (Bookshelf)
Grouped tag clouds by category:

- **Languages**: Java, Python, C, C++, JavaScript
- **Backend/Data**: Spring Boot, Dropwizard, REST APIs, PostgreSQL, MySQL, GraphDB
- **Frontend**: ReactJS, NodeJS, HTML5, CSS3
- **Cloud & DevOps**: GCP, AWS, Azure, Kubernetes, Terraform, Docker, Spinnaker, Harness, Jenkins
- **Observability**: Datadog, Splunk, Dynatrace

### 🗒️ Projects (Whiteboard)
Two project cards:

**Pothole Detection System** (AWS, CNN/MobileNet)
- Real-time detection; published at ICIAMR 2019

**ParkSafe** (Flask, OpenStreetMap)
- Crime statistics → parking safety scores

### 🎓 Education (Diploma frames)
Two framed entries:

- **MS Computer Science & Engineering** — Santa Clara University — GPA: 3.815/4.0
- **B.Tech Computer Engineering** — VIT Pune, India — GPA: 3.64/4.0

### 🏆 Impact (Trophy shelf)
Stat cards highlighting key metrics:

- 200+ developers impacted
- 80% processing latency reduction
- 75% CI/CD delivery time reduction
- 70% deployment complexity reduction
- 25,000+ financial regulation rules managed
- 20,000+ global users engaged

### 📱 Contact (Front desk phone)
Large tappable cards:

- ✉️ ayush.salunke250497@gmail.com
- 💼 linkedin.com/in/ayush-salunke
- 📞 (669) 220-9962

---

## 6. Entry Experience

1. Page loads → black screen with minimal loading bar (Vite asset load + Rapier WASM init)
2. Loading complete → camera starts outside room, slowly pushes through entrance
3. Brief title card fades in: **"AYUSH SALUNKE / Senior Software Engineer"** then fades out
4. Character appears, controls hint shows bottom-left ("WASD to move · Click objects to explore")
5. Controls hint fades after 5s

---

## 7. Mobile Fallback

Rapier + Three.js with character physics is heavy on low-end mobile. If `navigator.hardwareConcurrency <= 2` or `window.innerWidth < 768`:
- Render simplified CSS-only version of the room (existing mobile.js pattern)
- Same Bold Modern visual style, card-based layout
- No 3D, no physics

---

## 8. File Structure

```
portfolio/
├── index.html
├── style.css               # global reset + loading screen
├── src/
│   ├── main.js             # entry: detect mobile, boot loader, init scene
│   ├── scene.js            # Three.js scene, lights, room geometry
│   ├── character.js        # Rapier character controller, WASD input
│   ├── objects.js          # interactive object definitions + proximity detection
│   ├── camera.js           # GSAP zoom-in/out logic
│   ├── content.js          # content HTML per section, fade in/out
│   └── mobile.js           # CSS fallback
├── assets/
│   └── models/             # GLTF models (or generated procedurally)
└── docs/
    └── superpowers/
```

---

## 9. Out of Scope

- Blog / writing section
- Dark/light mode toggle
- CMS or dynamic data
- Resume PDF download (can add later)
- Analytics
