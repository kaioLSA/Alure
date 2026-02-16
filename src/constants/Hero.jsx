import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

export default function Hero() {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  // ✅ RAF ref igual Navbar (pra rolagem premium)
  const rafRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => setShow(entry.isIntersecting),
      { threshold: 0.25 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  // 🔥 Scroll suave premium (MESMA LÓGICA da Navbar)
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

    const NAVBAR_OFFSET = 110; // 👈 mantém seu offset
    const top =
      el.getBoundingClientRect().top + window.pageYOffset - NAVBAR_OFFSET;

    // ✅ delay leve igual Navbar pra ficar suave (sem mudar visual)
    setTimeout(() => smoothScrollTo(top, 760), 20);
  };

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen w-full overflow-hidden bg-[#05080f] text-white"
    >
      {/* Fundo com foto */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-[1.03]"
        style={{
          backgroundImage:
            "url('https://www.leica-microsystems.com/fileadmin/_processed_/2/e/csm_M320-Dental-stageV_d0a886a0d6.jpg')",
        }}
      />

      {/* Escurecimento */}
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#05080f]/85 via-[#05080f]/70 to-[#05080f]/95" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#05080f]/95 via-[#05080f]/70 to-transparent" />

      {/* Glow dourado */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-amber-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -right-24 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl" />

      <div className="relative z-10">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="min-h-screen flex items-center">
            <div className="max-w-2xl">
              {/* Título */}
              <h1
                className={`mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.06] tracking-tight transition-all duration-700 delay-100 ${
                  show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                }`}
              >
                Sua melhor versão
                <span className="block text-amber-400">
                  começa pelo seu sorriso
                </span>
              </h1>

              {/* Descrição */}
              <p
                className={`mt-6 text-gray-200/90 text-base sm:text-lg leading-relaxed max-w-xl transition-all duration-700 delay-200 ${
                  show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                }`}
              >
                Uma clínica odontológica premium com foco em conforto, precisão e
                estética. Do check-up ao sorriso completo, você é atendido com
                cuidado em cada detalhe.
              </p>

              {/* Botões */}
              <div
                className={`mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 transition-all duration-700 delay-300 ${
                  show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                }`}
              >
                {/* Vai para #contato */}
                <button
                  type="button"
                  onClick={() => scrollToId("contato")}
                  className="group bg-amber-500 hover:bg-amber-600 transition-all duration-300 px-8 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25"
                >
                  Agendar Avaliação
                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>

                {/* Vai para #portfolio */}
                <button
                  type="button"
                  onClick={() => scrollToId("portfolio")}
                  className="group border border-amber-400/30 text-amber-300 hover:bg-amber-400/10 transition-all duration-300 px-8 py-3 rounded-xl font-semibold backdrop-blur-sm"
                >
                  Ver tratamentos
                </button>
              </div>

              {/* Cards */}
              <div
                className={`mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 transition-all duration-700 delay-500 ${
                  show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                }`}
              >
                <div className="rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur-md">
                  <div className="flex items-center gap-2 text-amber-300 font-semibold">
                    <ShieldCheck size={18} />
                    Segurança
                  </div>
                  <p className="mt-2 text-sm text-gray-200/80 leading-relaxed">
                    Protocolos rigorosos e ambiente confortável.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur-md">
                  <div className="flex items-center gap-2 text-amber-300 font-semibold">
                    <Sparkles size={18} />
                    Estética
                  </div>
                  <p className="mt-2 text-sm text-gray-200/80 leading-relaxed">
                    Facetas, clareamento e harmonização do sorriso.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur-md">
                  <div className="flex items-center gap-2 text-amber-300 font-semibold">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-amber-400/20 text-amber-200 text-xs font-bold">
                      +
                    </span>
                    Confiança
                  </div>
                  <p className="mt-2 text-sm text-gray-200/80 leading-relaxed">
                    Resultados naturais com tecnologia de ponta.
                  </p>
                </div>
              </div>

              <p
                className={`mt-6 text-xs text-gray-300/70 transition-all duration-700 delay-700 ${
                  show ? "opacity-100" : "opacity-0"
                }`}
              >
                * Atendimento sob agendamento • Avaliação personalizada •
                Parcelamento disponível
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
