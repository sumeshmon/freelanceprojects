import { useEffect, useRef, useState } from 'react'
import teamImg from '../assets/images/path-to-team-image.jpg'
import dashboardImg from '../assets/images/path-to-dashboard-image.jpg'
import handshakeImg from '../assets/images/path-to-handshake-image.jpg'

function useCountUp(target, start) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!start) return

    const duration = 2000
    const startTime = performance.now()

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const current = Math.floor(easeOut * target)

      if (current >= 1000 && progress === 1) {
        setValue(Math.round(current / 1000) + 'K')
      } else {
        setValue(current.toLocaleString())
      }

      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [start, target])

  return value
}

export default function AboutSection() {
  const sectionRef = useRef(null)
  const [inView, setInView] = useState(false)

  const professionals = useCountUp(10000, inView)
  const organizations = useCountUp(500, inView)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.4 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="about-section" id="about">
      <div className="dot-grid top-left" />
      <div className="dot-grid bottom-right" />
      <div className="circle-accent" />

      <div className="container">
        <div className="image-grid">
          <div className="img-large">
            <img src={teamImg} alt="Medical team using digital tablet" />
          </div>
          <div className="img-small top">
            <img src={dashboardImg} alt="Workforce command center dashboard" />
          </div>
          <div className="img-small bottom">
            <img src={handshakeImg} alt="Nayx interview and handshake" />
          </div>
        </div>

        <div className="content-wrapper">
          <span className="sub-title">Who we are</span>
          <h2 className="main-title">
            Transforming Healthcare <br />
            <span className="highlight">Workforce Connectivity</span>
          </h2>

          <p className="description">
            Nayx is transforming how healthcare organizations connect with clinical talent. <br />
            By combining artificial intelligence, workforce automation, and real-time provider availability, Nayx helps
            hospitals, clinics, healthcare systems, and care facilities quickly identify and engage the right
            professionals when they need them most.
          </p>

          <div className="stats-card" id="statsSection" ref={sectionRef}>
            <div className="stat-item">
              <div className="icon-box">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div className="stat-value">
                <span className="counter">{professionals || 0}</span>+
              </div>
              <div className="stat-label">Healthcare Professionals</div>
              <div className="pulse-line" />
            </div>

            <div className="stat-divider" />

            <div className="stat-item">
              <div className="icon-box">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
                  <line x1="9" y1="6" x2="9" y2="6.01" />
                  <line x1="15" y1="6" x2="15" y2="6.01" />
                  <line x1="9" y1="10" x2="9" y2="10.01" />
                  <line x1="15" y1="10" x2="15" y2="10.01" />
                  <line x1="9" y1="14" x2="9" y2="14.01" />
                  <line x1="15" y1="14" x2="15" y2="14.01" />
                  <line x1="9" y1="18" x2="15" y2="18" />
                </svg>
              </div>
              <div className="stat-value">
                <span className="counter">{organizations || 0}</span>+
              </div>
              <div className="stat-label">Healthcare Organizations</div>
              <div className="pulse-line" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
