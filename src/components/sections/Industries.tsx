import { useEffect, useState } from 'react';
import { useInView } from '../../hooks/useInView';
import QuoteButton from '../ui/QuoteButton';
import ScrollStack, { ScrollStackItem } from '../ui/ScrollStack';
import './Industries.css';

import heroImg from '../../assets/images/industry_hero.png';
import restaurantImg from '../../assets/images/industry_restaurant.png';
import hotelImg from '../../assets/images/industry_hotel.png';
import healthcareImg from '../../assets/images/industry_healthcare.png';
import manufacturingImg from '../../assets/images/industry_manufacturing.png';

// Inline minimal SVGs
const ChefIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" />
    <line x1="6" y1="17" x2="18" y2="17" />
  </svg>
);

const HotelIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
    <path d="M9 22v-4h6v4" />
    <path d="M8 6h.01" />
    <path d="M16 6h.01" />
    <path d="M12 6h.01" />
    <path d="M12 10h.01" />
    <path d="M12 14h.01" />
    <path d="M16 10h.01" />
    <path d="M16 14h.01" />
    <path d="M8 10h.01" />
    <path d="M8 14h.01" />
  </svg>
);

const MedicalIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M8 11h8" />
    <path d="M12 7v8" />
  </svg>
);

const FactoryIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
    <path d="M17 18h1" />
    <path d="M12 18h1" />
    <path d="M7 18h1" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

const INDUSTRIES = [
  {
    id: '01',
    title: 'RESTAURANTS &\nCOMMERCIAL KITCHENS',
    desc: 'Keep high-demand kitchen environments clean, safe and compliant with specialist extract and duct cleaning.',
    img: restaurantImg,
    Icon: ChefIcon,
  },
  {
    id: '02',
    title: 'HOTELS &\nHOSPITALITY',
    desc: 'Reliable extraction cleaning for hospitality environments where guest experience, safety and continuity matter.',
    img: hotelImg,
    Icon: HotelIcon,
  },
  {
    id: '03',
    title: 'HEALTHCARE\nFACILITIES',
    desc: 'Professional cleaning solutions supporting cleaner environments, reliable ventilation and operational standards.',
    img: healthcareImg,
    Icon: MedicalIcon,
  },
  {
    id: '04',
    title: 'MANUFACTURING &\nINDUSTRIAL',
    desc: 'Specialist cleaning for demanding industrial environments, helping maintain air quality, safety and operational performance.',
    img: manufacturingImg,
    Icon: FactoryIcon,
  }
];

export default function Industries() {
  const [heroLoaded, setHeroLoaded] = useState(false);
  
  useEffect(() => {
    // Simple cinematic load delay
    const timer = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const { ref: introRef, isInView: introInView } = useInView({ threshold: 0.2 });
  const { ref: ind1Ref, isInView: ind1InView } = useInView({ threshold: 0.15 });
  const { ref: ind2Ref, isInView: ind2InView } = useInView({ threshold: 0.15 });
  const { ref: ind3Ref, isInView: ind3InView } = useInView({ threshold: 0.15 });
  const { ref: ind4Ref, isInView: ind4InView } = useInView({ threshold: 0.15 });
  const { ref: metricsRef, isInView: metricsInView } = useInView({ threshold: 0.2 });
  const { ref: statementRef, isInView: statementInView } = useInView({ threshold: 0.3 });
  const { ref: ctaRef, isInView: ctaInView } = useInView({ threshold: 0.2 });

  const indRefs = [ind1Ref, ind2Ref, ind3Ref, ind4Ref];
  const indInViews = [ind1InView, ind2InView, ind3InView, ind4InView];

  return (
    <section id="industries" className="industries-section" aria-label="Industries We Serve">
      {/* ── HERO ── */}
      <div className="industries-hero">
        <div className={`industries-hero__bg ${heroLoaded ? 'is-loaded' : ''}`}>
          <img src={heroImg} alt="Large scale industrial ventilation" loading="eager" />
          <div className="industries-hero__overlay" />
        </div>
        
        <div className="industries-hero__content">
          <span className="industries-hero__eyebrow label anim-fade-in-up">
            — INDUSTRIES WE SERVE —
          </span>
          <h1 className="industries-hero__title heading-hero anim-fade-in-up delay-200">
            <span>TAILORED CLEANING</span>
            <span>FOR EVERY</span>
            <span className="text-lime">INDUSTRY.</span>
          </h1>
          <p className="industries-hero__desc text-body anim-fade-in-up delay-400">
            Specialist extract and duct cleaning solutions designed around the demands of your environment.
          </p>
        </div>

        <div className="industries-hero__scroll-wrapper anim-fade-in-up delay-600">
          <div className="industries-hero__scroll">
            <span className="industries-hero__scroll-number">01</span>
            <span className="industries-hero__scroll-text">
              EXPLORE INDUSTRIES <span aria-hidden="true">↓</span>
            </span>
          </div>
        </div>
      </div>

      {/* ── INTRO ── */}
      <div 
        ref={introRef} 
        className={`industries-intro ${introInView ? 'is-visible' : ''}`}
      >
        <span className="industries-intro__eyebrow label label-lime anim-fade-in-up">
          INDUSTRIES WE SPECIALISE IN
        </span>
        <h2 className="industries-intro__title h1 anim-fade-in-up delay-200">
          ONE STANDARD.<br />DIFFERENT ENVIRONMENTS.
        </h2>
        <p className="industries-intro__desc text-body anim-fade-in-up delay-400">
          From high-volume commercial kitchens to healthcare and industrial facilities, Dr. Duct delivers specialist cleaning designed around the demands of each environment.
        </p>
      </div>

      {/* ── LISTING ── */}
      <div className="industries-list">
        <ScrollStack useWindowScroll={true} onStackComplete={() => {}}>
          {INDUSTRIES.map((industry, index) => {
            const isReverse = index % 2 !== 0;
            return (
              <ScrollStackItem key={industry.id} itemClassName={`industry-card ${isReverse ? 'industry-card--reverse' : ''} ${indInViews[index] ? 'is-visible' : ''}`}>
                <div className="industry-card__image-wrap">
                  <img src={industry.img} alt={`${industry.title.replace('\n', ' ')} environment`} loading="lazy" />
                  <div className="industry-card__image-overlay" />
                </div>
                <div ref={indRefs[index]} className="industry-card__content">
                  <span className="industry-card__number">{industry.id}</span>
                  <div className="industry-card__icon">
                    <industry.Icon />
                  </div>
                  <h3 className="industry-card__title h2">
                    {industry.title.split('\n').map((line, i) => (
                      <span key={i} style={{ display: 'block' }}>{line}</span>
                    ))}
                  </h3>
                  <p className="industry-card__desc text-body">
                    {industry.desc}
                  </p>
                  <a href="#contact" className="industry-card__link">
                    LEARN MORE <ArrowRightIcon />
                  </a>
                </div>
              </ScrollStackItem>
            );
          })}
        </ScrollStack>
      </div>

      {/* ── METRICS (THE STANDARD) ── */}
      <div ref={metricsRef} className={`industries-metrics ${metricsInView ? 'is-visible' : ''}`}>
        <div className="industries-metrics__inner">
          <h2 className="industries-metrics__header h1">
            ONE STANDARD.<br />
            <span className="text-lime">EVERY INDUSTRY.</span>
          </h2>
          
          <div className="industries-metrics__grid">
            <div className="metric-item">
              <div className="metric-item__value">500+</div>
              <div className="metric-item__label label">CLIENTS SERVED</div>
              <p className="metric-item__desc text-body-sm">
                Across a wide range of industries in the UK.
              </p>
            </div>
            <div className="metric-item">
              <div className="metric-item__value">10+</div>
              <div className="metric-item__label label">YEARS EXPERIENCE</div>
              <p className="metric-item__desc text-body-sm">
                Deep expertise in specialist extraction cleaning.
              </p>
            </div>
            <div className="metric-item">
              <div className="metric-item__value">100%</div>
              <div className="metric-item__label label">COMPLIANCE FOCUSED</div>
              <p className="metric-item__desc text-body-sm">
                Meeting all TR19 and safety regulations.
              </p>
            </div>
            <div className="metric-item">
              <div className="metric-item__value">24/7</div>
              <div className="metric-item__label label">SUPPORT</div>
              <p className="metric-item__desc text-body-sm">
                Rapid response when your environment demands it.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── STATEMENT ── */}
      <div ref={statementRef} className={`industries-statement ${statementInView ? 'is-visible' : ''}`}>
        <h2>
          EVERY ENVIRONMENT<br />HAS ITS DEMANDS.<br />
          WE CLEAN<br />
          <span className="text-lime">WITH PRECISION.</span>
        </h2>
      </div>

      {/* ── CTA ── */}
      <div ref={ctaRef} className={`industries-cta ${ctaInView ? 'is-visible' : ''}`}>
        <div className="industries-cta__inner">
          <h2 className="industries-cta__title h1">
            YOUR INDUSTRY.<br />OUR EXPERTISE.
          </h2>
          <p className="industries-cta__desc text-body">
            Talk to Dr. Duct about a cleaning programme designed around your environment.
          </p>
          <QuoteButton id="industries-cta-btn" label="GET A QUOTE →" />
        </div>
      </div>
    </section>
  );
}
