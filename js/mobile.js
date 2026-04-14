/* ── Mobile 2D Fallback ── */
window.MobileSite = (function () {
  'use strict';

  function init() {
    const root = document.getElementById('mobile-root');
    if (!root) return;
    root.classList.remove('hidden');

    initNav();
    initMarquee();
    initFooterClock();

    gsap.registerPlugin(ScrollTrigger);
    if (window.ScrollToPlugin) gsap.registerPlugin(ScrollToPlugin);

    initHeroAnimations();
    initScrollReveals();
    initHorizontalScroll();
    initTilt();
    initMagnetic();
    initSmoothScroll();
    ScrollTrigger.refresh();
  }

  function initNav() {
    const nav     = document.getElementById('nav');
    const navMenu = document.getElementById('nav-menu');
    const overlay = document.getElementById('menu-overlay');
    if (!nav) return;

    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    });

    if (navMenu && overlay) {
      navMenu.addEventListener('click', () => {
        const isOpen = overlay.classList.toggle('open');
        navMenu.classList.toggle('active', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
      });
      overlay.querySelectorAll('.menu-link').forEach(link => {
        link.addEventListener('click', () => {
          overlay.classList.remove('open');
          navMenu.classList.remove('active');
          document.body.style.overflow = '';
        });
      });
    }

    const sections = document.querySelectorAll('#mobile-root section[id]');
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY + 120;
      sections.forEach(section => {
        const id   = section.getAttribute('id');
        const link = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (link) {
          link.style.color = (scrollY >= section.offsetTop && scrollY < section.offsetTop + section.offsetHeight)
            ? 'var(--accent-light)' : '';
        }
      });
    });
  }

  function initHeroAnimations() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.to('.hero-label',     { opacity: 1, duration: 0.8 }, 0.1)
      .to('.hero-name-word', { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 }, 0.3)
      .to('.hero-tagline',   { opacity: 1, y: 0, duration: 0.7 }, 0.6)
      .to('.hero-metrics',   { opacity: 1, y: 0, duration: 0.7 }, 0.75)
      .to('.hero-scroll',    { opacity: 1, duration: 0.6 }, 0.95);

    document.querySelectorAll('.metric[data-count]').forEach(m => {
      const numEl  = m.querySelector('.metric-number');
      const target = parseInt(m.dataset.count, 10);
      gsap.to({ val: 0 }, {
        val: target, duration: 2, delay: 1.2, ease: 'power2.out',
        onUpdate: function () { numEl.textContent = Math.round(this.targets()[0].val); }
      });
    });
  }

  function initScrollReveals() {
    document.querySelectorAll('.reveal-text').forEach(el => {
      gsap.fromTo(el, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%' }
      });
    });

    document.querySelectorAll('.reveal-up').forEach((el, i) => {
      gsap.fromTo(el, { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 0.8, delay: (i % 3) * 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%' }
      });
    });

    document.querySelectorAll('.section-label').forEach(el => {
      gsap.fromTo(el, { opacity: 0, x: -20 }, {
        opacity: 1, x: 0, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 90%' }
      });
    });

    document.querySelectorAll('.edu-gpa-fill').forEach(bar => {
      const pct = parseFloat(bar.dataset.gpa) || 0;
      gsap.fromTo(bar, { width: '0%' }, {
        width: pct + '%', duration: 1.2, ease: 'power2.out',
        scrollTrigger: { trigger: bar, start: 'top 90%' }
      });
    });

    gsap.fromTo('.about-card', { opacity: 0, y: 40, scale: 0.95 }, {
      opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out',
      scrollTrigger: { trigger: '.about-cards', start: 'top 80%' }
    });

    gsap.fromTo('.skill-group', { opacity: 0, y: 30 }, {
      opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: '.skills-grid', start: 'top 80%' }
    });

    gsap.fromTo('.project-row', { opacity: 0, y: 50 }, {
      opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
      scrollTrigger: { trigger: '.projects-list', start: 'top 80%' }
    });

    gsap.fromTo('.edu-card', { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
      scrollTrigger: { trigger: '.edu-cards', start: 'top 80%' }
    });

    gsap.fromTo('.contact-link', { opacity: 0, x: -30 }, {
      opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: '.contact-links', start: 'top 85%' }
    });
  }

  function initHorizontalScroll() {
    const wrapper = document.querySelector('.experience-track-wrapper');
    const track   = document.getElementById('experience-track');
    if (!wrapper || !track) return;

    gsap.fromTo(track.querySelectorAll('.exp-card'),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '#experience', start: 'top 75%' } }
    );

    gsap.to(track, {
      x: () => -(track.scrollWidth - wrapper.clientWidth) - 48,
      ease: 'none',
      scrollTrigger: {
        trigger: '#experience',
        start: 'top top',
        end: () => '+=' + (track.scrollWidth - wrapper.clientWidth + 48),
        pin: true, scrub: 1, anticipatePin: 1, invalidateOnRefresh: true,
      }
    });
  }

  function initTilt() {
    document.querySelectorAll('.tilt-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const dx = (e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2);
        const dy = (e.clientY - rect.top  - rect.height / 2) / (rect.height / 2);
        gsap.to(card, { rotateY: dx * 8, rotateX: -dy * 8, duration: 0.4, ease: 'power2.out', transformPerspective: 800 });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'elastic.out(1, 0.6)' });
      });
    });
  }

  function initMagnetic() {
    document.querySelectorAll('.magnetic').forEach(el => {
      const strength = parseFloat(el.dataset.strength) || 15;
      el.addEventListener('mousemove', e => {
        const rect = el.getBoundingClientRect();
        const dx = (e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2);
        const dy = (e.clientY - rect.top  - rect.height / 2) / (rect.height / 2);
        gsap.to(el, { x: dx * strength, y: dy * strength, duration: 0.4, ease: 'power2.out' });
      });
      el.addEventListener('mouseleave', () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
      });
    });
  }

  function initMarquee() {
    const inner = document.querySelector('.marquee-inner');
    if (!inner) return;
    inner.addEventListener('mouseenter', () => inner.style.animationPlayState = 'paused');
    inner.addEventListener('mouseleave', () => inner.style.animationPlayState = 'running');
  }

  function initFooterClock() {
    const el = document.getElementById('footer-time');
    if (!el) return;
    const update = () => {
      el.textContent = new Date().toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short'
      });
    };
    update();
    setInterval(update, 1000);
  }

  function initSmoothScroll() {
    document.querySelectorAll('#mobile-root a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        gsap.to(window, { scrollTo: { y: target, offsetY: 72 }, duration: 1, ease: 'power3.inOut' });
      });
    });
  }

  return { init };
})();
