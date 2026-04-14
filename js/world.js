/* ── Three.js Cyber Grid World ── */
window.CyberWorld = (function () {
  'use strict';

  const NODES = [
    { id: 'about',      label: 'ABOUT.exe',      color: 0x6e56ff, pos: [-14, 0, -5],  shape: 'octahedron' },
    { id: 'experience', label: 'EXPERIENCE.log',  color: 0x00e8b0, pos: [0,   0, -18], shape: 'box'        },
    { id: 'skills',     label: 'SKILLS.db',       color: 0xc084fc, pos: [16,  0, -8],  shape: 'sphere'     },
    { id: 'projects',   label: 'PROJECTS.dir',    color: 0x00cfff, pos: [-20, 0, -20], shape: 'cone'       },
    { id: 'contact',    label: 'CONTACT.sh',      color: 0x00e8b0, pos: [18,  0, -22], shape: 'orb'        },
  ];

  let scene, camera, renderer, controls, raycaster, mouse;
  let nodeMeshes = [];
  let nodeLabels = [];
  let floatTime = 0;
  let idleTimer = null;
  let autoRotating = false;
  let onNodeClick = null;
  let hoveredNode = null;
  const labelEl = document.getElementById('node-label');

  function buildGeometry(shape) {
    switch (shape) {
      case 'octahedron': return new THREE.OctahedronGeometry(2.2, 0);
      case 'box':        return new THREE.BoxGeometry(2.2, 5, 2.2);
      case 'sphere':     return new THREE.SphereGeometry(2, 16, 16);
      case 'cone':       return new THREE.ConeGeometry(1.8, 4.5, 6);
      default:           return new THREE.SphereGeometry(1.4, 16, 16); // orb
    }
  }

  function init(clickCallback) {
    onNodeClick = clickCallback;
    const canvas = document.getElementById('world-canvas');

    // Scene
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x06030f, 0.022);

    // Camera
    camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 200);
    camera.position.set(0, 18, 22);
    camera.lookAt(0, 0, -8);

    // Renderer
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x06030f);

    // Orbit Controls (manual implementation — no module needed)
    initOrbitControls();

    // Lights
    scene.add(new THREE.AmbientLight(0x1a0a3a, 2));
    const dirLight = new THREE.DirectionalLight(0x6e56ff, 1.5);
    dirLight.position.set(10, 20, 10);
    scene.add(dirLight);

    // Grid
    const grid = new THREE.GridHelper(120, 60, 0x6e56ff, 0x1a0a4a);
    grid.position.y = -0.5;
    scene.add(grid);

    // Stars
    buildStars();

    // Data stream particles
    buildDataStreams();

    // Nodes
    NODES.forEach(def => {
      const geo = buildGeometry(def.shape);
      const mat = new THREE.MeshStandardMaterial({
        color: def.color,
        emissive: def.color,
        emissiveIntensity: 0.45,
        roughness: 0.3,
        metalness: 0.6,
        wireframe: false,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(def.pos[0], def.pos[1] + 3.5, def.pos[2]);
      mesh.userData = { nodeId: def.id, label: def.label, color: def.color, baseY: def.pos[1] + 3.5 };

      // Point light for glow
      const light = new THREE.PointLight(def.color, 2.5, 18);
      mesh.add(light);

      // Halo ring
      const ringGeo = new THREE.RingGeometry(2.8, 3.2, 32);
      const ringMat = new THREE.MeshBasicMaterial({ color: def.color, side: THREE.DoubleSide, transparent: true, opacity: 0.3 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = -Math.PI / 2;
      ring.position.y = -3;
      mesh.add(ring);

      scene.add(mesh);
      nodeMeshes.push(mesh);
    });

    // Raycaster
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2(-999, -999);

    window.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('click', onCanvasClick);
    window.addEventListener('resize', onResize);

    resetIdleTimer();
    animate();
  }

  // ── Minimal OrbitControls ──────────────────────────────────────────────────
  function initOrbitControls() {
    const canvas = renderer.domElement;
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };
    let spherical = { theta: 0, phi: Math.PI / 3.5 };
    const target = new THREE.Vector3(0, 0, -8);
    let radius = camera.position.distanceTo(target);

    function updateCamera() {
      camera.position.x = target.x + radius * Math.sin(spherical.phi) * Math.sin(spherical.theta);
      camera.position.y = target.y + radius * Math.cos(spherical.phi);
      camera.position.z = target.z + radius * Math.sin(spherical.phi) * Math.cos(spherical.theta);
      camera.lookAt(target);
    }

    canvas.addEventListener('mousedown', e => {
      isDragging = true;
      prevMouse = { x: e.clientX, y: e.clientY };
      resetIdleTimer();
    });

    window.addEventListener('mousemove', e => {
      if (!isDragging) return;
      const dx = (e.clientX - prevMouse.x) * 0.005;
      const dy = (e.clientY - prevMouse.y) * 0.003;
      spherical.theta -= dx;
      spherical.phi = Math.max(0.3, Math.min(1.4, spherical.phi + dy));
      prevMouse = { x: e.clientX, y: e.clientY };
      updateCamera();
      resetIdleTimer();
    });

    window.addEventListener('mouseup', () => { isDragging = false; });

    canvas.addEventListener('wheel', e => {
      radius = Math.max(10, Math.min(45, radius + e.deltaY * 0.04));
      updateCamera();
      resetIdleTimer();
    }, { passive: true });

    // Touch support
    let lastTouch = null;
    canvas.addEventListener('touchstart', e => { lastTouch = e.touches[0]; resetIdleTimer(); });
    canvas.addEventListener('touchmove', e => {
      if (!lastTouch) return;
      const dx = (e.touches[0].clientX - lastTouch.clientX) * 0.006;
      spherical.theta -= dx;
      lastTouch = e.touches[0];
      updateCamera();
    });
    canvas.addEventListener('touchend', () => { lastTouch = null; });

    // Store updateCamera for auto-rotate
    controls = { updateCamera, getSpherical: () => spherical };
    updateCamera();
  }

  function buildStars() {
    const geo = new THREE.BufferGeometry();
    const count = 800;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 180;
      positions[i * 3 + 1] = Math.random() * 60 + 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 180;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({ color: 0xaaaaff, size: 0.25, transparent: true, opacity: 0.7 });
    scene.add(new THREE.Points(geo, mat));
  }

  function buildDataStreams() {
    const geo = new THREE.BufferGeometry();
    const count = 120;
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 80;
      positions[i * 3 + 1] = Math.random() * 20 - 1;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 80;
      velocities[i] = 0.02 + Math.random() * 0.05;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({ color: 0x00e8b0, size: 0.18, transparent: true, opacity: 0.55 });
    const points = new THREE.Points(geo, mat);
    points.userData.velocities = velocities;
    scene.add(points);
    scene.userData.dataStreams = points;
  }

  function onMouseMove(e) {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const hits = raycaster.intersectObjects(nodeMeshes);
    const hit = hits.length ? hits[0].object : null;

    if (hit !== hoveredNode) {
      if (hoveredNode) {
        gsap.to(hoveredNode.scale, { x: 1, y: 1, z: 1, duration: 0.3 });
        labelEl.classList.remove('visible');
      }
      hoveredNode = hit;
      if (hoveredNode) {
        gsap.to(hoveredNode.scale, { x: 1.25, y: 1.25, z: 1.25, duration: 0.3 });
        labelEl.textContent = hoveredNode.userData.label;
        labelEl.classList.add('visible');
        document.getElementById('world-canvas').style.cursor = 'pointer';
      } else {
        document.getElementById('world-canvas').style.cursor = 'grab';
      }
    }

    // Move label with mouse
    if (hoveredNode) {
      labelEl.style.left = (e.clientX + 16) + 'px';
      labelEl.style.top  = (e.clientY - 10) + 'px';
    }
  }

  function onCanvasClick(e) {
    raycaster.setFromCamera(mouse, camera);
    const hits = raycaster.intersectObjects(nodeMeshes);
    if (hits.length && onNodeClick) {
      const mesh = hits[0].object;
      flyToNode(mesh, () => onNodeClick(mesh.userData.nodeId));
    }
  }

  function flyToNode(mesh, cb) {
    const targetPos = mesh.position.clone().add(new THREE.Vector3(0, 2, 8));
    gsap.to(camera.position, {
      x: targetPos.x, y: targetPos.y, z: targetPos.z,
      duration: 0.9, ease: 'power3.inOut',
      onUpdate: () => camera.lookAt(mesh.position),
      onComplete: () => {
        // dissolve node
        gsap.to(mesh.scale, { x: 0, y: 0, z: 0, duration: 0.4, ease: 'power2.in', onComplete: cb });
      }
    });
  }

  function restoreNode(nodeId) {
    const mesh = nodeMeshes.find(m => m.userData.nodeId === nodeId);
    if (!mesh) return;
    gsap.to(mesh.scale, { x: 1, y: 1, z: 1, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
    gsap.to(camera.position, { x: 0, y: 18, z: 22, duration: 0.9, ease: 'power3.inOut',
      onUpdate: () => camera.lookAt(0, 0, -8) });
  }

  function resetIdleTimer() {
    autoRotating = false;
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => { autoRotating = true; }, 5000);
  }

  function animate() {
    requestAnimationFrame(animate);
    floatTime += 0.012;

    // Float nodes
    nodeMeshes.forEach((mesh, i) => {
      mesh.position.y = mesh.userData.baseY + Math.sin(floatTime + i * 1.1) * 0.5;
      mesh.rotation.y += 0.004;
    });

    // Data streams rise
    const ds = scene.userData.dataStreams;
    if (ds) {
      const pos = ds.geometry.attributes.position;
      const vel = ds.userData.velocities;
      for (let i = 0; i < vel.length; i++) {
        pos.array[i * 3 + 1] += vel[i];
        if (pos.array[i * 3 + 1] > 22) pos.array[i * 3 + 1] = -0.5;
      }
      pos.needsUpdate = true;
    }

    // Auto-rotate
    if (autoRotating && controls) {
      controls.getSpherical().theta += 0.003;
      controls.updateCamera();
    }

    renderer.render(scene, camera);
  }

  function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  return { init, restoreNode };
})();
