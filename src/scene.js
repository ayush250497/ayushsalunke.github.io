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
