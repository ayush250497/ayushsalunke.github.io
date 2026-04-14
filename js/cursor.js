/* ── Custom Cursor (desktop only) ── */
(function () {
  const cursor = document.getElementById('cursor');
  if (!cursor || window.matchMedia('(hover: none)').matches) return;

  const dot  = cursor.querySelector('.cursor-dot');
  const ring = cursor.querySelector('.cursor-ring');

  let mx = -100, my = -100;
  let rx = -100, ry = -100;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  (function lerp() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(lerp);
  })();

  document.addEventListener('mouseover', e => {
    const el = e.target.closest('a, button, .magnetic, .tilt-card, .skill-pill, .project-row, .ov-contact-link, .ov-ls-row, .overlay-nav-btn, .overlay-close');
    cursor.classList.toggle('hovering', !!el);
  });

  document.addEventListener('mousedown', () => cursor.classList.add('clicking'));
  document.addEventListener('mouseup',   () => cursor.classList.remove('clicking'));
  document.addEventListener('mouseleave', () => { mx = -100; my = -100; });
})();
