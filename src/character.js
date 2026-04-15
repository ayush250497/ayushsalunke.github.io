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
