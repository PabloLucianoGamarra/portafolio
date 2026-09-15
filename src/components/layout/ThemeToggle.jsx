import { useState } from 'react'
import { saveTheme } from '../../utils/theme'
export default function ThemeToggle() {
  const [theme, setTheme] = useState(
    () => document.documentElement.dataset.theme || 'light',
  )
  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark'
    saveTheme(next)
    setTheme(next)
  }
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label="Tema oscuro"
      aria-pressed={theme === 'dark'}
      title={
        theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'
      }
    >
      <span aria-hidden="true">{theme === 'dark' ? '☀' : '☾'}</span>
      <span className="theme-label">
        {theme === 'dark' ? 'Claro' : 'Oscuro'}
      </span>
    </button>
  )
}
