/* ================================================
   useParallax — Mouse + Scroll Parallax Engine
   GPU-composited, GSAP-interpolated, zero re-renders
   ================================================ */

import { useEffect, useRef, useCallback, useState } from 'react';
import gsap from 'gsap';

export interface ParallaxLayerConfig {
  /** Reference to the DOM element */
  el: HTMLElement;
  /** Mouse movement intensity in px (e.g. ±4 for background, ±32 for foreground) */
  mouseIntensity: number;
  /** Scroll speed factor (e.g. 0.08 for background, 0.22 for foreground) */
  scrollFactor: number;
}

/**
 * useParallax — Core parallax engine
 *
 * Tracks mouse position and scroll offset, drives smooth GSAP interpolation
 * for registered depth layers. Single rAF loop, passive listeners,
 * zero React re-renders during parallax motion.
 */
export function useParallax() {
  const containerRef = useRef<HTMLElement | null>(null);
  const layerRegistryRef = useRef<Map<string, ParallaxLayerConfig>>(new Map());
  const quickToMapRef = useRef<Map<string, { x: gsap.QuickToFunc; y: gsap.QuickToFunc }>>(new Map());
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(0);
  const activeRef = useRef(false);
  const intensityMultiplierRef = useRef(1);

  // ── Reduced motion detection ──
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  // ── Layer registration ──
  const registerLayer = useCallback((id: string, config: { el: HTMLElement | null; mouseIntensity: number; scrollFactor: number }) => {
    if (!config.el) return;
    const typedConfig = config as ParallaxLayerConfig;
    layerRegistryRef.current.set(id, typedConfig);

    quickToMapRef.current.set(id, {
      x: gsap.quickTo(typedConfig.el, 'x', { duration: 0.8, ease: 'power3.out' }),
      y: gsap.quickTo(typedConfig.el, 'y', { duration: 0.8, ease: 'power3.out' }),
    });
  }, []);

  const unregisterLayer = useCallback((id: string) => {
    layerRegistryRef.current.delete(id);
    quickToMapRef.current.delete(id);
  }, []);

  // ── Activate parallax (called after entrance animation) ──
  const activate = useCallback(() => {
    activeRef.current = true;
  }, []);

  // ── Responsive intensity scaling ──
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 768) intensityMultiplierRef.current = 0;
      else if (w < 1024) intensityMultiplierRef.current = 0.5;
      else if (w < 1440) intensityMultiplierRef.current = 0.8;
      else intensityMultiplierRef.current = 1;
    };
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ── Mouse tracking ──
  useEffect(() => {
    if (prefersReducedMotion) return;
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!activeRef.current) return;
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseRef.current.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = 0;
      mouseRef.current.y = 0;
    };

    container.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [prefersReducedMotion]);

  // ── Single rAF parallax loop ──
  useEffect(() => {
    if (prefersReducedMotion) return;

    const tick = () => {
      // Stop running rAF work on mobile viewports (< 768px) where parallax intensity is 0
      if (intensityMultiplierRef.current === 0) {
        rafRef.current = 0;
        return;
      }

      if (!activeRef.current) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const scrollY = window.scrollY;
      const mx = mouseRef.current.x * intensityMultiplierRef.current;
      const my = mouseRef.current.y * intensityMultiplierRef.current;

      layerRegistryRef.current.forEach((config, id) => {
        const qt = quickToMapRef.current.get(id);
        if (!qt) return;

        const mouseX = mx * config.mouseIntensity;
        const mouseY = my * config.mouseIntensity * 0.6;
        // On mobile touch viewports, rely cleanly on ScrollTrigger for scroll scrubbing to avoid competing transform loops
        const scrollFactor = intensityMultiplierRef.current < 0.45 ? 0 : config.scrollFactor;
        const scrollOffset = scrollY * -scrollFactor;

        qt.x(mouseX);
        qt.y(mouseY + scrollOffset);
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    const startIfDesktop = () => {
      if (intensityMultiplierRef.current > 0 && !rafRef.current) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    startIfDesktop();
    window.addEventListener('resize', startIfDesktop, { passive: true });
    return () => {
      window.removeEventListener('resize', startIfDesktop);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    };
  }, [prefersReducedMotion]);

  return {
    containerRef,
    registerLayer,
    unregisterLayer,
    prefersReducedMotion,
    activate,
  };
}
