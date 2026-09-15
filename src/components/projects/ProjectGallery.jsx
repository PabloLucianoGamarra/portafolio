import { useState } from 'react'
export default function ProjectGallery({ screenshots, id, title }) {
  const [selected, setSelected] = useState(0)
  const screenshot = screenshots[selected]
  return (
    <div className="grades-gallery">
      <h4>{title}</h4>
      <div
        className="gallery-options"
        role="group"
        aria-label={`Elegir captura: ${title}`}
      >
        {screenshots.map((item, index) => (
          <button
            type="button"
            key={item.src}
            aria-pressed={index === selected}
            onClick={() => setSelected(index)}
            aria-controls={`${id}-screenshot`}
          >
            {index + 1}. {item.title}
          </button>
        ))}
      </div>
      <figure id={`${id}-screenshot`} className="gallery-figure">
        <a
          href={screenshot.src}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Abrir ${screenshot.title} en tamaño completo (nueva pestaña)`}
        >
          <img
            src={screenshot.src}
            alt={`${screenshot.title}: ${screenshot.description}`}
            width={screenshot.width}
            height={screenshot.height}
            loading="lazy"
          />
        </a>
        <figcaption aria-live="polite">
          <strong>{screenshot.title}</strong>
          <p>{screenshot.description}</p>
        </figcaption>
      </figure>
      <a
        className="gallery-full-size"
        href={screenshot.src}
        target="_blank"
        rel="noopener noreferrer"
      >
        Ver en tamaño completo <span aria-hidden="true">↗</span>
        <span className="gallery-new-tab"> (nueva pestaña)</span>
      </a>
    </div>
  )
}
