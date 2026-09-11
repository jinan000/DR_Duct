import { FormEvent } from 'react';
import { useInView } from '../../hooks/useInView';
import QuoteButton from '../ui/QuoteButton';
import './Contact.css';
import heroImg from '../../assets/images/hero-kitchen.png';

// Minimal Custom SVGs for Contact Details
const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const LocationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const SendIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

export default function Contact() {
  const { ref: heroRef, isInView: heroInView } = useInView({ threshold: 0.1 });
  const { ref: mainRef, isInView: mainInView } = useInView({ threshold: 0.1 });
  const { ref: mapRef, isInView: mapInView } = useInView({ threshold: 0.1 });
  const { ref: ctaRef, isInView: ctaInView } = useInView({ threshold: 0.1 });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    alert("Form submitted! (Simulation)");
  };

  return (
    <section id="contact" className="contact-section" aria-label="Contact Us">
      
      {/* Cinematic Hero */}
      <div className="contact-hero" ref={heroRef}>
        <div className="contact-hero__bg">
          <img src={heroImg} alt="Commercial Kitchen Extraction" className="contact-hero__img" />
          <div className="contact-hero__overlay"></div>
        </div>
        
        <div className="contact-hero__content">
          <div className={`contact-eyebrow anim-reveal-up ${heroInView ? 'is-visible' : ''}`}>
            <span className="contact-eyebrow-line"></span>
            CONTACT US
          </div>
          <h1 className={`contact-heading anim-reveal-up delay-100 ${heroInView ? 'is-visible' : ''}`}>
            <span>WE'RE HERE</span>
            <span>TO <span className="contact-heading-highlight">HELP.</span></span>
          </h1>
          <p className={`contact-subtitle anim-reveal-up delay-200 ${heroInView ? 'is-visible' : ''}`}>
            Need professional kitchen extract and duct cleaning?<br/>
            Speak with the Dr. Duct team about your requirements.
          </p>
          <div className="contact-micro-label">
            DR. DUCT UK LTD<br/>KITCHEN EXTRACT & DUCT CLEANING SPECIALISTS
          </div>
        </div>
      </div>

      {/* Main Two-Column Experience */}
      <div className="contact-main" ref={mainRef}>
        
        {/* Left: Contact Info */}
        <div className="contact-info">
          <div className="contact-info__header">
            <h2 className={`contact-info__heading anim-reveal-up ${mainInView ? 'is-visible' : ''}`}>LET'S TALK.</h2>
            <p className={`contact-info__desc anim-reveal-up delay-100 ${mainInView ? 'is-visible' : ''}`}>
              Whether you need a one-off deep clean, specialist duct cleaning, fire damper servicing or compliance support, our team is ready to help.
            </p>
          </div>

          <div className="contact-details">
            <div className={`contact-item anim-reveal-up delay-200 ${mainInView ? 'is-visible' : ''}`}>
              <div className="contact-item__icon-wrap"><PhoneIcon /></div>
              <div className="contact-item__content">
                <span className="contact-item__label">Phone</span>
                <p className="contact-item__value">+44 20 4526 4142</p>
              </div>
            </div>

            <div className={`contact-item anim-reveal-up delay-300 ${mainInView ? 'is-visible' : ''}`}>
              <div className="contact-item__icon-wrap"><MailIcon /></div>
              <div className="contact-item__content">
                <span className="contact-item__label">Email</span>
                <p className="contact-item__value">info@drductuk.co.uk</p>
              </div>
            </div>

            <div className={`contact-item anim-reveal-up delay-400 ${mainInView ? 'is-visible' : ''}`}>
              <div className="contact-item__icon-wrap"><LocationIcon /></div>
              <div className="contact-item__content">
                <span className="contact-item__label">Address</span>
                <p className="contact-item__value">
                  Unit 4, Greenway Business Park<br/>
                  Bedford, MK42 6DP<br/>
                  UK
                </p>
              </div>
            </div>

            <div className={`contact-item anim-reveal-up delay-500 ${mainInView ? 'is-visible' : ''}`}>
              <div className="contact-item__icon-wrap"><ClockIcon /></div>
              <div className="contact-item__content">
                <span className="contact-item__label">Opening Hours</span>
                <p className="contact-item__value">
                  Monday – Friday<br/>
                  8:00 AM – 6:00 PM<br/><br/>
                  Saturday<br/>
                  8:00 AM – 1:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Quote Form */}
        <div className={`contact-form anim-reveal-up delay-300 ${mainInView ? 'is-visible' : ''}`}>
          <div className="form-header">
            <h2 className="form-heading">
              <span>REQUEST</span>
              <span>A QUOTE.</span>
            </h2>
            <p className="form-subtitle">Tell us what you need and our team will get back to you.</p>
          </div>

          <form className="form-grid" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fullName" className="form-label">Full Name</label>
              <input type="text" id="fullName" className="form-input" placeholder="John Doe" required />
            </div>
            
            <div className="form-group">
              <label htmlFor="companyName" className="form-label">Company Name</label>
              <input type="text" id="companyName" className="form-input" placeholder="Company Ltd" />
            </div>

            <div className="form-group">
              <label htmlFor="emailAddress" className="form-label">Email Address</label>
              <input type="email" id="emailAddress" className="form-input" placeholder="john@example.com" required />
            </div>

            <div className="form-group">
              <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
              <input type="tel" id="phoneNumber" className="form-input" placeholder="+44 7000 000000" required />
            </div>

            <div className="form-group form-group--full">
              <label htmlFor="serviceRequired" className="form-label">Service Required</label>
              <select id="serviceRequired" className="form-select" required>
                <option value="" disabled selected>Select a service...</option>
                <option value="kitchen">Kitchen Deep Cleaning Services</option>
                <option value="duct">Duct Cleaning Services</option>
                <option value="damper">Fire Damper Inspection / Service</option>
                <option value="compliance">Compliance Services</option>
                <option value="other">Other Inquiry</option>
              </select>
            </div>

            <div className="form-group form-group--full">
              <label htmlFor="contactMethod" className="form-label">Preferred Contact Method (Optional)</label>
              <select id="contactMethod" className="form-select">
                <option value="phone">Phone</option>
                <option value="email">Email</option>
              </select>
            </div>

            <div className="form-group form-group--full">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea id="message" className="form-textarea" placeholder="How can we help you?" required></textarea>
            </div>

            <div className="form-submit-wrap">
              <button type="submit" className="form-submit">
                SEND ENQUIRY
                <span className="form-submit-icon"><SendIcon /></span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Map / Location Block */}
      <div className={`contact-map-section anim-reveal-up ${mapInView ? 'is-visible' : ''}`} ref={mapRef}>
        <div className="contact-map">
          <div className="contact-map__grid"></div>
          <div className="contact-map__marker-wrap">
            <div className="contact-map__pin"></div>
            <div className="contact-map__card">
              <h3 className="contact-map__title">FIND US.</h3>
              <p className="contact-map__address">
                Unit 4, Greenway Business Park<br/>
                Bedford, MK42 6DP, UK
              </p>
              <a href="https://maps.google.com/?q=Unit+4,+Greenway+Business+Park,+Bedford,+MK42+6DP,+UK" target="_blank" rel="noopener noreferrer" className="contact-map__link">
                GET DIRECTIONS →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Final Strong CTA */}
      <div className="contact-final-cta" ref={ctaRef}>
        <div className="contact-final-cta__bg"></div>
        <div className="contact-final-cta__texture"></div>
        <div className="contact-final-cta__content">
          <h2 className={`contact-final-cta__heading anim-reveal-up ${ctaInView ? 'is-visible' : ''}`}>
            <span>READY FOR A</span>
            <span>CLEANER SYSTEM?</span>
          </h2>
          <p className={`contact-final-cta__desc anim-reveal-up delay-100 ${ctaInView ? 'is-visible' : ''}`}>
            Get in touch with Dr. Duct UK Ltd today.
          </p>
          <div className={`anim-reveal-up delay-200 ${ctaInView ? 'is-visible' : ''}`}>
            <QuoteButton id="final-contact-cta" label="GET A QUOTE →" />
          </div>
        </div>
      </div>

    </section>
  );
}
