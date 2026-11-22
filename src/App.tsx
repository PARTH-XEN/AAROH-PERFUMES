import React, { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { useFrameScrubber } from './hooks/useFrameScrubber';
import { Loader } from './components/layout/Loader';
import { Navbar } from './components/layout/Navbar';
import { FilmStage } from './components/canvas/FilmStage';
import { SceneOverlays } from './components/canvas/SceneOverlays';
import { PhilosophySection } from './components/sections/PhilosophySection';
import { FragranceNotesSection } from './components/sections/FragranceNotesSection';
import { CraftAnatomySection } from './components/sections/CraftAnatomySection';
import { ProductShowcaseSection } from './components/sections/ProductShowcaseSection';
import { EditorialFooter } from './components/sections/EditorialFooter';
import { audioEngine } from './utils/audio';

export const App: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Frame scrubber hook with manifest
  const { isReady, loadPercentage, drawFrame } = useFrameScrubber({
    manifestUrl: '/frames/manifest.json',
  });

  // Setup Lenis Smooth Scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.5,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Track scroll position inside the track
    const handleScroll = () => {
      if (!trackRef.current) return;
      const track = trackRef.current;
      const rect = track.getBoundingClientRect();
      const trackHeight = track.offsetHeight - window.innerHeight;

      if (trackHeight > 0) {
        // Calculate progress from 0 to 1
        const rawProgress = -rect.top / trackHeight;
        const clampedProgress = Math.min(Math.max(rawProgress, 0), 1);
        setScrollProgress(clampedProgress);

        // Modulate ambient sound frequency with scroll
        audioEngine.modulateWithScroll(clampedProgress);

        if (canvasRef.current) {
          drawFrame(canvasRef.current, clampedProgress);
        }
      }
    };

    lenis.on('scroll', handleScroll);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [drawFrame]);

  // Initial draw once ready
  useEffect(() => {
    if (isReady && canvasRef.current) {
      drawFrame(canvasRef.current, 0);
    }
  }, [isReady, drawFrame]);

  return (
    <div className="relative min-h-screen bg-black text-ivory">
      {/* Editorial Hairline Loader */}
      <Loader progress={loadPercentage} isReady={isReady} />

      {/* Floating Glass Navbar */}
      <Navbar />

      {/* ── THE CINEMATIC SCROLL EXPERIENCE (AirPods / Apple-style) ── */}
      <section id="fragrance" ref={trackRef} className="relative h-[850vh] bg-black">
        <FilmStage canvasRef={canvasRef} scrollProgress={scrollProgress} />
        <SceneOverlays progress={scrollProgress} />
      </section>

      {/* ── EDITORIAL LUXURY SECTIONS ── */}
      <main className="relative z-30 bg-obsidian-900">
        <PhilosophySection />
        <FragranceNotesSection />
        <CraftAnatomySection />
        <ProductShowcaseSection />
      </main>

      {/* ── FOOTER ── */}
      <EditorialFooter />
    </div>
  );
};

export default App;
