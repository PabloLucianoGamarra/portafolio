import { useState } from 'react'
import { projects } from '../../data/projects'
import { gradeScreenshots } from '../../data/screenshots'
import Preview from '../projects/Preview'
import ShopDemo from '../projects/ShopDemo'
import BuenClimaDetails from '../projects/BuenClimaDetails'
import ProjectGallery from '../projects/ProjectGallery'

export default function Projects() {
  const [activeProject, setActiveProject] = useState(null)
  return (
    <section id="proyectos" className="section wrap">
      <div className="section-heading">
        <div>
          <p className="eyebrow">01 / PROYECTOS</p>
          <h2>
            Del concepto
            <br />a la <em>pantalla.</em>
          </h2>
        </div>
        <p>
          Proyectos de desarrollo web y conceptos de tiendas online, webs
          corporativas y aplicaciones. Explorá cada tarjeta para conocer su
          alcance y las tecnologías utilizadas.
        </p>
      </div>
      <div className="project-grid">
        {projects.map((project) => (
          <article
            className={`project-card project-${project.id}`}
            key={project.id}
          >
            <Preview id={project.id} />
            <div className="project-meta">
              <span>
                {project.category} / {project.technology}
              </span>
              <span>{project.type}</span>
            </div>
            <h3 className="project-title" id={`title-${project.id}`}>
              {project.name}
            </h3>
            <p>{project.description}</p>
            <button
              className="project-toggle"
              aria-expanded={activeProject === project.id}
              aria-controls={`details-${project.id}`}
              aria-describedby={`title-${project.id}`}
              onClick={() =>
                setActiveProject(
                  activeProject === project.id ? null : project.id,
                )
              }
            >
              <span>
                {activeProject === project.id
                  ? 'Cerrar proyecto'
                  : 'Explorar proyecto'}
              </span>
              <span className="project-toggle-icon" aria-hidden="true">
                +
              </span>
            </button>
            <div
              id={`details-${project.id}`}
              className={`project-details${activeProject === project.id ? ' is-open' : ''}`}
              aria-hidden={activeProject !== project.id}
              inert={activeProject !== project.id}
            >
              <div className="project-details-clip">
                <div className="project-details-content">
                  <p>{project.details}</p>
                  {project.features && (
                    <div className="project-features">
                      <h4>Características principales</h4>
                      <ul>
                        {project.features.map((feature) => (
                          <li key={feature}>{feature}</li>
                        ))}
                      </ul>
                      <h4>Tecnologías utilizadas</h4>
                      <p>{project.technologies.join(', ')}.</p>
                    </div>
                  )}
                  {project.id === 'buen-clima' && <BuenClimaDetails />}
                  {project.id === 'tienda' && <ShopDemo />}
                  {project.id === 'notas' && (
                    <ProjectGallery
                      screenshots={gradeScreenshots}
                      id="grade"
                      title="Recorrido por el sistema"
                    />
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
