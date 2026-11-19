/* ================================================
   SteamLayer — Atmospheric smoke/steam effect
   Subtle breathing, opacity, drift for realism
   ================================================ */

import { useEffect, useRef } from 'react';

interface SteamLayerProps {
  src: string;
  mouseIntensity: number;
  scrollFactor: number;
  scale: number;
  zIndex: number;
  registerLayer: (id: string, config: { el: HTMLElement | null; mouseIntensity: number; scrollFactor: number }) => void;
  unregisterLayer: (id: string) => void;
  layerId: string;
  prefersReducedMotion: boolean;
}

export default function SteamLayer({
  src,
  mouseIntensity,
  scrollFactor,
  scale,
  zIndex,
  registerLayer,
  unregisterLayer,
  layerId,
  prefersReducedMotion,
}: SteamLayerProps) {
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
      className={`hero__layer hero__steam ${prefersReducedMotion ? 'hero__steam--static' : ''}`}
      data-layer={layerId}
      style={{
        zIndex,
        willChange: prefersReducedMotion ? 'auto' : 'transform, opacity',
      }}
      aria-hidden="true"
    >
      <img
        src={src}
        alt=""
        className="hero__layer-img hero__steam-img"
        loading="eager"
        draggable={false}
        style={{
          transform: `scale(${scale})`,
        }}
      />
    </div>
  );
}
