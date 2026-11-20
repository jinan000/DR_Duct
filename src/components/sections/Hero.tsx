/* ================================================
   Hero — Cinematic Hero with Hanging Hood
   Single focal image dropping from top with parallax
   ================================================ */

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CinematicOverlay from './hero/CinematicOverlay';
import HeroContent from './hero/HeroContent';
// @ts-ignore
import SideRays from '../ui/SideRays';
import LightRays from '../ui/LightRays';
import './Hero.css';

// ── Asset import ──
import hoodImage from '../../assets/images/1parallax.png';
import parallax2 from '../../assets/images/2parallax.png';
import parallax3 from '../../assets/images/3parallax.png';

gsap.registerPlugin(ScrollTrigger);

const CYCLING_WORDS = ['CLEANER', 'SHARPER', 'HEALTHIER'];

interface HeroProps {
  preloaderDone?: boolean;
}

export default function Hero({ preloaderDone = false }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const hoodRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const animationRanRef = useRef(false);
  const [prefersReducedMotion] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );

  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % CYCLING_WORDS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // ── Mouse cursor tracking for the hood and elements ──
  const mouseQuickTo = useRef<{ x: gsap.QuickToFunc; y: gsap.QuickToFunc; rot: gsap.QuickToFunc } | null>(null);
  const p2QuickTo = useRef<{ x: gsap.QuickToFunc } | null>(null);
  const p3QuickTo = useRef<{ x: gsap.QuickToFunc } | null>(null);

  useEffect(() => {
    if (prefersReducedMotion || !preloaderDone) return;
    if (typeof window !== 'undefined' && window.innerWidth < 768) return;
    const section = sectionRef.current;
    const wrapper = section?.querySelector('.hero__hood-wrapper') as HTMLElement;
    if (!wrapper) return;

    // Create smooth interpolators
    mouseQuickTo.current = {
      x: gsap.quickTo(wrapper, 'x', { duration: 0.6, ease: 'power3.out' }),
      y: gsap.quickTo(wrapper, 'y', { duration: 0.6, ease: 'power3.out' }),
      rot: gsap.quickTo(wrapper, 'rotation', { duration: 0.8, ease: 'power3.out' }),
    };

    const p2 = section!.querySelector('.hero__parallax-2') as HTMLElement;
    const p3 = section!.querySelector('.hero__parallax-3') as HTMLElement;

    if (p2) {
      p2QuickTo.current = {
        x: gsap.quickTo(p2, 'x', { duration: 0.9, ease: 'power3.out' }),
      };
    }
    if (p3) {
      p3QuickTo.current = {
        x: gsap.quickTo(p3, 'x', { duration: 1.2, ease: 'power3.out' }),
      };
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!mouseQuickTo.current) return;
      const rect = section!.getBoundingClientRect();
      // Normalize mouse to -1 to 1
      const mx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const my = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

      // Move hood opposite to cursor (intensity: 30px)
      mouseQuickTo.current.x(-mx * 30);
      mouseQuickTo.current.y(-my * 15);
      
      // Drastically increase tilt towards cursor direction for pendulum action
      // max angle will be 15 degrees instead of 2
      mouseQuickTo.current.rot(-mx * 15);

      // Additional Parallax Elements
      if (p2QuickTo.current) {
        p2QuickTo.current.x(-mx * 25);
      }
      if (p3QuickTo.current) {
        p3QuickTo.current.x(-mx * 25);
      }
    };

    const handleMouseLeave = () => {
      if (mouseQuickTo.current) {
        mouseQuickTo.current.x(0);
        mouseQuickTo.current.y(0);
        mouseQuickTo.current.rot(0);
      }
      if (p2QuickTo.current) {
        p2QuickTo.current.x(0);
      }
      if (p3QuickTo.current) {
        p3QuickTo.current.x(0);
      }
    };

    section!.addEventListener('mousemove', handleMouseMove, { passive: true });
    section!.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    return () => {
      section!.removeEventListener('mousemove', handleMouseMove);
      section!.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [prefersReducedMotion, preloaderDone]);

  // ── Set initial hidden state immediately on mount ──
  useEffect(() => {
    if (prefersReducedMotion) return;
    const section = sectionRef.current;
    if (!section) return;

    // Hide everything immediately so nothing flashes before the preloader finishes
    gsap.set(section.querySelectorAll('.hero__hood-wrapper'), { y: '-120vh', opacity: 0, rotation: 0 });
    gsap.set(section.querySelectorAll('.hero__hood-glow'), { opacity: 0, scale: 0.5 });
    gsap.set(section.querySelectorAll('.hero__bg-text-container'), { opacity: 0 });
    gsap.set(section.querySelectorAll('.hero__eyebrow'), { opacity: 0, y: 20 });
    gsap.set(section.querySelectorAll('.hero__headline-line'), { opacity: 0, y: 40 });
    gsap.set(section.querySelectorAll('.hero__description'), { opacity: 0, y: 20 });
    gsap.set(section.querySelectorAll('.hero__cta'), { opacity: 0, y: 28, scale: 0.94 });
    gsap.set(section.querySelectorAll('.hero__overlays'), { opacity: 0 });
    gsap.set(section.querySelectorAll('.hero__parallax-2'), { opacity: 0, y: -25 });
    gsap.set(section.querySelectorAll('.hero__parallax-3'), { opacity: 0, y: -25 });
  }, [prefersReducedMotion]);

  // ── GSAP entrance: Hanging rope drop — triggered ONLY after preloader completes ──
  useEffect(() => {
    if (!preloaderDone) return;
    if (prefersReducedMotion) return;
    if (animationRanRef.current) return;
    animationRanRef.current = true;

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
      });

      tl
        // ── Everything appears together at once ──
        .to('.hero__overlays', { opacity: 1, duration: 0.3 }, 0)
        .to('.hero__bg-text-container', { opacity: 1, duration: 0.5 }, 0)
        .to('.hero__eyebrow', { opacity: 1, y: 0, duration: 0.5 }, 0)
        .to('.hero__headline-safer', { opacity: 1, y: 0, duration: 0.5 }, 0)
        .to('.hero__headline-kitchens', { opacity: 1, y: 0, duration: 0.5 }, 0)
        .to('.hero__description', { opacity: 1, y: 0, duration: 0.5 }, 0.1)
        .to('.hero__cta', {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
        }, 0.35)
        .fromTo(
          '.hero__cta-shimmer',
          { x: '-150%' },
          {
            x: '250%',
            duration: 1.1,
            ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
            clearProps: 'transform',
          },
          1.0
        )
        .to('.hero__hood-glow', { opacity: 1, scale: 1, duration: 0.5 }, 0)
        .to('.hero__parallax-2', { opacity: 0.85, y: 0, duration: 1.3, ease: 'power2.out' }, 0)
        .to('.hero__parallax-3', { opacity: 0.85, y: 0, duration: 1.3, ease: 'power2.out' }, 0)

        // ── Hood drops down from top — the hero moment ──
        .to('.hero__hood-wrapper', {
          y: '15px',
          opacity: 1,
          duration: 1.4,
          ease: 'power3.in',
        }, 0)

        // ── Elastic chain bounce ──
        .to('.hero__hood-wrapper', {
          y: '-30px',
          duration: 0.35,
          ease: 'power2.out',
        }, 1.4)
        .to('.hero__hood-wrapper', {
          y: '12px',
          duration: 0.3,
          ease: 'power2.inOut',
        }, 1.75)
        .to('.hero__hood-wrapper', {
          y: '-8px',
          duration: 0.25,
          ease: 'power2.out',
        }, 2.05)
        .to('.hero__hood-wrapper', {
          y: '0px',
          duration: 0.4,
          ease: 'power1.inOut',
        }, 2.3)

        // ── Pendulum swing on chains ──
        .to('.hero__hood-wrapper', {
          rotation: 4,
          duration: 0.7,
          ease: 'sine.inOut',
        }, 1.4)
        .to('.hero__hood-wrapper', {
          rotation: -3,
          duration: 0.8,
          ease: 'sine.inOut',
        }, 2.1)
        .to('.hero__hood-wrapper', {
          rotation: 2.5,
          duration: 0.9,
          ease: 'sine.inOut',
        }, 2.9)
        .to('.hero__hood-wrapper', {
          rotation: -2,
          duration: 1.0,
          ease: 'sine.inOut',
        }, 3.8);
    }, section);

    return () => ctx.revert();
  }, [preloaderDone, prefersReducedMotion]);

  // ── Gentle idle sway — like hanging on chains in a breeze ──
  useEffect(() => {
    if (!preloaderDone || prefersReducedMotion) return;

    // Apply idle animations to the inner hood element to avoid conflict with mouse wrapper
    const hood = hoodRef.current;
    if (!hood) return;

    // Subtle vertical bob
    const bob = gsap.to(hood, {
      y: '+=5',
      duration: 3.5,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: 4.8,
    });

    // Noticeable rotation sway (Pendulum)
    const sway = gsap.to(hood, {
      rotation: 4, // Increased natural sway from 2 to 4
      duration: 3.5,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: 4.8,
    });

    const p2Sway = gsap.to(sectionRef.current!.querySelector('.hero__parallax-2'), {
      x: '-=10',
      y: '+=8',
      duration: 4.5,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: 4.8,
    });

    const p3Sway = gsap.to(sectionRef.current!.querySelector('.hero__parallax-3'), {
      x: '+=10',
      y: '+=8',
      duration: 4.8,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: 5.0,
    });

    return () => { bob.kill(); sway.kill(); p2Sway.kill(); p3Sway.kill(); };
  }, [preloaderDone, prefersReducedMotion]);

  // ── SCROLL-DRIVEN PARALLAX — Cinematic depth transition into About ──
  useEffect(() => {
    if (prefersReducedMotion || !preloaderDone) return;
    const section = sectionRef.current;
    if (!section) return;

    // Wait for entrance animation to finish before applying scroll parallax
    let ctx: gsap.Context | null = null;
    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
        const isMobile = window.innerWidth < 768;

        // Background text moves slowest (deep background)
        gsap.to('.hero__bg-text-container', {
          y: isMobile ? '-5vh' : '-10vh',
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });

        // Parallax 2 (Left Cloud) — symmetrical upward & outward drift
        gsap.to('.hero__parallax-2', {
          y: isMobile ? '-10vh' : '-25vh',
          x: isMobile ? '-3vw' : '-12vw',
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });

        // Parallax 3 (Right Cloud) — symmetrical upward & outward drift
        gsap.to('.hero__parallax-3', {
          y: isMobile ? '-10vh' : '-25vh',
          x: isMobile ? '3vw' : '12vw',
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });

      }, section);
    }, 5000); // Wait for entrance animation to fully settle

    return () => {
      clearTimeout(timer);
      ctx?.revert();
    };
  }, [prefersReducedMotion, preloaderDone]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="hero"
      aria-label="Hero section — Dr. Duct UK commercial kitchen extraction specialists"
    >
      {/* ── Cycling Background Text (CLEANER/SHARPER/HEALTHIER) ── */}
      <div className="hero__bg-text-container" aria-hidden="true">
        {CYCLING_WORDS.map((word, idx) => (
          <div
            key={word}
            className={`hero__bg-text ${idx === wordIndex ? 'is-active' : ''}`}
          >
            {word}
          </div>
        ))}
      </div>

      {/* ── Cinematic Overlays ── */}
      <div className="hero__overlay-container">
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <LightRays
            raysOrigin="top-center"
            raysColor="#d8f000"
            raysSpeed={1.5}
            lightSpread={0.8}
            rayLength={2.5}
            followMouse={true}
            mouseInfluence={0.2}
            noiseAmount={0.05}
          />
        </div>
        <SideRays
          speed={2.5}
          rayColor1="#d8f000" // matching the lime green theme
          rayColor2="#ffffff"
          intensity={1.5}
          spread={2}
          origin="top-right"
          tilt={-10}
          saturation={1.0}
          blend={0.5}
          falloff={1.8}
          opacity={0.3}
          className="hero__side-rays"
        />
        <CinematicOverlay />
      </div>

      {/* ── Hanging Hood — Central Focal Point ── */}
      <div className="hero__hood-wrapper" aria-hidden="true">
        <div ref={hoodRef} className="hero__hood">
          <img
            src={hoodImage}
            alt="Dr. Duct UK extraction hood"
            className="hero__hood-img"
            loading="eager"
            draggable={false}
          />
        </div>
        {/* Warm underglow effect */}
        <div ref={glowRef} className="hero__hood-glow" />
      </div>

      {/* ── Additional Parallax Elements ── */}
      <div className="hero__parallax-wrapper hero__parallax-2" aria-hidden="true">
        <img src={parallax2} alt="" className="hero__parallax-img" draggable={false} />
      </div>
      <div className="hero__parallax-wrapper hero__parallax-3" aria-hidden="true">
        <img src={parallax3} alt="" className="hero__parallax-img" draggable={false} />
      </div>

      {/* ── Hero Content (Typography) ── */}
      <div className="hero__content-container">
        <HeroContent />
      </div>

    </section>
  );
}
