import { useEffect, useRef, useState } from 'react'
import { navigationLinks } from '../../data/navigation'
import ThemeToggle from './ThemeToggle'
export default function Navigation() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('inicio')
  const headerRef = useRef(null)
  const menuRef = useRef(null)

  useEffect(() => {
    let frame = 0
    function updateSection() {
      const marker =
        (headerRef.current?.getBoundingClientRect().bottom || 90) + 55
      let current = 'inicio'
      for (const { id } of navigationLinks) {
        if (document.getElementById(id)?.getBoundingClientRect().top <= marker)
          current = id
      }
      if (
        window.scrollY > 0 &&
        window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 8
      )
        current = 'contacto'
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

  return (
    <header
      ref={headerRef}
      className="site-header"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false)
      }}
    >
      <div className="nav-shell wrap">
        <a
          href="#inicio"
          className="nav-brand"
          aria-label="Pablo Gamarra, inicio"
          onClick={(event) => navigate(event, 'inicio')}
        >
          <span className="nav-monogram" aria-hidden="true">
            pg<span>.</span>
          </span>
          <span className="nav-brand-copy">
            Pablo Gamarra<small>DESARROLLO WEB</small>
          </span>
        </a>
        <nav
          id="main-navigation"
          className={`nav-links${open ? ' is-open' : ''}`}
          aria-label="Navegación principal"
        >
          {navigationLinks.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? 'location' : undefined}
              onClick={(event) => navigate(event, id)}
            >
              {label}
              <span className="nav-mobile-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <ThemeToggle />
          <a
            className="nav-cta"
            href="#contacto"
            onClick={(event) => navigate(event, 'contacto')}
          >
            Hablemos <span aria-hidden="true">↗</span>
          </a>
          <button
            ref={menuRef}
            type="button"
            className={`nav-menu-button${open ? ' is-open' : ''}`}
            aria-expanded={open}
            aria-controls="main-navigation"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setOpen(!open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  )
}
