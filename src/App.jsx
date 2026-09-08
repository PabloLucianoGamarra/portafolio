import { useEffect, useRef, useState } from 'react'
import { useContactForm } from './useContactForm'
import HCaptcha from '@hcaptcha/react-hcaptcha'
import './App.css'
import { saveTheme } from './theme'

const projects = [
  { id: 'tienda', name: 'Objeto — tienda de diseño', category: 'E-commerce', technology: 'React', type: 'Demo conceptual', description: 'Una tienda de objetos cotidianos, con un catálogo simple y una experiencia de compra clara.', details: 'Demo creada para este portafolio. Incluye filtro por categoría y carrito local, con productos ficticios. No procesa pedidos ni pagos.' },
  { id: 'empresa', name: 'Norte — estudio de arquitectura', category: 'Web corporativa', technology: 'React', type: 'Concepto visual', description: 'Una propuesta de identidad digital para un estudio: servicios, espacios y una presentación con personalidad.', details: 'Concepto visual para una marca ficticia, creado para mostrar una posible dirección de diseño. No corresponde a un cliente ni a un sitio publicado.' },
  { id: 'notas', name: 'Sistema de calificaciones', category: 'Aplicación web', technology: 'Laravel', type: 'Proyecto propio', description: 'Sistema de gestión académica desarrollado con Laravel: calificaciones, usuarios y materias en un mismo lugar.', details: 'Proyecto propio en Laravel. Las capturas muestran el seguimiento de notas trimestrales y finales, la administración de usuarios por rol y la gestión de materias con filtros por ciclo lectivo.' },
]
const products = [
  { id: 1, name: 'Lámpara Arco', category: 'Iluminación', price: 48000, shape: 'lamp' },
  { id: 2, name: 'Florero Terra', category: 'Decoración', price: 24000, shape: 'vase' },
  { id: 3, name: 'Lámpara Duna', category: 'Iluminación', price: 56000, shape: 'lamp small' },
]
const money = (value) => new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(value)

function ShopDemo() {
  const [category, setCategory] = useState('Todos')
  const [cart, setCart] = useState([])
  return <div className="shop-demo">
    <div className="demo-heading"><h4>Explorá la demo de Objeto</h4><span aria-live="polite">Carrito · {cart.length}</span></div>
    <div className="filters" aria-label="Categorías de productos">{['Todos', 'Iluminación', 'Decoración'].map((item) => <button key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}</div>
    <div className="products">{products.filter((product) => category === 'Todos' || product.category === category).map((product) => <article key={product.id} className="product"><div className="product-art" aria-hidden="true"><div className={product.shape} /></div><h5>{product.name}</h5><p>{money(product.price)}</p><button className="small-button" onClick={() => setCart([...cart, product])}>Agregar al carrito +</button></article>)}</div>
    <div className="cart-summary"><p aria-live="polite">Total de muestra: <strong>{money(cart.reduce((total, product) => total + product.price, 0))}</strong></p><button disabled={!cart.length} onClick={() => setCart([])}>Vaciar carrito</button></div>
    <small>Productos y precios ficticios. Esta demo no realiza pedidos ni cobros.</small>
  </div>
}

const gradeScreenshots = [
  { src: `${import.meta.env.BASE_URL}images/sistemasCalificaciones/pagina1.png`, title: 'Calificaciones finales', description: 'Notas por trimestre, promedios e instancias finales.', width: 1355, height: 785 },
  { src: `${import.meta.env.BASE_URL}images/sistemasCalificaciones/pagina2.png`, title: 'Administración de usuarios', description: 'Listado de personal, búsqueda de usuarios y roles.', width: 1365, height: 785 },
  { src: `${import.meta.env.BASE_URL}images/sistemasCalificaciones/pagina3.png`, title: 'Gestión de materias', description: 'Materias, docentes y filtros por ciclo lectivo.', width: 1365, height: 769 },
]

function GradesGallery() {
  const [selected, setSelected] = useState(0)
  const screenshot = gradeScreenshots[selected]
  return <div className="grades-gallery">
    <h4>Recorrido por el sistema</h4>
    <div className="gallery-options" role="group" aria-label="Elegir captura del sistema">
      {gradeScreenshots.map((item, index) => <button type="button" key={item.src} aria-pressed={index === selected} onClick={() => setSelected(index)} aria-controls="grade-screenshot">{index + 1}. {item.title}</button>)}
    </div>
    <figure id="grade-screenshot" className="gallery-figure">
      <a href={screenshot.src} target="_blank" rel="noopener noreferrer" aria-label={`Abrir ${screenshot.title} en tamaño completo (nueva pestaña)`}>
        <img src={screenshot.src} alt={`${screenshot.title}: ${screenshot.description}`} width={screenshot.width} height={screenshot.height} loading="lazy" />
      </a>
      <figcaption aria-live="polite"><strong>{screenshot.title}</strong><p>{screenshot.description}</p></figcaption>
    </figure>
    <a className="gallery-full-size" href={screenshot.src} target="_blank" rel="noopener noreferrer">Ver en tamaño completo <span aria-hidden="true">↗</span><span className="gallery-new-tab"> (nueva pestaña)</span></a>
  </div>
}

function Preview({ id }) {
  if (id === 'tienda') return <div className="preview store-preview" aria-hidden="true"><div className="mini-nav"><b>objeto.</b><span>Objetos para habitar</span><span>Bolsa (0)</span></div><div className="store-content"><div><span className="mini-label">MENOS, PERO MEJOR.</span><h4>Lo cotidiano,<br /><i>extraordinario.</i></h4><span className="mini-link">Explorá la colección ↗</span></div><div className="lamp" /><div className="vase" /></div><div className="mini-footer">DISEÑO CON INTENCIÓN <span>COLECCIÓN 01 — HOGAR</span></div></div>
  if (id === 'empresa') return <div className="preview company-preview" aria-hidden="true"><div className="mini-nav"><b>NORTE®</b><span>Arquitectura & espacios</span></div><div className="architecture"><div className="building building-one" /><div className="building building-two" /><div className="sun" /></div><div className="company-caption"><h4>Espacios para<br /><i>vivir mejor.</i></h4><span>ARQUITECTURA<br />CON PROPÓSITO ↗</span></div></div>
  return <div className="preview grades-real-preview"><img src={gradeScreenshots[0].src} alt="Vista del sistema de calificaciones con notas trimestrales, promedios e instancias finales" width={1355} height={785} loading="lazy" /><span className="grades-preview-label">3 capturas del sistema</span></div>
}

function Contact() {
  const {
    accessKey, email, sending, formSuccess, formError, captchaError, captchaRef,
    submitContact, revealEmail, handleCaptchaVerify, handleCaptchaExpire, handleCaptchaError,
  } = useContactForm()
  return <section id="contacto" className="contact wrap">
    <div className="contact-layout">
      <div className="contact-copy">
        <p className="eyebrow">EL PRÓXIMO PROYECTO PUEDE SER EL TUYO</p>
        <h2>¿Le damos forma<br />a <em>tu idea?</em></h2>
        <p>Contame qué necesitás, en qué etapa estás y qué te gustaría lograr con tu web.</p>
        <div className="contact-action">
          <p className="contact-alternative">¿Preferís escribirme directamente?</p>
          {!email && <button type="button" className="button contact-button" onClick={revealEmail} aria-controls="email-contact">Mostrar correo ↗</button>}
          <div id="email-contact" aria-live="polite">{email && <a className="revealed-email" href={`mailto:${email}?subject=${encodeURIComponent('Consulta por un proyecto web')}`}>{email} ↗</a>}</div>
        </div>
      </div>
      <form className="contact-form" method="POST" onSubmit={submitContact} aria-busy={sending} aria-label="Consulta por un proyecto web" aria-describedby="contact-delivery-note">
        <fieldset className="contact-form-fields" disabled={sending}>
        <div className="contact-honeypot" aria-hidden="true"><label htmlFor="contact-website">Dejar vacío</label><input id="contact-website" name="_honey" type="text" tabIndex={-1} autoComplete="off" /></div>
        <div className="contact-fields">
          <div className="contact-field"><label htmlFor="contact-name">Tu nombre <span>(obligatorio)</span></label><input id="contact-name" name="name" type="text" autoComplete="name" placeholder="¿Cómo te llamás?" required minLength={2} maxLength={100} /></div>
          <div className="contact-field"><label htmlFor="contact-email">Tu correo <span>(obligatorio)</span></label><input id="contact-email" name="email" type="email" autoComplete="email" placeholder="nombre@ejemplo.com" required maxLength={254} /></div>
        </div>
        <div className="contact-field"><label htmlFor="contact-service">¿Qué necesitás?</label><select id="contact-service" name="service" defaultValue=""><option value="" disabled>Elegí una opción (opcional)</option><option>Tienda online</option><option>Página web corporativa</option><option>Desarrollo a medida</option><option>Mejorar una web existente</option><option>Quiero asesoramiento</option></select></div>
        <div className="contact-field"><label htmlFor="contact-message">Contame tu idea <span>(obligatorio)</span></label><textarea id="contact-message" name="message" rows={5} required minLength={20} maxLength={5000} placeholder="Mi negocio se dedica a… y me gustaría una web que…" aria-describedby="contact-message-hint" /><small id="contact-message-hint">Entre 20 y 5.000 caracteres.</small></div>
        </fieldset>
        {accessKey ? <div className="contact-captcha">
          <HCaptcha ref={captchaRef} sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2" reCaptchaCompat={false} languageOverride="es" size="compact"
            onVerify={handleCaptchaVerify}
            onExpire={handleCaptchaExpire}
            onError={handleCaptchaError}
          />
        </div> : <p className="contact-delivery-note">El formulario todavía no está disponible. Podés escribirme usando el correo alternativo.</p>}
        <p id="contact-delivery-note" className="contact-delivery-note">La verificación y el envío se completan en esta página. hCaptcha verifica que no seas un bot y Web3Forms procesa tus datos para enviarme la consulta.</p>
        <p className="contact-form-error" role="alert">{captchaError}</p>
        <p className="contact-form-error" role="alert">{formError}</p>
        <p className="contact-form-success" role="status">{formSuccess}</p>
        <button className="button primary contact-submit" type="submit" disabled={sending || !accessKey}>{sending ? 'Enviando…' : 'Enviar consulta'} <span aria-hidden="true">↗</span></button>
      </form>
    </div>
  </section>
}
function ThemeToggle() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'light')
  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark'
    saveTheme(next)
    setTheme(next)
  }
  return <button type="button" className="theme-toggle" onClick={toggleTheme} aria-label="Tema oscuro" aria-pressed={theme === 'dark'} title={theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}>
    <span aria-hidden="true">{theme === 'dark' ? '☀' : '☾'}</span><span className="theme-label">{theme === 'dark' ? 'Claro' : 'Oscuro'}</span>
  </button>
}

const navigationLinks = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'servicios', label: 'Servicios' },
  { id: 'perfil', label: 'Sobre mí' },
  { id: 'contacto', label: 'Contacto' },
]

function Navigation() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('inicio')
  const headerRef = useRef(null)
  const menuRef = useRef(null)

  useEffect(() => {
    let frame = 0
    function updateSection() {
      const marker = (headerRef.current?.getBoundingClientRect().bottom || 90) + 55
      let current = 'inicio'
      for (const { id } of navigationLinks) {
        if (document.getElementById(id)?.getBoundingClientRect().top <= marker) current = id
      }
      if (window.scrollY > 0 && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8) current = 'contacto'
      setActive(current)
    }
    function scheduleUpdate() {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(updateSection)
    }
    const desktop = window.matchMedia('(min-width: 901px)')
    function onResize() {
      if (desktop.matches) setOpen(false)
      scheduleUpdate()
    }
    updateSection()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    function onKeyDown(event) {
      if (event.key === 'Escape') {
        setOpen(false)
        menuRef.current?.focus()
      }
    }
    function onPointerDown(event) {
      if (!headerRef.current?.contains(event.target)) setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [open])

  function navigate(event, id) {
    setOpen(false)
    setActive(id)
    if (window.matchMedia('(max-width: 900px)').matches) {
      // Move keyboard focus out of the collapsing menu without interrupting the anchor scroll.
      const target = document.getElementById(id)
      if (target) {
        target.setAttribute('tabindex', '-1')
        target.focus({ preventScroll: true })
      }
    }
  }

  return <header ref={headerRef} className="site-header" onBlur={(event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false)
  }}>
    <div className="nav-shell wrap">
      <a href="#inicio" className="nav-brand" aria-label="Pablo Gamarra, inicio" onClick={(event) => navigate(event, 'inicio')}>
        <span className="nav-monogram" aria-hidden="true">pg<span>.</span></span>
        <span className="nav-brand-copy">Pablo Gamarra<small>DESARROLLO WEB</small></span>
      </a>
      <nav id="main-navigation" className={`nav-links${open ? ' is-open' : ''}`} aria-label="Navegación principal">
        {navigationLinks.map(({ id, label }) => <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined} onClick={(event) => navigate(event, id)}>{label}<span className="nav-mobile-arrow" aria-hidden="true">↗</span></a>)}
      </nav>
      <div className="nav-actions">
        <ThemeToggle />
        <a className="nav-cta" href="#contacto" onClick={(event) => navigate(event, 'contacto')}>Hablemos <span aria-hidden="true">↗</span></a>
        <button ref={menuRef} type="button" className={`nav-menu-button${open ? ' is-open' : ''}`} aria-expanded={open} aria-controls="main-navigation" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} onClick={() => setOpen(!open)}><span /><span /><span /></button>
      </div>
    </div>
  </header>
}

function App() {
  const [activeProject, setActiveProject] = useState(null)
  return <>
    <a className="skip-link" href="#contenido">Saltar al contenido</a>
    <Navigation />
    <main id="contenido">
      <section id="inicio" className="hero wrap"><div className="hero-copy"><p className="eyebrow"><span className="status-dot" /> DESARROLLO WEB FREELANCE</p><h1>Tu negocio.<br />Su próxima<br /><em>versión digital.</em></h1><p className="hero-description">Soy Pablo Luciano Gamarra. Creo tiendas online, páginas corporativas y soluciones web a medida para las necesidades de tu negocio.</p><div className="hero-actions"><a className="button primary" href="#proyectos">Explorar proyectos <span>↗</span></a><a className="text-link" href="#contacto">Hablemos de tu idea <span>→</span></a></div><div className="tech-line"><span>MI ENFOQUE</span><b>Tu negocio</b><span className="tech-divider" /><b>Tu solución web</b></div></div><div className="hero-portrait">
          <div className="portrait-frame">
            <img className="portrait-image" src={`${import.meta.env.BASE_URL}images/perfil.jpg`} alt="Pablo Luciano Gamarra en su espacio de trabajo" width="1086" height="1448" fetchPriority="high" />
          </div>
          <span className="portrait-spark" aria-hidden="true">✳</span>
          <div className="portrait-caption"><span className="status-dot" aria-hidden="true" /><span>Pablo Luciano Gamarra<small>Desarrollo web freelance</small></span></div>
        </div></section>
      <div className="intro-strip"><div className="wrap"><span>Ideas claras. Sitios con propósito.</span><span>E-COMMERCE <b>✳</b> WEBS CORPORATIVAS <b>✳</b> DESARROLLO WEB</span></div></div>
      <section id="proyectos" className="section wrap"><div className="section-heading"><div><p className="eyebrow">01 / PROYECTOS</p><h2>Del concepto<br />a la <em>pantalla.</em></h2></div><p>Conceptos de tiendas online, webs corporativas y aplicaciones. Explorá cada tarjeta para conocer su alcance y las tecnologías utilizadas.</p></div><div className="project-grid">{projects.map((project) => <article className={`project-card project-${project.id}`} key={project.id}><Preview id={project.id} /><div className="project-meta"><span>{project.category} / {project.technology}</span><span>{project.type}</span></div><button className="project-toggle" aria-expanded={activeProject === project.id} aria-controls={`details-${project.id}`} onClick={() => setActiveProject(activeProject === project.id ? null : project.id)}><h3>{project.name}</h3><span className="project-toggle-icon" aria-hidden="true">+</span></button><p>{project.description}</p><div id={`details-${project.id}`} className={`project-details${activeProject === project.id ? ' is-open' : ''}`} aria-hidden={activeProject !== project.id} inert={activeProject !== project.id}><div className="project-details-clip"><div className="project-details-content"><p>{project.details}</p>{project.id === 'tienda' && <ShopDemo />}{project.id === 'notas' && <GradesGallery />}</div></div></div></article>)}</div></section>
      <section id="servicios" className="services"><div className="wrap section"><div className="section-heading"><div><p className="eyebrow">02 / SERVICIOS</p><h2>Una web a la altura<br />de <em>tu idea.</em></h2></div><p>Un punto de partida para tu proyecto. Definimos juntos las funcionalidades que necesita tu negocio.</p></div><div className="service-grid"><article><span className="service-icon">↗</span><span className="service-number">01</span><h3>Tiendas online</h3><p>Una propuesta para presentar tu catálogo y diseñar una experiencia de compra clara, desde el producto hasta el carrito.</p><span className="service-foot">TU CATÁLOGO, EN DIGITAL</span></article><article><span className="service-icon">▦</span><span className="service-number">02</span><h3>Webs corporativas</h3><p>Un lugar propio para contar quién sos, mostrar tus servicios y facilitar que nuevos clientes conozcan tu negocio.</p><span className="service-foot">UNA PRESENCIA CON IDENTIDAD</span></article><article><span className="service-icon">⌘</span><span className="service-number">03</span><h3>Desarrollo a medida</h3><p>Definimos las funcionalidades y evaluamos las herramientas adecuadas según los objetivos, el presupuesto y el alcance de tu proyecto.</p><span className="service-foot">UNA SOLUCIÓN PARA TU IDEA</span></article></div></div></section>
      <section id="perfil" className="section wrap profile">
        <div>
          <p className="eyebrow">03 / SOBRE MÍ</p>
          <h2>Pablo Luciano<br /><em>Gamarra.</em></h2>
          <p className="profile-location">Desde Argentina, para tu próximo proyecto.</p>
          <div className="profile-roles"><span>Programador</span><span>Futuro Ingeniero en Informática</span><span>Profesor de programación</span></div>
        </div>
        <div className="profile-story">
          <p className="profile-lead">Desarrollo soluciones digitales y comparto lo que sé a través de la enseñanza.</p>
          <p>Soy programador, futuro Ingeniero en Informática y profesor de programación de Argentina. Me especializo en desarrollo web, aplicaciones y soluciones digitales modernas.</p>
          <p>He trabajado en la creación de sitios web profesionales, plataformas educativas, aulas virtuales y sistemas personalizados. También cuento con experiencia enseñando programación y tecnología en los niveles secundario y terciario.</p>
          <p>En cada proyecto busco una solución creativa, funcional y de calidad. Me interesa entender lo que necesitás, mantener una comunicación clara y acompañar el trabajo con compromiso, desde la primera idea hasta su implementación.</p>
          <div className="profile-values" aria-label="Mi forma de trabajar"><span>Comunicación clara</span><span>Compromiso</span><span>Soluciones a medida</span></div>
          <a className="text-link profile-contact" href="#contacto">Contame sobre tu proyecto <span aria-hidden="true">↗</span></a>
        </div>
      </section>
      <Contact />
    </main><footer className="footer wrap"><a href="#inicio" className="brand">pablo<span>gamarra</span><span className="brand-dot">.</span></a><span>Desarrollo web freelance · Soluciones a medida</span><a href="#inicio">Volver arriba ↑</a></footer>
  </>
}
export default App










