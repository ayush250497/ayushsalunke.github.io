# 3D Developer's Room Portfolio — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current portfolio with a Bruno Simon-style 3D developer's room where visitors walk a character through the room and click objects to zoom into resume content.

**Architecture:** Three.js procedural room + Rapier physics for character movement. GSAP handles camera zoom-in/out animations. Content panels are parsed via DOMParser and inserted via replaceChildren (safe, no innerHTML). Mobile fallback is a CSS-only card layout.

**Tech Stack:** Three.js, Rapier.js (WASM), GSAP, Vite, GitHub Pages

**Spec:** `docs/superpowers/specs/2026-04-14-3d-room-portfolio-design.md`

---

## File Structure

```
portfolio/
├── index.html              # shell: canvas + content divs + loading screen
├── style.css               # global reset, loading screen, content panel styles
├── vite.config.js          # Vite config for GitHub Pages base path
├── package.json
└── src/
    ├── main.js             # entry: mobile detect, boot loader, init, render loop
    ├── scene.js            # Three.js scene, renderer, lights, procedural room
    ├── character.js        # Rapier character controller + WASD/arrow input
    ├── objects.js          # interactive object meshes + proximity detection
    ├── camera.js           # GSAP zoom-in/zoom-out
    ├── content.js          # content strings per section + DOMParser render
    └── mobile.js           # CSS-only fallback
```

---

### Task 1: Project scaffold

- [ ] Delete all current JS files (`js/` dir), keep `index.html`, `style.css`
- [ ] Init Vite project in-place:
```bash
npm create vite@latest . -- --template vanilla
npm install three @dimforge/rapier3d-compat gsap
```
- [ ] Create `vite.config.js`:
```js
import { defineConfig } from 'vite'
export default defineConfig({ base: './' })
```
- [ ] Commit: `chore: scaffold Vite + install Three.js, Rapier, GSAP`

---

### Task 2: HTML shell + CSS

- [ ] Rewrite `index.html`:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Ayush Salunke</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <div id="loading">
    <div class="loading-name">AYUSH SALUNKE</div>
    <div class="loading-bar"><div class="loading-fill"></div></div>
  </div>
  <canvas id="canvas"></canvas>
  <div id="hint">WASD · click objects to explore</div>
  <div id="content-overlay" class="hidden" role="dialog" aria-modal="true"></div>
  <script type="module" src="/src/main.js"></script>
</body>
</html>
```
- [ ] Write `style.css`:
```css
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { background: #080818; color: #fff; font-family: system-ui, sans-serif; overflow: hidden; }
#canvas { position: fixed; inset: 0; width: 100%; height: 100%; }

#loading {
  position: fixed; inset: 0; background: #080818;
  display: flex; flex-direction: column; align-items: center;
  justify-content: center; gap: 24px; z-index: 100; transition: opacity 0.6s;
}
#loading.fade-out { opacity: 0; pointer-events: none; }
.loading-name { font-size: clamp(24px, 5vw, 48px); font-weight: 900; letter-spacing: -1px; }
.loading-bar { width: 200px; height: 3px; background: #ffffff22; border-radius: 2px; }
.loading-fill { height: 100%; background: linear-gradient(90deg,#667eea,#764ba2); border-radius: 2px; width: 0%; transition: width 0.3s; }

#hint {
  position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
  font-size: 12px; color: #ffffff66; letter-spacing: 2px; text-transform: uppercase;
  transition: opacity 1s; pointer-events: none;
}
#hint.hidden { opacity: 0; }

#content-overlay {
  position: fixed; inset: 0; background: #080818ee;
  display: flex; align-items: center; justify-content: center;
  z-index: 50; transition: opacity 0.3s;
}
#content-overlay.hidden { opacity: 0; pointer-events: none; }

.content-panel {
  background: #0e0e24; border: 1px solid #667eea33; border-radius: 12px;
  padding: 32px; max-width: 680px; width: 90%; max-height: 80vh;
  overflow-y: auto; position: relative;
}
.content-panel .close-btn {
  position: absolute; top: 16px; right: 20px;
  background: none; border: none; color: #ffffff44; font-size: 20px; cursor: pointer;
}
.content-panel .close-btn:hover { color: #fff; }
.section-label {
  font-size: 10px; font-weight: 700; letter-spacing: 3px;
  text-transform: uppercase; margin-bottom: 20px;
}
.tag {
  display: inline-block; border-radius: 4px; padding: 4px 10px;
  font-size: 12px; margin: 2px;
}
.stat-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 12px;
}
.stat-card {
  background: #12122a; border-radius: 8px; padding: 16px; text-align: center;
}
.stat-number { font-size: 32px; font-weight: 900; color: #f97316; }
.stat-label { font-size: 11px; color: #9090b0; margin-top: 4px; }
.contact-link {
  display: flex; align-items: center; gap: 14px;
  background: #1e1e3f; border-radius: 8px; padding: 14px 18px;
  margin-bottom: 10px; color: #fff; text-decoration: none;
}
.contact-link:hover { opacity: 0.85; }
.contact-link .contact-type { font-size: 10px; font-weight: 700; letter-spacing: 1px; }
.contact-link .contact-value { font-size: 14px; margin-top: 2px; }
```
- [ ] Commit: `feat: HTML shell and base CSS`

---

### Task 3: Three.js scene + procedural room (`scene.js`)

- [ ] Create `src/scene.js`:
```js
import * as THREE from 'three'

export function createScene(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.shadowMap.enabled = true

  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x080818)
  scene.fog = new THREE.Fog(0x080818, 15, 30)

  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100)
  camera.position.set(0, 3, 8)
  camera.lookAt(0, 0, 0)

  scene.add(new THREE.AmbientLight(0x222244, 1.5))
  const keyLight = new THREE.PointLight(0x667eea, 2, 20)
  keyLight.position.set(0, 5, 0)
  scene.add(keyLight)

  const wallMat = new THREE.MeshStandardMaterial({ color: 0x0d0d22, roughness: 0.9 })
  const floorMat = new THREE.MeshStandardMaterial({ color: 0x0a0a1a, roughness: 0.8 })

  const floor = new THREE.Mesh(new THREE.PlaneGeometry(14, 14), floorMat)
  floor.rotation.x = -Math.PI / 2
  floor.receiveShadow = true
  scene.add(floor)

  const backWall = new THREE.Mesh(new THREE.PlaneGeometry(14, 8), wallMat)
  backWall.position.set(0, 4, -7)
  scene.add(backWall)

  const leftWall = new THREE.Mesh(new THREE.PlaneGeometry(14, 8), wallMat)
  leftWall.rotation.y = Math.PI / 2
  leftWall.position.set(-7, 4, 0)
  scene.add(leftWall)

  const rightWall = new THREE.Mesh(new THREE.PlaneGeometry(14, 8), wallMat)
  rightWall.rotation.y = -Math.PI / 2
  rightWall.position.set(7, 4, 0)
  scene.add(rightWall)

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  })

  return { scene, camera, renderer }
}
```
- [ ] Commit: `feat: Three.js scene with procedural room geometry`

---

### Task 4: Interactive objects (`objects.js`)

- [ ] Create `src/objects.js` — 6 low-poly objects + proximity check:
```js
import * as THREE from 'three'

const PROXIMITY_RADIUS = 2.5

function makeMesh(geo, color, emissive = color) {
  return new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color, emissive, emissiveIntensity: 0.25, roughness: 0.6 }))
}

function makeDesk(scene) {
  const g = new THREE.Group()
  const top = makeMesh(new THREE.BoxGeometry(2, 0.1, 1), 0x1e1e3f, 0x1e1e3f)
  top.position.y = 0.8
  const monitor = makeMesh(new THREE.BoxGeometry(1.2, 0.9, 0.08), 0x0a0a1a, 0x667eea)
  monitor.position.set(0, 1.35, -0.3)
  g.add(top, monitor)
  g.position.set(0, 0, -2)
  scene.add(g)
  return { mesh: g, key: 'experience', position: new THREE.Vector3(0, 1.2, -2), label: 'Experience' }
}

function makeBookshelf(scene) {
  const g = new THREE.Group()
  const body = makeMesh(new THREE.BoxGeometry(2, 3, 0.4), 0x1a1a3a, 0x1a1a3a)
  body.position.set(0, 1.5, 0)
  g.add(body)
  const bookColors = [0x667eea, 0x764ba2, 0x34d399, 0xf59e0b, 0xf97316]
  bookColors.forEach((c, i) => {
    const book = makeMesh(new THREE.BoxGeometry(0.18, 0.8, 0.25), c, c)
    book.position.set(-0.6 + i * 0.28, 1.8, 0.1)
    g.add(book)
  })
  g.position.set(-5, 0, -5)
  scene.add(g)
  return { mesh: g, key: 'skills', position: new THREE.Vector3(-5, 1.5, -5), label: 'Skills' }
}

function makeWhiteboard(scene) {
  const board = makeMesh(new THREE.BoxGeometry(2.5, 1.6, 0.08), 0x1e1e3f, 0xa78bfa)
  board.position.set(0, 2, -6.8)
  scene.add(board)
  return { mesh: board, key: 'projects', position: new THREE.Vector3(0, 2, -6.8), label: 'Projects' }
}

function makeDiplomas(scene) {
  const g = new THREE.Group()
  ;[-0.7, 0.7].forEach(x => {
    const frame = makeMesh(new THREE.BoxGeometry(1, 0.75, 0.05), 0x1e1e3f, 0x34d399)
    frame.position.set(x, 0, 0)
    g.add(frame)
  })
  g.position.set(5, 2.5, -6.5)
  scene.add(g)
  return { mesh: g, key: 'education', position: new THREE.Vector3(5, 2.5, -6.5), label: 'Education' }
}

function makeTrophy(scene) {
  const g = new THREE.Group()
  const base = makeMesh(new THREE.BoxGeometry(0.8, 0.1, 0.4), 0x1a1a3a, 0x1a1a3a)
  const cup = makeMesh(new THREE.CylinderGeometry(0.18, 0.1, 0.4, 8), 0xf97316, 0xf97316)
  cup.position.y = 0.25
  g.add(base, cup)
  g.position.set(5, 0.8, 4)
  scene.add(g)
  return { mesh: g, key: 'impact', position: new THREE.Vector3(5, 0.8, 4), label: 'Impact' }
}

function makePhone(scene) {
  // Front-center — first object reachable
  const phone = makeMesh(new THREE.BoxGeometry(0.35, 0.6, 0.05), 0x1a1a1a, 0xf59e0b)
  phone.position.set(0, 0.85, 4.5)
  phone.rotation.x = -0.2
  scene.add(phone)
  return { mesh: phone, key: 'contact', position: new THREE.Vector3(0, 0.85, 4.5), label: 'Contact' }
}

export function createObjects(scene) {
  return [makeDesk(scene), makeBookshelf(scene), makeWhiteboard(scene),
          makeDiplomas(scene), makeTrophy(scene), makePhone(scene)]
}

export function checkProximity(charPos, objects) {
  for (const obj of objects) {
    if (charPos.distanceTo(obj.position) < PROXIMITY_RADIUS) return obj
  }
  return null
}
```
- [ ] Commit: `feat: interactive room objects with proximity detection`

---

### Task 5: Character controller (`character.js`)

- [ ] Create `src/character.js`:
```js
import * as THREE from 'three'

export async function createCharacter(scene, RAPIER) {
  const world = new RAPIER.World({ x: 0, y: -9.81, z: 0 })

  const floorBody = world.createRigidBody(RAPIER.RigidBodyDesc.fixed())
  world.createCollider(RAPIER.ColliderDesc.cuboid(7, 0.1, 7), floorBody)

  const charDesc = RAPIER.RigidBodyDesc.kinematicPositionBased().setTranslation(0, 1, 6)
  const charBody = world.createRigidBody(charDesc)
  world.createCollider(RAPIER.ColliderDesc.capsule(0.4, 0.3), charBody)

  const mesh = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.3, 0.8, 4, 8),
    new THREE.MeshStandardMaterial({ color: 0x667eea })
  )
  scene.add(mesh)

  const controller = world.createCharacterController(0.01)
  controller.setApplyImpulsesToDynamicBodies(true)

  const keys = {}
  window.addEventListener('keydown', e => { keys[e.code] = true })
  window.addEventListener('keyup', e => { keys[e.code] = false })

  const SPEED = 4
  const moveDir = new THREE.Vector3()

  function update(dt) {
    moveDir.set(0, 0, 0)
    if (keys['KeyW'] || keys['ArrowUp'])    moveDir.z -= 1
    if (keys['KeyS'] || keys['ArrowDown'])  moveDir.z += 1
    if (keys['KeyA'] || keys['ArrowLeft'])  moveDir.x -= 1
    if (keys['KeyD'] || keys['ArrowRight']) moveDir.x += 1
    moveDir.normalize().multiplyScalar(SPEED * dt)

    controller.computeColliderMovement(charBody.collider(0), { x: moveDir.x, y: -0.2, z: moveDir.z })
    const corrected = controller.computedMovement()
    const pos = charBody.translation()
    charBody.setNextKinematicTranslation({ x: pos.x + corrected.x, y: pos.y + corrected.y, z: pos.z + corrected.z })
    world.step()

    const t = charBody.translation()
    mesh.position.set(t.x, t.y, t.z)
    return new THREE.Vector3(t.x, t.y, t.z)
  }

  return { update, mesh }
}
```
- [ ] Commit: `feat: Rapier character controller with WASD movement`

---

### Task 6: Camera zoom (`camera.js`)

- [ ] Create `src/camera.js`:
```js
import { gsap } from 'gsap'
import * as THREE from 'three'

export function zoomInTo(camera, targetPosition, onComplete) {
  const dest = targetPosition.clone().add(new THREE.Vector3(0, 0.3, 1.8))
  gsap.to(camera.position, {
    x: dest.x, y: dest.y, z: dest.z,
    duration: 0.9, ease: 'power2.inOut',
    onUpdate: () => camera.lookAt(targetPosition),
    onComplete,
  })
}

export function zoomOut(camera, onComplete) {
  gsap.to(camera.position, {
    x: 0, y: 3, z: 8,
    duration: 0.9, ease: 'power2.inOut',
    onUpdate: () => camera.lookAt(0, 0, 0),
    onComplete,
  })
}
```
- [ ] Commit: `feat: GSAP camera zoom in/out`

---

### Task 7: Content panels (`content.js`)

Build HTML strings for all 6 sections. Use `DOMParser` + `replaceChildren` to safely render — no direct DOM string injection.

- [ ] Create `src/content.js`:
```js
function experienceHTML() {
  return `<div class="content-panel">
    <button class="close-btn" id="close-btn">&#x2715;</button>
    <div class="section-label" style="color:#667eea">Experience</div>
    <div style="border-left:2px solid #667eea;padding-left:16px;margin-bottom:24px">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:6px">
        <strong style="font-size:18px">JP Morgan Chase</strong>
        <span style="font-size:11px;color:#667eea;background:#667eea22;padding:2px 8px;border-radius:4px">Jun 2022 – Present</span>
      </div>
      <div style="color:#a78bfa;font-size:13px;margin-bottom:10px">Lead Software Engineer</div>
      <ul style="font-size:13px;color:#9090b0;line-height:1.8;list-style:none">
        <li>&#x2192; React UI deployment platform for 200+ developers on GCP</li>
        <li>&#x2192; 70% reduction in deployment complexity &amp; velocity</li>
        <li>&#x2192; 75% faster CI/CD via Spinnaker &amp; Harness</li>
        <li>&#x2192; High-performance REST APIs with Dropwizard/Java</li>
      </ul>
      <div style="margin-top:12px">
        ${['React','Java','Dropwizard','GCP','Spinnaker','Harness'].map(t =>
          `<span class="tag" style="background:#667eea22;color:#667eea">${t}</span>`).join('')}
      </div>
    </div>
    <div style="border-left:2px solid #764ba244;padding-left:16px;margin-bottom:24px">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:6px">
        <strong style="font-size:18px">UBS</strong>
        <span style="font-size:11px;color:#764ba2;background:#764ba222;padding:2px 8px;border-radius:4px">Jul 2019 – Jun 2021</span>
      </div>
      <div style="color:#a78bfa;font-size:13px;margin-bottom:10px">Software Developer</div>
      <ul style="font-size:13px;color:#9090b0;line-height:1.8;list-style:none">
        <li>&#x2192; AI/NLP automation cutting manual processing time by 80%</li>
        <li>&#x2192; Drools engine for 25,000+ global financial regulation rules</li>
        <li>&#x2192; ReactJS + Python gamification for 20,000+ global users</li>
      </ul>
    </div>
    <div style="border-left:2px solid #334;padding-left:16px">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:6px">
        <strong>UBS — Intern</strong>
        <span style="font-size:11px;color:#666;padding:2px 8px">Jul – Nov 2018</span>
      </div>
      <ul style="font-size:12px;color:#9090b0;line-height:1.8;list-style:none">
        <li>&#x2192; Selenium + Java framework validating 2M+ test scenarios</li>
      </ul>
    </div>
  </div>`
}

function skillsHTML() {
  const groups = [
    ['Languages', ['Java','Python','C','C++','JavaScript'], '#667eea'],
    ['Backend / Data', ['Spring Boot','Dropwizard','REST APIs','PostgreSQL','MySQL','GraphDB'], '#a78bfa'],
    ['Frontend', ['ReactJS','NodeJS','HTML5','CSS3','Bootstrap'], '#34d399'],
    ['Cloud &amp; DevOps', ['GCP','AWS','Azure','Kubernetes','Terraform','Docker','Spinnaker','Harness','Jenkins'], '#f59e0b'],
    ['Observability', ['Datadog','Splunk','Dynatrace'], '#f97316'],
  ]
  return `<div class="content-panel">
    <button class="close-btn" id="close-btn">&#x2715;</button>
    <div class="section-label" style="color:#667eea">Skills</div>
    ${groups.map(([cat, tags, color]) => `
      <div style="margin-bottom:20px">
        <div style="font-size:10px;font-weight:700;letter-spacing:2px;color:${color};margin-bottom:8px">${cat.toUpperCase()}</div>
        <div>${tags.map(t => `<span class="tag" style="background:${color}22;color:${color}">${t}</span>`).join('')}</div>
      </div>`).join('')}
  </div>`
}

function projectsHTML() {
  return `<div class="content-panel">
    <button class="close-btn" id="close-btn">&#x2715;</button>
    <div class="section-label" style="color:#a78bfa">Projects</div>
    <div style="background:#12122a;border:1px solid #a78bfa33;border-radius:8px;padding:20px;margin-bottom:16px">
      <div style="font-size:16px;font-weight:700;margin-bottom:6px">Pothole Detection System</div>
      <div style="font-size:11px;color:#a78bfa;margin-bottom:10px">AWS · CNN · MobileNet</div>
      <p style="font-size:13px;color:#9090b0;line-height:1.7">Real-time pothole detection using MobileNet CNN. Published and presented at ICIAMR 2019.</p>
    </div>
    <div style="background:#12122a;border:1px solid #a78bfa33;border-radius:8px;padding:20px">
      <div style="font-size:16px;font-weight:700;margin-bottom:6px">ParkSafe</div>
      <div style="font-size:11px;color:#a78bfa;margin-bottom:10px">Flask · OpenStreetMap</div>
      <p style="font-size:13px;color:#9090b0;line-height:1.7">Safety scores for parking spots using processed crime statistics.</p>
    </div>
  </div>`
}

function educationHTML() {
  return `<div class="content-panel">
    <button class="close-btn" id="close-btn">&#x2715;</button>
    <div class="section-label" style="color:#34d399">Education</div>
    <div style="background:#12122a;border:1px solid #34d39933;border-radius:8px;padding:20px;margin-bottom:16px">
      <div style="font-size:16px;font-weight:700;margin-bottom:4px">Santa Clara University</div>
      <div style="font-size:13px;color:#34d399;margin-bottom:8px">MS in Computer Science &amp; Engineering</div>
      <div style="font-size:28px;font-weight:900">3.815 <span style="font-size:14px;color:#666">/ 4.0</span></div>
    </div>
    <div style="background:#12122a;border:1px solid #34d39933;border-radius:8px;padding:20px">
      <div style="font-size:16px;font-weight:700;margin-bottom:4px">VIT Pune, India</div>
      <div style="font-size:13px;color:#34d399;margin-bottom:8px">B.Tech in Computer Engineering</div>
      <div style="font-size:28px;font-weight:900">3.64 <span style="font-size:14px;color:#666">/ 4.0</span></div>
    </div>
  </div>`
}

function impactHTML() {
  const stats = [
    ['200+','Developers impacted'], ['80%','Processing latency cut'],
    ['75%','Faster CI/CD'], ['70%','Deployment complexity reduced'],
    ['25k+','Financial rules managed'], ['20k+','Global users engaged'],
  ]
  return `<div class="content-panel">
    <button class="close-btn" id="close-btn">&#x2715;</button>
    <div class="section-label" style="color:#f97316">Impact</div>
    <div class="stat-grid">
      ${stats.map(([n,l]) => `
        <div class="stat-card">
          <div class="stat-number">${n}</div>
          <div class="stat-label">${l}</div>
        </div>`).join('')}
    </div>
  </div>`
}

function contactHTML() {
  return `<div class="content-panel">
    <button class="close-btn" id="close-btn">&#x2715;</button>
    <div class="section-label" style="color:#f59e0b">Contact</div>
    <div style="text-align:center;margin-bottom:28px">
      <div style="font-size:26px;font-weight:900">Ayush Salunke</div>
      <div style="font-size:13px;color:#8080a0;margin-top:6px">Senior Software Engineer &middot; Open to opportunities</div>
    </div>
    <a href="mailto:ayush.salunke250497@gmail.com" class="contact-link" style="border:1px solid #f59e0b44">
      <span style="font-size:22px">&#x2709;&#xFE0F;</span>
      <div><div class="contact-type" style="color:#f59e0b">EMAIL</div><div class="contact-value">ayush.salunke250497@gmail.com</div></div>
    </a>
    <a href="https://linkedin.com/in/ayush-salunke" target="_blank" rel="noopener" class="contact-link" style="border:1px solid #0ea5e944">
      <span style="font-size:22px">&#x1F4BC;</span>
      <div><div class="contact-type" style="color:#0ea5e9">LINKEDIN</div><div class="contact-value">linkedin.com/in/ayush-salunke</div></div>
    </a>
    <a href="tel:6692209962" class="contact-link" style="border:1px solid #8b5cf644">
      <span style="font-size:22px">&#x1F4DE;</span>
      <div><div class="contact-type" style="color:#8b5cf6">PHONE</div><div class="contact-value">(669) 220-9962</div></div>
    </a>
  </div>`
}

const generators = { experience: experienceHTML, skills: skillsHTML, projects: projectsHTML, education: educationHTML, impact: impactHTML, contact: contactHTML }

export function showContent(key, onClose) {
  const overlay = document.getElementById('content-overlay')
  // Parse static HTML string safely — content is hardcoded, not user input
  const parser = new DOMParser()
  const doc = parser.parseFromString(generators[key](), 'text/html')
  overlay.replaceChildren(...Array.from(doc.body.childNodes))
  overlay.classList.remove('hidden')
  overlay.querySelector('#close-btn').addEventListener('click', () => {
    overlay.classList.add('hidden')
    onClose()
  })
}

export function hideContent() {
  document.getElementById('content-overlay').classList.add('hidden')
}
```
- [ ] Commit: `feat: content panels for all 6 resume sections`

---

### Task 8: Main entry + render loop (`main.js`)

- [ ] Create `src/main.js`:
```js
import RAPIER from '@dimforge/rapier3d-compat'
import { createScene } from './scene.js'
import { createObjects, checkProximity } from './objects.js'
import { createCharacter } from './character.js'
import { zoomInTo, zoomOut } from './camera.js'
import { showContent, hideContent } from './content.js'

const isMobile = navigator.hardwareConcurrency <= 2 || window.innerWidth < 768
if (isMobile) {
  import('./mobile.js').then(m => m.initMobile())
} else {
  initDesktop()
}

async function initDesktop() {
  const fill = document.querySelector('.loading-fill')
  fill.style.width = '30%'

  await RAPIER.init()
  fill.style.width = '70%'

  const canvas = document.getElementById('canvas')
  const { scene, camera, renderer } = createScene(canvas)
  const objects = createObjects(scene)
  const character = await createCharacter(scene, RAPIER)
  fill.style.width = '100%'

  setTimeout(() => {
    document.getElementById('loading').classList.add('fade-out')
    setTimeout(() => document.getElementById('loading').remove(), 700)
  }, 400)

  const hint = document.getElementById('hint')
  setTimeout(() => hint.classList.add('hidden'), 5000)

  let zoomed = false
  let nearObject = null

  canvas.addEventListener('click', () => {
    if (zoomed || !nearObject) return
    zoomed = true
    character.mesh.visible = false
    hint.classList.add('hidden')
    zoomInTo(camera, nearObject.position, () => {
      showContent(nearObject.key, () => {
        zoomOut(camera, () => {
          character.mesh.visible = true
          zoomed = false
        })
      })
    })
  })

  window.addEventListener('keydown', e => {
    if (e.code === 'Escape' && zoomed) {
      hideContent()
      zoomOut(camera, () => {
        character.mesh.visible = true
        zoomed = false
      })
    }
  })

  let prev = performance.now()
  function tick() {
    requestAnimationFrame(tick)
    const now = performance.now()
    const dt = Math.min((now - prev) / 1000, 0.05)
    prev = now

    if (!zoomed) {
      const charPos = character.update(dt)
      nearObject = checkProximity(charPos, objects)

      objects.forEach(obj => {
        const meshes = obj.mesh.isGroup ? obj.mesh.children : [obj.mesh]
        meshes.forEach(m => {
          if (m.material?.emissiveIntensity !== undefined) {
            m.material.emissiveIntensity = (obj === nearObject) ? 0.9 : 0.25
          }
        })
      })

      const p = character.mesh.position
      camera.position.lerp({ x: p.x, y: p.y + 4, z: p.z + 7 }, 0.08)
      camera.lookAt(p.x, p.y + 0.5, p.z)
    }

    renderer.render(scene, camera)
  }
  tick()
}
```
- [ ] Commit: `feat: main loop, entry sequence, click-to-zoom`

---

### Task 9: Mobile fallback (`mobile.js`)

- [ ] Create `src/mobile.js` using safe DOM construction (no string injection):
```js
export function initMobile() {
  document.getElementById('canvas')?.remove()
  document.getElementById('hint')?.remove()
  document.getElementById('loading')?.remove()
  document.body.style.overflow = 'auto'

  const wrap = document.createElement('div')
  wrap.style.cssText = 'max-width:600px;margin:0 auto;padding:24px 16px;font-family:system-ui'

  // Helper: section card
  function card(label, color, bodyText) {
    const div = document.createElement('div')
    div.style.cssText = 'background:#0e0e24;border-radius:8px;padding:20px;margin-bottom:12px'
    const lbl = document.createElement('div')
    lbl.style.cssText = `font-size:10px;font-weight:700;letter-spacing:2px;color:${color};margin-bottom:12px`
    lbl.textContent = label
    const body = document.createElement('div')
    body.style.cssText = 'font-size:14px;color:#9090b0;line-height:1.7'
    body.textContent = bodyText
    div.append(lbl, body)
    return div
  }

  // Hero
  const hero = document.createElement('div')
  hero.style.cssText = 'text-align:center;padding:48px 0 32px'
  const name = document.createElement('div')
  name.style.cssText = 'font-size:36px;font-weight:900;letter-spacing:-1px'
  name.textContent = 'AYUSH SALUNKE'
  const title = document.createElement('div')
  title.style.cssText = 'color:#9090b0;margin-top:8px'
  title.textContent = 'Senior Software Engineer'
  hero.append(name, title)
  wrap.appendChild(hero)

  // Contact links — front and center
  function contactLink(href, emoji, label, value, color) {
    const a = document.createElement('a')
    a.href = href
    if (href.startsWith('http')) a.target = '_blank'
    a.style.cssText = `display:flex;align-items:center;gap:12px;background:#1e1e3f;border-radius:8px;padding:14px;margin-bottom:8px;color:#fff;text-decoration:none`
    const icon = document.createElement('span')
    icon.style.fontSize = '20px'
    icon.textContent = emoji
    const info = document.createElement('div')
    const lbl = document.createElement('div')
    lbl.style.cssText = `font-size:10px;font-weight:700;color:${color}`
    lbl.textContent = label
    const val = document.createElement('div')
    val.style.cssText = 'font-size:13px'
    val.textContent = value
    info.append(lbl, val)
    a.append(icon, info)
    return a
  }

  wrap.appendChild(contactLink('mailto:ayush.salunke250497@gmail.com', '✉️', 'EMAIL', 'ayush.salunke250497@gmail.com', '#f59e0b'))
  wrap.appendChild(contactLink('https://linkedin.com/in/ayush-salunke', '💼', 'LINKEDIN', 'linkedin.com/in/ayush-salunke', '#0ea5e9'))
  wrap.appendChild(contactLink('tel:6692209962', '📞', 'PHONE', '(669) 220-9962', '#8b5cf6'))

  wrap.appendChild(card('EXPERIENCE', '#667eea', 'JP Morgan Chase · Lead SWE · Jun 2022–Present\nUBS · Software Developer · 2019–2021'))
  wrap.appendChild(card('SKILLS', '#667eea', 'Java · Python · React · GCP · AWS · Kubernetes · Docker'))
  wrap.appendChild(card('EDUCATION', '#34d399', 'SCU — MS CS 3.815 · VIT — B.Tech 3.64'))

  document.body.appendChild(wrap)
}
```
- [ ] Commit: `feat: mobile fallback with safe DOM construction`

---

### Task 10: Build + deploy

- [ ] `npm run build` — verify dist/ output, no errors
- [ ] `npm run preview` — open browser, verify:
  - Character walks with WASD
  - Approaching phone (contact) → object glows
  - Click phone → camera zooms → contact panel shows with email/LinkedIn/phone
  - Click each of the 5 other objects → correct panel opens
  - ESC closes panel, camera zooms back
  - Mobile view: contact links appear at top
- [ ] Add deploy script to `package.json`:
```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "deploy": "npm run build && gh-pages -d dist"
}
```
- [ ] `npm install --save-dev gh-pages`
- [ ] Push branch + open PR to main
- [ ] Commit: `chore: build verified, deploy ready`
