export default function Profile() {
  return (
    <section id="perfil" className="section wrap profile">
      <div>
        <p className="eyebrow">03 / SOBRE MÍ</p>
        <h2>
          Pablo Luciano
          <br />
          <em>Gamarra.</em>
        </h2>
        <p className="profile-location">
          Desde Argentina, para tu próximo proyecto.
        </p>
        <div className="profile-roles">
          <span>Programador</span>
          <span>Futuro Ingeniero en Informática</span>
          <span>Profesor de programación</span>
        </div>
      </div>
      <div className="profile-story">
        <p className="profile-lead">
          Desarrollo soluciones digitales y comparto lo que sé a través de la
          enseñanza.
        </p>
        <p>
          Soy programador, futuro Ingeniero en Informática y profesor de
          programación de Argentina. Me especializo en desarrollo web,
          aplicaciones y soluciones digitales modernas.
        </p>
        <p>
          He trabajado en la creación de sitios web profesionales, plataformas
          educativas, aulas virtuales y sistemas personalizados. También cuento
          con experiencia enseñando programación y tecnología en los niveles
          secundario y terciario.
        </p>
        <p>
          En cada proyecto busco una solución creativa, funcional y de calidad.
          Me interesa entender lo que necesitás, mantener una comunicación clara
          y acompañar el trabajo con compromiso, desde la primera idea hasta su
          implementación.
        </p>
        <div className="profile-values" aria-label="Mi forma de trabajar">
          <span>Comunicación clara</span>
          <span>Compromiso</span>
          <span>Soluciones a medida</span>
        </div>
        <a className="text-link profile-contact" href="#contacto">
          Contame sobre tu proyecto <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  )
}
