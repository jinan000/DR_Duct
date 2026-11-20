import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollToOptions {
  offset?: number;
  duration?: number;
  immediate?: boolean;
  lock?: boolean;
  onComplete?: () => void;
}

interface SmoothScrollContextType {
  lenis: Lenis | null;
  scrollTo: (target: string | HTMLElement | number, options?: ScrollToOptions) => void;
  stop: () => void;
  start: () => void;
  refresh: () => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  lenis: null,
  scrollTo: () => {},
  stop: () => {},
  start: () => {},
  refresh: () => {},
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // 1. Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.0,
      syncTouch: false, // Use native touch momentum on mobile touchscreens (no stutter, freezing, or jumping)
      autoResize: true,
    });

    lenisRef.current = lenis;
    setLenisInstance(lenis);

    // Attach to window for global access/debugging
    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    // 2. Synchronize GSAP ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update);

    // 3. Drive Lenis with GSAP's ticker for zero-jitter, unified 60 FPS animation frame loop
    const tickerUpdate = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerUpdate);
    gsap.ticker.lagSmoothing(0);

    // 4. Smooth anchor link interceptor
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        const targetEl = document.querySelector(href);
        if (targetEl) {
          e.preventDefault();
          lenis.scrollTo(targetEl as HTMLElement, {
            offset: -60,
            duration: 1.2,
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick, { capture: true });

    // 5. Window resize listener to keep ScrollTrigger and Lenis dimensions synced
    const handleResize = () => {
      lenis.resize();
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      document.removeEventListener('click', handleAnchorClick, { capture: true });
      window.removeEventListener('resize', handleResize);
      gsap.ticker.remove(tickerUpdate);
      lenis.destroy();
      lenisRef.current = null;
      setLenisInstance(null);
      delete (window as unknown as { lenis?: Lenis }).lenis;
    };
  }, []);

  const scrollTo = useCallback((target: string | HTMLElement | number, options?: ScrollToOptions) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, {
        offset: options?.offset ?? 0,
        duration: options?.duration ?? 1.2,
        immediate: options?.immediate ?? false,
        lock: options?.lock ?? false,
        onComplete: options?.onComplete,
      });
    } else {
      if (typeof target === 'string') {
        const el = document.querySelector(target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else if (target instanceof HTMLElement) {
        target.scrollIntoView({ behavior: 'smooth' });
      } else if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: 'smooth' });
      }
    }
  }, []);

  const stop = useCallback(() => {
    lenisRef.current?.stop();
  }, []);

  const start = useCallback(() => {
    lenisRef.current?.start();
  }, []);

  const refresh = useCallback(() => {
    lenisRef.current?.resize();
    ScrollTrigger.refresh();
  }, []);

  return (
    <SmoothScrollContext.Provider
      value={{
        lenis: lenisInstance,
        scrollTo,
        stop,
        start,
        refresh,
      }}
    >
      {children}
    </SmoothScrollContext.Provider>
  );
}

export default SmoothScrollProvider;
