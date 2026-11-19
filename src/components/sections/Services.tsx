import { useInView } from '../../hooks/useInView';
import QuoteButton from '../ui/QuoteButton';
import AccordionGallery from '../ui/AccordionGallery';
import './Services.css';

import kitchenImg from '../../assets/images/hero-kitchen.png';
import ductImg from '../../assets/images/industry_manufacturing.png';
import damperImg from '../../assets/images/industry_healthcare.png';
import complianceImg from '../../assets/images/about-extraction-cinematic.png';

// Minimal Custom SVGs for Services
const KitchenIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 8h16M6 8v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8M9 4v4M15 4v4" />
    <path d="M4 14h16" strokeDasharray="2 4" />
  </svg>
);

const DuctIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 10h18M3 14h18" />
    <path d="M8 5v14M16 5v14" />
  </svg>
);

const FireDamperIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2v20" />
    <path d="M2 12h20" />
    <path d="M8 8l8 8" />
    <path d="M16 8l-8 8" />
  </svg>
);

const ComplianceIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <path d="M9 15l2 2 4-4" />
  </svg>
);

const SERVICES_DATA = [
  {
    id: '01',
    title: 'KITCHEN DEEP CLEANING SERVICES',
    shortTitle: 'KITCHEN DEEP CLEANING',
    desc: 'Professional deep cleaning for commercial kitchen environments, helping maintain cleaner extraction systems, safer operations and high standards of hygiene.',
    img: kitchenImg,
    Icon: KitchenIcon,
  },
  {
    id: '02',
    title: 'DUCT CLEANING SERVICES',
    shortTitle: 'DUCT CLEANING',
    desc: 'Specialist cleaning of commercial extraction ductwork to remove accumulated grease and contaminants while supporting safer, cleaner and more efficient systems.',
    img: ductImg,
    Icon: DuctIcon,
  },
  {
    id: '03',
    title: 'FIRE DAMPER INSPECTION / SERVICE',
    shortTitle: 'FIRE DAMPER INSPECTION / SERVICE',
    desc: 'Inspection and servicing of fire dampers to help maintain the integrity and performance of fire safety systems.',
    img: damperImg,
    Icon: FireDamperIcon,
  },
  {
    id: '04',
    title: 'COMPLIANCE SERVICES',
    shortTitle: 'COMPLIANCE SERVICES',
    desc: 'Professional support for inspection, documentation and compliance requirements across commercial environments.',
    img: complianceImg,
    Icon: ComplianceIcon,
  }
];

export default function Services() {
  const { ref: sectionRef, isInView: sectionInView } = useInView({ threshold: 0.1 });

  const galleryItems = SERVICES_DATA.map(srv => ({
    image: srv.img,
    label: srv.title,
    desc: srv.desc
  }));
  
  return (
    <section id="services" className="services-section" aria-label="Our Services" ref={sectionRef}>
      <div className="services-container">
        
        {/* Header */}
        <div className="services-header">
          <div className={`services-label anim-reveal ${sectionInView ? 'is-visible' : ''}`}>
            <span className="services-label-line"></span>
            SERVICES
          </div>
          <h2 className={`services-title anim-reveal delay-200 ${sectionInView ? 'is-visible' : ''}`}>
            <span>PRECISION CLEANING.</span>
            <span className="text-lime">PROTECTION.</span>
            <span>COMPLIANCE.</span>
          </h2>
        </div>

        {/* Layout */}
        <div className={`services-layout anim-reveal delay-400 ${sectionInView ? 'is-visible' : ''}`}>
          <AccordionGallery 
            items={galleryItems}
            defaultIndex={0}
            expandRatio={0.52}
            trigger="hover"
            accentColor="var(--color-lime)"
            overlayColor="#050505"
            textColor="#ffffff"
            height={500}
            gap={10}
            radius={16}
            orientation="horizontal"
          />
        </div>

        {/* Global CTA for section */}
        <div className={`services-cta-wrap anim-reveal delay-600 ${sectionInView ? 'is-visible' : ''}`}>
           <QuoteButton id="services-quote-btn" label="EXPLORE OUR SERVICES" />
        </div>

      </div>
    </section>
  );
}
