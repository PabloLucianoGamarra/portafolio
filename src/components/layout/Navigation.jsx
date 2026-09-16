import { useEffect, useRef, useState } from 'react'
import { navigationLinks } from '../../data/navigation'
import ThemeToggle from './ThemeToggle'
export default function Navigation() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('inicio')
  const headerRef = useRef(null)
  const menuRef = useRef(null)

  useEffect(() => {
    const sections = navigationLinks.map(({ id }) => document.getElementById(id)).filter(Boolean)
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) setActive(entry.target.id)
      }
    }, { rootMargin: '-80px 0px -55% 0px', threshold: 0 })
    sections.forEach(section => observer.observe(section))
    const desktop = window.matchMedia('(min-width: 1024px)')
    const onResize = () => { if (desktop.matches) setOpen(false) }
    desktop.addEventListener('change', onResize)
    return () => {
      observer.disconnect()
      desktop.removeEventListener('change', onResize)
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
    if (window.matchMedia('(max-width: 1023px)').matches) {
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
          aria-label="pg Pablo Gamarra desarrollo web, inicio"
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
