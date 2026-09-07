const THEME_KEY = 'portfolio:theme'

export function applyTheme(theme) {
  document.documentElement.dataset.theme = theme
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.content = theme === 'dark' ? '#0b1724' : '#147eb5'
}

export function initializeTheme() {
  let theme
  try { theme = localStorage.getItem(THEME_KEY) } catch { /* Storage is optional. */ }
  if (theme !== 'light' && theme !== 'dark') {
    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  applyTheme(theme)
}

export function saveTheme(theme) {
  applyTheme(theme)
  try { localStorage.setItem(THEME_KEY, theme) } catch { /* The toggle still works without storage. */ }
}
