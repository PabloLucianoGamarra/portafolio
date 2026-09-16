import fs from 'node:fs'
const path = 'src/components/layout/Navigation.jsx'
fs.writeFileSync(path, fs.readFileSync(path, 'utf8').replace('aria-label="Pablo Gamarra, desarrollo web. Inicio"', 'aria-label="pg Pablo Gamarra desarrollo web, inicio"'))
