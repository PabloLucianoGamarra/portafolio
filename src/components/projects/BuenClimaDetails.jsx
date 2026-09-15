import { buenClimaImages, buenClimaScreenshots } from '../../data/screenshots'
import ProjectGallery from './ProjectGallery'
export default function BuenClimaDetails() {
  return (
    <div className="buen-clima-details">
      <h4>De la carta al pedido</h4>
      <ul>
        <li>
          <strong>Menú filtrable.</strong> Permite explorar la propuesta
          gastronómica por categorías y encontrar qué pedir.
        </li>
        <li>
          <strong>Catálogo de bebidas.</strong> Complementa la carta para armar
          el pedido desde un mismo lugar.
        </li>
        <li>
          <strong>Carrito interactivo.</strong> Reúne la selección y calcula
          automáticamente el total para consultar el importe antes de enviar el
          pedido.
        </li>
        <li>
          <strong>Pedidos para WhatsApp.</strong> Genera el pedido a partir del
          carrito y facilita continuar la conversación con el negocio.
        </li>
      </ul>
      <h4>Diseño y desarrollo con propósito</h4>
      <p>
        La identidad visual de marca y el CSS personalizado dan coherencia a la
        presentación del negocio. El diseño responsive adapta el contenido y los
        controles a distintos tamaños de pantalla, acompañando al usuario desde
        la consulta del menú hasta la preparación del pedido.
      </p>
      <p>
        Este proyecto reúne desarrollo de interfaces con React, interacción con
        el catálogo y lógica de carrito aplicada a una necesidad concreta de un
        negocio gastronómico: acercar su oferta y facilitar el contacto para
        realizar un pedido.
      </p>
      {buenClimaImages.length > 0 && (
        <ProjectGallery
          screenshots={buenClimaScreenshots}
          id="buen-clima"
          title="Recorrido por Buen Clima"
        />
      )}
    </div>
  )
}
