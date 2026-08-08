import { useState, useEffect } from 'react'
import logo from '../assets/images/logo.png'

const navItems = [
  { label: 'Home', href: '#', active: true },
  { label: 'For Professionals', href: '#' },
  { label: 'For Facilities', href: '#' },
  { label: 'About', href: '#about' },
  { label: 'How It Works', href: '#how-it-works' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onClickOutside = (e) => {
      if (menuOpen && !e.target.closest('.navbar')) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('click', onClickOutside)
    return () => document.removeEventListener('click', onClickOutside)
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={`header fixed-top${scrolled ? ' scrolled' : ''}`}>
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <a className="navbar-brand navbar__logo" href="#">
            <img src={logo} alt="NAYX - Intelligence Behind Every Shift" />
          </a>

          <button
            className="navbar-toggler"
            type="button"
            aria-controls="navbar"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
            onClick={(e) => {
              e.stopPropagation()
              setMenuOpen((v) => !v)
            }}
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className={`collapse navbar-collapse${menuOpen ? ' show' : ''}`} id="navbar">
            <ul className="navbar-nav ms-auto align-items-lg-center">
              {navItems.map((item) => (
                <li className="nav-item" key={item.label}>
                  <a
                    className={`nav-link${item.active ? ' active' : ''}`}
                    href={item.href}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="nav-item ms-lg-3">
                <button type="button" className="btn btn-gradient" onClick={closeMenu}>
                  Request Demo
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}
