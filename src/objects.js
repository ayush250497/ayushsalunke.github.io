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
