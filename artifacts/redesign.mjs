import fs from 'node:fs'
const edit = (path, fn) => fs.writeFileSync(path, fn(fs.readFileSync(path, 'utf8')))
edit('src/components/layout/Navigation.jsx', s => s.replace(/    let frame = 0[\s\S]*?\n  }, \[\]\)/, `    const sections = navigationLinks.map(({ id }) => document.getElementById(id)).filter(Boolean)
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
  }, [])`).replace('(max-width: 900px)', '(max-width: 1023px)'))
edit('src/components/sections/Profile.jsx', s => s.replace('<p className="eyebrow">03 / SOBRE MÍ</p>', '<p className="section-label">Sobre mí</p>'))
edit('src/components/sections/Services.jsx', s => s.replace('<p className="eyebrow">02 / SERVICIOS</p>', '<p className="section-label">Servicios</p>').replace('Un punto de partida para tu proyecto.', 'Sitios web, landing pages, plataformas educativas y paneles administrativos. Un punto de partida para tu proyecto.'))
edit('src/components/sections/Projects.jsx', s => s.replace('<p className="eyebrow">01 / PROYECTOS</p>', '<p className="section-label">Proyectos</p>').replace('Explorá cada tarjeta', 'Explorá cada proyecto').replace('<div className="project-meta">', '<div className="project-summary"><div className="project-meta">').replace('            <div\n              id={`details-', '            </div>\n            <div\n              id={`details-'))
edit('src/components/sections/TeachingExperience.jsx', s => s.replace("import { useEffect, useRef } from 'react'\n", '').replace(/  const sectionRef = useRef\(null\)[\s\S]*?\n  return \(/, '  return (').replace('      ref={sectionRef}\n', '').replace('<p className="eyebrow">04 / EDUCACIÓN + TECNOLOGÍA</p>', '<p className="section-label">Experiencia · Educación y tecnología</p>').replace('<p className="eyebrow">APRENDER HACIENDO</p>', '<p className="section-label">Aprender haciendo</p>'))
// Existing project concepts keep their original artwork; move screenshot descriptions below their images.
edit('src/components/projects/Preview.jsx', s => s.replaceAll('—', '·').replace('className="preview grades-real-preview"', 'className="preview grades-real-preview"').replace('          loading="lazy"\n        />', '          width={1365}\n          height={790}\n          loading="lazy"\n        />'))
edit('src/data/projects.js', s => s.replaceAll(' — ', ' · '))
edit('src/utils/theme.js', s => s.replace("'#0b1724' : '#147eb5'", "'#171d24' : '#f8f9fb'"))
// Isolate preserved illustrations and interactive demo styling from the portfolio design system.
const original = fs.readFileSync('src/styles/App.css', 'utf8')
const extract = (start, end) => original.slice(original.indexOf(start), original.indexOf(end))
fs.writeFileSync('src/styles/ProjectDemos.css', '/* Original conceptual project artwork, preserved independently of portfolio tokens. */\n' + extract('.buen-clima-cover {', '.project-meta {') + extract('.shop-demo {', '@media (max-width: 1000px)'))
