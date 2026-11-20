import React, { useEffect, useCallback } from 'react';
import QuoteButton from '../ui/QuoteButton';
import logo from '../../assets/images/logo.png';
import { useSmoothScroll } from '../../context/SmoothScroll';
import './MobileMenu.css';

interface NavItem {
  label: string;
  href: string;
  active: boolean;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
}

export default function MobileMenu({ isOpen, onClose, navItems }: MobileMenuProps) {
  const { scrollTo, stop, start } = useSmoothScroll();

  // Lock body scroll and pause Lenis smoothly when menu is open
  useEffect(() => {
    if (isOpen) {
      stop();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      start();
    }
    return () => {
      document.body.style.overflow = '';
      start();
    };
  }, [isOpen, stop, start]);

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  const handleLinkClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    onClose();
    // Allow drawer to start closing before executing smooth scroll
    setTimeout(() => {
      scrollTo(href, { offset: -60 });
    }, 150);
  }, [onClose, scrollTo]);

  const handleQuoteClick = useCallback(() => {
    onClose();
    setTimeout(() => {
      scrollTo('#contact', { offset: -40 });
    }, 150);
  }, [onClose, scrollTo]);

  return (
    <div
      id="mobile-nav-menu"
      className={`mobile-menu ${isOpen ? 'mobile-menu--open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
    >
      {/* Background overlay */}
      <div className="mobile-menu__backdrop" onClick={onClose} aria-hidden="true" />

      <div className="mobile-menu__panel">
        {/* Header inside drawer */}
        <div className="mobile-menu__top">
          <img src={logo} alt="DR. DUCT UK LTD Logo" className="mobile-menu__logo" />
          <button
            type="button"
            className="mobile-menu__close"
            onClick={onClose}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <nav className="mobile-menu__nav" aria-label="Mobile navigation">
          <ul className="mobile-menu__list">
            {navItems.map((item, index) => (
              <li
                key={item.label}
                className="mobile-menu__item"
                style={{ animationDelay: `${150 + index * 60}ms` }}
              >
                <a
                  href={item.href}
                  className={`mobile-menu__link ${item.active ? 'mobile-menu__link--active' : ''}`}
                  onClick={(e) => handleLinkClick(e, item.href)}
                >
                  <span className="mobile-menu__link-number">{String(index + 1).padStart(2, '0')}</span>
                  <span className="mobile-menu__link-text">{item.label}</span>
                  {item.active && <span className="mobile-menu__link-dot" aria-hidden="true" />}
                </a>
              </li>
            ))}
          </ul>

          <div className="mobile-menu__cta" style={{ animationDelay: '450ms' }}>
            <QuoteButton
              id="mobile-menu-quote-btn"
              label="BOOK AN APPOINTMENT"
              onClick={handleQuoteClick}
            />
          </div>

          <div className="mobile-menu__footer" style={{ animationDelay: '550ms' }}>
            <div className="mobile-menu__footer-line" />
            <p className="text-body-sm">Kitchen Extract &amp; Duct Cleaning Specialists</p>
            <a href="tel:+442045264142" className="mobile-menu__phone text-body-sm">+44 20 4526 4142</a>
          </div>
        </nav>
      </div>
    </div>
  );
}
