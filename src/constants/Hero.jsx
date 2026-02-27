import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, ShieldCheck, Sparkles, Star } from "lucide-react";

export default function Hero() {
  const ref = useRef(null);
  const rafRef = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      setShow(entry.isIntersecting);
    }, { threshold: 0.25 });

    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const smoothScrollTo = (targetY, duration = 700) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const startY = window.pageYOffset;
    const diff = targetY - startY;
    const start = performance.now();

    const ease = (t) => 1 - Math.pow(1 - t, 3);

    const step = (now) => {
      const t = Math.min(1, (now - start) / duration);
      window.scrollTo(0, startY + diff * ease(t));
      if (t < 1) rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
  };

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    const NAVBAR_OFFSET = 110;
    const top = el.getBoundingClientRect().top + window.pageYOffset - NAVBAR_OFFSET;
    setTimeout(() => smoothScrollTo(top, 760), 20);
  };

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-[100svh] w-full overflow-hidden bg-[#05080f] text-white"
    >
      {/* IMAGEM DE FUNDO PREMIUM */}
      <div
  className="absolute inset-0 bg-cover bg-center animate-zoomSlow"
  style={{
    backgroundImage:
      "url('https://versatilis.com.br/wp-content/uploads/2023/10/equipamentos-para-clinica-de-estetica-scaled.jpg')",
  }}
/>

      {/* OVERLAY CINEMATOGRÁFICO */}
      <div className="absolute inset-0 bg-black/65" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/40 to-black/95" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />

      {/* GLOW DOURADO FLUTUANTE */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-amber-400/20 blur-3xl animate-floatSlow" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-[500px] w-[500px] rounded-full bg-amber-500/10 blur-3xl animate-floatSlow" />

      {/* CONTEÚDO */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 lg:px-10">
        <div className="min-h-[100svh] flex items-center justify-center pt-24 pb-16 lg:pt-0 lg:pb-0">
          <div className="w-full max-w-3xl text-center">

            <h1
              className={`text-[44px] sm:text-[60px] lg:text-[72px] leading-[1.02] tracking-tight font-semibold transition-all duration-700 ${
                show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Menos exagero.
              <span className="block text-white/90">Mais harmonia.</span>
              <span className="block bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent">
                Mais naturalidade.
              </span>
            </h1>

            <p
              className={`mx-auto mt-6 max-w-[60ch] text-[15px] leading-relaxed text-white/70 transition-all duration-700 delay-200 ${
                show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Procedimentos faciais e corporais com foco em segurança,
              técnica precisa e resultado sofisticado — sem perder sua essência.
            </p>

            <div
              className={`mt-8 flex flex-col sm:flex-row justify-center gap-4 transition-all duration-700 delay-300 ${
                show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <button
                onClick={() => scrollToId("contato")}
                className="group bg-amber-500 hover:bg-amber-600 transition-all duration-300 px-8 py-3 rounded-2xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-amber-500/30"
              >
                Agendar avaliação
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>

              <button
                onClick={() => scrollToId("servicos")}
                className="border border-amber-400/30 text-amber-300 hover:bg-amber-400/10 transition-all duration-300 px-8 py-3 rounded-2xl font-semibold backdrop-blur-sm"
              >
                Ver procedimentos
              </button>
            </div>

            <div
              className={`mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 transition-all duration-700 delay-500 ${
                show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              {[
                { icon: <ShieldCheck size={18} />, title: "Segurança" },
                { icon: <Sparkles size={18} />, title: "Natural" },
                { icon: <Star size={18} />, title: "Personalizado" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-md"
                >
                  <div className="flex items-center justify-center gap-2 text-amber-300 font-semibold">
                    {item.icon}
                    {item.title}
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-6 text-xs text-white/50">
              Atendimento sob agendamento • Avaliação personalizada
            </p>

            <div className="h-6 lg:hidden" />
          </div>
        </div>
      </div>

      {/* ANIMAÇÕES */}
      <style>{`
        @keyframes zoomSlow {
          0% { transform: scale(1); }
          100% { transform: scale(1.08); }
        }
        .animate-zoomSlow {
          animation: zoomSlow 25s ease-in-out infinite alternate;
        }

        @keyframes floatSlow {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-30px); }
        }
        .animate-floatSlow {
          animation: floatSlow 12s ease-in-out infinite alternate;
        }
      `}</style>
    </section>
  );
}