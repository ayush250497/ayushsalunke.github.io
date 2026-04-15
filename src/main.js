import RAPIER from '@dimforge/rapier3d-compat'
import * as THREE from 'three'
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

// --- Floating DOM labels ---
function createLabels(objects) {
  const container = document.createElement('div')
  container.id = 'labels'
  container.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:10'
  document.body.appendChild(container)

  const ICONS = { experience: '🖥', skills: '📚', projects: '🗒', education: '🎓', impact: '🏆', contact: '📱' }

  return objects.map(obj => {
    const el = document.createElement('div')
    el.className = 'obj-label'
    el.dataset.key = obj.key
    el.textContent = `${ICONS[obj.key]} ${obj.label}`
    el.style.opacity = '0'
    container.appendChild(el)
    return { el, worldPos: obj.position.clone().add(new THREE.Vector3(0, 1.1, 0)) }
  })
}

function updateLabels(labels, camera, nearObject, zoomed) {
  const w = window.innerWidth
  const h = window.innerHeight
  labels.forEach(({ el, worldPos }, i) => {
    const v = worldPos.clone().project(camera)
    const x = (v.x * 0.5 + 0.5) * w
    const y = (-(v.y) * 0.5 + 0.5) * h
    el.style.transform = `translate(-50%,-50%) translate(${x}px,${y}px)`
    // Only show if in front of camera, not too far, and not zoomed
    const show = !zoomed && v.z < 1 && v.z > -1
    el.style.opacity = show ? '1' : '0'
    el.style.setProperty('--pulse', nearObject && nearObject.label === el.textContent.slice(2) ? '1' : '0')
  })
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
  const labels = createLabels(objects)
  fill.style.width = '100%'

  setTimeout(() => {
    document.getElementById('loading').classList.add('fade-out')
    setTimeout(() => document.getElementById('loading').remove(), 700)
  }, 400)

  const hint = document.getElementById('hint')
  setTimeout(() => hint.classList.add('hidden'), 6000)

  // Proximity prompt element
  const prompt = document.createElement('div')
  prompt.id = 'proximity-prompt'
  prompt.textContent = 'Press E or Click to explore'
  prompt.style.opacity = '0'
  document.body.appendChild(prompt)

  let zoomed = false
  let nearObject = null

  function doZoomIn() {
    if (zoomed || !nearObject) return
    zoomed = true
    character.mesh.visible = false
    hint.classList.add('hidden')
    prompt.style.opacity = '0'
    document.getElementById('labels').style.opacity = '0'
    zoomInTo(camera, nearObject.position, () => {
      showContent(nearObject.key, () => {
        doZoomOut()
      })
    })
  }

  function doZoomOut() {
    hideContent()
    document.getElementById('labels').style.opacity = '1'
    zoomOut(camera, () => {
      character.mesh.visible = true
      zoomed = false
    })
  }

  canvas.addEventListener('click', doZoomIn)

  window.addEventListener('keydown', e => {
    if ((e.code === 'KeyE') && !zoomed && nearObject) doZoomIn()
    if (e.code === 'Escape' && zoomed) doZoomOut()
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

      // Proximity glow on all meshes in group
      objects.forEach(obj => {
        const isNear = obj === nearObject
        obj.mesh.traverse(child => {
          if (child.isMesh && child.material?.emissiveIntensity !== undefined) {
            child.material.emissiveIntensity = THREE.MathUtils.lerp(
              child.material.emissiveIntensity,
              isNear ? child.material.emissiveIntensity > 0.5 ? 1.5 : 0.6 : child.material.userData.baseEI ?? child.material.emissiveIntensity,
              0.1
            )
          }
        })
      })

      // Store base emissive intensities once
      objects.forEach(obj => {
        obj.mesh.traverse(child => {
          if (child.isMesh && child.material?.emissiveIntensity !== undefined) {
            if (child.material.userData.baseEI === undefined) {
              child.material.userData.baseEI = child.material.emissiveIntensity
            }
          }
        })
      })

      // Proximity prompt
      prompt.style.opacity = nearObject ? '1' : '0'
      if (nearObject) prompt.textContent = `[ E ] Explore ${nearObject.label}`

      // Third-person camera follow
      const p = character.mesh.position
      camera.position.lerp(new THREE.Vector3(p.x, p.y + 4, p.z + 7), 0.08)
      camera.lookAt(p.x, p.y + 0.5, p.z)
    }

    updateLabels(labels, camera, nearObject, zoomed)
    renderer.render(scene, camera)
  }
  tick()
}
