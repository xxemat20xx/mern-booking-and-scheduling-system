import React, { useState, useEffect, useCallback } from "react";

const SLIDES = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=2000",
    title: "Book Your Appointment",
    subtitle: "Choose a service and secure your slot easily.",
    accent: "bg-indigo-500",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=2000",
    title: "Select a Specialist",
    subtitle: "Pick the right professional for your needs.",
    accent: "bg-fuchsia-500",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&q=80&w=2000",
    title: "Confirm & Relax",
    subtitle: "Get instant confirmation and reminders via email.",
    accent: "bg-emerald-500",
  },
];


const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);

    setTimeout(() => setIsTransitioning(false), 1000);
  }, [isTransitioning]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="relative w-full h-screen min-h-[700px] overflow-hidden bg-slate-950">
      {/* Cinematic Image Slider */}
      {SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <div className="relative w-full h-full overflow-hidden">
            <img
              src={slide.url}
              alt={slide.title}
              className={`w-full h-full object-cover transition-transform duration-[10000ms] ease-linear ${
                index === currentIndex ? "scale-110" : "scale-100"
              }`}
            />
          </div>

          {/* Layered Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/20" />
          <div className="absolute inset-0 bg-radial-at-l from-indigo-500/10 via-transparent to-transparent opacity-50" />
        </div>
      ))}

      {/* Main Hero Content */}
      <div className="relative z-20 h-full flex flex-col justify-center px-8 lg:px-24">
        <div className="max-w-3xl space-y-8">
          <div className="space-y-4">

            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white transition-all duration-700">
              {SLIDES[currentIndex].title.split(" ").map((word, i) => (
                <span
                  key={i}
                  className="inline-block mr-4 animate-fade-in-up"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {word}
                </span>
              ))}
            </h1>

            <p
              className="text-lg md:text-2xl text-slate-300 font-medium max-w-xl animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              {SLIDES[currentIndex].subtitle}
            </p>
          </div>


        </div>
      </div>

      {/* Branding */}
      <div className="absolute bottom-12 left-8 lg:left-24 z-30 hidden sm:block">
        <div className="flex items-center gap-4">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg transition-colors duration-1000 ${
              SLIDES[currentIndex].accent
            }`}
          >
            BA
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              BookApp
            </h2>
            <p className="text-xs text-slate-400 font-semibold tracking-wider uppercase opacity-60">
              BookApp
            </p>
          </div>
        </div>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-12 right-8 lg:right-24 z-30 flex gap-4">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className="group relative flex flex-col gap-2 focus:outline-none"
            aria-label={`Go to slide ${index + 1}`}
          >
            <span
              className={`text-xs font-bold tracking-tighter transition-colors duration-300 ${
                index === currentIndex
                  ? "text-white"
                  : "text-white/40 group-hover:text-white/70"
              }`}
            >
              0{index + 1}
            </span>

            <div className="h-1 w-12 md:w-20 bg-white/10 rounded-full overflow-hidden">
              <div
                className={`h-full bg-white transition-all duration-300 ${
                  index === currentIndex ? "w-full" : "w-0"
                }`}
                style={{
                  transitionDuration:
                    index === currentIndex ? "7000ms" : "300ms",
                  transitionTimingFunction: "linear",
                }}
              />
            </div>
          </button>
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity duration-300 cursor-pointer">
        <div className="w-5 h-8 border-2 border-white rounded-full flex justify-center p-1">
          <div className="w-1 h-1.5 bg-white rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
