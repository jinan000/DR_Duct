import { useState, useEffect, useCallback } from 'react';
import MobileMenu from './MobileMenu';
import logo from '../../assets/images/logo.png';
import './Header.css';
const NAV_ITEMS = [
  { label: 'HOME', href: '#home', active: true },
  { label: 'SERVICES', href: '#services', active: false },
  { label: 'INDUSTRIES', href: '#industries', active: false },
  { label: 'ABOUT', href: '#about', active: false },
  { label: 'CONTACT', href: '#contact', active: false },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  return (
    <>
      <header
        id="site-header"
        className={`header ${scrolled ? 'header--scrolled' : ''}`}
        role="banner"
      >
        <div className="header__inner">
          {/* Logo */}
          <a href="#home" className="header__logo" aria-label="DR. DUCT UK LTD — Home">
            <img src={logo} alt="DR. DUCT UK LTD Logo" className="header__logo-image" />
          </a>

          {/* Desktop Navigation */}
          <nav className="header__nav" aria-label="Main navigation">
            <ul className="header__nav-list">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className={`header__nav-link text-nav ${item.active ? 'header__nav-link--active' : ''}`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile: Hamburger Button */}
          <div className="header__mobile-actions">
            <button
              id="hamburger-btn"
              className={`hamburger ${menuOpen ? 'hamburger--active' : ''}`}
              onClick={toggleMenu}
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-menu"
            >
              <span className="hamburger__line" />
              <span className="hamburger__line" />
              <span className="hamburger__line" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={menuOpen}
        onClose={closeMenu}
        navItems={NAV_ITEMS}
      />
    </>
  );
}
