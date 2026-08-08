import { useState, useEffect } from 'react'
import heroDoctor from '../assets/images/hero-image-dr.jpg'

export default function Hero() {
  const [fillRate, setFillRate] = useState(0)

  useEffect(() => {
    const target = 98
    const duration = 4500
    const delay = 400
    const intervalTime = 30
    const steps = duration / intervalTime
    const increment = target / steps
    let current = 0

    const timeout = setTimeout(() => {
      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          setFillRate(target)
          clearInterval(timer)
        } else {
          setFillRate(Math.floor(current))
        }
      }, intervalTime)
      return () => clearInterval(timer)
    }, delay)

    return () => clearTimeout(timeout)
  }, [])

  return (
    <section className="hero">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <h1 className="hero__title">
              The Right Healthcare
              Professionals. <br />
              Exactly
              <span> When You Need Them</span>
            </h1>

            <p className="hero__desc">
              Nayx is an AI-powered healthcare workforce platform helping hospitals, clinics, and care facilities fill
              workforce gaps faster through intelligent matching, automation, and real-time provider access.
            </p>

            <div className="hero__buttons">
              <a href="#" className="hero__buttons--link">
                For Facilities
              </a>
              <a href="#" className="hero__buttons--link">
                For Professionals
                <i className="bi bi-arrow-right" />
              </a>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="hero__cards">
              <div className="card-match">
                <div className="card-match__avatar">
                  <img src={heroDoctor} alt="ICU Nurse Profile" loading="lazy" />
                </div>
                <div className="card-match__info">
                  <h3>ICU Nurse,</h3>
                  <p className="location">Austin TX</p>
                  <span className="match-badge">92% Match</span>
                  <div className="status">
                    <span className="status-dot" />
                    <span>Available Tomorrow</span>
                  </div>
                </div>
              </div>

              <div className="hero__cards--bottom">
                <div className="hero__cards--left">
                  <div className="card-stat card-stat--dark">
                    <div className="card-stat__icon">
                      <i className="bi bi-people-fill" />
                    </div>
                    <div className="card-stat__content">
                      <h2>12</h2>
                      <p>
                        Shifts Filled
                        <br />
                        Today
                      </p>
                    </div>
                  </div>

                  <div className="card-stat card-stat--ring">
                    <div className="card-stat__content">
                      <h2>{fillRate}%</h2>
                      <p>Fill Rate</p>
                    </div>
                    <div className="ring-chart">
                      <svg viewBox="0 0 36 36">
                        <path
                          className="circle-bg"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className="circle"
                          strokeDasharray="98, 100"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="hero__cards--right">
                  <div className="card-stat card-stat--graph">
                    <div className="card-stat__content">
                      <h2>24</h2>
                      <p>
                        Providers
                        <br />
                        Available
                      </p>
                    </div>
                    <div className="graph-svg">
                      <svg viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M0 35 L20 28 L40 32 L65 18 L80 24 L100 8 V40 H0 Z"
                          fill="url(#blue-gradient)"
                          opacity="0.25"
                        />
                        <path
                          d="M0 35 L20 28 L40 32 L65 18 L80 24 L100 8"
                          stroke="#2563eb"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                        <defs>
                          <linearGradient id="blue-gradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#2563eb" />
                            <stop offset="100%" stopColor="#ffffff" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
