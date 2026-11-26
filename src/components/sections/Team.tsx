import { useState, useEffect } from 'react';
import { useInView } from '../../hooks/useInView';
// @ts-ignore
import FlexCarousel from '../ui/FlexCarousel';
import specialist1 from '../../assets/images/specialist-1.webp';
import specialist2 from '../../assets/images/specialist-2.webp';
import specialist3 from '../../assets/images/specialist-3.webp';
import specialist4 from '../../assets/images/specialist-4.webp';
import specialist5 from '../../assets/images/specialist-5.webp';
import './Team.css';

const SPECIALIST_GALLERY_ITEMS = [
  { src: specialist1, alt: 'Dr. Duct specialist cleaning stainless steel extraction canopy', title: 'Canopy Deep Cleaning' },
  { src: specialist2, alt: 'Dr. Duct specialist inspecting commercial kitchen extract hood', title: 'Extraction Inspection' },
  { src: specialist3, alt: 'Dr. Duct specialist detailing overhead ductwork and fire suppression lines', title: 'Overhead Pipework' },
  { src: specialist4, alt: 'Dr. Duct specialist cleaning extraction plenum and baffle housings', title: 'Plenum & Baffle Care' },
  { src: specialist5, alt: 'Dr. Duct specialist applying degreasing treatment to kitchen extract hood', title: 'Degreasing Treatment' },
];

export default function Team() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [viewportWidth, setViewportWidth] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = viewportWidth < 768;

  // Responsive settings tailored specifically for mobile phones
  const cardHeight = isMobile ? 0.58 : 0.65;
  const gap = isMobile ? 14 : 12;
  const tilt = isMobile ? 24 : 62;
  const bend = isMobile ? 0.20 : 0.34;
  const reach = isMobile ? 0.32 : 0.38;
  const dispersion = isMobile ? 0.28 : 0.45;
  const lensHeight = isMobile ? 1.06 : 1.18;
  const lensWidth = isMobile ? 0.78 : 0.74;
  const radius = isMobile ? 18 : 24;

  return (
    <section id="team" className="team-section" aria-label="Our Specialists" ref={ref}>
      <div className={`team__header ${isInView ? 'is-visible' : ''}`}>
        <span className="team__eyebrow label label-lime">OUR SPECIALISTS</span>
        <h2 className="team__title h1">
          TRAINED FOR EVERY <br />
          <span className="text-lime">ENVIRONMENT.</span>
        </h2>
        <p className="team__desc text-body">
          Our operatives are equipped with specialized black uniforms designed for demanding conditions, wearing the Dr. Duct logo with pride.
        </p>
      </div>

      <div className={`team__carousel-wrap ${isInView ? 'is-visible' : ''}`}>
        <FlexCarousel
          items={SPECIALIST_GALLERY_ITEMS}
          preset="liquid"
          intro="rise"
          cardHeight={cardHeight}
          gap={gap}
          squeeze={0.2}
          focusOnClick={true}
          captions={true}
          fit="natural"
          radius={radius}
          lensWidth={lensWidth}
          lensHeight={lensHeight}
          tilt={tilt}
          roundness={1}
          bend={bend}
          reach={reach}
          curl="twist"
          dispersion={dispersion}
          liquid={isMobile ? 0.05 : 0.1}
          followCursor={false}
          autoplay={false}
          interval={4}
          captureWheel={true}
        />
      </div>
    </section>
  );
}
