import test from 'node:test'
import assert from 'node:assert/strict'
import { sendContact } from '../src/sendContact.js'

const data = () => new Map(Object.entries({ name: ' Ana ', email: 'ana@example.com', message: 'Necesito una web para mi negocio.', _honey: '' }))

test('no llama al proveedor sin CAPTCHA, sin clave o con trampa completa', async () => {
  let calls = 0
  const fetchMock = async () => { calls++; return { ok: true, json: async () => ({ success: true }) } }
  await assert.rejects(sendContact(data(), 'key', '', fetchMock))
  await assert.rejects(sendContact(data(), '', 'token', fetchMock))
  await assert.rejects(sendContact(data().set('_honey', 'bot'), 'key', 'token', fetchMock))
  assert.equal(calls, 0)
})

test('envía el token al proveedor y acepta únicamente éxito confirmado', async () => {
  await sendContact(data(), 'key', 'token', async (url, options) => {
    assert.equal(url, 'https://api.web3forms.com/submit')
    const body = JSON.parse(options.body)
    assert.equal(body['h-captcha-response'], 'token')
    assert.equal(body.access_key, 'key')
    assert.equal(body.name, 'Ana')
    assert.equal(body.redirect, undefined)
    return { ok: true, json: async () => ({ success: true }) }
  })
})

test('propaga rechazo del CAPTCHA, errores HTTP, red y respuestas inválidas', async () => {
  for (const response of [
    { ok: true, json: async () => ({ success: false }) },
    { ok: false, json: async () => ({ success: true }) },
    { ok: true, json: async () => ({}) },
    { ok: true, json: async () => { throw new SyntaxError('Invalid JSON') } },
  ]) {
    await assert.rejects(sendContact(data(), 'key', 'token', async () => response))
  }
  await assert.rejects(sendContact(data(), 'key', 'token', async () => { throw new TypeError('Network error') }))
})
