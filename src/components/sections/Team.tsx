import { useState, useEffect } from 'react';
import { useInView } from '../../hooks/useInView';
// @ts-ignore
import FlexCarousel from '../ui/FlexCarousel';
import './Team.css';

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
