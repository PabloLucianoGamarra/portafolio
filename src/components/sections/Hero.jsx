export default function Hero() {
  return (
    <section id="inicio" className="hero wrap">
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="status-dot" /> DESARROLLO WEB FREELANCE
        </p>
        <h1>
          Tu negocio.
          <br />
          Su próxima
          <br />
          <em>versión digital.</em>
        </h1>
        <p className="hero-description">
          Soy Pablo Luciano Gamarra. Creo tiendas online, páginas corporativas y
          soluciones web a medida para las necesidades de tu negocio.
        </p>
        <div className="hero-actions">
          <a className="button primary" href="#proyectos">
            Explorar proyectos <span>↗</span>
          </a>
          <a className="text-link" href="#contacto">
            Hablemos de tu idea <span>→</span>
          </a>
        </div>
        <div className="tech-line">
          <span>MI ENFOQUE</span>
          <b>Tu negocio</b>
          <span className="tech-divider" />
          <b>Tu solución web</b>
        </div>
      </div>
      <div className="hero-portrait">
        <div className="portrait-frame">
          <img
            className="portrait-image"
            src={`${import.meta.env.BASE_URL}images/perfil.jpg`}
            alt="Pablo Luciano Gamarra en su espacio de trabajo"
            width="1086"
            height="1448"
            fetchPriority="high"
          />
        </div>
        <span className="portrait-spark" aria-hidden="true">
          ✳
        </span>
        <div className="portrait-caption">
          <span className="status-dot" aria-hidden="true" />
          <span>
            Pablo Luciano Gamarra<small>Desarrollo web freelance</small>
          </span>
        </div>
      </div>
    </section>
  )
}
