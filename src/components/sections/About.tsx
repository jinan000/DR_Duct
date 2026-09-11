import { useInView } from '../../hooks/useInView';
import heroImg from '../../assets/images/about-extraction-cinematic.png';
import BorderGlow from '../ui/BorderGlow';
import './About.css';

const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square" strokeLinejoin="miter" className="about__pillar-icon">
    <path d="M12 2L3 6V12C3 17 12 22 12 22C12 22 21 17 21 12V6L12 2Z"/>
    <path d="M12 7V17" className="about__pillar-icon-detail" />
  </svg>
);

const TargetIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square" strokeLinejoin="miter" className="about__pillar-icon">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="4" className="about__pillar-icon-detail" />
    <line x1="12" y1="2" x2="12" y2="5" />
    <line x1="12" y1="19" x2="12" y2="22" />
    <line x1="2" y1="12" x2="5" y2="12" />
    <line x1="19" y1="12" x2="22" y2="12" />
  </svg>
);

const AirflowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square" strokeLinejoin="miter" className="about__pillar-icon">
    <path d="M18 4C18 4 15 4 12 10C9 16 6 20 6 20C6 20 9 20 12 14C15 8 18 4 18 4Z" />
    <path d="M10 5L5 10M19 14L14 19" className="about__pillar-icon-detail" />
  </svg>
);

const GearIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square" strokeLinejoin="miter" className="about__pillar-icon">
    <circle cx="12" cy="12" r="6" className="about__pillar-icon-detail" />
    <path d="M12 2V4M12 20V22M22 12H20M4 12H2M19.071 4.929L17.657 6.343M6.343 17.657L4.929 19.071M19.071 19.071L17.657 17.657M6.343 6.343L4.929 4.929" />
  </svg>
);

export default function About() {
  const contentView = useInView({ threshold: 0.1 });
  const panelView = useInView({ threshold: 0.1 });

  return (
    <section id="about" className="about" aria-label="About Us">
      <div className="about__container">
        
        {/* Top Grid: Text Left, Image Right */}
        <div className="about__top-grid">
          
          {/* Left Text */}
          <div ref={contentView.ref} className="about__text-col">
            <div className={`about__label reveal-up ${contentView.isInView ? 'in-view' : ''}`}>
              <span className="about__label-line" aria-hidden="true"></span>
              ABOUT US
            </div>
            
            <h2 className="about__headline">
              <span className={`about__headline-clean reveal-up delay-100 ${contentView.isInView ? 'in-view' : ''}`}>
                CLEAN SYSTEMS.
              </span>
              <span className={`about__headline-safer reveal-up delay-150 ${contentView.isInView ? 'in-view' : ''}`}>
                SAFER ENVIRONMENTS.
              </span>
            </h2>
            
            <p className={`about__desc reveal-up delay-200 ${contentView.isInView ? 'in-view' : ''}`}>
              <strong>Dr. Duct UK Ltd is a trusted provider of professional kitchen extract and duct cleaning services.</strong> We help commercial kitchens operate safely, stay compliant, and perform at their best.
            </p>
          </div>

          {/* Right Image */}
          <div className={`about__visual-col reveal-up delay-250 ${contentView.isInView ? 'in-view' : ''}`}>
            <div className="about__visual-wrapper">
              <img 
                src={heroImg} 
                alt="Professional kitchen extraction canopy and stainless steel ductwork" 
                className="about__visual-img" 
                loading="lazy"
              />
              <div className="about__visual-gradient" aria-hidden="true" />
              
              {/* Micro details */}
              <div className="about__micro-detail about__micro-tl" aria-hidden="true">
                <span className="about__micro-mark"></span> SYS-01
              </div>
              <div className="about__micro-detail about__micro-br" aria-hidden="true">
                EXT-90 <span className="about__micro-mark"></span>
              </div>
            </div>
          </div>
          
        </div>

        {/* Commitment Panel */}
        <BorderGlow
          className={`about__panel reveal-up delay-300 ${panelView.isInView ? 'in-view' : ''}`}
          edgeSensitivity={30}
          glowColor="66 100 47"
          backgroundColor="#111111"
          borderRadius={24}
          glowRadius={40}
          glowIntensity={1}
          coneSpread={25}
          animated={true}
          colors={['#D8F000', '#A3E635', '#FACC15']}
        >
          <div ref={panelView.ref} className="about__panel-grid">
            
            {/* Left Side: Commitment text */}
            <div className="about__panel-intro">
              <div className="about__panel-label">OUR COMMITMENT</div>
              <h3 className="about__panel-title">
                EXCELLENCE IN<br/>EVERY DETAIL<span className="about__panel-dot">.</span>
              </h3>
              <p className="about__panel-desc">
                We combine industry-leading equipment, skilled professionals and proven methods to deliver outstanding results every time.
              </p>
            </div>

            {/* Right Side: Pillars */}
            <div className="about__panel-pillars">
              
              {/* Pillar 1 */}
              <div className={`about__pillar reveal-up delay-400 ${panelView.isInView ? 'in-view' : ''}`}>
                <div className="about__pillar-num">01</div>
                <div className="about__pillar-icon-wrapper">
                  <ShieldIcon />
                </div>
                <h4 className="about__pillar-title">SAFETY FIRST</h4>
                <div className="about__pillar-rule" aria-hidden="true"></div>
                <p className="about__pillar-desc">
                  We help reduce fire risk and ensure a safer working environment for your team.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className={`about__pillar reveal-up delay-500 ${panelView.isInView ? 'in-view' : ''}`}>
                <div className="about__pillar-num">02</div>
                <div className="about__pillar-icon-wrapper">
                  <TargetIcon />
                </div>
                <h4 className="about__pillar-title">QUALITY SERVICE</h4>
                <div className="about__pillar-rule" aria-hidden="true"></div>
                <p className="about__pillar-desc">
                  Thorough, reliable and professional cleaning delivered to the highest standards.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className={`about__pillar reveal-up delay-600 ${panelView.isInView ? 'in-view' : ''}`}>
                <div className="about__pillar-num">03</div>
                <div className="about__pillar-icon-wrapper">
                  <AirflowIcon />
                </div>
                <h4 className="about__pillar-title">HEALTHIER AIR</h4>
                <div className="about__pillar-rule" aria-hidden="true"></div>
                <p className="about__pillar-desc">
                  Removing grease, bacteria and contaminants for cleaner air and a healthier kitchen environment.
                </p>
              </div>

              {/* Pillar 4 */}
              <div className={`about__pillar reveal-up delay-700 ${panelView.isInView ? 'in-view' : ''}`}>
                <div className="about__pillar-num">04</div>
                <div className="about__pillar-icon-wrapper">
                  <GearIcon />
                </div>
                <h4 className="about__pillar-title">MINIMAL DISRUPTION</h4>
                <div className="about__pillar-rule" aria-hidden="true"></div>
                <p className="about__pillar-desc">
                  Efficient service with minimal impact on your kitchen operations and business performance.
                </p>
              </div>

            </div>
          </div>
        </BorderGlow>

      </div>
    </section>
  );
}
