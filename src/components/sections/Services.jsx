import ProjectProcess from './ProjectProcess'

export default function Services() {
  return (
    <section id="servicios" className="services">
      <div className="wrap section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">02 / SERVICIOS</p>
            <h2>
              Una web a la altura
              <br />
              de <em>tu idea.</em>
            </h2>
          </div>
          <p>
            Un punto de partida para tu proyecto. Definimos juntos las
            funcionalidades que necesita tu negocio.
          </p>
        </div>
        <div className="service-grid">
          <article>
            <span className="service-icon">↗</span>
            <span className="service-number">01</span>
            <h3>Tiendas online</h3>
            <p>
              Una propuesta para presentar tu catálogo y diseñar una experiencia
              de compra clara, desde el producto hasta el carrito.
            </p>
            <span className="service-foot">TU CATÁLOGO, EN DIGITAL</span>
            <a className="text-link service-link" href="#contacto">
              Consultar por este servicio <span aria-hidden="true">↗</span>
            </a>
          </article>
          <article>
            <span className="service-icon">▦</span>
            <span className="service-number">02</span>
            <h3>Webs corporativas</h3>
            <p>
              Un lugar propio para contar quién sos, mostrar tus servicios y
              facilitar que nuevos clientes conozcan tu negocio.
            </p>
            <span className="service-foot">UNA PRESENCIA CON IDENTIDAD</span>
            <a className="text-link service-link" href="#contacto">
              Consultar por este servicio <span aria-hidden="true">↗</span>
            </a>
          </article>
          <article>
            <span className="service-icon">⌘</span>
            <span className="service-number">03</span>
            <h3>Desarrollo a medida</h3>
            <p>
              Definimos las funcionalidades y evaluamos las herramientas
              adecuadas según los objetivos, el presupuesto y el alcance de tu
              proyecto.
            </p>
            <span className="service-foot">UNA SOLUCIÓN PARA TU IDEA</span>
            <a className="text-link service-link" href="#contacto">
              Consultar por este servicio <span aria-hidden="true">↗</span>
            </a>
          </article>
        </div>
        <ProjectProcess />
      </div>
    </section>
  )
}
