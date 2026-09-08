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

El formulario usa Web3Forms con hCaptcha dentro de la página, compatible con GitHub Pages. Envía por AJAX y muestra el resultado sin redirigir. El token se valida en Web3Forms; es obligatorio habilitar hCaptcha en su panel para proteger también las peticiones directas a la API.

Conserva la trampa para bots y el límite local de un intento por minuto. No permite enviar sin CAPTCHA, elimina el token después de cada intento y bloquea envíos simultáneos. Ante errores conserva los campos. La confirmación indica aceptación del proveedor; comprobar la recepción real en el buzón.

### Activación necesaria

1. Crear un formulario en https://web3forms.com/ para `pabloluciano97@outlook.com`, confirmar el correo y obtener su Access Key.
2. En el panel del formulario, activar hCaptcha como CAPTCHA obligatorio. No basta con mostrar el widget en React.
3. Copiar `.env.example` a `.env.local` y completar `VITE_WEB3FORMS_ACCESS_KEY=tu_access_key`. Reiniciar Vite. Sin clave, el formulario queda deshabilitado y ofrece el correo alternativo.
4. Resolver el CAPTCHA y probar el envío desde el dominio publicado. Comprobar que llega a Outlook y que el proveedor rechaza solicitudes sin token o con token inválido.

La Access Key está diseñada para usarse en el navegador y aparecerá en la compilación. No introducir contraseñas de Outlook ni secretos de hCaptcha en variables VITE_. Se utiliza la sitekey pública de hCaptcha documentada por Web3Forms para su integración gratuita.

### GitHub Pages

Si compilás localmente, `.env.local` se carga durante `npm run build`; publicar el contenido de `dist/`. Si compilás con GitHub Actions, crear una variable del repositorio llamada `VITE_WEB3FORMS_ACCESS_KEY` y pasarla al paso de compilación:

```yaml
- run: npm run build
  env:
    VITE_WEB3FORMS_ACCESS_KEY: ${{ vars.VITE_WEB3FORMS_ACCESS_KEY }}
```

Volver a compilar y desplegar después de cambiar la clave. La base de Vite es `/portafolio/`; debe coincidir con el nombre del repositorio de Pages.

Pruebas locales: `node --test tests/contactProtection.test.js tests/sendContact.test.js`. No envían correos reales.

Documentación: https://docs.web3forms.com/getting-started/customizations/spam-protection/hcaptcha
## Pendiente de contenido

Agregar el enlace del sistema si corresponde. Antes de publicar, preparar copias anonimizadas de las capturas: actualmente incluyen nombres, notas y datos de usuarios. Las propuestas ficticias están identificadas como tales. No se publicaron el sitio ni las demos en servicios externos.




