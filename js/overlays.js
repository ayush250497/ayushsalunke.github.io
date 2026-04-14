/* ── Overlay Panel System ── */
/* Note: innerHTML used only with fully hardcoded static strings — no user input */
window.Overlays = (function () {
  'use strict';

  const SECTIONS = ['about', 'experience', 'skills', 'projects', 'contact'];

  const CONTENT = {
    about: {
      title: 'ABOUT.exe',
      html: [
        '<div class="ov-about">',
        '<h2 class="ov-heading">I architect <span class="text-gradient">scalable systems</span> that transform how teams build and deploy software.</h2>',
        '<div class="ov-bio">',
        '<p>From leading digital transformations at <strong>JP Morgan Chase</strong> to engineering compliance-critical platforms at <strong>UBS</strong>, I specialize in turning complex enterprise challenges into elegant, reliable solutions.</p>',
        '<p>My toolkit spans cloud-native infrastructure, AI-driven automation, and full-stack development — always with a focus on developer experience and system reliability.</p>',
        '</div>',
        '<div class="ov-cards">',
        '<div class="ov-card"><div class="ov-card-icon purple">&#x2756;</div><h4>Full-Stack</h4><p>React to Java microservices</p></div>',
        '<div class="ov-card"><div class="ov-card-icon teal">&#x25C6;</div><h4>Cloud-Native</h4><p>GCP, AWS, Azure, K8s</p></div>',
        '<div class="ov-card"><div class="ov-card-icon pink">&#x25B2;</div><h4>DevOps</h4><p>CI/CD, Terraform, Docker</p></div>',
        '<div class="ov-card"><div class="ov-card-icon cyan">&#x25CF;</div><h4>AI / ML</h4><p>NLP, CNN, Automation</p></div>',
        '</div></div>'
      ].join('')
    },
    experience: {
      title: 'EXPERIENCE.log',
      html: [
        '<div class="ov-exp">',
        '<div class="ov-exp-entry">',
        '<div class="ov-exp-header"><span class="ov-exp-company">JP Morgan Chase &amp; Co.</span><span class="ov-exp-date">Jun 2022 — Present</span></div>',
        '<h3 class="ov-exp-role">Lead Software Engineer</h3>',
        '<div class="ov-exp-metrics">',
        '<div class="ov-metric"><span class="ov-metric-val" data-count="70">0</span><span class="ov-metric-unit">%</span><span class="ov-metric-desc">reduction in deployment complexity (React UI on GCP, 200+ devs)</span></div>',
        '<div class="ov-metric"><span class="ov-metric-val" data-count="75">0</span><span class="ov-metric-unit">%</span><span class="ov-metric-desc">faster delivery via unified CI/CD (Spinnaker &amp; Harness)</span></div>',
        '</div>',
        '<div class="ov-tags"><span>React</span><span>Java</span><span>GCP</span><span>Spinnaker</span><span>Harness</span><span>K8s</span></div>',
        '</div>',
        '<div class="ov-exp-entry">',
        '<div class="ov-exp-header"><span class="ov-exp-company">UBS</span><span class="ov-exp-date">Jul 2019 — Jun 2021</span></div>',
        '<h3 class="ov-exp-role">Software Developer</h3>',
        '<div class="ov-exp-metrics">',
        '<div class="ov-metric"><span class="ov-metric-val" data-count="80">0</span><span class="ov-metric-unit">%</span><span class="ov-metric-desc">reduction in manual processing via AI/NLP automated background checks</span></div>',
        '<div class="ov-metric"><span class="ov-metric-val" data-count="25">0</span><span class="ov-metric-unit">K+</span><span class="ov-metric-desc">global financial regulation rules in Drools compliance engine</span></div>',
        '</div>',
        '<div class="ov-tags"><span>Java</span><span>Python</span><span>NLP</span><span>React</span><span>Drools</span></div>',
        '</div>',
        '<div class="ov-exp-entry">',
        '<div class="ov-exp-header"><span class="ov-exp-company">UBS</span><span class="ov-exp-date">Jul 2018 — Nov 2018</span></div>',
        '<h3 class="ov-exp-role">Software Developer Intern</h3>',
        '<div class="ov-exp-metrics">',
        '<div class="ov-metric"><span class="ov-metric-val" data-count="2">0</span><span class="ov-metric-unit">M+</span><span class="ov-metric-desc">test scenarios validated via automated Selenium framework</span></div>',
        '</div>',
        '<div class="ov-tags"><span>Java</span><span>Selenium</span><span>Test Automation</span></div>',
        '</div></div>'
      ].join('')
    },
    skills: {
      title: 'SKILLS.db',
      html: [
        '<div class="ov-skills">',
        '<div class="ov-skill-group"><h4>Languages</h4><div class="ov-pills"><span>Java</span><span>Python</span><span>JavaScript</span><span>C++</span><span>C</span></div></div>',
        '<div class="ov-skill-group"><h4>Backend &amp; Data</h4><div class="ov-pills"><span>Spring Boot</span><span>Dropwizard</span><span>REST APIs</span><span>PostgreSQL</span><span>MySQL</span><span>GraphDB</span></div></div>',
        '<div class="ov-skill-group"><h4>Frontend</h4><div class="ov-pills"><span>ReactJS</span><span>NodeJS</span><span>HTML5</span><span>CSS3</span><span>Bootstrap</span></div></div>',
        '<div class="ov-skill-group"><h4>Cloud &amp; DevOps</h4><div class="ov-pills"><span>GCP</span><span>AWS</span><span>Azure</span><span>Kubernetes</span><span>Terraform</span><span>Docker</span><span>Spinnaker</span><span>Harness</span><span>Jenkins</span><span>TeamCity</span><span>GitLab</span><span>Gradle</span><span>Maven</span></div></div>',
        '<div class="ov-skill-group"><h4>Observability</h4><div class="ov-pills"><span>Datadog</span><span>Splunk</span><span>Dynatrace</span></div></div>',
        '<div class="ov-skill-group"><h4>AI / ML</h4><div class="ov-pills"><span>NLP</span><span>CNN</span><span>MobileNet</span><span>Drools</span></div></div>',
        '</div>'
      ].join('')
    },
    projects: {
      title: 'PROJECTS.dir',
      html: [
        '<div class="ov-projects">',
        '<div class="ov-ls-header"><span>permissions</span><span>name</span><span>description</span></div>',
        '<a class="ov-ls-row" href="http://www.ijeam.com/Published%20Paper/Volume%2054/Issue%203/38.pdf" target="_blank" rel="noopener">',
        '<span class="ov-ls-perm">-rw-r--r--</span>',
        '<span class="ov-ls-name">pothole-detection/ <span class="ov-badge">Published</span></span>',
        '<span class="ov-ls-desc">Real-time pothole detection using MobileNet CNN on AWS. Presented at ICIAMR 2019.</span>',
        '<div class="ov-ls-tags"><span>AWS</span><span>CNN</span><span>MobileNet</span><span>Python</span></div>',
        '</a>',
        '<a class="ov-ls-row" href="https://devpost.com/software/parksafe" target="_blank" rel="noopener">',
        '<span class="ov-ls-perm">-rw-r--r--</span>',
        '<span class="ov-ls-name">parksafe/</span>',
        '<span class="ov-ls-desc">Crime-stat-powered safety scores for parking spots. Hackathon project.</span>',
        '<div class="ov-ls-tags"><span>Flask</span><span>OpenStreetMap</span><span>Python</span></div>',
        '</a>',
        '</div>'
      ].join('')
    },
    contact: {
      title: 'CONTACT.sh',
      html: [
        '<div class="ov-contact">',
        '<h2 class="ov-heading">Let\'s build something <span class="text-gradient">great</span></h2>',
        '<p class="ov-contact-sub">Always open to new opportunities, interesting projects, or geeking out about distributed systems.</p>',
        '<div class="ov-contact-links">',
        '<a href="mailto:ayush.salunke250497@gmail.com" class="ov-contact-link">',
        '<span class="ov-link-prompt">$</span><span class="ov-link-cmd">mail</span><span class="ov-link-val">ayush.salunke250497@gmail.com</span>',
        '</a>',
        '<a href="tel:+16692209962" class="ov-contact-link">',
        '<span class="ov-link-prompt">$</span><span class="ov-link-cmd">call</span><span class="ov-link-val">(669) 220-9962</span>',
        '</a>',
        '<a href="https://linkedin.com/in/ayush-salunke" target="_blank" rel="noopener" class="ov-contact-link">',
        '<span class="ov-link-prompt">$</span><span class="ov-link-cmd">open</span><span class="ov-link-val">linkedin.com/in/ayush-salunke</span>',
        '</a>',
        '</div></div>'
      ].join('')
    }
  };

  let currentIdx = -1;
  const root     = document.getElementById('overlay-root');
  const panel    = document.getElementById('overlay-panel');
  const titleEl  = document.getElementById('overlay-title');
  const bodyEl   = document.getElementById('overlay-body');
  const closeBtn = document.getElementById('overlay-close');
  const prevBtn  = document.getElementById('overlay-prev');
  const nextBtn  = document.getElementById('overlay-next');

  function open(id) {
    const idx = SECTIONS.indexOf(id);
    if (idx === -1) return;
    currentIdx = idx;
    _render(id);
    root.classList.remove('hidden');
    gsap.fromTo(panel,
      { x: '100%', opacity: 0 },
      { x: '0%',   opacity: 1, duration: 0.55, ease: 'power3.out' }
    );
    document.body.style.overflow = 'hidden';
    _animateMetrics();
  }

  function close(onDone) {
    gsap.to(panel, {
      x: '100%', opacity: 0, duration: 0.4, ease: 'power3.in',
      onComplete: () => {
        root.classList.add('hidden');
        document.body.style.overflow = '';
        if (onDone) onDone();
      }
    });
  }

  function navigate(dir) {
    currentIdx = (currentIdx + dir + SECTIONS.length) % SECTIONS.length;
    gsap.to(panel, {
      x: dir > 0 ? '-60px' : '60px', opacity: 0, duration: 0.2, ease: 'power2.in',
      onComplete: () => {
        _render(SECTIONS[currentIdx]);
        gsap.fromTo(panel,
          { x: dir > 0 ? '60px' : '-60px', opacity: 0 },
          { x: '0', opacity: 1, duration: 0.25, ease: 'power2.out' }
        );
        _animateMetrics();
      }
    });
  }

  function _render(id) {
    const def = CONTENT[id];
    // Static hardcoded content — safe to set via innerHTML
    titleEl.innerHTML = '&gt; ' + def.title + '<span class="cursor-blink">_</span>';
    bodyEl.innerHTML  = def.html;
  }

  function _animateMetrics() {
    bodyEl.querySelectorAll('.ov-metric-val[data-count]').forEach(el => {
      const target = parseInt(el.dataset.count, 10);
      gsap.to({ val: 0 }, {
        val: target, duration: 1.5, ease: 'power2.out',
        onUpdate: function () { el.textContent = Math.round(this.targets()[0].val); }
      });
    });
  }

  closeBtn.addEventListener('click', () => {
    const id = SECTIONS[currentIdx];
    close(() => { if (window.CyberWorld) CyberWorld.restoreNode(id); });
  });
  prevBtn.addEventListener('click', () => navigate(-1));
  nextBtn.addEventListener('click', () => navigate(1));

  document.addEventListener('keydown', e => {
    if (root.classList.contains('hidden')) return;
    if (e.key === 'Escape') {
      const id = SECTIONS[currentIdx];
      close(() => { if (window.CyberWorld) CyberWorld.restoreNode(id); });
    }
    if (e.key === 'ArrowLeft')  navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  });

  return { open, close };
})();
