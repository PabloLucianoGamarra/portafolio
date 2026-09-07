# Portafolio de Pablo Luciano Gamarra

Sitio en React y Vite orientado a servicios freelance de e-commerce y páginas corporativas.

## Desarrollo

```sh
npm install
npm run dev
```

En PowerShell, si la política de ejecución bloquea npm.ps1, usar `npm.cmd` en lugar de `npm`.

## Verificación y producción

```sh
npm run lint
npm run build
npm run preview
```

La compilación genera `dist/`, que puede publicarse en un alojamiento estático.

## Contenido

- `src/App.jsx`: presentación, servicios, contacto y proyectos.
- `src/App.css` y `src/index.css`: estilos adaptables a móviles.
- `index.html`: título y descripción para buscadores.
- Objeto: demo ficticia de tienda, con categorías y carrito en memoria. Sin cobros, pedidos ni persistencia; el carrito se conserva al cerrar y reabrir la demo; recargar la página lo reinicia.
- Norte: concepto visual para una empresa ficticia. No es una web corporativa completa ni un trabajo para un cliente.
- Sistema de calificaciones: proyecto propio en Laravel, con tres capturas reales en `public/images/sistemasCalificaciones/`. La galería muestra calificaciones finales, administración de usuarios y gestión de materias, con apertura en tamaño completo.

## Contacto y spam

El formulario envía por POST a FormSubmit y está dirigido a `pabloluciano97@outlook.com`. Incluye nombre, correo del visitante, tipo de proyecto opcional y mensaje. FormSubmit usa el campo `email` para poder responder al remitente.

El CAPTCHA de FormSubmit se solicita explícitamente con `_captcha=true` y se conserva el campo trampa `_honey`. Se validan correo, longitudes y contenido vacío. Se limita a un intento por minuto en la misma pestaña mediante sessionStorage, con respaldo en memoria si el almacenamiento está deshabilitado. Se guarda únicamente la hora del intento; el contador incluye intentos cuya entrega falle y permite reintentar después de un minuto. Estos controles del navegador se pueden eludir: no son un límite por IP ni reemplazan la verificación del proveedor. La protección no garantiza eliminar todo el spam. Pruebas locales: `node --test tests/contactProtection.test.js`.

### Activación necesaria

1. Abrir el sitio mediante `npm run dev` o desde su URL pública.
2. Completar el formulario con una consulta de prueba y continuar a FormSubmit.
3. Resolver su verificación antispam.
4. Abrir el mensaje de activación recibido en Outlook y confirmar la dirección (revisar también correo no deseado).
5. Enviar una nueva consulta de prueba y verificar su recepción antes de publicar el formulario como operativo.

La dirección se reconstruye al enviar o al mostrar el correo alternativo. Esto solo dificulta la recolección automática básica: el código del navegador es público. FormSubmit proporciona un identificador alternativo después de confirmar la dirección; se puede utilizar en el endpoint para evitar incluir el correo.

Los visitantes salen del sitio para completar la verificación y ver la confirmación del proveedor. El formulario informa que FormSubmit procesa sus datos. El sitio no afirma que un mensaje llegó al buzón antes de verificarlo, no incluye credenciales y no cambia los filtros de Outlook.

Documentación: https://formsubmit.co/documentation
## Pendiente de contenido

Agregar el enlace del sistema si corresponde. Antes de publicar, preparar copias anonimizadas de las capturas: actualmente incluyen nombres, notas y datos de usuarios. Las propuestas ficticias están identificadas como tales. No se publicaron el sitio ni las demos en servicios externos.




