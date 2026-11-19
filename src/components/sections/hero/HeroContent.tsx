/* ================================================
   HeroContent — Typography + CTA composition
   Bottom-left editorial layout matching reference
   ================================================ */

import React, { forwardRef } from 'react';

interface HeroContentProps {
  className?: string;
}

const HeroContent = forwardRef<HTMLDivElement, HeroContentProps>(
  ({ className = '' }, ref) => {
    const handleBookingClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        // Set focus to the first input in the contact form after scrolling
        setTimeout(() => {
          const firstInput = contactSection.querySelector<HTMLInputElement>(
            '#fullName, input:not([type="hidden"]), select, textarea'
          );
          if (firstInput) {
            firstInput.focus({ preventScroll: true });
          }
        }, 650);
      }
    };

    return (
      <div ref={ref} className={`hero__content ${className}`}>
        <div className="hero__content-inner">
          {/* Eyebrow label */}
          <div className="hero__eyebrow hero__eyebrow--custom">
            KITCHEN EXTRACTION<br/>
            SPECIALISTS
          </div>

          {/* Editorial headline stack */}
          <div className="hero__headline">
            <h1 className="sr-only">
              DR. DUCT UK LTD — More Than Cleaning
            </h1>
            <div className="hero__headline-line hero__headline-safer" aria-hidden="true">
              MORE THAN
            </div>
            <div className="hero__headline-line hero__headline-kitchens" aria-hidden="true">
              CLEANING<span className="hero__headline-dot">.</span>
            </div>
          </div>

          <div className="hero__rule-top" aria-hidden="true" />

          {/* Supporting copy */}
          <p className="hero__description text-body">
            A cleaner, safer future<br />
            for your kitchen.
          </p>

          {/* Architectural CTA — Book An Appointment */}
          <div className="hero__cta">
            <a
              href="#contact"
              id="hero-book-appointment-btn"
              className="hero__cta-btn"
              aria-label="Book an appointment for kitchen extract and duct cleaning services"
              onClick={handleBookingClick}
            >
              {/* Entrance light sweep beam */}
              <span className="hero__cta-shimmer" aria-hidden="true" />
              <span className="hero__cta-text">BOOK AN APPOINTMENT</span>
              <span className="hero__cta-arrow" aria-hidden="true">
                <svg
                  className="hero__cta-arrow-svg"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.5 10H16.5M16.5 10L10.5 4M16.5 10L10.5 16"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>
    );
  }
);

HeroContent.displayName = 'HeroContent';

export default HeroContent;
