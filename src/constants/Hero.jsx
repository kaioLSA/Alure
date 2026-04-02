import React, { useEffect, useRef, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
  {
    image: "/banner-1.jpg",
    alt: "Allure Estética Avançada — Resultados naturais há mais de 9 anos",
  },
  {
    image: "/banner-2.jpg",
    alt: "Injetáveis premium e bioestimuladores de colágeno",
  },
  {
    image: "/banner-3.jpg",
    alt: "Harmonização facial e procedimentos personalizados",
  },
];

const AUTO_PLAY_MS = 5000;

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef(null);
  const touchStartRef = useRef(0);

  const total = SLIDES.length;

  const goTo = useCallback(
    (index) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrent((index + total) % total);
      setTimeout(() => setIsTransitioning(false), 600);
    },
    [isTransitioning, total]
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Auto-play
  useEffect(() => {
    intervalRef.current = setInterval(next, AUTO_PLAY_MS);
    return () => clearInterval(intervalRef.current);
  }, [next]);

  // Pause on hover
  const pause = () => clearInterval(intervalRef.current);
  const resume = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(next, AUTO_PLAY_MS);
  };

  // Touch / swipe
  const onTouchStart = (e) => {
    touchStartRef.current = e.touches[0].clientX;
    pause();
  };
  const onTouchEnd = (e) => {
    const diff = touchStartRef.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
    }
    resume();
  };

  return (
    <section id="home" className="relative w-full overflow-hidden">
      {/* Slides */}
      <div
        className="relative w-full aspect-[16/6] sm:aspect-[16/7] md:aspect-[16/6.5] lg:aspect-[16/6]"
        onMouseEnter={pause}
        onMouseLeave={resume}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {SLIDES.map((slide, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-all duration-700 ease-in-out"
            style={{
              opacity: i === current ? 1 : 0,
              transform: i === current ? "scale(1)" : "scale(1.04)",
              zIndex: i === current ? 2 : 1,
            }}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-cover"
              draggable={false}
              loading={i === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}

        {/* Gradient overlay bottom for dots visibility */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/30 to-transparent z-[3] pointer-events-none" />

        {/* Arrows */}
        <button
          onClick={() => { prev(); pause(); resume(); }}
          className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-[5]
                     w-10 h-10 sm:w-12 sm:h-12 rounded-full
                     bg-white/15 hover:bg-white/30 backdrop-blur-md
                     border border-white/20
                     flex items-center justify-center
                     text-white transition-all duration-300
                     opacity-0 group-hover:opacity-100 hover:opacity-100
                     focus:opacity-100"
          aria-label="Anterior"
          style={{ opacity: 0.6 }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = 0.6)}
        >
          <ChevronLeft size={20} strokeWidth={2.5} />
        </button>
        <button
          onClick={() => { next(); pause(); resume(); }}
          className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-[5]
                     w-10 h-10 sm:w-12 sm:h-12 rounded-full
                     bg-white/15 hover:bg-white/30 backdrop-blur-md
                     border border-white/20
                     flex items-center justify-center
                     text-white transition-all duration-300"
          aria-label="Próximo"
          style={{ opacity: 0.6 }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = 0.6)}
        >
          <ChevronRight size={20} strokeWidth={2.5} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-[5] flex items-center gap-2.5">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => { goTo(i); pause(); resume(); }}
              className={`rounded-full transition-all duration-500 ${
                i === current
                  ? "w-7 h-2.5 bg-white"
                  : "w-2.5 h-2.5 bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
