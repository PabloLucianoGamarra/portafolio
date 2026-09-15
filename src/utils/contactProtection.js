export const CONTACT_COOLDOWN_MS = 60_000
export const CONTACT_ATTEMPT_KEY = 'portfolio:contact:last-attempt'

// Browser-side friction only; these checks can be bypassed by direct requests.
// Web3Forms validates hCaptcha server-side when required in its dashboard.
export function validateContact(data, lastAttempt = 0, now = Date.now()) {
  if (String(data.get('_honey') || '').length) {
    return 'No se pudo enviar. Podés usar el correo de contacto alternativo.'
  }
  const name = String(data.get('name') || '').trim()
  const email = String(data.get('email') || '').trim()
  const message = String(data.get('message') || '').trim()
  if (
    name.length < 2 ||
    name.length > 100 ||
    message.length < 20 ||
    message.length > 5000
  ) {
    return 'Ingresá un nombre de 2 a 100 caracteres y un mensaje de 20 a 5.000 caracteres.'
  }
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return 'Revisá tu dirección de correo electrónico.'
  }
  if (
    lastAttempt > 0 &&
    now >= lastAttempt &&
    now - lastAttempt < CONTACT_COOLDOWN_MS
  ) {
    const seconds = Math.ceil(
      (CONTACT_COOLDOWN_MS - (now - lastAttempt)) / 1000,
    )
    return `Esperá ${seconds} segundos antes de volver a enviar. Si el envío anterior falló, podrás reintentarlo después.`
  }
  return ''
}
