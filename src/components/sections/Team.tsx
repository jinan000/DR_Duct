import { useInView } from '../../hooks/useInView';
// @ts-ignore
import FlexCarousel from '../ui/FlexCarousel';
import './Team.css';

export default function Team() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

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
          cardHeight={0.65}
          gap={12}
          squeeze={0.2}
          focusOnClick={true}
          captions={true}
          fit="natural"
          radius={24}
          lensWidth={0.74}
          lensHeight={1.18}
          tilt={62}
          roundness={1}
          bend={0.34}
          reach={0.38}
          curl="twist"
          dispersion={0.45}
          liquid={0.1}
          followCursor={false}
          autoplay={false}
          interval={4}
          captureWheel={true}
        />
      </div>
    </section>
  );
}
