import './styles/App.css'
import './styles/Experience.css'
import Navigation from './components/layout/Navigation'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import Projects from './components/sections/Projects'
import Services from './components/sections/Services'
import Profile from './components/sections/Profile'
import TeachingExperience from './components/sections/TeachingExperience'
import Contact from './components/sections/Contact'
import Technologies from './components/sections/Technologies'

function App() {
  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <Navigation />
      <main id="contenido">
        <Hero />
        <Profile />
        <Technologies />
        <Services />
        <TeachingExperience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
export default App
