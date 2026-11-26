/* ================================================
   useGyroParallax — Mobile Device Orientation Parallax
   Smooth low-pass filtered gyroscope depth for mobile hero
   ================================================ */

import { useEffect, useRef, useState, useCallback, type RefObject } from 'react';

export type MotionPermissionState = 'unsupported' | 'prompt' | 'granted' | 'denied';

interface DeviceOrientationEventiOS {
  requestPermission?: () => Promise<'granted' | 'denied'>;
}

interface UseGyroParallaxOptions {
  sectionRef: RefObject<HTMLElement | null>;
  enabled: boolean;
  prefersReducedMotion: boolean;
}

const isMobileViewport = (): boolean => {
  if (typeof window === 'undefined') return false;
  return (
    window.innerWidth < 768 ||
    (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent) && window.innerWidth < 1024)
  );
};

const supportsDeviceOrientation = (): boolean => {
  return typeof window !== 'undefined' && 'DeviceOrientationEvent' in window;
};

const requiresIOSPermission = (): boolean => {
  if (!supportsDeviceOrientation()) return false;
  const doe = window.DeviceOrientationEvent as unknown as DeviceOrientationEventiOS;
  return typeof doe.requestPermission === 'function';
};

const clamp = (val: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, val));

export function useGyroParallax({
  sectionRef,
  enabled,
  prefersReducedMotion,
}: UseGyroParallaxOptions) {
  const [permission, setPermission] = useState<MotionPermissionState>(() => {
    if (typeof window === 'undefined' || prefersReducedMotion) return 'unsupported';
    if (!isMobileViewport() || !supportsDeviceOrientation()) return 'unsupported';
    return requiresIOSPermission() ? 'prompt' : 'granted';
  });

  // Sensor state in refs — zero React re-renders per orientation event
  const targetRef = useRef({ x: 0, y: 0 });
  const smoothedRef = useRef({ x: 0, y: 0 });
  const baselineRef = useRef<{ beta: number; gamma: number } | null>(null);
  const inViewRef = useRef(true);
  const rafRef = useRef(0);

  // Re-evaluate support if viewport resizes across mobile/desktop threshold
  useEffect(() => {
    const checkSupport = () => {
      if (prefersReducedMotion || !isMobileViewport() || !supportsDeviceOrientation()) {
        setPermission('unsupported');
        return;
      }
      setPermission((prev) => {
        if (prev === 'unsupported') {
          return requiresIOSPermission() ? 'prompt' : 'granted';
        }
        return prev;
      });
    };

    window.addEventListener('resize', checkSupport, { passive: true });
    return () => window.removeEventListener('resize', checkSupport);
  }, [prefersReducedMotion]);

  // Explicit iOS Safari permission request (must be triggered by user tap)
  const requestPermission = useCallback(async () => {
    if (!supportsDeviceOrientation()) {
      setPermission('unsupported');
      return;
    }

    const doe = window.DeviceOrientationEvent as unknown as DeviceOrientationEventiOS;
    if (typeof doe.requestPermission === 'function') {
      try {
        const result = await doe.requestPermission();
        baselineRef.current = null;
        setPermission(result === 'granted' ? 'granted' : 'denied');
      } catch {
        setPermission('denied');
      }
    } else {
      baselineRef.current = null;
      setPermission('granted');
    }
  }, []);

  // Track hero visibility so gyroscope work pauses when scrolled past hero
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        const isVisible = entries[0]?.isIntersecting ?? true;
        inViewRef.current = isVisible;
        if (!isVisible) {
          targetRef.current.x = 0;
          targetRef.current.y = 0;
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [sectionRef]);

  // DeviceOrientation listener + low-pass rAF transform loop
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !enabled || prefersReducedMotion || permission !== 'granted' || !isMobileViewport()) {
      return;
    }

    const hoodEl = section.querySelector<HTMLElement>('.hero__hood');
    const cloudLeftEl = section.querySelector<HTMLElement>('.hero__parallax-2 .hero__parallax-img');
    const cloudRightEl = section.querySelector<HTMLElement>('.hero__parallax-3 .hero__parallax-img');
    const raysEl = section.querySelector<HTMLElement>('.hero__side-rays');
    const glowEl = section.querySelector<HTMLElement>('.hero__hood-glow');
    const bgTextEls = section.querySelectorAll<HTMLElement>('.hero__bg-text');

    const MAX_TILT_DEG = 24;
    const DEADZONE = 0.03;

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (!inViewRef.current) return;
      if (e.beta === null || e.gamma === null) return;

      // Capture natural holding angle on first reading so resting position is (0, 0)
      if (!baselineRef.current) {
        baselineRef.current = { beta: e.beta, gamma: e.gamma };
        return;
      }

      const deltaGamma = clamp(e.gamma - baselineRef.current.gamma, -MAX_TILT_DEG, MAX_TILT_DEG);
      const deltaBeta = clamp(e.beta - baselineRef.current.beta, -MAX_TILT_DEG, MAX_TILT_DEG);

      let nx = deltaGamma / MAX_TILT_DEG;
      let ny = deltaBeta / MAX_TILT_DEG;

      // Micro-jitter deadzone
      if (Math.abs(nx) < DEADZONE) nx = 0;
      if (Math.abs(ny) < DEADZONE) ny = 0;

      targetRef.current.x = nx;
      targetRef.current.y = ny;
    };

    const resetTransforms = () => {
      if (hoodEl) hoodEl.style.transform = '';
      if (cloudLeftEl) cloudLeftEl.style.transform = '';
      if (cloudRightEl) cloudRightEl.style.transform = '';
      if (raysEl) raysEl.style.transform = '';
      if (glowEl) glowEl.style.transform = '';
      bgTextEls.forEach((el) => {
        el.style.transform = '';
      });
    };

    let lastAppliedX = 0;
    let lastAppliedY = 0;

    const tick = () => {
      if (inViewRef.current) {
        // Low-pass filter (0.1 smoothing factor for fluid, jitter-free motion)
        smoothedRef.current.x += (targetRef.current.x - smoothedRef.current.x) * 0.1;
        smoothedRef.current.y += (targetRef.current.y - smoothedRef.current.y) * 0.1;

        const sx = smoothedRef.current.x;
        const sy = smoothedRef.current.y;

        if (Math.abs(sx - lastAppliedX) > 0.001 || Math.abs(sy - lastAppliedY) > 0.001) {
          lastAppliedX = sx;
          lastAppliedY = sy;

          // 1. Background watermark: extremely subtle depth (±4px X, ±3px Y)
          const bgX = (-sx * 4).toFixed(2);
          const bgY = (-sy * 3).toFixed(2);
          bgTextEls.forEach((el) => {
            el.style.transform = `translate3d(calc(-50% + ${bgX}px), calc(-50% + ${bgY}px), 0)`;
          });

          // 2. Left & right clouds: subtle atmospheric depth (±8px X, ±6px Y)
          const cloudX = (sx * 8).toFixed(2);
          const cloudY = (sy * 6).toFixed(2);
          if (cloudLeftEl) {
            cloudLeftEl.style.transform = `translate3d(${cloudX}px, ${cloudY}px, 0)`;
          }
          if (cloudRightEl) {
            cloudRightEl.style.transform = `translate3d(${cloudX}px, ${cloudY}px, 0)`;
          }

          // 3. Extraction hood: moderate controlled focal movement (±13px X, ±9px Y, ±2.2deg)
          if (hoodEl) {
            const hoodX = (sx * 13).toFixed(2);
            const hoodY = (sy * 9).toFixed(2);
            const hoodRot = (sx * 2.2).toFixed(2);
            hoodEl.style.transform = `translate3d(${hoodX}px, ${hoodY}px, 0) rotate(${hoodRot}deg)`;
          }

          // 4. Foreground glow & atmospheric rays: slightly stronger depth (±17px X, ±11px Y)
          if (glowEl) {
            glowEl.style.transform = `translate3d(${(sx * 16).toFixed(2)}px, ${(sy * 10).toFixed(2)}px, 0)`;
          }
          if (raysEl) {
            raysEl.style.transform = `translate3d(${(sx * 17).toFixed(2)}px, ${(sy * 11).toFixed(2)}px, 0)`;
          }
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener('deviceorientation', handleOrientation, { passive: true });
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
      baselineRef.current = null;
      targetRef.current = { x: 0, y: 0 };
      smoothedRef.current = { x: 0, y: 0 };
      resetTransforms();
    };
  }, [sectionRef, enabled, prefersReducedMotion, permission]);

  return {
    permission,
    requestPermission,
  };
}
