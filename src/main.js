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
