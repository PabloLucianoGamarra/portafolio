import { useEffect, useRef } from 'react'
import './TeachingExperience.css'

const experiences = [
  {
    institution: 'Instituto Génesis',
    role: 'Profesor de informática y tecnología',
    icon: 'education',
    areas: ['Programación Lógica', 'Desarrollo Web', 'Sistemas Operativos', 'Tecnología e Informática'],
    description: 'Planifico y desarrollo clases, creo actividades prácticas y evalúo el aprendizaje. Acompaño proyectos tecnológicos e integro herramientas digitales para que los estudiantes lleven los conceptos a la práctica.',
    knowledge: ['Lógica de programación', 'Desarrollo web', 'Sistemas operativos', 'Plataformas educativas'],
  },
  {
    institution: 'Instituto San Jorge',
    role: 'Docente de programación, redes y seguridad',
    icon: 'network',
    areas: ['Programación', 'Sistemas Operativos en Red', 'Seguridad Informática'],
    description: 'Trabajo con programación, redes y administración de sistemas. Propongo actividades de seguridad informática y resolución práctica de problemas para conectar los contenidos con situaciones del entorno IT.',
    knowledge: ['Programación', 'Redes informáticas', 'Administración de sistemas', 'Seguridad informática'],
  },
  {
    institution: 'Instituto Espíritu Santo',
    role: 'Docente de programación y mantenimiento de PC',
    icon: 'hardware',
    areas: ['Programación Básica', 'Taller de Reparación y Mantenimiento de PC'],
    description: 'Desarrollo actividades de diagnóstico, armado y desarmado de computadoras, mantenimiento preventivo y fundamentos de programación. El trabajo con equipos permite aprender a identificar fallas y resolverlas de forma ordenada.',
    knowledge: ['Hardware', 'Diagnóstico de PC', 'Mantenimiento preventivo', 'Fundamentos de programación'],
  },
  {
    institution: 'Educación Superior y capacitaciones',
    role: 'Docente de desarrollo web, programación y herramientas digitales',
    icon: 'code',
    areas: ['Desarrollo y Diseño Web', 'Fundamentos de desarrollo de software', 'Herramientas digitales'],
    description: 'Enseño tecnologías de desarrollo web y programación con actividades prácticas que integran interfaces, lógica de aplicación, bases de datos y control de versiones, apoyadas en plataformas educativas.',
    knowledge: ['HTML', 'CSS', 'JavaScript', 'PHP', 'Laravel', 'Bases de datos', 'Git', 'GitHub'],
  },
]

const projectAreas = [
  { icon: 'code', title: 'Desarrollo de software', tools: 'Laravel · PHP · MySQL · HTML · CSS · JavaScript · Git · GitHub' },
  { icon: 'hardware', title: 'Robótica y prototipado', tools: 'Arduino · Wokwi · Robótica · Impresión 3D' },
  { icon: 'network', title: 'Entornos de aprendizaje', tools: 'Moodle · Redes informáticas · Plataformas educativas · IA aplicada al desarrollo y la educación' },
]

function TeachingIcon({ type }) {
  const paths = {
    education: <><path d="m2 9 10-5 10 5-10 5L2 9Z" /><path d="M6 11v6c4 3 8 3 12 0v-6M22 9v7" /></>,
    code: <><rect x="2" y="3" width="20" height="18" rx="3" /><path d="M2 8h20m-14 4-3 3 3 3m8-6 3 3-3 3m-3-7-2 8" /></>,
    network: <><rect x="8" y="2" width="8" height="6" rx="1" /><rect x="2" y="16" width="7" height="6" rx="1" /><rect x="15" y="16" width="7" height="6" rx="1" /><path d="M12 8v4m-7 4v-4h14v4" /></>,
    hardware: <><rect x="6" y="6" width="12" height="12" rx="2" /><path d="M9 2v4m6-4v4M9 18v4m6-4v4M2 9h4m-4 6h4m12-6h4m-4 6h4" /><rect x="10" y="10" width="4" height="4" rx="1" /></>,
  }
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{paths[type]}</svg>
}

export default function TeachingExperience() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!('IntersectionObserver' in window) || motion.matches) return
    const cards = sectionRef.current.querySelectorAll('.teaching-reveal')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('is-pending')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.08 })
    cards.forEach((card) => {
      card.classList.add('is-pending')
      observer.observe(card)
    })
    function showAll() {
      if (motion.matches) {
        cards.forEach((card) => card.classList.remove('is-pending'))
        observer.disconnect()
      }
    }
    motion.addEventListener('change', showAll)
    return () => {
      observer.disconnect()
      cards.forEach((card) => card.classList.remove('is-pending'))
      motion.removeEventListener('change', showAll)
    }
  }, [])

  return (
    <section id="experiencia-docente" className="teaching section" aria-labelledby="teaching-title" ref={sectionRef}>
      <div className="wrap">
        <div className="section-heading teaching-heading">
          <div>
            <p className="eyebrow">04 / EDUCACIÓN + TECNOLOGÍA</p>
            <h2 id="teaching-title">Experiencia <em>Docente</em></h2>
          </div>
          <div className="teaching-heading-copy">
            <p className="teaching-lead">Enseñar tecnología también es aprender a explicar, organizar y construir soluciones junto a otras personas.</p>
            <p className="teaching-intro">Soy docente de informática y tecnología en nivel secundario y superior. Mi experiencia en el aula complementa mi trabajo como desarrollador: transformo conceptos técnicos en explicaciones claras, planifico objetivos y acompaño grupos en la resolución de problemas reales.</p>
          </div>
        </div>
        <div className="teaching-grid">
          {experiences.map((experience) => (
            <article className="teaching-card teaching-reveal" key={experience.institution}>
              <div className="teaching-card-heading">
                <span className="teaching-icon"><TeachingIcon type={experience.icon} /></span>
                <div><h3>{experience.institution}</h3><p className="teaching-role">{experience.role}</p></div>
              </div>
              <h4>Materias y áreas</h4>
              <ul className="teaching-subjects">{experience.areas.map((area) => <li key={area}>{area}</li>)}</ul>
              <p className="teaching-description">{experience.description}</p>
              <div className="teaching-knowledge">
                <h4>Conocimientos y tecnologías</h4>
                <ul className="teaching-tags">{experience.knowledge.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
            </article>
          ))}
        </div>
        <div className="teaching-method teaching-reveal">
          <p className="eyebrow">APRENDER HACIENDO</p>
          <h3>Del concepto al proyecto que funciona.</h3>
          <p>Desarrollo y coordino proyectos educativos con una metodología principalmente práctica: partir de un problema real, planificar una solución, construirla, probarla y mejorarla. Así conecto programación, infraestructura y creatividad tecnológica.</p>
          <div className="teaching-projects">
            {projectAreas.map((area) => <div key={area.title}><TeachingIcon type={area.icon} /><h4>{area.title}</h4><p>{area.tools}</p></div>)}
          </div>
        </div>
        <div className="teaching-transfer teaching-reveal">
          <h3>Lo que llevo del aula a cada proyecto IT</h3>
          <ul>
            <li><strong>Comunicación clara</strong><span>Explicar soluciones complejas y adaptar el lenguaje a cada interlocutor.</span></li>
            <li><strong>Planificación y organización</strong><span>Definir objetivos, preparar actividades y evaluar avances.</span></li>
            <li><strong>Liderazgo de grupos</strong><span>Acompañar equipos, orientar el aprendizaje y promover la colaboración.</span></li>
            <li><strong>Resolución de problemas</strong><span>Analizar fallas, probar alternativas y guiar proyectos tecnológicos hasta una solución.</span></li>
          </ul>
          <a className="text-link" href="#proyectos">Conocé mis proyectos de desarrollo <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>
  )
}
