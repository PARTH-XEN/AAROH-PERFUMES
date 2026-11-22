import React, { useState } from 'react';
import { Check } from 'lucide-react';

export const ProductShowcaseSection: React.FC = () => {
  const [allocationRequested, setAllocationRequested] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setAllocationRequested(true);
    }
  };

  return (
    <section id="discover" className="py-28 md:py-40 bg-obsidian-950 border-t border-white/[0.04] relative">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="bg-gradient-to-b from-obsidian-900 to-obsidian-950 border border-gold/25 rounded-sm p-8 md:p-16 lg:p-20 shadow-2xl relative overflow-hidden">
          {/* Subtle Golden Ambient Backdrop */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-[10px] tracking-ethereal uppercase text-gold font-sans block">
                The Inaugural Edition
              </span>
              <h2 className="font-serif text-4xl sm:text-6xl text-ivory font-light leading-[1.05]">
                AAROH No. 01
              </h2>
              <p className="font-serif italic text-lg text-gold-bright font-light">
                Extrait de Parfum &bull; 100ml
              </p>
              <p className="text-sm md:text-base text-ivory/70 font-sans font-light leading-relaxed max-w-xl">
                An ultra-limited initial batch hand-poured in Grasse and aged for four months. Each numbered flacon arrives in a hand-crafted presentation coffret with an authenticated Certificate of Sillage.
              </p>

              {/* Fragrance Specifications */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-4 border-t border-white/[0.06]">
                <div>
                  <span className="text-[9px] tracking-widest uppercase text-ivory/40 block">Concentration</span>
                  <span className="font-serif text-base text-ivory">Extrait (32%)</span>
                </div>
                <div>
                  <span className="text-[9px] tracking-widest uppercase text-ivory/40 block">Origin</span>
                  <span className="font-serif text-base text-ivory">Grasse, France</span>
                </div>
                <div>
                  <span className="text-[9px] tracking-widest uppercase text-ivory/40 block">Availability</span>
                  <span className="font-serif text-base text-gold">Private Allocation</span>
                </div>
              </div>

              {/* Private Allocation Form */}
              <div className="pt-6">
                {!allocationRequested ? (
                  <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
                    <input
                      type="email"
                      required
                      placeholder="Enter your private email..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="px-5 py-3 rounded-full bg-obsidian-800 border border-white/10 text-ivory text-xs placeholder:text-ivory/30 focus:outline-none focus:border-gold font-sans flex-1"
                    />
                    <button
                      type="submit"
                      className="px-7 py-3 rounded-full bg-gold text-obsidian-950 font-sans text-xs tracking-widest uppercase hover:bg-gold-bright transition-all duration-300 font-medium whitespace-nowrap shadow-lg shadow-gold/20"
                    >
                      Request Allocation
                    </button>
                  </form>
                ) : (
                  <div className="flex items-center gap-3 p-4 bg-gold/15 border border-gold/40 rounded-full max-w-md">
                    <div className="w-6 h-6 rounded-full bg-gold text-obsidian-950 flex items-center justify-center">
                      <Check size={14} />
                    </div>
                    <span className="text-xs text-ivory font-sans tracking-wide">
                      Allocation request received. Our concierge will reach out to you.
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Right Bottle Showcase Card */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="w-full max-w-xs aspect-[3/4] relative rounded-sm overflow-hidden border border-white/[0.08] shadow-2xl bg-obsidian-900 group">
                <img
                  src="/assets/images/end.webp"
                  alt="AAROH No. 01 Bottle"
                  className="w-full h-full object-cover filter brightness-95 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-center">
                  <span className="font-serif text-xl tracking-widest text-ivory uppercase block font-light">
                    AAROH NO. 01
                  </span>
                  <span className="text-[10px] tracking-ethereal uppercase text-gold">
                    Private Reserve
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
