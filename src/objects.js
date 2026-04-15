import * as THREE from 'three'

const PROXIMITY_RADIUS = 2.5

function mat(color, emissive = color, emissiveIntensity = 0.3, metalness = 0.1) {
  return new THREE.MeshStandardMaterial({ color, emissive, emissiveIntensity, roughness: 0.5, metalness })
}

function box(w, h, d, color, emissive, ei) {
  return new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat(color, emissive, ei))
}

function shadow(mesh) {
  mesh.castShadow = true
  mesh.receiveShadow = true
  return mesh
}

function makeDesk(scene) {
  const g = new THREE.Group()

  // Desk top
  const top = shadow(box(2.2, 0.08, 1.0, 0x1a1a3a, 0x2a2a5a, 0.1, 0.3))
  top.position.y = 0.82

  // Desk legs
  const legMat = mat(0x151530, 0x151530, 0.05)
  ;[[-0.95, -0.45], [0.95, -0.45], [-0.95, 0.45], [0.95, 0.45]].forEach(([x, z]) => {
    const leg = shadow(new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.8, 0.06), legMat))
    leg.position.set(x, 0.4, z)
    g.add(leg)
  })

  // Monitor stand
  const stand = shadow(box(0.1, 0.35, 0.1, 0x111128, 0x111128, 0.05))
  stand.position.set(0, 1.05, -0.22)

  // Monitor base
  const monBase = shadow(box(0.5, 0.04, 0.3, 0x111128, 0x111128, 0.05))
  monBase.position.set(0, 0.88, -0.22)

  // Screen bezel
  const bezel = shadow(box(1.3, 0.85, 0.06, 0x0a0a18, 0x0a0a18, 0.05))
  bezel.position.set(0, 1.48, -0.22)

  // Screen glow
  const screen = new THREE.Mesh(
    new THREE.PlaneGeometry(1.18, 0.73),
    new THREE.MeshStandardMaterial({ color: 0x1a1a4a, emissive: 0x667eea, emissiveIntensity: 0.7, roughness: 0.3 })
  )
  screen.position.set(0, 1.48, -0.18)

  // Keyboard
  const kbd = shadow(box(0.9, 0.03, 0.32, 0x131325, 0x131325, 0.05))
  kbd.position.set(0, 0.87, 0.2)

  // Small desk lamp
  const lampBase = shadow(box(0.08, 0.04, 0.08, 0x222244, 0x222244, 0.1))
  lampBase.position.set(-0.7, 0.86, -0.1)
  const lampArm = shadow(box(0.03, 0.4, 0.03, 0x222244, 0x222244, 0.1))
  lampArm.position.set(-0.7, 1.06, -0.1)
  const lampHead = new THREE.Mesh(
    new THREE.SphereGeometry(0.08, 8, 8),
    new THREE.MeshStandardMaterial({ color: 0xfff0aa, emissive: 0xfff0aa, emissiveIntensity: 1.5 })
  )
  lampHead.position.set(-0.7, 1.3, -0.1)

  g.add(top, stand, monBase, bezel, screen, kbd, lampBase, lampArm, lampHead)
  g.position.set(0, 0, -2)
  scene.add(g)
  return { mesh: g, key: 'experience', position: new THREE.Vector3(0, 1.2, -2), label: 'Experience' }
}

function makeBookshelf(scene) {
  const g = new THREE.Group()

  // Back panel
  const back = shadow(box(2.2, 3.2, 0.08, 0x0e0e22, 0x0e0e22, 0.05))
  back.position.set(0, 1.6, -0.15)

  // Side panels
  ;[-1.06, 1.06].forEach(x => {
    const side = shadow(box(0.08, 3.2, 0.4, 0x131328, 0x131328, 0.05))
    side.position.set(x, 1.6, 0)
    g.add(side)
  })

  // Shelves (4 shelves)
  ;[0.3, 1.0, 1.7, 2.4].forEach(y => {
    const shelf = shadow(box(2.1, 0.06, 0.4, 0x1a1a35, 0x1a1a35, 0.05))
    shelf.position.set(0, y, 0)
    g.add(shelf)
  })

  // Books on shelves
  const bookColors = [0x667eea, 0x764ba2, 0x34d399, 0xf59e0b, 0xf97316, 0xe55, 0x44aaff, 0x88dd44]
  let bi = 0
  ;[0.6, 1.3, 2.0].forEach(y => {
    let x = -0.85
    while (x < 0.85) {
      const w = 0.12 + Math.random() * 0.1
      const h = 0.45 + Math.random() * 0.25
      const c = bookColors[bi % bookColors.length]
      const book = shadow(new THREE.Mesh(
        new THREE.BoxGeometry(w, h, 0.28),
        new THREE.MeshStandardMaterial({ color: c, emissive: c, emissiveIntensity: 0.15, roughness: 0.8 })
      ))
      book.position.set(x + w / 2, y + h / 2, 0.02)
      g.add(book)
      x += w + 0.02
      bi++
    }
  })

  g.add(back)
  g.position.set(-5, 0, -5)
  scene.add(g)
  return { mesh: g, key: 'skills', position: new THREE.Vector3(-5, 1.5, -5), label: 'Skills' }
}

function makeWhiteboard(scene) {
  const g = new THREE.Group()

  // Frame
  const frame = shadow(box(2.8, 1.9, 0.08, 0x111122, 0x111122, 0.05))

  // Board surface
  const board = new THREE.Mesh(
    new THREE.PlaneGeometry(2.5, 1.6),
    new THREE.MeshStandardMaterial({ color: 0x1a1a3a, emissive: 0xa78bfa, emissiveIntensity: 0.25, roughness: 0.4 })
  )
  board.position.z = 0.05

  // Scribble lines (decorative)
  ;[[-0.5, 0.3], [0.4, 0], [-0.2, -0.3], [0.6, 0.4]].forEach(([x, y]) => {
    const line = new THREE.Mesh(
      new THREE.PlaneGeometry(0.6 + Math.random() * 0.5, 0.03),
      new THREE.MeshBasicMaterial({ color: 0xccaaff })
    )
    line.position.set(x, y, 0.06)
    g.add(line)
  })

  // Tray at bottom
  const tray = shadow(box(2.8, 0.08, 0.15, 0x111122, 0x111122, 0.05))
  tray.position.set(0, -0.9, 0.06)

  g.add(frame, board, tray)
  g.position.set(0, 2.8, -6.9)
  scene.add(g)
  return { mesh: g, key: 'projects', position: new THREE.Vector3(0, 2.8, -6.9), label: 'Projects' }
}

function makeDiplomas(scene) {
  const g = new THREE.Group()

  ;[
    { x: -0.75, color: 0x34d399, label: 'SCU' },
    { x: 0.75, color: 0x22aa77, label: 'VIT' },
  ].forEach(({ x, color }) => {
    // Outer frame
    const outer = shadow(box(1.1, 0.85, 0.04, 0x1a2a1a, color, 0.12))
    outer.position.set(x, 0, 0)

    // Inner parchment
    const inner = new THREE.Mesh(
      new THREE.PlaneGeometry(0.9, 0.65),
      new THREE.MeshStandardMaterial({ color: 0x1a2420, emissive: color, emissiveIntensity: 0.08 })
    )
    inner.position.set(x, 0, 0.03)

    // Seal dot
    const seal = new THREE.Mesh(
      new THREE.CircleGeometry(0.08, 12),
      new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.8 })
    )
    seal.position.set(x, -0.16, 0.04)

    g.add(outer, inner, seal)
  })

  g.position.set(5, 2.5, -6.6)
  scene.add(g)
  return { mesh: g, key: 'education', position: new THREE.Vector3(5, 2.5, -6.6), label: 'Education' }
}

function makeTrophy(scene) {
  const g = new THREE.Group()

  // Plinth / base
  const plinth = shadow(box(0.9, 0.12, 0.5, 0x1a1a2e, 0x1a1a2e, 0.05))
  plinth.position.y = 0.06

  // Stem
  const stem = shadow(new THREE.Mesh(
    new THREE.CylinderGeometry(0.06, 0.1, 0.3, 8),
    mat(0xc07030, 0xf97316, 0.4, 0.6)
  ))
  stem.castShadow = true
  stem.position.y = 0.27

  // Cup body
  const cup = shadow(new THREE.Mesh(
    new THREE.CylinderGeometry(0.22, 0.1, 0.45, 12),
    mat(0xd08040, 0xf97316, 0.7, 0.7)
  ))
  cup.castShadow = true
  cup.position.y = 0.59

  // Cup rim
  const rim = shadow(new THREE.Mesh(
    new THREE.TorusGeometry(0.22, 0.03, 8, 16),
    mat(0xe09050, 0xffaa44, 0.9, 0.8)
  ))
  rim.castShadow = true
  rim.rotation.x = Math.PI / 2
  rim.position.y = 0.82

  // Handles
  ;[-1, 1].forEach(side => {
    const handle = new THREE.Mesh(
      new THREE.TorusGeometry(0.1, 0.025, 6, 10, Math.PI),
      mat(0xd08040, 0xf97316, 0.5, 0.6)
    )
    handle.rotation.y = side > 0 ? 0 : Math.PI
    handle.rotation.z = Math.PI / 2
    handle.position.set(side * 0.32, 0.6, 0)
    g.add(handle)
  })

  // Stars floating above
  ;[0, 1, 2].forEach(i => {
    const star = new THREE.Mesh(
      new THREE.SphereGeometry(0.03, 6, 6),
      new THREE.MeshBasicMaterial({ color: 0xffdd44 })
    )
    star.position.set(Math.cos(i * 2.1) * 0.2, 1.1 + Math.sin(i * 1.3) * 0.08, Math.sin(i * 2.1) * 0.2)
    g.add(star)
  })

  g.add(plinth, stem, cup, rim)
  g.position.set(5, 0.8, 4)
  scene.add(g)
  return { mesh: g, key: 'impact', position: new THREE.Vector3(5, 1.0, 4), label: 'Impact' }
}

function makePhone(scene) {
  const g = new THREE.Group()

  // Desk/surface for phone
  const desk = shadow(box(0.7, 0.06, 0.5, 0x1a1a2e, 0x1a1a2e, 0.05))
  desk.position.y = -0.25

  // Phone body
  const body = shadow(new THREE.Mesh(
    new THREE.BoxGeometry(0.3, 0.58, 0.04),
    new THREE.MeshStandardMaterial({ color: 0x111118, roughness: 0.3, metalness: 0.7 })
  ))

  // Screen glow
  const phoneScreen = new THREE.Mesh(
    new THREE.PlaneGeometry(0.24, 0.5),
    new THREE.MeshStandardMaterial({ color: 0x1a1040, emissive: 0xf59e0b, emissiveIntensity: 0.9 })
  )
  phoneScreen.position.set(0, 0, 0.025)

  // Home bar
  const bar = new THREE.Mesh(
    new THREE.PlaneGeometry(0.1, 0.015),
    new THREE.MeshBasicMaterial({ color: 0xffffff })
  )
  bar.position.set(0, -0.21, 0.026)

  // Notification dots
  ;[[-0.06, 0.18], [0, 0.18], [0.06, 0.18]].forEach(([x, y]) => {
    const dot = new THREE.Mesh(
      new THREE.CircleGeometry(0.012, 8),
      new THREE.MeshBasicMaterial({ color: 0xf59e0b })
    )
    dot.position.set(x, y, 0.026)
    g.add(dot)
  })

  g.add(desk, body, phoneScreen, bar)
  g.position.set(0, 1.1, 4.5)
  g.rotation.x = -0.15
  scene.add(g)
  return { mesh: g, key: 'contact', position: new THREE.Vector3(0, 1.1, 4.5), label: 'Contact' }
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
