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
