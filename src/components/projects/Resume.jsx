import { useRef } from 'react'

export default function Resume() {
  const dialogRef = useRef(null)
  return (
    <>
      <button className="text-link resume-trigger" type="button" onClick={() => dialogRef.current.showModal()}>
        Consultar CV <span aria-hidden="true">↗</span>
      </button>
      <dialog ref={dialogRef} className="resume-dialog" aria-labelledby="resume-title"
        onClick={event => { if (event.target === event.currentTarget) event.currentTarget.close() }}>
        <div className="resume-content">
          <div className="resume-toolbar">
            <button type="button" className="button secondary" onClick={() => window.print()}>Imprimir / guardar PDF</button>
            <button type="button" className="button secondary" onClick={() => dialogRef.current.close()} autoFocus>Cerrar</button>
          </div>
          <h2 id="resume-title">Pablo Luciano Gamarra</h2>
          <p className="resume-role">Desarrollador web · Profesor de programación · Argentina</p>
          <section><h3>Perfil profesional</h3><p>Programador y futuro Ingeniero en Informática. Desarrollo sitios web profesionales, landing pages, plataformas educativas, aulas virtuales, paneles administrativos y sistemas personalizados. Mi experiencia docente abarca los niveles secundario y superior.</p></section>
          <section><h3>Tecnologías</h3><p>React, JavaScript, HTML, CSS, Bootstrap, PHP, Laravel, MySQL, Moodle, Git y GitHub.</p></section>
          <section><h3>Proyectos propios</h3>
            <h4>Buen Clima</h4><p>Web gastronómica con React y CSS: carta, bebidas y preparación de pedidos para WhatsApp.</p>
            <h4>Sistema de Gestión Escolar</h4><p>Aplicación con Laravel y MySQL para administrar alumnos, calificaciones, asistencias e informes, con permisos para administradores, docentes y estudiantes.</p>
          </section>
          <section><h3>Experiencia docente</h3><dl>
            <dt>Instituto Génesis</dt><dd>Profesor de informática y tecnología.</dd>
            <dt>Instituto San Jorge</dt><dd>Docente de programación, redes y seguridad.</dd>
            <dt>Instituto Espíritu Santo</dt><dd>Docente de programación y mantenimiento de PC.</dd>
            <dt>Educación Superior y capacitaciones</dt><dd>Docente de desarrollo web, programación y herramientas digitales.</dd>
          </dl></section>
          <section><h3>Forma de trabajar</h3><p>Comunicación clara, planificación, compromiso y soluciones a medida. Ideas claras. Sitios con propósito.</p></section>
          <a className="text-link" href="#contacto" onClick={() => dialogRef.current.close()}>Ver datos de contacto <span aria-hidden="true">↗</span></a>
        </div>
      </dialog>
    </>
  )
}
