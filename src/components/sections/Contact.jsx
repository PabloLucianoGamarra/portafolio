import HCaptcha from '@hcaptcha/react-hcaptcha'
import { useContactForm } from '../../hooks/useContactForm'
export default function Contact() {
  const {
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
  } = useContactForm()
  return (
    <section
      id="contacto"
      className="contact wrap"
      aria-labelledby="contact-title"
    >
      <div className="contact-layout">
        <div className="contact-copy">
          <p className="eyebrow">EL PRÓXIMO PROYECTO PUEDE SER EL TUYO</p>
          <h2 id="contact-title">
            ¿Le damos forma
            <br />a <em>tu idea?</em>
          </h2>
          <p>
            Contame qué necesitás, en qué etapa estás y qué te gustaría lograr
            con tu web.
          </p>
          <div className="contact-action">
            <p className="contact-alternative">
              ¿Preferís escribirme directamente?
            </p>
            {!email && (
              <button
                type="button"
                className="button contact-button"
                onClick={revealEmail}
                aria-controls="email-contact"
              >
                Mostrar correo ↗
              </button>
            )}
            <div id="email-contact" aria-live="polite">
              {email && (
                <a
                  className="revealed-email"
                  href={`mailto:${email}?subject=${encodeURIComponent('Consulta por un proyecto web')}`}
                >
                  {email} ↗
                </a>
              )}
            </div>
          </div>
        </div>
        <form
          className="contact-form"
          method="POST"
          onSubmit={submitContact}
          aria-busy={sending}
          aria-label="Consulta por un proyecto web"
          aria-describedby="contact-delivery-note"
        >
          <div className="contact-form-heading">
            <h3>Contame sobre tu proyecto</h3>
            <p>Completá tus datos y te responderé por correo.</p>
          </div>
          <fieldset className="contact-form-fields" disabled={sending}>
            <div className="contact-honeypot" aria-hidden="true">
              <label htmlFor="contact-website">Dejar vacío</label>
              <input
                id="contact-website"
                name="_honey"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
            <div className="contact-fields">
              <div className="contact-field">
                <label htmlFor="contact-name">
                  Tu nombre <span>(obligatorio)</span>
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="¿Cómo te llamás?"
                  required
                  minLength={2}
                  maxLength={100}
                />
              </div>
              <div className="contact-field">
                <label htmlFor="contact-email">
                  Tu correo <span>(obligatorio)</span>
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="nombre@ejemplo.com"
                  required
                  maxLength={254}
                />
              </div>
            </div>
            <div className="contact-field">
              <label htmlFor="contact-service">¿Qué necesitás?</label>
              <select id="contact-service" name="service" defaultValue="">
                <option value="" disabled>
                  Elegí una opción (opcional)
                </option>
                <option>Tienda online</option>
                <option>Página web corporativa</option>
                <option>Desarrollo a medida</option>
                <option>Mejorar una web existente</option>
                <option>Quiero asesoramiento</option>
              </select>
            </div>
            <div className="contact-field">
              <label htmlFor="contact-message">
                Contame tu idea <span>(obligatorio)</span>
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                required
                minLength={20}
                maxLength={5000}
                placeholder="Mi negocio se dedica a… y me gustaría una web que…"
                aria-describedby="contact-message-hint"
              />
              <small id="contact-message-hint">
                Entre 20 y 5.000 caracteres.
              </small>
            </div>
          </fieldset>
          {accessKey ? (
            <div className="contact-captcha">
              <HCaptcha
                ref={captchaRef}
                sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
                reCaptchaCompat={false}
                languageOverride="es"
                size="compact"
                onVerify={handleCaptchaVerify}
                onExpire={handleCaptchaExpire}
                onError={handleCaptchaError}
              />
            </div>
          ) : (
            <p className="contact-delivery-note">
              El formulario todavía no está disponible. Podés escribirme usando
              el correo alternativo.
            </p>
          )}
          <p id="contact-delivery-note" className="contact-delivery-note">
            La verificación y el envío se completan en esta página. hCaptcha
            verifica que no seas un bot y Web3Forms procesa tus datos para
            enviarme la consulta.
          </p>
          <p className="contact-form-error" role="alert">
            {captchaError}
          </p>
          <p className="contact-form-error" role="alert">
            {formError}
          </p>
          <p className="contact-form-success" role="status">
            {formSuccess}
          </p>
          <button
            className="button primary contact-submit"
            type="submit"
            disabled={sending || !accessKey}
          >
            {sending ? 'Enviando…' : 'Enviar consulta'}{' '}
            <span aria-hidden="true">↗</span>
          </button>
        </form>
      </div>
    </section>
  )
}
