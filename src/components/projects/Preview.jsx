import { buenClimaImages, gradeScreenshots } from '../../data/screenshots'
export default function Preview({ id }) {
  if (id === 'buen-clima')
    return buenClimaImages.length > 0 ? (
      <div className="preview grades-real-preview">
        <img
          src={buenClimaImages[0][1]}
          alt="Vista de la web gastronómica Buen Clima"
          loading="lazy"
        />
        <span className="grades-preview-label">Menú, bebidas y pedidos</span>
      </div>
    ) : (
      <div className="preview buen-clima-cover" aria-hidden="true">
        <span>GASTRONOMÍA · WEB RESPONSIVE</span>
        <strong>Buen Clima</strong>
        <p>De la carta a tu próximo pedido.</p>
        <span>MENÚ · BEBIDAS · WHATSAPP</span>
      </div>
    )
  if (id === 'tienda')
    return (
      <div className="preview store-preview" aria-hidden="true">
        <div className="mini-nav">
          <b>objeto.</b>
          <span>Objetos para habitar</span>
          <span>Bolsa (0)</span>
        </div>
        <div className="store-content">
          <div>
            <span className="mini-label">MENOS, PERO MEJOR.</span>
            <h4>
              Lo cotidiano,
              <br />
              <i>extraordinario.</i>
            </h4>
            <span className="mini-link">Explorá la colección ↗</span>
          </div>
          <div className="lamp" />
          <div className="vase" />
        </div>
        <div className="mini-footer">
          DISEÑO CON INTENCIÓN <span>COLECCIÓN 01 — HOGAR</span>
        </div>
      </div>
    )
  if (id === 'empresa')
    return (
      <div className="preview company-preview" aria-hidden="true">
        <div className="mini-nav">
          <b>NORTE®</b>
          <span>Arquitectura & espacios</span>
        </div>
        <div className="architecture">
          <div className="building building-one" />
          <div className="building building-two" />
          <div className="sun" />
        </div>
        <div className="company-caption">
          <h4>
            Espacios para
            <br />
            <i>vivir mejor.</i>
          </h4>
          <span>
            ARQUITECTURA
            <br />
            CON PROPÓSITO ↗
          </span>
        </div>
      </div>
    )
  return (
    <div className="preview grades-real-preview">
      <img
        src={gradeScreenshots[0].src}
        alt="Vista del sistema de calificaciones con notas trimestrales, promedios e instancias finales"
        width={1355}
        height={785}
        loading="lazy"
      />
      <span className="grades-preview-label">3 capturas del sistema</span>
    </div>
  )
}
