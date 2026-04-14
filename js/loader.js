/* ── Loader ── */
window.PortfolioLoader = {
  run(onDone) {
    const loader   = document.getElementById('loader');
    const linesEl  = document.getElementById('loader-lines');
    const barEl    = document.getElementById('loader-bar');
    if (!loader) { onDone(); return; }

    const lines = [
      'INITIALIZING GRID...',
      'LOADING ASSETS...',
      'ESTABLISHING CONNECTION...',
      'RENDERING CYBER WORLD...',
      'SYSTEM READY.',
    ];

    let lineIdx = 0;
    let progress = 0;

    function printNextLine() {
      if (lineIdx >= lines.length) return;
      const div = document.createElement('div');
      div.className = 'loader-line';
      div.textContent = '> ' + lines[lineIdx++];
      linesEl.appendChild(div);
      gsap.fromTo(div, { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.3 });
    }

    const lineInterval = setInterval(() => {
      printNextLine();
      if (lineIdx >= lines.length) clearInterval(lineInterval);
    }, 320);

    const barInterval = setInterval(() => {
      progress = Math.min(progress + Math.random() * 22, 100);
      barEl.style.width = progress + '%';
      if (progress >= 100) {
        clearInterval(barInterval);
        setTimeout(() => {
          gsap.to(loader, {
            opacity: 0, duration: 0.7, ease: 'power2.inOut',
            onComplete: () => { loader.style.display = 'none'; onDone(); }
          });
        }, 400);
      }
    }, 100);
  }
};
