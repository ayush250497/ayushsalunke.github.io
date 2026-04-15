import * as THREE from 'three'

function buildCharacterMesh() {
  const g = new THREE.Group()

  const skinMat = new THREE.MeshStandardMaterial({ color: 0xf4a460, roughness: 0.7 })
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0x2233aa, roughness: 0.8 })
  const pantsMat = new THREE.MeshStandardMaterial({ color: 0x1a1a3a, roughness: 0.9 })
  const shoesMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.6 })
  const hairMat = new THREE.MeshStandardMaterial({ color: 0x1a0a00, roughness: 1 })

  function part(geo, mat, x, y, z, rx = 0, ry = 0, rz = 0) {
    const m = new THREE.Mesh(geo, mat)
    m.position.set(x, y, z)
    m.rotation.set(rx, ry, rz)
    m.castShadow = true
    g.add(m)
    return m
  }

  // Torso
  part(new THREE.BoxGeometry(0.32, 0.38, 0.18), bodyMat, 0, 0.68, 0)

  // Head
  part(new THREE.BoxGeometry(0.22, 0.22, 0.2), skinMat, 0, 1.0, 0)

  // Hair
  part(new THREE.BoxGeometry(0.23, 0.08, 0.21), hairMat, 0, 1.13, 0)

  // Eyes (tiny dark dots)
  const eyeMat = new THREE.MeshBasicMaterial({ color: 0x111111 })
  part(new THREE.BoxGeometry(0.04, 0.04, 0.02), eyeMat, -0.055, 1.02, 0.1)
  part(new THREE.BoxGeometry(0.04, 0.04, 0.02), eyeMat, 0.055, 1.02, 0.1)

  // Arms
  part(new THREE.BoxGeometry(0.1, 0.34, 0.1), bodyMat, -0.22, 0.65, 0)
  part(new THREE.BoxGeometry(0.1, 0.34, 0.1), bodyMat, 0.22, 0.65, 0)

  // Hands
  part(new THREE.BoxGeometry(0.09, 0.09, 0.08), skinMat, -0.22, 0.45, 0)
  part(new THREE.BoxGeometry(0.09, 0.09, 0.08), skinMat, 0.22, 0.45, 0)

  // Legs
  part(new THREE.BoxGeometry(0.13, 0.36, 0.13), pantsMat, -0.09, 0.3, 0)
  part(new THREE.BoxGeometry(0.13, 0.36, 0.13), pantsMat, 0.09, 0.3, 0)

  // Shoes
  part(new THREE.BoxGeometry(0.14, 0.1, 0.18), shoesMat, -0.09, 0.1, 0.025)
  part(new THREE.BoxGeometry(0.14, 0.1, 0.18), shoesMat, 0.09, 0.1, 0.025)

  return g
}

export async function createCharacter(scene, RAPIER) {
  const world = new RAPIER.World({ x: 0, y: -9.81, z: 0 })

  const floorBody = world.createRigidBody(RAPIER.RigidBodyDesc.fixed())
  world.createCollider(RAPIER.ColliderDesc.cuboid(7, 0.1, 7), floorBody)

  const charDesc = RAPIER.RigidBodyDesc.kinematicPositionBased().setTranslation(0, 1, 6)
  const charBody = world.createRigidBody(charDesc)
  world.createCollider(RAPIER.ColliderDesc.capsule(0.4, 0.3), charBody)

  const mesh = buildCharacterMesh()
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

    const moving = moveDir.lengthSq() > 0
    moveDir.normalize().multiplyScalar(SPEED * dt)

    controller.computeColliderMovement(charBody.collider(0), { x: moveDir.x, y: -0.2, z: moveDir.z })
    const corrected = controller.computedMovement()
    const pos = charBody.translation()
    charBody.setNextKinematicTranslation({
      x: pos.x + corrected.x,
      y: pos.y + corrected.y,
      z: pos.z + corrected.z,
    })
    world.step()

    const t = charBody.translation()
    mesh.position.set(t.x, t.y - 0.5, t.z)

    // Face direction of movement
    if (moving) {
      const angle = Math.atan2(moveDir.x, moveDir.z)
      mesh.rotation.y = angle
    }

    // Leg bob while moving
    if (moving) {
      const bob = Math.sin(Date.now() * 0.008) * 0.04
      mesh.position.y += bob
    }

    return new THREE.Vector3(t.x, t.y, t.z)
  }

  return { update, mesh }
}
