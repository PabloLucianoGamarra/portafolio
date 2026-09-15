import Resume from '../projects/Resume'

export default function Hero() {
  return (
    <section id="inicio" className="hero wrap" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow">PABLO LUCIANO GAMARRA</p>
        <h1 id="hero-title">Desarrollo web.<br /><em>Con propósito.</em></h1>
        <p className="hero-description">
          Desarrollador web, futuro Ingeniero en Informática y profesor de programación.
          Creo sitios, tiendas y plataformas educativas con React, Laravel y MySQL.
        </p>
        <div className="hero-actions">
          <a className="button primary" href="#proyectos">Ver proyectos <span aria-hidden="true">↗</span></a>
          <a className="button secondary" href="#contacto">Contactarme</a>
          <Resume />
        </div>
      </div>
      <figure className="hero-portrait">
        <div className="portrait-frame">
          <img className="portrait-image" src={`${import.meta.env.BASE_URL}images/perfil.jpg`}
            alt="Pablo Luciano Gamarra en su espacio de trabajo" width="1086" height="1448" fetchPriority="high" />
        </div>
        <figcaption className="portrait-caption">Desarrollo web freelance <span>Argentina</span></figcaption>
      </figure>
    </section>
  )
}
