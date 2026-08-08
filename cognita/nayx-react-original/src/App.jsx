import Header from './components/Header'
import Hero from './components/Hero'
import AboutSection from './components/AboutSection'
import ChatButton from './components/ChatButton'

function App() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Header />
      <main id="main-content">
        <Hero />
        <AboutSection />
        {/* Remaining:
            FacilityBanner, WhyChoose, Benefits,
            RequestDemo, HowItWorks, PlatformCard, Footer
        */}
      </main>
      <ChatButton />
    </>
  )
}

export default App
