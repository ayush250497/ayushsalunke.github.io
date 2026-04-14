/* ── Boot ── */
(function () {
  'use strict';

  const isMobile = window.innerWidth < 1024 || window.matchMedia('(pointer: coarse)').matches;

  if (isMobile) {
    // Hide 3D elements, show mobile 2D site
    const canvas = document.getElementById('world-canvas');
    const hint   = document.getElementById('world-hint');
    const label  = document.getElementById('node-label');
    if (canvas) canvas.style.display = 'none';
    if (hint)   hint.style.display   = 'none';
    if (label)  label.style.display  = 'none';

    // Run mobile loader then 2D site
    PortfolioLoader.run(() => {
      MobileSite.init();
    });
  } else {
    // Desktop: run loader then Three.js world
    PortfolioLoader.run(() => {
      CyberWorld.init((nodeId) => {
        Overlays.open(nodeId);
      });

      // Show hint after short delay
      const hint = document.getElementById('world-hint');
      if (hint) {
        setTimeout(() => hint.style.display = 'flex', 500);
      }
    });
  }
})();
