import SectionLabel from '../ui/SectionLabel';
import QuoteButton from '../ui/QuoteButton';
import MoltenMetal from '../ui/MoltenMetal';
import './Hero.css';

export default function Hero() {
  return (
    <section id="home" className="hero" aria-label="Hero section">
      {/* ── Background Image ── */}
      <div className="hero__bg">
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <MoltenMetal
            color1="#17130F"
            color2="#292018"
            color3="#D8F000"
            speed={0.35}
            scale={4}
            detail={3}
            glow={1.6}
            coreSize={0.1}
            swirl={1}
            fold={-0.2}
            blackPoint={0.05}
            brightness={1.3}
            colorMode="molten"
            grain={true}
            grainIntensity={0.05}
            mouseInteraction={false}
            mouseStrength={0.3}
            opacity={1.0}
          />
        </div>
        {/* Multi-layer overlays */}
        <div className="hero__overlay hero__overlay--base" aria-hidden="true" />
        <div className="hero__overlay hero__overlay--gradient" aria-hidden="true" />
        <div className="hero__overlay hero__overlay--vignette" aria-hidden="true" />
        <div className="hero__overlay hero__overlay--radial" aria-hidden="true" />
        <div className="hero__overlay hero__overlay--noise" aria-hidden="true" />
      </div>

      {/* ── Watermark "CLEANER" ── */}
      <div className="hero__watermark anim-scale-reveal delay-600" aria-hidden="true">
        <span className="hero__watermark-text">CLEANER</span>
      </div>

      {/* ── Content ── */}
      <div className="hero__content">
        <div className="hero__content-inner">
          {/* Eyebrow */}
          <div className="anim-fade-in-up delay-400">
            <SectionLabel text="Kitchen Extract and Duct Cleaning Specialist" />
          </div>

          {/* Main Typography */}
          <div className="hero__headline">
            <h1 className="sr-only">
              DR. DUCT UK LTD — Cleaner, Safer Kitchens
            </h1>
            <div className="hero__headline-safer anim-fade-in-up delay-750" aria-hidden="true">
              SAFER
            </div>
            <div className="hero__headline-kitchens anim-fade-in-up delay-900" aria-hidden="true">
              KITCHENS<span className="hero__headline-dot">.</span>
            </div>
          </div>

          {/* Description */}
          <p className="hero__description text-body anim-fade-in-up delay-1100">
            Specialist cleaning for commercial<br />
            kitchen extraction systems.
          </p>

          {/* CTA */}
          <div className="hero__cta anim-fade-in-up delay-1250">
            <QuoteButton id="hero-quote-btn" />
          </div>

          {/* Decorative lime rule */}
          <div className="hero__rule anim-fade-in delay-1250" aria-hidden="true" />
        </div>
      </div>

      {/* ── Scroll Indicator ── */}
      <div className="hero__scroll anim-fade-in delay-1250" aria-hidden="true">
        <span className="hero__scroll-line" />
        <span className="hero__scroll-text label">Scroll</span>
      </div>
    </section>
  );
}
