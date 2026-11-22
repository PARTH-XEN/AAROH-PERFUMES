import React from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';

interface SceneOverlaysProps {
  progress: number;
}

// Compute smooth opacity based on in, hold, and out points
function getSceneOpacity(p: number, tIn: number, tHold: number, tOut: number): number {
  if (p < tIn || p > tOut) return 0;
  if (p <= tHold) {
    const span = Math.max(tHold - tIn, 0.01);
    return Math.min(Math.max((p - tIn) / span, 0), 1);
  } else {
    const span = Math.max(tOut - tHold, 0.01);
    return Math.min(Math.max((tOut - p) / span, 0), 1);
  }
}

export const SceneOverlays: React.FC<SceneOverlaysProps> = ({ progress }) => {
  // Scene 1: The Awakening (0 - 10%)
  const op1 = getSceneOpacity(progress, -0.05, 0.02, 0.09);

  // Scene 2: The Reveal (10 - 30%)
  const op2 = getSceneOpacity(progress, 0.10, 0.19, 0.29);

  // Scene 3: The Liquid Soul (30 - 48%)
  const op3 = getSceneOpacity(progress, 0.30, 0.38, 0.47);

  // Scene 4: The Anatomy (48 - 68%)
  const op4 = getSceneOpacity(progress, 0.48, 0.57, 0.67);

  // Scene 5: The Transformation (68 - 85%)
  const op5 = getSceneOpacity(progress, 0.68, 0.76, 0.84);

  // Scene 6: The Grand Finale (85 - 100%)
  const op6 = getSceneOpacity(progress, 0.85, 0.94, 1.05);

  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
      {/* ── SCENE 01: THE AWAKENING ── */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 transition-all duration-300"
        style={{
          opacity: op1,
          transform: `translateY(${(progress - 0.02) * -30}px)`,
        }}
      >
        <span className="text-[11px] tracking-ethereal uppercase text-gold/70 font-sans mb-3 flex items-center gap-2">
          <Sparkles size={13} className="text-gold" />
          <span>Scene 01 &bull; The Awakening</span>
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl md:text-8xl tracking-monumental text-ivory font-light uppercase">
          AAROH
        </h1>
        <p className="mt-4 text-xs md:text-sm tracking-widest uppercase text-ivory/50 font-sans max-w-sm">
          The art of becoming.
        </p>
      </div>

      {/* ── SCENE 02: THE REVEAL ── */}
      <div
        className="absolute left-6 md:left-20 top-1/2 -translate-y-1/2 max-w-lg transition-all duration-300"
        style={{
          opacity: op2,
          transform: `translateY(calc(-50% + ${(progress - 0.19) * -40}px))`,
        }}
      >
        <span className="text-[10px] tracking-ethereal uppercase text-gold font-sans block mb-2">
          Scene 02 &bull; The Reveal
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-ivory font-light leading-[1.1]">
          An essence <br />
          <span className="italic font-normal text-gold-bright">beyond time.</span>
        </h2>
        <p className="mt-4 text-sm md:text-base text-ivory/60 font-sans font-light leading-relaxed max-w-md">
          An expression of identity, captured in a single drop. Created for those who exist in memory long after they have departed.
        </p>
      </div>

      {/* ── SCENE 03: THE LIQUID SOUL ── */}
      <div
        className="absolute right-6 md:right-20 top-1/2 -translate-y-1/2 max-w-lg text-right transition-all duration-300"
        style={{
          opacity: op3,
          transform: `translateY(calc(-50% + ${(progress - 0.38) * -40}px))`,
        }}
      >
        <span className="text-[10px] tracking-ethereal uppercase text-gold font-sans block mb-2">
          Scene 03 &bull; Liquid Soul
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-ivory font-light leading-[1.1]">
          Beyond the fragrance. <br />
          <span className="italic font-normal text-gold-bright">Into the feeling.</span>
        </h2>
        <p className="mt-4 text-sm md:text-base text-ivory/60 font-sans font-light leading-relaxed max-w-md ml-auto">
          Golden liquid suspended in stillness. Every micro-drop infused with concentrated botanical extracts aged in oak and crystal.
        </p>
      </div>

      {/* ── SCENE 04: THE ANATOMY ── */}
      <div
        className="absolute inset-x-6 md:inset-x-20 top-1/2 -translate-y-1/2 flex flex-col md:flex-row items-center justify-between gap-8 transition-all duration-300"
        style={{
          opacity: op4,
          transform: `translateY(calc(-50% + ${(progress - 0.57) * -30}px))`,
        }}
      >
        <div className="max-w-md">
          <span className="text-[10px] tracking-ethereal uppercase text-gold font-sans block mb-2">
            Scene 04 &bull; The Anatomy
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-ivory font-light leading-[1.1]">
            Every detail <br />
            <span className="italic font-normal text-gold">has a purpose.</span>
          </h2>
          <p className="mt-4 text-sm text-ivory/60 font-sans font-light leading-relaxed">
            Formed with high-refraction optical flint glass and a hand-turned champagne gold cap engineered for an airtight olfactory seal.
          </p>
        </div>

        <div className="flex flex-col space-y-4 md:space-y-6 text-right">
          <div className="border-r-2 border-gold/40 pr-4">
            <span className="text-[10px] tracking-widest text-gold uppercase block font-sans">01 &bull; Flacon</span>
            <span className="text-xs md:text-sm text-ivory/80 font-light">Custom bevelled crystal</span>
          </div>
          <div className="border-r-2 border-gold/40 pr-4">
            <span className="text-[10px] tracking-widest text-gold uppercase block font-sans">02 &bull; Atomizer</span>
            <span className="text-xs md:text-sm text-ivory/80 font-light">Ultra-fine micro-mist</span>
          </div>
          <div className="border-r-2 border-gold/40 pr-4">
            <span className="text-[10px] tracking-widest text-gold uppercase block font-sans">03 &bull; Seal</span>
            <span className="text-xs md:text-sm text-ivory/80 font-light">Magnetic brass closure</span>
          </div>
        </div>
      </div>

      {/* ── SCENE 05: THE TRANSFORMATION ── */}
      <div
        className="absolute left-6 md:left-24 top-1/2 -translate-y-1/2 max-w-lg transition-all duration-300"
        style={{
          opacity: op5,
          transform: `translateY(calc(-50% + ${(progress - 0.76) * -40}px))`,
        }}
      >
        <span className="text-[10px] tracking-ethereal uppercase text-gold font-sans block mb-2">
          Scene 05 &bull; Transformation
        </span>
        <h2 className="font-serif text-4xl sm:text-6xl text-ivory font-light leading-[1.1]">
          Become <br />
          <span className="italic font-normal text-gold-bright">unforgettable.</span>
        </h2>
        <p className="mt-4 text-sm md:text-base text-ivory/60 font-sans font-light leading-relaxed">
          The perfume binds with your natural chemistry, unlocking a signature sillage that shifts subtly with temperature, heart rate, and presence.
        </p>
      </div>

      {/* ── SCENE 06: THE GRAND FINALE ── */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 transition-all duration-300 pointer-events-auto"
        style={{
          opacity: op6,
          transform: `translateY(${(progress - 0.94) * -20}px)`,
        }}
      >
        <span className="font-serif text-3xl sm:text-5xl md:text-7xl tracking-monumental text-gold uppercase font-light">
          AAROH
        </span>
        <span className="text-xs md:text-sm tracking-monumental text-ivory/70 uppercase mt-2 mb-4 font-sans">
          THE ART OF BECOMING
        </span>
        <p className="font-serif italic text-base sm:text-xl md:text-2xl text-ivory/80 max-w-lg mb-8 font-light">
          &ldquo;Not made to be seen. Made to be remembered.&rdquo;
        </p>
        <a
          href="#discover"
          className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-gold bg-gold/15 text-gold-bright hover:bg-gold hover:text-obsidian-950 font-sans text-xs tracking-widest uppercase transition-all duration-500 shadow-xl shadow-gold/10 hover:shadow-gold/30 hover:scale-105"
        >
          <span>Discover The Fragrance</span>
          <ArrowDown size={14} />
        </a>
      </div>

      {/* Bottom Scroll Indicator cue */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ivory/30 text-[10px] tracking-widest uppercase font-sans transition-opacity duration-300 pointer-events-none"
        style={{ opacity: progress < 0.03 ? 1 : 0 }}
      >
        <span>Scroll to Unveil</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-gold/60 to-transparent animate-pulse" />
      </div>
    </div>
  );
};
