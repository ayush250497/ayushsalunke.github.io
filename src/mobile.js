export function initMobile() {
  document.getElementById('canvas')?.remove()
  document.getElementById('hint')?.remove()
  document.getElementById('loading')?.remove()
  document.body.style.overflow = 'auto'

  const wrap = document.createElement('div')
  wrap.style.cssText = 'max-width:600px;margin:0 auto;padding:24px 16px;font-family:system-ui'

  function card(label, color, bodyText) {
    const div = document.createElement('div')
    div.style.cssText = 'background:#0e0e24;border-radius:8px;padding:20px;margin-bottom:12px'
    const lbl = document.createElement('div')
    lbl.style.cssText = `font-size:10px;font-weight:700;letter-spacing:2px;color:${color};margin-bottom:12px`
    lbl.textContent = label
    const body = document.createElement('div')
    body.style.cssText = 'font-size:14px;color:#9090b0;line-height:1.7;white-space:pre-line'
    body.textContent = bodyText
    div.append(lbl, body)
    return div
  }

  function contactLink(href, emoji, label, value, color) {
    const a = document.createElement('a')
    a.href = href
    if (href.startsWith('http')) { a.target = '_blank'; a.rel = 'noopener' }
    a.style.cssText = 'display:flex;align-items:center;gap:12px;background:#1e1e3f;border-radius:8px;padding:14px;margin-bottom:8px;color:#fff;text-decoration:none'
    const icon = document.createElement('span')
    icon.style.fontSize = '20px'
    icon.textContent = emoji
    const info = document.createElement('div')
    const lbl = document.createElement('div')
    lbl.style.cssText = `font-size:10px;font-weight:700;color:${color}`
    lbl.textContent = label
    const val = document.createElement('div')
    val.style.cssText = 'font-size:13px'
    val.textContent = value
    info.append(lbl, val)
    a.append(icon, info)
    return a
  }

  const hero = document.createElement('div')
  hero.style.cssText = 'text-align:center;padding:48px 0 32px'
  const name = document.createElement('div')
  name.style.cssText = 'font-size:36px;font-weight:900;letter-spacing:-1px'
  name.textContent = 'AYUSH SALUNKE'
  const title = document.createElement('div')
  title.style.cssText = 'color:#9090b0;margin-top:8px'
  title.textContent = 'Senior Software Engineer'
  hero.append(name, title)
  wrap.appendChild(hero)

  wrap.appendChild(contactLink('mailto:ayush.salunke250497@gmail.com', '✉️', 'EMAIL', 'ayush.salunke250497@gmail.com', '#f59e0b'))
  wrap.appendChild(contactLink('https://linkedin.com/in/ayush-salunke', '💼', 'LINKEDIN', 'linkedin.com/in/ayush-salunke', '#0ea5e9'))
  wrap.appendChild(contactLink('tel:6692209962', '📞', 'PHONE', '(669) 220-9962', '#8b5cf6'))

  wrap.appendChild(card('EXPERIENCE', '#667eea', 'JP Morgan Chase · Lead SWE · Jun 2022–Present\nUBS · Software Developer · 2019–2021'))
  wrap.appendChild(card('SKILLS', '#667eea', 'Java · Python · React · GCP · AWS · Kubernetes · Docker'))
  wrap.appendChild(card('EDUCATION', '#34d399', 'SCU — MS CS 3.815 · VIT — B.Tech 3.64'))

  document.body.appendChild(wrap)
}
