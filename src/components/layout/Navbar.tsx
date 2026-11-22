import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, ArrowUpRight } from 'lucide-react';
import { audioEngine } from '../../utils/audio';

interface NavbarProps {
  onDiscoverClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onDiscoverClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    if (soundEnabled) {
      audioEngine.stop();
      setSoundEnabled(false);
    } else {
      audioEngine.start();
      setSoundEnabled(true);
    }
  };

  const navLinks = [
    { label: 'The Fragrance', href: '#fragrance' },
    { label: 'Our Philosophy', href: '#philosophy' },
    { label: 'Olfactory Notes', href: '#notes' },
    { label: 'Craft & Anatomy', href: '#craft' },
    { label: 'Discover', href: '#discover' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'py-4 bg-obsidian-900/85 backdrop-blur-md border-b border-white/[0.06] shadow-2xl shadow-black/80'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Logo / Left */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="flex flex-col group transition-transform duration-300"
            >
              <span className="font-serif text-xl md:text-2xl tracking-monumental text-ivory group-hover:text-gold transition-colors font-light">
                AAROH
              </span>
              <span className="text-[9px] tracking-ethereal text-ivory/40 uppercase -mt-1 font-sans">
                Haute Parfumerie
              </span>
            </a>

            {/* 4K Master Badge */}
            <span className="hidden lg:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-gold/30 bg-gold/10 text-[9px] tracking-widest text-gold uppercase font-sans">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              <span>4K CINEMATIC</span>
            </span>
          </div>

          {/* Desktop Links / Center-Right */}
          <nav className="hidden md:flex items-center space-x-8 lg:space-x-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-sans text-xs tracking-widest text-ivory/60 hover:text-gold uppercase transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Actions: Sound & CTA */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={toggleSound}
              aria-label={soundEnabled ? 'Mute ambient sound' : 'Unmute ambient sound'}
              className="p-2 text-ivory/40 hover:text-gold transition-colors duration-200"
              title={soundEnabled ? 'Mute Ambient' : 'Enable Ambient Sound'}
            >
              {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>

            <a
              href="#discover"
              onClick={onDiscoverClick}
              className="inline-flex items-center gap-1.5 px-5 py-2 text-xs tracking-widest uppercase font-sans text-gold border border-gold/40 hover:border-gold hover:bg-gold/10 transition-all duration-300 rounded-full"
            >
              <span>Aquire</span>
              <ArrowUpRight size={12} />
            </a>
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-ivory/70 hover:text-gold p-2"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Refined Luxury Mobile Drawer */}
      <div
        className={`fixed inset-0 z-30 bg-obsidian-950/98 backdrop-blur-2xl flex flex-col justify-center px-10 transition-all duration-500 md:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col space-y-8">
          <span className="font-serif text-3xl tracking-monumental text-gold uppercase mb-4">
            AAROH
          </span>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="font-serif text-2xl tracking-widest text-ivory/80 hover:text-gold uppercase transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-6 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs tracking-widest text-ivory/40 uppercase">Ambient Atmosphere</span>
            <button
              onClick={toggleSound}
              className="flex items-center gap-2 text-xs tracking-widest uppercase text-gold"
            >
              {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
              <span>{soundEnabled ? 'On' : 'Off'}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
