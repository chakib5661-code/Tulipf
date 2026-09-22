import React, { useState, useEffect } from 'react';
import { TulipLogo } from './TulipLogo';

interface PageLoaderProps {
  onLoaded?: () => void;
  minDurationMs?: number;
}

export const PageLoader: React.FC<PageLoaderProps> = ({
  onLoaded,
  minDurationMs = 1300,
}) => {
  const [isFading, setIsFading] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    // Timer to trigger fade-out
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
      // Wait for fade transition then unmount
      const unmountTimer = setTimeout(() => {
        setIsMounted(false);
        if (onLoaded) onLoaded();
      }, 500);
      return () => clearTimeout(unmountTimer);
    }, minDurationMs);

    return () => clearTimeout(fadeTimer);
  }, [minDurationMs, onLoaded]);

  if (!isMounted) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed inset-0 z-100 bg-slate-950 flex flex-col items-center justify-center p-4 transition-opacity duration-500 ease-out select-none ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Ambient Radial Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 sm:w-96 sm:h-96 bg-gradient-to-tr from-rose-600/20 via-amber-500/15 to-transparent rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-sm px-4">
        {/* Animated Halo around the Tulip Logo */}
        <div className="relative mb-6">
          <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-rose-500/20 via-amber-400/20 to-rose-500/20 blur-xl animate-pulse" />
          <div className="relative transform hover:scale-105 transition duration-500 animate-bounce [animation-duration:3s]">
            <TulipLogo variant="full" size="xl" showSubtitle={false} />
          </div>
        </div>

        {/* Brand Title & Tagline */}
        <div className="space-y-1 mb-6">
          <h1
            className="text-2xl sm:text-3xl font-black tracking-widest text-white uppercase font-serif"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            TULIP
          </h1>
          <p className="text-[11px] sm:text-xs font-bold tracking-[0.3em] uppercase text-rose-300">
            Fragrance Company • Oran
          </p>
          <p className="text-[10px] text-slate-400 italic">
            Maison de Haute Parfumerie & Matières Premières
          </p>
        </div>

        {/* Animated Loading Bar */}
        <div className="w-48 sm:w-56 h-1 bg-slate-800 rounded-full overflow-hidden relative shadow-inner">
          <div className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-amber-400 via-rose-500 to-amber-300 rounded-full w-1/2 animate-[loadingBar_1.4s_ease-in-out_infinite]" />
        </div>

        <span className="text-[10px] font-medium text-slate-400 mt-3 tracking-wider">
          Chargement du catalogue & stocks...
        </span>
      </div>

      <style>{`
        @keyframes loadingBar {
          0% {
            left: -50%;
            width: 30%;
          }
          50% {
            left: 35%;
            width: 50%;
          }
          100% {
            left: 100%;
            width: 30%;
          }
        }
      `}</style>
    </div>
  );
};
