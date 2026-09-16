# Revisión del portafolio

## Dirección

Skill aplicada: `design-taste-frontend`. Diseño minimalista profesional para clientes freelance y reclutadores, con desarrollo y docencia como perfiles complementarios. Valores: DESIGN_VARIANCE 6, MOTION_INTENSITY 3, VISUAL_DENSITY 4.

Se conserva React, Vite y CSS nativo, el azul existente, los temas claro y oscuro, las siete secciones y sus anclas. Sin dependencias nuevas de aplicación ni imágenes generadas: se utilizan el retrato y los proyectos originales.

## Auditoría inicial

- Ya existían navegación móvil accesible, enlace para saltar al contenido, modo oscuro, galerías y CV modal. Se preservaron.
- La portada comunicaba desarrollo, pero su título no reflejaba la trayectoria docente.
- La experiencia docente desplegaba toda la información y ocupaba aproximadamente 2113 px a 1366 px de ancho, retrasando el acceso a los proyectos.
- Tecnologías con muchas cajas, encabezados con saltos forzados y servicios con composiciones inconsistentes aumentaban la carga visual.
- Las imágenes de Buen Clima se importaban desde `public` con un glob, generando referencias de desarrollo con `/public/` y copias adicionales en el build.
- No se detectó desbordamiento horizontal en los cinco anchos iniciales. No se atribuye al rediseño una corrección de desbordamiento preexistente.

## Cambios

- Hero y Profile: mensaje explícito de desarrollo y educación, redistribución de retrato y texto, conservación de la propuesta profesional.
- Resume: botón visible de consulta; se mantiene el diálogo y la opción de imprimir o guardar PDF.
- Services: filas con título, descripción y acción, conservando los tres servicios y el proceso de trabajo.
- TeachingExperience: instituciones y roles visibles; materias, descripciones y conocimientos en elementos `details` nativos accesibles por teclado. La altura inicial baja a aproximadamente 1575 px en el mismo ancho.
- Projects: mayor jerarquía para los dos proyectos propios y proporciones diferentes para las demos. Se conserva el orden, las galerías, las descripciones y la tienda interactiva.
- Contact, Profile, Services y Projects: secciones nombradas mediante `aria-labelledby`.
- CSS: espaciado, radios compartidos, tecnologías sin cajas repetidas, adaptación móvil y transiciones de interacción respetando movimiento reducido.
- screenshots.js: URL pública consistente con BASE_URL y sin duplicar imágenes en assets.

## Archivos de aplicación modificados

- `src/components/sections/Hero.jsx`
- `src/components/sections/Profile.jsx`
- `src/components/sections/Services.jsx`
- `src/components/sections/Projects.jsx`
- `src/components/sections/TeachingExperience.jsx`
- `src/components/sections/Contact.jsx`
- `src/components/projects/Resume.jsx`
- `src/components/layout/Navigation.jsx`
- `src/data/screenshots.js`
- `src/styles/index.css`
- `src/styles/App.css`
- `src/styles/TeachingExperience.css`

## Verificación

- `npm.cmd run build`: correcto.
- `npm.cmd run lint`: correcto.
- `node --test tests/contactProtection.test.js tests/sendContact.test.js`: 8 pruebas correctas. El proveedor está simulado; no se enviaron mensajes reales.
- Chrome: anchos 320, 375, 768, 1024 y 1366 px, sin desbordamiento horizontal.
- Chrome: apertura de CV y proyectos, filtro de tienda, agregar y vaciar carrito, correo alternativo, validación de campos, selector de tema, detalles docentes y cambio de captura escolar correctos.
- Menú móvil: apertura, cierre con Escape y devolución del foco correctos.
- Sin excepciones JavaScript ni entradas de error de consola detectadas durante ese recorrido local.
- Imágenes visibles cargadas correctamente. Las imágenes diferidas ocultas no se clasifican como rotas antes de ser solicitadas.

La lógica de Web3Forms y hCaptcha no fue modificada. La resolución humana del CAPTCHA y la recepción real de correo deben comprobarse desde el dominio publicado; las pruebas locales no certifican esos servicios externos. La impresión del CV se conserva, pero no se automatizó el diálogo del sistema para guardar PDF.

### Lighthouse

Medición móvil simulada sobre el build servido con Vite Preview: rendimiento 72/100, accesibilidad 100/100 y SEO 100/100. Son resultados de laboratorio local, no mediciones de usuarios reales ni una certificación de accesibilidad. El retrato original de aproximadamente 2 MB es el principal recurso mejorable; se conserva sin alterar la imagen. hCaptcha aporta advertencias de cookies de terceros y APIs obsoletas. El informe completo queda en `lighthouse-production.json`. Se corrigió también la coincidencia entre el texto visible del enlace de marca y su etiqueta accesible, incluyendo el monograma.

## Ejecutar

```sh
npm install
npm run dev
npm run lint
npm run build
npm run preview
node --test tests/contactProtection.test.js tests/sendContact.test.js
```

En PowerShell se puede usar `npm.cmd`. La URL de desarrollo es `http://localhost:5173/portafolio/`. Se conserva la base `/portafolio/`.

Las capturas `after-*.png` y `after-checks.json` documentan el resultado local. `browser-audit.mjs` utiliza el protocolo de depuración de Chrome en el puerto 9222 y el servidor de desarrollo en el puerto 5173. Los scripts `implement-design.mjs` y `finalize-design.mjs` son registros de las ediciones realizadas, no comandos de instalación ni tareas que deban volver a ejecutarse.
