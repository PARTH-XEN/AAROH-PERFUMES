import React, { useEffect, useRef } from 'react';

interface FilmStageProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  scrollProgress: number;
}

export const FilmStage: React.FC<FilmStageProps> = ({ canvasRef }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      // Use higher DPR for 4K TV crispness
      const dpr = Math.min(Math.max(window.devicePixelRatio || 1, 2), 3);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [canvasRef]);

  return (
    <div
      ref={containerRef}
      className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center bg-black"
    >
      {/* 2D Canvas for Film Scrubbing with 4K Sharpness */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
      />

      {/* Cinematic Anamorphic Vignette & Edge Shadow */}
      <div className="film-vignette absolute inset-0 pointer-events-none z-10" />

      {/* 4K OLED Ambient Golden Specular Glow */}
      <div className="luxury-glow absolute inset-0 pointer-events-none z-15 mix-blend-screen opacity-50" />

      {/* Film Grain Texture Simulation for High-End Motion Picture Feel */}
      <div
        className="absolute inset-0 pointer-events-none z-16 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
    </div>
  );
};
