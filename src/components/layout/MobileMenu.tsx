import { useEffect } from 'react';
import QuoteButton from '../ui/QuoteButton';
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
  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

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
        <nav className="mobile-menu__nav" aria-label="Mobile navigation">
          <ul className="mobile-menu__list">
            {navItems.map((item, index) => (
              <li
                key={item.label}
                className="mobile-menu__item"
                style={{ animationDelay: `${150 + index * 80}ms` }}
              >
                <a
                  href={item.href}
                  className={`mobile-menu__link ${item.active ? 'mobile-menu__link--active' : ''}`}
                  onClick={onClose}
                >
                  <span className="mobile-menu__link-number">{String(index + 1).padStart(2, '0')}</span>
                  <span className="mobile-menu__link-text">{item.label}</span>
                  {item.active && <span className="mobile-menu__link-dot" aria-hidden="true" />}
                </a>
              </li>
            ))}
          </ul>

          <div className="mobile-menu__cta" style={{ animationDelay: '550ms' }}>
            <QuoteButton id="mobile-menu-quote-btn" onClick={onClose} />
          </div>

          <div className="mobile-menu__footer" style={{ animationDelay: '650ms' }}>
            <div className="mobile-menu__footer-line" />
            <p className="text-body-sm">Kitchen Extract &amp; Duct Cleaning Specialists</p>
            <p className="text-body-sm" style={{ opacity: 0.5 }}>+44 20 4526 4142</p>
          </div>
        </nav>
      </div>
    </div>
  );
}
