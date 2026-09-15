const technologyGroups = [
  { title: 'Interfaces web', items: ['React', 'JavaScript', 'HTML', 'CSS', 'Bootstrap'] },
  { title: 'Sistemas y datos', items: ['PHP', 'Laravel', 'MySQL'] },
  { title: 'Educación y colaboración', items: ['Moodle', 'Git', 'GitHub'] },
]

export default function Technologies() {
  return (
    <section id="tecnologias" className="technologies section wrap" aria-labelledby="technologies-title">
      <div className="section-heading">
        <h2 id="technologies-title">Tecnologías que uso</h2>
        <p>Herramientas para construir interfaces, organizar información y acompañar el aprendizaje.</p>
      </div>
      <div className="technology-groups">
        {technologyGroups.map(({ title, items }) => (
          <div className="technology-group" key={title}>
            <h3>{title}</h3>
            <ul>{items.map(item => <li key={item}>{item}</li>)}</ul>
          </div>
        ))}
      </div>
    </section>
  )
}
