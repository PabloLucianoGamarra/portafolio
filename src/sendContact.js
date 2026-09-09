// Require hCaptcha in the Web3Forms dashboard to protect direct API requests too.
export async function sendContact(
  data,
  accessKey,
  captchaToken,
  fetchImpl = fetch,
) {
  if (!accessKey || !captchaToken || data.get('_honey')) {
    throw new Error('Missing configuration, CAPTCHA or invalid submission')
  }
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 20_000)
  try {
    const response = await fetchImpl('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      signal: controller.signal,
      body: JSON.stringify({
        access_key: accessKey,
        name: String(data.get('name') || '').trim(),
        email: String(data.get('email') || '').trim(),
        service: String(data.get('service') || ''),
        message: String(data.get('message') || '').trim(),
        subject: 'Nueva consulta desde el portafolio de Pablo Gamarra',
        botcheck: false,
        'h-captcha-response': captchaToken,
      }),
    })
    const result = await response.json()
    if (!response.ok || result.success !== true)
      throw new Error('Submission rejected')
  } finally {
    clearTimeout(timeout)
  }
}
