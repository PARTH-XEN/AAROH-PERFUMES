import React from 'react';

export const EditorialFooter: React.FC = () => {
  return (
    <footer className="py-20 bg-obsidian-950 border-t border-white/[0.06] text-ivory/60 font-sans text-xs">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <span className="font-serif text-2xl tracking-monumental text-gold uppercase block font-light">
              AAROH
            </span>
            <p className="font-serif italic text-base text-ivory/70 max-w-sm">
              &ldquo;Not made to be seen. Made to be remembered.&rdquo;
            </p>
            <p className="text-xs text-ivory/40 max-w-sm font-light leading-relaxed">
              An independent high perfumery house dedicated to crafting transformative, indelible olfactory impressions.
            </p>
          </div>

          {/* Navigation Col */}
          <div className="space-y-3">
            <span className="text-[10px] tracking-widest uppercase text-gold block mb-2">
              Exploration
            </span>
            <ul className="space-y-2">
              <li>
                <a href="#fragrance" className="hover:text-gold transition-colors">
                  The Fragrance
                </a>
              </li>
              <li>
                <a href="#philosophy" className="hover:text-gold transition-colors">
                  Philosophy
                </a>
              </li>
              <li>
                <a href="#notes" className="hover:text-gold transition-colors">
                  Olfactory Notes
                </a>
              </li>
              <li>
                <a href="#craft" className="hover:text-gold transition-colors">
                  Craft & Anatomy
                </a>
              </li>
            </ul>
          </div>

          {/* Maison Col */}
          <div className="space-y-3">
            <span className="text-[10px] tracking-widest uppercase text-gold block mb-2">
              The Maison
            </span>
            <ul className="space-y-2">
              <li>
                <span className="text-ivory/40">Private Salons:</span> Paris &bull; Dubai
              </li>
              <li>
                <span className="text-ivory/40">Inquiries:</span> concierge@aaroh.com
              </li>
              <li>
                <span className="text-ivory/40">Edition:</span> First Harvest
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] tracking-widest uppercase text-ivory/30">
          <span>&copy; {new Date().getFullYear()} AAROH HAUTE PARFUMERIE. ALL RIGHTS RESERVED.</span>
          <span>THE ART OF BECOMING</span>
        </div>
      </div>
    </footer>
  );
};
