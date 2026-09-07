import test from 'node:test'
import assert from 'node:assert/strict'
import { validateContact, CONTACT_COOLDOWN_MS } from '../src/contactProtection.js'

function contact(overrides = {}) {
  return new Map(Object.entries({ name: 'Ana Pérez', email: 'ana@example.com', message: 'Necesito una tienda para mi negocio.', _honey: '', ...overrides }))
}

test('permite consultas válidas, incluyendo enlaces y nombres internacionales', () => {
  assert.equal(validateContact(contact({ name: '李明', message: 'Mi referencia es https://example.com y busco una web similar.' })), '')
})
test('rechaza la trampa incluso si contiene solamente espacios', () => {
  assert.notEqual(validateContact(contact({ _honey: ' ' })), '')
})
test('rechaza campos vacíos, excesivos y correos inválidos', () => {
  for (const input of [{ name: '   ' }, { name: 'a'.repeat(101) }, { message: ' '.repeat(30) }, { message: 'a'.repeat(5001) }, { email: 'no-es-un-correo' }]) {
    assert.notEqual(validateContact(contact(input)), '')
  }
})
test('frena intentos repetidos y permite reintentar al cumplir el minuto', () => {
  const previous = 100_000
  assert.match(validateContact(contact(), previous, previous + 1000), /59 segundos/)
  assert.equal(validateContact(contact(), previous, previous + CONTACT_COOLDOWN_MS), '')
})
test('un reloj cambiado o una marca inválida no bloquean permanentemente', () => {
  assert.equal(validateContact(contact(), 200_000, 100_000), '')
  assert.equal(validateContact(contact(), NaN), '')
})
