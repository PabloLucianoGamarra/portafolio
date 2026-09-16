import fs from 'node:fs'
const edit = (path, transform) => fs.writeFileSync(path, transform(fs.readFileSync(path, 'utf8')))
edit('src/data/screenshots.js', s => s.replace(/export const buenClimaImages =[\s\S]*?export const buenClimaScreenshots/, `// Public assets use BASE_URL directly, so development and GitHub Pages share the same paths.
export const buenClimaImages = ['img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg', 'img5.png'].map(name => [name, \`\${import.meta.env.BASE_URL}images/buenClima/\${name}\`])

export const buenClimaScreenshots`))
edit('src/components/sections/Services.jsx', s => s.replace('Una web a la altura\n              <br />\n              de', 'Una web a la altura de'))
edit('src/components/sections/Projects.jsx', s => s.replace('Del concepto\n            <br />a la', 'Del concepto a la'))
for (const file of ['src/styles/App.css', 'src/styles/TeachingExperience.css']) {
  edit(file, s => s.replaceAll('border-radius: 8px', 'border-radius: var(--radius-control)').replaceAll('border-radius: 12px', 'border-radius: var(--radius-media)'))
}
