import { useState, useEffect } from 'react';
import logo from '../../assets/images/logo.png';
import './Preloader.css';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Total animation: 4.5s
    const holdTime = reducedMotion ? 800 : 4200;
    const exitDuration = 300;

    const holdTimer = setTimeout(() => setExiting(true), holdTime);
    const completeTimer = setTimeout(() => onComplete(), holdTime + exitDuration);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`preloader-cycle ${exiting ? 'exiting' : ''}`}
      role="status"
      aria-label="Loading DR. DUCT UK LTD"
    >
      <span className="sr-only">Loading, please wait…</span>

      <div className="preloader-bg" aria-hidden="true" />

      <div className="preloader-stage">
        
        {/* The 10 Dots Loader (2 rows of 5) */}
        <div className="dots-container">
          <div className="dots-row">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
          <div className="dots-row">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        </div>

        {/* Logo Reveal */}
        <div className="logo-reveal-container">
          <img src={logo} alt="DR. DUCT UK LTD" className="premium-logo" draggable={false} />
        </div>

      </div>
    </div>
  );
}
