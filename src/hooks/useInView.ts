import { useEffect, useRef, useState } from 'react';

export function useInView({
  threshold = 0.1,
  rootMargin = '0px 0px -50px 0px',
  root = null,
}: IntersectionObserverInit = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        // Once visible, we don't need to observe anymore for a reveal animation
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      }
    }, { threshold, rootMargin, root });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, rootMargin, root]);

  return { ref, isInView };
}
