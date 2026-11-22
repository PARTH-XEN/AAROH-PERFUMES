import React, { useState } from 'react';
import { OlfactoryTier, NoteDetail } from '../../types';

export const FragranceNotesSection: React.FC = () => {
  const [activeTier, setActiveTier] = useState<OlfactoryTier>('opening');

  const notesData: Record<OlfactoryTier, NoteDetail> = {
    opening: {
      title: 'Top / Opening Notes',
      subtitle: 'The First Breath (0 – 30 Minutes)',
      ingredients: ['Calabrian Bergamot', 'Wild Kashmiri Saffron', 'Golden Citrus Zest'],
      description:
        'A brilliant, incandescent awakening. The crispness of sun-drenched bergamot balances with the rare warmth and crimson intrigue of sun-dried saffron threads.',
      characteristics: 'Bright, luminous, crisp yet mysteriously spicy.',
    },
    heart: {
      title: 'Heart Notes',
      subtitle: 'The Soul Accord (30 Minutes – 4 Hours)',
      ingredients: ['Centifolia Rose Absolue', 'Rare Golden Amber', 'Cardamom Mist'],
      description:
        'As the initial luminescence softens, a velvety heart blooms. Hand-harvested May roses wrapped in resinous, liquid amber reveal an intoxicating depth.',
      characteristics: 'Warm, magnetic, opulent and timelessly romantic.',
    },
    base: {
      title: 'Base Notes',
      subtitle: 'The Enduring Sillage (4 – 14 Hours)',
      ingredients: ['Mysore Sandalwood', 'Skin Musk', 'Smoked Cedarwood'],
      description:
        'The intimate foundation that lingers like a whisper on silk. Rare sustainably sourced sandalwood anchors a sensual second-skin musk that never fades into obscurity.',
      characteristics: 'Creamy, earthy, unforgettable and profoundly personal.',
    },
  };

  const current = notesData[activeTier];

  return (
    <section id="notes" className="py-28 md:py-40 bg-obsidian-950 border-t border-white/[0.04] relative">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="text-[10px] tracking-ethereal uppercase text-gold font-sans mb-3 block">
            Olfactory Architecture
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-ivory font-light leading-tight">
            The Scent Pyramid
          </h2>
          <p className="mt-4 text-xs md:text-sm tracking-widest uppercase text-ivory/50 font-sans max-w-md mx-auto">
            A tripartite harmony designed to evolve upon the skin.
          </p>
        </div>

        {/* Tier Selector Pills */}
        <div className="flex justify-center gap-3 md:gap-4 mb-16">
          {(['opening', 'heart', 'base'] as OlfactoryTier[]).map((tier) => (
            <button
              key={tier}
              onClick={() => setActiveTier(tier)}
              className={`px-6 py-2.5 rounded-full text-xs tracking-widest uppercase font-sans transition-all duration-300 border ${
                activeTier === tier
                  ? 'border-gold bg-gold/20 text-gold-bright shadow-lg shadow-gold/10'
                  : 'border-white/10 text-ivory/50 hover:text-ivory hover:border-white/30 bg-white/[0.02]'
              }`}
            >
              {tier === 'opening' && 'Opening'}
              {tier === 'heart' && 'Heart'}
              {tier === 'base' && 'Base'}
            </button>
          ))}
        </div>

        {/* Note Presentation Panel */}
        <div className="bg-obsidian-900 border border-white/[0.06] p-8 md:p-14 rounded-sm shadow-2xl transition-all duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Info Column */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs text-gold tracking-widest uppercase font-sans">
                  {current.subtitle}
                </span>
                <h3 className="font-serif text-3xl md:text-4xl text-ivory mt-1 font-light">
                  {current.title}
                </h3>
              </div>

              <p className="text-sm md:text-base text-ivory/70 font-sans font-light leading-relaxed">
                {current.description}
              </p>

              <div className="pt-4 border-t border-white/[0.06]">
                <span className="text-[10px] tracking-widest uppercase text-ivory/40 block mb-1">
                  Olfactory Character
                </span>
                <p className="font-serif italic text-gold-bright text-lg">
                  &ldquo;{current.characteristics}&rdquo;
                </p>
              </div>
            </div>

            {/* Right Ingredients Column */}
            <div className="lg:col-span-5 bg-obsidian-800/60 p-6 md:p-8 border border-white/[0.04] rounded-sm space-y-4">
              <span className="text-[10px] tracking-widest uppercase text-gold block font-sans mb-3">
                Key Accords
              </span>
              {current.ingredients.map((ing, i) => (
                <div
                  key={ing}
                  className="flex items-center gap-3 p-3 bg-white/[0.02] border border-white/[0.03] rounded-sm"
                >
                  <div className="w-6 h-6 rounded-full bg-gold/15 flex items-center justify-center text-gold text-xs">
                    {i + 1}
                  </div>
                  <span className="font-serif text-base text-ivory/90 font-light tracking-wide">
                    {ing}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
