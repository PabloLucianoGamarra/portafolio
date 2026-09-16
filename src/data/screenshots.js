export const gradeScreenshots = [
  {
    src: `${import.meta.env.BASE_URL}images/sistemasCalificaciones/pagina1.png`,
    title: 'Calificaciones finales',
    description: 'Notas por trimestre, promedios e instancias finales.',
    width: 1355,
    height: 785,
  },
  {
    src: `${import.meta.env.BASE_URL}images/sistemasCalificaciones/pagina2.png`,
    title: 'Administración de usuarios',
    description: 'Listado de personal, búsqueda de usuarios y roles.',
    width: 1365,
    height: 785,
  },
  {
    src: `${import.meta.env.BASE_URL}images/sistemasCalificaciones/pagina3.png`,
    title: 'Gestión de materias',
    description: 'Materias, docentes y filtros por ciclo lectivo.',
    width: 1365,
    height: 769,
  },
]

// Public assets use BASE_URL directly, so development and GitHub Pages share the same paths.
export const buenClimaImages = [
  'img1.jpg',
  'img2.jpg',
  'img3.jpg',
  'img4.jpg',
  'img5.png',
].map((name) => [name, `${import.meta.env.BASE_URL}images/buenClima/${name}`])

export const buenClimaScreenshots = buenClimaImages.map(([, src], index) => ({
  src,
  title: `Vista ${index + 1}`,
  description: `Captura de la web gastronómica Buen Clima.`,
}))
