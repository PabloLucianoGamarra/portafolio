import { useRef, useState } from 'react'
import { CONTACT_ATTEMPT_KEY, validateContact } from './contactProtection'
import { sendContact } from './sendContact'

export function useContactForm() {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim()
  const [sending, setSending] = useState(false)
  const [formSuccess, setFormSuccess] = useState('')
  const [captchaToken, setCaptchaToken] = useState('')
  const [captchaError, setCaptchaError] = useState('')
  const captchaRef = useRef(null)
  const sendingRef = useRef(false)
  const [email, setEmail] = useState('')
  const [formError, setFormError] = useState('')
  const lastAttemptRef = useRef(0)
  function contactEmail() {
    // Basic obfuscation only; a public client cannot keep an address secret.
    return (
      String.fromCharCode(
        ...[112, 97, 98, 108, 111, 108, 117, 99, 105, 97, 110, 111, 57, 55],
      ) +
      '@' +
      ['outlook', 'com'].join('.')
    )
  }
  async function submitContact(event) {
    event.preventDefault()
    if (sendingRef.current) return
    const form = event.currentTarget
    const data = new FormData(form)
    setFormSuccess('')
    if (!accessKey || !captchaToken) {
      setFormError(
        !accessKey
          ? 'El formulario todavía no está disponible. Podés usar el correo alternativo.'
          : 'Completá el CAPTCHA antes de enviar.',
      )
      return
    }
    let previousAttempt = lastAttemptRef.current
    try {
      previousAttempt = Math.max(
        previousAttempt,
        Number(sessionStorage.getItem(CONTACT_ATTEMPT_KEY)) || 0,
      )
    } catch {
      /* Storage may be unavailable; the in-memory guard remains active. */
    }
    const now = Date.now()
    const error = validateContact(data, previousAttempt, now)
    if (error) {
      event.preventDefault()
      setFormError(error)
      return
    }
    lastAttemptRef.current = now
    try {
      sessionStorage.setItem(CONTACT_ATTEMPT_KEY, String(now))
    } catch {
      /* Do not prevent legitimate contact when storage is disabled. */
    }
    setFormError('')
    sendingRef.current = true
    setSending(true)
    try {
      await sendContact(data, accessKey, captchaToken)
      form.reset()
      setFormSuccess(
        '¡Consulta enviada! Gracias por escribirme. Te responderé al correo que indicaste.',
      )
    } catch {
      setFormError(
        'No pudimos confirmar el envío. Conservamos tus datos. Esperá un minuto y completá nuevamente el CAPTCHA para reintentar, o usá el correo alternativo.',
      )
    } finally {
      setCaptchaToken('')
      captchaRef.current?.resetCaptcha()
      sendingRef.current = false
      setSending(false)
    }
  }
  function revealEmail() {
    setEmail(contactEmail())
  }

  function handleCaptchaVerify(token) {
    setCaptchaToken(token)
    setCaptchaError('')
    setFormError('')
  }

  function handleCaptchaExpire() {
    setCaptchaToken('')
    setCaptchaError('La verificación venció. Completá el CAPTCHA nuevamente.')
  }

  function handleCaptchaError() {
    setCaptchaToken('')
    setCaptchaError(
      'No se pudo cargar o completar el CAPTCHA. Recargá la página o usá el correo alternativo.',
    )
  }

  return {
    accessKey,
    email,
    sending,
    formSuccess,
    formError,
    captchaError,
    captchaRef,
    submitContact,
    revealEmail,
    handleCaptchaVerify,
    handleCaptchaExpire,
    handleCaptchaError,
  }
}
