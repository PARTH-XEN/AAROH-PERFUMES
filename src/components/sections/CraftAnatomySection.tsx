import React from 'react';

export const CraftAnatomySection: React.FC = () => {
  const craftFeatures = [
    {
      num: '01',
      title: 'Faceted Optical Glass Flacon',
      desc: 'Formed from heavy optical flint glass, cut with micro-faceted prisms that capture ambient room light and illuminate the amber elixir from within.',
      spec: '100ml / 3.4 FL. OZ.',
    },
    {
      num: '02',
      title: 'Hand-Turned Champagne Gold Cap',
      desc: 'Solid metal alloy machined to hundredth-millimetre precision, weighted to provide tactile gravitas and a crisp magnetic snap upon closure.',
      spec: 'Magnetic Hermetic Seal',
    },
    {
      num: '03',
      title: 'Micro-Diffusion Atomizer',
      desc: 'Custom-engineered spray nozzle dispersing an ethereal 15-micron cloud, ensuring uniform coverage without dampening skin or fabric.',
      spec: '15 Micron Ultra-Mist',
    },
  ];

  return (
    <section id="craft" className="py-28 md:py-40 bg-obsidian-900 border-t border-white/[0.04] relative">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6">
          <div>
            <span className="text-[10px] tracking-ethereal uppercase text-gold font-sans mb-3 block">
              Architectural Craft
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-ivory font-light leading-tight">
              Form Follows Devotion
            </h2>
          </div>
          <p className="text-xs md:text-sm text-ivory/50 font-sans max-w-sm font-light leading-relaxed">
            Every contour of the flacon is an homage to timeless modernism and luxury craftsmanship.
          </p>
        </div>

        {/* Highlight Image & Cards Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Main Visual Image using END.webp */}
          <div className="lg:col-span-6 relative overflow-hidden rounded-sm border border-white/[0.06] bg-obsidian-950 shadow-2xl">
            <img
              src="/assets/images/end.webp"
              alt="AAROH Flacon in golden lighting"
              className="w-full aspect-[4/3] object-cover filter contrast-105 hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/70 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6">
              <span className="text-[10px] tracking-widest uppercase text-gold font-sans block mb-1">
                Completed Form
              </span>
              <p className="font-serif italic text-sm text-ivory/80">
                AAROH No. 01 on obsidian pedestal.
              </p>
            </div>
          </div>

          {/* 3 Detail Breakdown Cards */}
          <div className="lg:col-span-6 space-y-6">
            {craftFeatures.map((f) => (
              <div
                key={f.num}
                className="p-6 md:p-8 bg-obsidian-800/50 border border-white/[0.04] rounded-sm hover:border-gold/30 transition-colors duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-serif text-xl text-gold font-light">{f.num}</span>
                  <span className="text-[10px] tracking-widest uppercase text-ivory/40 font-sans">
                    {f.spec}
                  </span>
                </div>
                <h3 className="font-serif text-xl text-ivory font-light mb-2">{f.title}</h3>
                <p className="text-xs md:text-sm text-ivory/60 font-sans font-light leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
