import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import transitionImg from '../../assets/images/parallax2fordiffereentiating.png';
import './SectionSeparator.css';

gsap.registerPlugin(ScrollTrigger);

export default function SectionSeparator() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If the user prefers reduced motion, don't do parallax
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Very subtle parallax effect for depth (Main Torn Edge)
      gsap.fromTo(imgRef.current, 
        { y: -20 },
        {
          y: 30, // move down slightly as user scrolls down
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        }
      );
      
      // Optionally add a subtle rotation or scale if it improves the tear effect
      // But user requested "do not over-animate it"

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="section-separator" aria-hidden="true">
      <div className="section-separator__wrapper" ref={wrapperRef}>
        <img
          ref={imgRef}
          src={transitionImg}
          alt=""
          className="section-separator__img"
          loading="lazy"
        />
        <div className="section-separator__smoke"></div>
        <div className="section-separator__dust"></div>
      </div>
    </div>
  );
}
