function experienceHTML() {
  return `<div class="content-panel">
    <button class="close-btn" id="close-btn">&#x2715;</button>
    <div class="section-label" style="color:#667eea">Experience</div>
    <div style="border-left:2px solid #667eea;padding-left:16px;margin-bottom:24px">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:6px">
        <strong style="font-size:18px">JP Morgan Chase</strong>
        <span style="font-size:11px;color:#667eea;background:#667eea22;padding:2px 8px;border-radius:4px">Jun 2022 &#x2013; Present</span>
      </div>
      <div style="color:#a78bfa;font-size:13px;margin-bottom:10px">Lead Software Engineer</div>
      <ul style="font-size:13px;color:#9090b0;line-height:1.8;list-style:none">
        <li>&#x2192; React UI deployment platform for 200+ developers on GCP</li>
        <li>&#x2192; 70% reduction in deployment complexity &amp; velocity</li>
        <li>&#x2192; 75% faster CI/CD via Spinnaker &amp; Harness</li>
        <li>&#x2192; High-performance REST APIs with Dropwizard/Java</li>
      </ul>
      <div style="margin-top:12px">
        ${['React','Java','Dropwizard','GCP','Spinnaker','Harness'].map(t =>
          `<span class="tag" style="background:#667eea22;color:#667eea">${t}</span>`).join('')}
      </div>
    </div>
    <div style="border-left:2px solid #764ba244;padding-left:16px;margin-bottom:24px">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:6px">
        <strong style="font-size:18px">UBS</strong>
        <span style="font-size:11px;color:#764ba2;background:#764ba222;padding:2px 8px;border-radius:4px">Jul 2019 &#x2013; Jun 2021</span>
      </div>
      <div style="color:#a78bfa;font-size:13px;margin-bottom:10px">Software Developer</div>
      <ul style="font-size:13px;color:#9090b0;line-height:1.8;list-style:none">
        <li>&#x2192; AI/NLP automation cutting manual processing time by 80%</li>
        <li>&#x2192; Drools engine for 25,000+ global financial regulation rules</li>
        <li>&#x2192; ReactJS + Python gamification for 20,000+ global users</li>
      </ul>
    </div>
    <div style="border-left:2px solid #334;padding-left:16px">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:6px">
        <strong>UBS &#x2014; Intern</strong>
        <span style="font-size:11px;color:#666;padding:2px 8px">Jul &#x2013; Nov 2018</span>
      </div>
      <ul style="font-size:12px;color:#9090b0;line-height:1.8;list-style:none">
        <li>&#x2192; Selenium + Java framework validating 2M+ test scenarios</li>
      </ul>
    </div>
  </div>`
}

function skillsHTML() {
  const groups = [
    ['Languages', ['Java','Python','C','C++','JavaScript'], '#667eea'],
    ['Backend / Data', ['Spring Boot','Dropwizard','REST APIs','PostgreSQL','MySQL','GraphDB'], '#a78bfa'],
    ['Frontend', ['ReactJS','NodeJS','HTML5','CSS3','Bootstrap'], '#34d399'],
    ['Cloud &amp; DevOps', ['GCP','AWS','Azure','Kubernetes','Terraform','Docker','Spinnaker','Harness','Jenkins'], '#f59e0b'],
    ['Observability', ['Datadog','Splunk','Dynatrace'], '#f97316'],
  ]
  return `<div class="content-panel">
    <button class="close-btn" id="close-btn">&#x2715;</button>
    <div class="section-label" style="color:#667eea">Skills</div>
    ${groups.map(([cat, tags, color]) => `
      <div style="margin-bottom:20px">
        <div style="font-size:10px;font-weight:700;letter-spacing:2px;color:${color};margin-bottom:8px">${cat.toUpperCase()}</div>
        <div>${tags.map(t => `<span class="tag" style="background:${color}22;color:${color}">${t}</span>`).join('')}</div>
      </div>`).join('')}
  </div>`
}

function projectsHTML() {
  return `<div class="content-panel">
    <button class="close-btn" id="close-btn">&#x2715;</button>
    <div class="section-label" style="color:#a78bfa">Projects</div>
    <div style="background:#12122a;border:1px solid #a78bfa33;border-radius:8px;padding:20px;margin-bottom:16px">
      <div style="font-size:16px;font-weight:700;margin-bottom:6px">Pothole Detection System</div>
      <div style="font-size:11px;color:#a78bfa;margin-bottom:10px">AWS &#xB7; CNN &#xB7; MobileNet</div>
      <p style="font-size:13px;color:#9090b0;line-height:1.7">Real-time pothole detection using MobileNet CNN. Published and presented at ICIAMR 2019.</p>
    </div>
    <div style="background:#12122a;border:1px solid #a78bfa33;border-radius:8px;padding:20px">
      <div style="font-size:16px;font-weight:700;margin-bottom:6px">ParkSafe</div>
      <div style="font-size:11px;color:#a78bfa;margin-bottom:10px">Flask &#xB7; OpenStreetMap</div>
      <p style="font-size:13px;color:#9090b0;line-height:1.7">Safety scores for parking spots using processed crime statistics.</p>
    </div>
  </div>`
}

function educationHTML() {
  return `<div class="content-panel">
    <button class="close-btn" id="close-btn">&#x2715;</button>
    <div class="section-label" style="color:#34d399">Education</div>
    <div style="background:#12122a;border:1px solid #34d39933;border-radius:8px;padding:20px;margin-bottom:16px">
      <div style="font-size:16px;font-weight:700;margin-bottom:4px">Santa Clara University</div>
      <div style="font-size:13px;color:#34d399;margin-bottom:8px">MS in Computer Science &amp; Engineering</div>
      <div style="font-size:28px;font-weight:900">3.815 <span style="font-size:14px;color:#666">/ 4.0</span></div>
    </div>
    <div style="background:#12122a;border:1px solid #34d39933;border-radius:8px;padding:20px">
      <div style="font-size:16px;font-weight:700;margin-bottom:4px">VIT Pune, India</div>
      <div style="font-size:13px;color:#34d399;margin-bottom:8px">B.Tech in Computer Engineering</div>
      <div style="font-size:28px;font-weight:900">3.64 <span style="font-size:14px;color:#666">/ 4.0</span></div>
    </div>
  </div>`
}

function impactHTML() {
  const stats = [
    ['200+','Developers impacted'], ['80%','Processing latency cut'],
    ['75%','Faster CI/CD'], ['70%','Deployment complexity reduced'],
    ['25k+','Financial rules managed'], ['20k+','Global users engaged'],
  ]
  return `<div class="content-panel">
    <button class="close-btn" id="close-btn">&#x2715;</button>
    <div class="section-label" style="color:#f97316">Impact</div>
    <div class="stat-grid">
      ${stats.map(([n,l]) => `
        <div class="stat-card">
          <div class="stat-number">${n}</div>
          <div class="stat-label">${l}</div>
        </div>`).join('')}
    </div>
  </div>`
}

function contactHTML() {
  return `<div class="content-panel">
    <button class="close-btn" id="close-btn">&#x2715;</button>
    <div class="section-label" style="color:#f59e0b">Contact</div>
    <div style="text-align:center;margin-bottom:28px">
      <div style="font-size:26px;font-weight:900">Ayush Salunke</div>
      <div style="font-size:13px;color:#8080a0;margin-top:6px">Senior Software Engineer &#xB7; Open to opportunities</div>
    </div>
    <a href="mailto:ayush.salunke250497@gmail.com" class="contact-link" style="border:1px solid #f59e0b44">
      <span style="font-size:22px">&#x2709;&#xFE0F;</span>
      <div><div class="contact-type" style="color:#f59e0b">EMAIL</div><div class="contact-value">ayush.salunke250497@gmail.com</div></div>
    </a>
    <a href="https://linkedin.com/in/ayush-salunke" target="_blank" rel="noopener" class="contact-link" style="border:1px solid #0ea5e944">
      <span style="font-size:22px">&#x1F4BC;</span>
      <div><div class="contact-type" style="color:#0ea5e9">LINKEDIN</div><div class="contact-value">linkedin.com/in/ayush-salunke</div></div>
    </a>
    <a href="tel:6692209962" class="contact-link" style="border:1px solid #8b5cf644">
      <span style="font-size:22px">&#x1F4DE;</span>
      <div><div class="contact-type" style="color:#8b5cf6">PHONE</div><div class="contact-value">(669) 220-9962</div></div>
    </a>
  </div>`
}

const generators = {
  experience: experienceHTML,
  skills: skillsHTML,
  projects: projectsHTML,
  education: educationHTML,
  impact: impactHTML,
  contact: contactHTML,
}

export function showContent(key, onClose) {
  const overlay = document.getElementById('content-overlay')
  // Parse static HTML safely — hardcoded content, not user input
  const parser = new DOMParser()
  const doc = parser.parseFromString(generators[key](), 'text/html')
  overlay.replaceChildren(...Array.from(doc.body.childNodes))
  overlay.classList.remove('hidden')
  overlay.querySelector('#close-btn').addEventListener('click', () => {
    overlay.classList.add('hidden')
    onClose()
  })
}

export function hideContent() {
  document.getElementById('content-overlay').classList.add('hidden')
}
