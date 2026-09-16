import fs from 'node:fs/promises'

const pages = await (await fetch('http://127.0.0.1:9222/json')).json()
const socket = new WebSocket(pages.find(page => page.type === 'page').webSocketDebuggerUrl)
await new Promise(resolve => socket.addEventListener('open', resolve, { once: true }))
let sequence = 0
const pending = new Map()
const errors = []
socket.addEventListener('message', event => {
  const message = JSON.parse(event.data)
  if (message.id) {
    const request = pending.get(message.id)
    pending.delete(message.id)
    if (message.error) request.reject(message.error)
    else request.resolve(message.result)
  }
  if (message.method === 'Runtime.exceptionThrown' || (message.method === 'Log.entryAdded' && message.params.entry.level === 'error')) errors.push(message.params)
})
const send = (method, params = {}) => new Promise((resolve, reject) => {
  const id = ++sequence
  pending.set(id, { resolve, reject })
  socket.send(JSON.stringify({ id, method, params }))
})
const evaluate = async expression => {
  const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })
  if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails))
  return result.result.value
}
await send('Runtime.enable')
await send('Log.enable')
await send('Page.enable')
await send('Emulation.setDeviceMetricsOverride', { width: 1366, height: 768, deviceScaleFactor: 1, mobile: false })
await send('Page.navigate', { url: 'http://127.0.0.1:5173/portafolio/' })
await new Promise(resolve => setTimeout(resolve, 3500))
const stage = process.argv[2] || 'before'
await evaluate("localStorage.setItem('portfolio:theme', 'light')")
await send('Page.reload')
await new Promise(resolve => setTimeout(resolve, 1500))
const shot = async name => {
  const { data } = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false })
  await fs.writeFile(`artifacts/${stage}-${name}.png`, Buffer.from(data, 'base64'))
}
await shot('desktop')
for (const id of ['servicios', 'experiencia-docente', 'proyectos', 'contacto']) {
  await evaluate(`document.getElementById('${id}').scrollIntoView({behavior:'instant'})`)
  await new Promise(resolve => setTimeout(resolve, 600))
  await shot(id)
}
await evaluate("window.scrollTo({top:0,behavior:'instant'})")
const baseline = await evaluate(`({text:document.querySelector('main').textContent,links:[...document.querySelectorAll('a')].map(a=>a.getAttribute('href')),images:[...document.images].filter(i=>i.getBoundingClientRect().width>0).map(i=>({src:i.getAttribute('src'),loaded:i.complete&&i.naturalWidth>0})),sections:[...document.querySelectorAll('main>section')].map(s=>({id:s.id,height:Math.round(s.getBoundingClientRect().height)}))})`)
await fs.writeFile(`artifacts/${stage}-inventory.json`, JSON.stringify(baseline, null, 2))
const checks = []
for (const width of [320, 375, 768, 1024, 1366]) {
  await send('Emulation.setDeviceMetricsOverride', { width, height: 800, deviceScaleFactor: 1, mobile: false })
  checks.push(await evaluate(`({width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth,ctaBottom:document.querySelector('.hero-actions').getBoundingClientRect().bottom})`))
  if (width === 375) await shot('mobile')
}
if (stage === 'after') {
  const results = await evaluate(`(async()=>{
    const checks={};const tick=()=>new Promise(r=>setTimeout(r,80));
    document.querySelector('.resume-trigger').click();await tick();checks.cv=document.querySelector('dialog').open;document.querySelector('dialog').close();
    for(const toggle of document.querySelectorAll('.project-toggle')){toggle.click();await tick();checks[toggle.getAttribute('aria-controls')]=toggle.getAttribute('aria-expanded')==='true';}
    document.querySelector('.project-tienda .project-toggle').click();await tick();
    const add=document.querySelector('.small-button');add.click();await tick();checks.cart=document.querySelector('.demo-heading').textContent.includes('1');
    document.querySelector('.cart-summary button').click();await tick();checks.emptyCart=document.querySelector('.cart-summary button').disabled;
    document.querySelectorAll('.filters button')[1].click();await tick();checks.filter=document.querySelectorAll('.product').length>0;
    document.querySelector('.contact-button').click();await tick();checks.email=document.querySelector('.revealed-email').getAttribute('href').startsWith('mailto:');
    checks.formValidation=!document.querySelector('.contact-form').checkValidity();
    document.querySelector('.theme-toggle').click();await tick();checks.theme=document.documentElement.dataset.theme==='dark';
    document.querySelector('.teaching-details summary').click();await tick();checks.teaching=document.querySelector('.teaching-details').open;
    document.querySelector('.project-notas .project-toggle').click();await tick();document.querySelectorAll('#details-notas .gallery-options button')[1].click();await tick();checks.gallery=document.querySelector('#grade-screenshot img').getAttribute('src').includes('pagina2');
    return checks;
  })()`)
  checks.push(results)
  await evaluate('window.scrollTo(0,0)')
  await shot('dark-desktop')
  await send('Emulation.setDeviceMetricsOverride', { width: 375, height: 800, deviceScaleFactor: 1, mobile: false })
  checks.push(await evaluate(`(async()=>{document.querySelector('.nav-menu-button').click();await new Promise(r=>setTimeout(r,80));const opened=document.querySelector('.nav-menu-button').getAttribute('aria-expanded')==='true';document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape'}));await new Promise(r=>setTimeout(r,80));return {mobileMenu:opened,escapeCloses:document.querySelector('.nav-menu-button').getAttribute('aria-expanded')==='false',focusRestored:document.activeElement===document.querySelector('.nav-menu-button')};})()`))
  await shot('dark-mobile')
}
await fs.writeFile(`artifacts/${stage}-checks.json`, JSON.stringify({ checks, errors }, null, 2))
console.log(JSON.stringify({ checks, errors, sections: baseline.sections, brokenImages: baseline.images.filter(image => !image.loaded) }, null, 2))
socket.close()
