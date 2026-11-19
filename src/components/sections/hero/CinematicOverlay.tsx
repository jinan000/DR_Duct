/* ================================================
   CinematicOverlay — Multi-gradient depth overlay
   Vignette, gradients, radial glow, grain
   ================================================ */

export default function CinematicOverlay() {
  return (
    <div className="hero__overlays" aria-hidden="true">
      {/* 1 — Base dark overlay for overall contrast */}
      <div className="hero__overlay hero__overlay--base" />

      {/* 2 — Left gradient for typography readability */}
      <div className="hero__overlay hero__overlay--left" />

      {/* 3 — Bottom vignette */}
      <div className="hero__overlay hero__overlay--bottom" />

      {/* 4 — Edge vignette — all four corners darker */}
      <div className="hero__overlay hero__overlay--vignette" />

      {/* 5 — Subtle radial lime ambient glow near hood area */}
      <div className="hero__overlay hero__overlay--glow" />

      {/* 6 — Top fade for header integration */}
      <div className="hero__overlay hero__overlay--top" />

      {/* 7 — Film grain texture */}
      <div className="hero__overlay hero__overlay--grain" />
    </div>
  );
}
