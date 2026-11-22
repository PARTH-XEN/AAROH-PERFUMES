import React from 'react';

interface LoaderProps {
  progress: number;
  isReady: boolean;
}

export const Loader: React.FC<LoaderProps> = ({ progress, isReady }) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-obsidian-900 transition-opacity duration-1000 ${
        isReady ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center max-w-xs w-full px-6 text-center">
        {/* Brand Whisper */}
        <span className="font-serif text-2xl tracking-monumental text-gold uppercase mb-2 font-light">
          AAROH
        </span>
        <span className="text-[10px] tracking-ethereal text-ivory/40 uppercase mb-10 font-sans">
          The Art of Becoming
        </span>

        {/* Minimal Brass Hairline Progress Bar */}
        <div className="w-48 h-[1px] bg-ivory/10 overflow-hidden relative mb-4">
          <div
            className="absolute left-0 top-0 bottom-0 bg-gold transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Percentage Display */}
        <div className="flex items-center gap-2">
          <span className="font-sans text-[11px] text-ivory/50 tracking-widest font-light">
            {progress}%
          </span>
        </div>
      </div>
    </div>
  );
};
