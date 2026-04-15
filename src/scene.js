import * as THREE from 'three'

export function createScene(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.2

  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x06060f)
  scene.fog = new THREE.FogExp2(0x06060f, 0.04)

  const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 100)
  camera.position.set(0, 3, 8)
  camera.lookAt(0, 0, 0)

  // --- Lighting ---

  // Hemisphere: cool sky / warm ground
  scene.add(new THREE.HemisphereLight(0x334466, 0x221a10, 1.2))

  // Ambient fill
  scene.add(new THREE.AmbientLight(0x111133, 2.5))

  // Main ceiling directional light with shadows
  const sunLight = new THREE.DirectionalLight(0x8899ff, 2.5)
  sunLight.position.set(2, 10, 4)
  sunLight.castShadow = true
  sunLight.shadow.mapSize.set(2048, 2048)
  sunLight.shadow.camera.near = 0.1
  sunLight.shadow.camera.far = 40
  sunLight.shadow.camera.left = -10
  sunLight.shadow.camera.right = 10
  sunLight.shadow.camera.top = 10
  sunLight.shadow.camera.bottom = -10
  sunLight.shadow.bias = -0.001
  scene.add(sunLight)

  // Desk accent light (blue-purple)
  const deskLight = new THREE.PointLight(0x667eea, 4, 7)
  deskLight.position.set(0, 3.5, -1.5)
  scene.add(deskLight)

  // Bookshelf accent (warm purple)
  const shelfLight = new THREE.PointLight(0x9966cc, 3, 6)
  shelfLight.position.set(-5, 3, -4)
  scene.add(shelfLight)

  // Back-right accent (teal, education)
  const eduLight = new THREE.PointLight(0x22bb88, 2.5, 6)
  eduLight.position.set(5, 3.5, -5.5)
  scene.add(eduLight)

  // Front accent (amber, contact phone)
  const frontLight = new THREE.PointLight(0xf59e0b, 3, 5)
  frontLight.position.set(0, 2, 5)
  scene.add(frontLight)

  // Trophy orange accent
  const trophyLight = new THREE.PointLight(0xf97316, 2.5, 4)
  trophyLight.position.set(5, 2, 4)
  scene.add(trophyLight)

  // --- Floor ---
  const floorMat = new THREE.MeshStandardMaterial({
    color: 0x0a0a1a,
    roughness: 0.85,
    metalness: 0.15,
  })
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(14, 14), floorMat)
  floor.rotation.x = -Math.PI / 2
  floor.receiveShadow = true
  scene.add(floor)

  // Grid on floor for depth perception
  const grid = new THREE.GridHelper(14, 20, 0x222244, 0x151530)
  grid.position.y = 0.001
  scene.add(grid)

  // --- Walls ---
  const wallMat = new THREE.MeshStandardMaterial({ color: 0x0c0c20, roughness: 0.95 })

  const backWall = new THREE.Mesh(new THREE.PlaneGeometry(14, 10), wallMat)
  backWall.position.set(0, 5, -7)
  backWall.receiveShadow = true
  scene.add(backWall)

  const leftWall = new THREE.Mesh(new THREE.PlaneGeometry(14, 10), wallMat)
  leftWall.rotation.y = Math.PI / 2
  leftWall.position.set(-7, 5, 0)
  leftWall.receiveShadow = true
  scene.add(leftWall)

  const rightWall = new THREE.Mesh(new THREE.PlaneGeometry(14, 10), wallMat)
  rightWall.rotation.y = -Math.PI / 2
  rightWall.position.set(7, 5, 0)
  rightWall.receiveShadow = true
  scene.add(rightWall)

  // Ceiling
  const ceilMat = new THREE.MeshStandardMaterial({ color: 0x090914, roughness: 1 })
  const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(14, 14), ceilMat)
  ceiling.rotation.x = Math.PI / 2
  ceiling.position.y = 8
  scene.add(ceiling)

  // Subtle wall edge strips (neon lines at floor/wall joint)
  const stripMat = new THREE.MeshBasicMaterial({ color: 0x222244 })
  const backStrip = new THREE.Mesh(new THREE.BoxGeometry(14, 0.04, 0.04), stripMat)
  backStrip.position.set(0, 0.02, -7)
  scene.add(backStrip)
  const leftStrip = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.04, 14), stripMat)
  leftStrip.position.set(-7, 0.02, 0)
  scene.add(leftStrip)
  const rightStrip = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.04, 14), stripMat)
  rightStrip.position.set(7, 0.02, 0)
  scene.add(rightStrip)

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  })

  return { scene, camera, renderer }
}
