import React, { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Sparkles, ShieldCheck, Star } from "lucide-react";

export default function Hero() {
  const ref = useRef(null);
  const [show, setShow] = useState(false);
  const rafRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => setShow(entry.isIntersecting), {
      threshold: 0.25,
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const smoothScrollTo = (targetY, duration = 700) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const startY = window.pageYOffset;
    const diff = targetY - startY;
    const start = performance.now();

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const step = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = easeOutCubic(t);
      window.scrollTo(0, startY + diff * eased);
      if (t < 1) rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
  };

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    const NAVBAR_OFFSET = 110;
    const top =
      el.getBoundingClientRect().top + window.pageYOffset - NAVBAR_OFFSET;

    setTimeout(() => smoothScrollTo(top, 760), 20);
  };

  const highlights = useMemo(
    () => [
      {
        icon: <ShieldCheck size={16} />,
        title: "Segurança",
        desc: "Protocolos e cuidado em cada etapa.",
      },
      {
        icon: <Sparkles size={16} />,
        title: "Natural",
        desc: "Resultados harmônicos e sofisticados.",
      },
      {
        icon: <Star size={16} />,
        title: "Personalizado",
        desc: "Plano pensado para você.",
      },
    ],
    []
  );

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen w-full overflow-hidden bg-black text-white"
    >
      {/* FOTO DE FUNDO (public/aa.png) */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{
          backgroundImage: "url('/aa.png')",
        }}
      />

      {/* OVERLAYS */}
      <div className="absolute inset-0 bg-black/65" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/35 to-black/95" />

      {/* GLOW DOURADO */}
      <div className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full bg-amber-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl" />

      <div className="relative z-10 container mx-auto px-6 lg:px-16">
        {/* ✅ MOBILE: espaço topo e fundo | ✅ DESKTOP: não muda */}
        <div className="min-h-screen flex items-center pt-24 pb-16 lg:pt-0 lg:pb-0">
          <div className="max-w-2xl">
            {/* FAIXA SUPERIOR */}
            <div
              className={`mb-6 inline-flex items-center gap-3 rounded-2xl border border-white/12 bg-white/[0.04] px-4 py-3 backdrop-blur-md transition-all duration-700 ${
                show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              <span className="text-sm text-white/80">
                Estética avançada • bem-estar • autoestima
              </span>
              <span className="ml-1 rounded-full border border-amber-400/25 bg-amber-400/10 px-2.5 py-1 text-[12px] font-semibold text-amber-200">
                2 anos
              </span>
            </div>

            {/* TÍTULO */}
            <h1
              className={`text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight transition-all duration-700 ${
                show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              Realce sua
              <span className="block bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent">
                beleza natural
              </span>
            </h1>

            {/* TEXTO */}
            <p
              className={`mt-6 text-gray-200/90 text-base sm:text-lg leading-relaxed max-w-xl transition-all duration-700 delay-200 ${
                show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              Procedimentos faciais e corporais com foco em resultados naturais,
              segurança e cuidado totalmente personalizado.
            </p>

            {/* BOTÕES */}
            <div
              className={`mt-7 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 transition-all duration-700 delay-300 ${
                show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <button
                onClick={() => scrollToId("contato")}
                className="group bg-amber-500 hover:bg-amber-600 transition-all duration-300 px-8 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25"
              >
                Agendar Avaliação
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>

              <button
                onClick={() => scrollToId("servicos")}
                className="border border-amber-400/30 text-amber-300 hover:bg-amber-400/10 transition-all duration-300 px-8 py-3 rounded-xl font-semibold backdrop-blur-sm"
              >
                Ver procedimentos
              </button>
            </div>

            {/* MINI CARDS */}
            <div
              className={`mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 transition-all duration-700 delay-500 ${
                show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              {highlights.map((h, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-white/12 bg-white/[0.04] p-4 backdrop-blur-md"
                >
                  <div className="flex items-center gap-2 text-amber-300 font-semibold">
                    {h.icon}
                    {h.title}
                  </div>
                  <p className="mt-2 text-sm text-gray-200/75 leading-relaxed">
                    {h.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* FRASE FINAL */}
            <p
              className={`mt-5 sm:mt-6 text-xs text-gray-300/70 transition-all duration-700 delay-700 ${
                show ? "opacity-100" : "opacity-0"
              }`}
            >
              * Atendimento sob agendamento • Avaliação personalizada
            </p>

            {/* ✅ MOBILE: respiro extra no final, sem mexer no desktop */}
            <div className="h-6 lg:hidden" />
          </div>
        </div>
      </div>
    </section>
  );
}
