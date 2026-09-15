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

export const buenClimaImages = Object.entries(
  import.meta.glob('/public/images/buenClima/*.{png,jpg,jpeg,webp,avif}', {
    eager: true,
    query: '?url',
    import: 'default',
  }),
).sort(([a], [b]) => a.localeCompare(b, 'es', { numeric: true }))

export const buenClimaScreenshots = buenClimaImages.map(([, src], index) => ({
  src,
  title: `Vista ${index + 1}`,
  description: `Captura de la web gastronómica Buen Clima.`,
}))
