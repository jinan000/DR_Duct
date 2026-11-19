/* ================================================
   ParallaxLayer — Individual depth layer
   GPU-composited via translate3d()
   ================================================ */

import { useEffect, useRef } from 'react';

interface ParallaxLayerProps {
  src: string;
  alt: string;
  mouseIntensity: number;
  scrollFactor: number;
  scale: number;
  zIndex: number;
  className?: string;
  style?: React.CSSProperties;
  loading?: 'eager' | 'lazy';
  registerLayer: (id: string, config: { el: HTMLElement | null; mouseIntensity: number; scrollFactor: number }) => void;
  unregisterLayer: (id: string) => void;
  layerId: string;
}

export default function ParallaxLayer({
  src,
  alt,
  mouseIntensity,
  scrollFactor,
  scale,
  zIndex,
  className = '',
  style,
  loading = 'eager',
  registerLayer,
  unregisterLayer,
  layerId,
}: ParallaxLayerProps) {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (layerRef.current) {
      registerLayer(layerId, {
        el: layerRef.current,
        mouseIntensity,
        scrollFactor,
      });
    }
    return () => unregisterLayer(layerId);
  }, [layerId, mouseIntensity, scrollFactor, registerLayer, unregisterLayer]);

  return (
    <div
      ref={layerRef}
      className={`hero__layer ${className}`}
      data-layer={layerId}
      style={{
        zIndex,
        willChange: 'transform',
        ...style,
      }}
      aria-hidden="true"
    >
      <img
        src={src}
        alt={alt}
        className="hero__layer-img"
        loading={loading}
        draggable={false}
        style={{
          transform: `scale(${scale})`,
        }}
      />
    </div>
  );
}
