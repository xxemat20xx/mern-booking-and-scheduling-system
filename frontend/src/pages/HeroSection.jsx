import React, { useState, useEffect } from 'react';
import image1 from '/assets/generated.png'
import image2 from '/assets/generated1.png'
const IMAGES = [
  image1,
  image2
];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-dark-bg">

      {/* Sliding Images */}
      {IMAGES.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={src}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover scale-105 animate-[subtle-zoom_20s_infinite_alternate]"
          />
          {/* Overlay for depth and blending */}
          <div className="absolute inset-0 bg-gradient-to-r from-dark-bg/40 via-transparent to-dark-surface/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/60 via-transparent to-transparent" />
        </div>
      ))}

      {/* Decorative Branding Overlay */}
      <div className="absolute bottom-12 left-12 z-10 hidden lg:block">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white font-bold text-2xl">
            N
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Nebula</h2>
        </div>
        <p className="text-slate-300/80 font-medium max-w-xs">
          The future of generative intelligence, visualised.
        </p>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'w-8 bg-primary-500' : 'w-2 bg-white/30'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes subtle-zoom {
          from { transform: scale(1); }
          to { transform: scale(1.1); }
        }
      `}} />
    </div>
  );
}

export default HeroSection