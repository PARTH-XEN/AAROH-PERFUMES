import React from 'react';

export const PhilosophySection: React.FC = () => {
  return (
    <section id="philosophy" className="relative py-28 md:py-40 bg-obsidian-900 border-t border-white/[0.04] overflow-hidden">
      {/* Background Subtle Luxury Light Texture */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <span className="text-[10px] tracking-ethereal uppercase text-gold font-sans mb-4">
            Our Philosophy
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-ivory font-light max-w-3xl leading-[1.15]">
            &ldquo;Some fragrances are worn. <br />
            <span className="italic text-gold-bright">Others are remembered.&rdquo;</span>
          </h2>
          <div className="w-16 h-[1px] bg-gold/40 mt-8" />
        </div>

        {/* Editorial Split Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-6 text-ivory/70 font-sans font-light text-sm md:text-base leading-relaxed">
            <p className="first-letter:font-serif first-letter:text-5xl first-letter:text-gold first-letter:mr-3 first-letter:float-left">
              AAROH is conceived as an invisible couture garment. We reject the synthetic mass-production of fleeting seasonal fragrances. Instead, we craft timeless olfactive journeys that unfold organically over twelve hours of intimate wear.
            </p>
            <p>
              By marrying centuries of traditional steam distillation with contemporary molecular scent design, each flacon becomes an intimate portrait of self-realization—the art of becoming who you were destined to be.
            </p>

            <div className="pt-6 grid grid-cols-2 gap-6 border-t border-white/[0.06]">
              <div>
                <span className="block font-serif text-2xl md:text-3xl text-gold font-light">32%</span>
                <span className="text-[10px] tracking-widest uppercase text-ivory/40">Extrait de Parfum</span>
              </div>
              <div>
                <span className="block font-serif text-2xl md:text-3xl text-gold font-light">120 Days</span>
                <span className="text-[10px] tracking-widest uppercase text-ivory/40">Maceration in Glass</span>
              </div>
            </div>
          </div>

          {/* Editorial Image Card from START.webp */}
          <div className="relative group overflow-hidden rounded-sm border border-white/[0.06] shadow-2xl bg-obsidian-800">
            <img
              src="/assets/images/start.webp"
              alt="AAROH Silhouette Crafting"
              className="w-full aspect-[4/3] object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-[9px] tracking-widest uppercase text-gold font-sans block mb-1">
                The Silhouette
              </span>
              <p className="font-serif italic text-sm text-ivory/90">
                Purity born from absolute shadow.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
