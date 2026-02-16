import { useEffect, useRef, useState } from "react";

/* ============================= */
/* Reveal Premium Suave */
/* ============================= */
function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.18 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`
        transition-all duration-1000 ease-[cubic-bezier(.16,1,.3,1)]
        ${visible ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-10 blur-[6px]"}
      `}
    >
      {children}
    </div>
  );
}

/* ============================= */
/* Mini Stat Premium (mobile melhor sem mexer no desktop) */
/* ============================= */
function MiniStat({ number, label }) {
  return (
    <div
      className="
        rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm text-center
        transition-all duration-300 hover:-translate-y-1 hover:bg-white/10
        px-3 py-4 sm:px-5 sm:py-6
      "
    >
      <div className="text-lg sm:text-xl font-semibold text-white">{number}</div>

      {/* ✅ no mobile deixa mais compacto e permite quebrar (sem afetar o desktop) */}
      <div
        className="
          mt-2 uppercase text-white/55
          text-[9px] tracking-[0.18em] leading-tight
          sm:text-[10px] sm:tracking-[0.28em] sm:whitespace-nowrap
          whitespace-normal
        "
      >
        {label}
      </div>
    </div>
  );
}

/* ============================= */
/* Bullet Item */
/* ============================= */
function Bullet({ children }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-[10px] h-2 w-2 rounded-full bg-[#d4af37]" />
      <p className="text-white/80 leading-relaxed">{children}</p>
    </div>
  );
}

/* ============================= */
/* Info Chip */
/* ============================= */
function InfoChip({ title, desc }) {
  return (
    <div className="group rounded-2xl border-2 border-black/20 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-center gap-3">
        <span className="h-2 w-2 rounded-full bg-[#d4af37]" />
        <p className="text-base font-semibold text-black">{title}</p>
      </div>
      <p className="mt-3 text-sm text-black/65 leading-relaxed">{desc}</p>
    </div>
  );
}

/* ============================= */
/* SOBRE SECTION */
/* ============================= */
export default function Sobre() {
  return (
    <section id="sobre" className="relative bg-white overflow-hidden">
      {/* Glow dourado superior */}
      <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-[400px] w-[400px] rounded-full bg-[#d4af37]/15 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 py-28">
        {/* Header */}
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="h-px w-12 bg-[#d4af37]" />
            <p className="uppercase tracking-[0.45em] text-xs text-black/60">
              Sobre a Premium
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid lg:grid-cols-12 gap-16 items-start">
          {/* ================= LEFT SIDE ================= */}
          <div className="lg:col-span-7">
            <Reveal delay={100}>
              <h2 className="text-4xl md:text-5xl font-light leading-tight text-black">
                Autoridade em odontologia há{" "}
                <span className="relative font-medium">
                  10+ anos
                  <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
                </span>
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <p className="mt-8 text-lg text-black/70 leading-relaxed max-w-2xl">
                Somos uma clínica odontológica completa, com todas as especialidades — do
                tratamento básico à estética avançada — sempre com ética, transparência e
                atendimento humanizado.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-12 grid sm:grid-cols-2 gap-6">
                <InfoChip
                  title="Tratamentos básicos"
                  desc="Canal, extração e reabilitação com segurança e conforto."
                />
                <InfoChip
                  title="Estética premium"
                  desc="Facetas e clareamento com planejamento e alto padrão."
                />
                <InfoChip
                  title="Tecnologia avançada"
                  desc="Equipamentos modernos para precisão e bem-estar."
                />
                <InfoChip
                  title="Transparência total"
                  desc="Você entende cada etapa antes de qualquer decisão."
                />
              </div>
            </Reveal>

            <Reveal delay={400}>
              <div className="mt-14 rounded-2xl border-2 border-black/20 bg-white p-8">
                <p className="text-xs uppercase tracking-[0.4em] text-black/50">
                  Nossa missão
                </p>
                <p className="mt-4 text-lg text-black/75 leading-relaxed">
                  Promover saúde bucal para nossos pacientes de forma ética, humanizada e
                  acessível, utilizando tecnologia para oferecer conforto e resultados
                  consistentes.
                </p>
              </div>
            </Reveal>
          </div>

          {/* ================= RIGHT SIDE - CARD PREMIUM ================= */}
          <div className="lg:col-span-5">
            <Reveal delay={200}>
              <div className="relative rounded-[28px] bg-[#0a0a0a] text-white overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)]">
                {/* borda dourada */}
                <div className="absolute inset-0 rounded-[28px] ring-1 ring-[#d4af37]/40 pointer-events-none" />

                {/* glow superior */}
                <div className="absolute -top-32 right-[-80px] h-80 w-80 rounded-full bg-[#d4af37]/15 blur-3xl pointer-events-none" />

                {/* glow inferior */}
                <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-black blur-3xl opacity-70 pointer-events-none" />

                {/* linha topo */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/80 to-transparent" />

                <div className="relative p-10 sm:p-12">
                  <p className="text-[11px] tracking-[0.45em] uppercase text-white/50">
                    Por que escolher a Premium
                  </p>

                  <h3 className="mt-5 text-3xl font-light leading-snug">
                    Uma experiência{" "}
                    <span className="text-[#d4af37] font-medium">premium</span>, do primeiro
                    contato ao resultado final.
                  </h3>

                  <div className="mt-10 space-y-5">
                    <Bullet>Equipe experiente e atendimento cuidadoso</Bullet>
                    <Bullet>Planejamento detalhado e previsível</Bullet>
                    <Bullet>Ambiente confortável e tecnologia moderna</Bullet>
                    <Bullet>Foco em estética + função, sem exageros</Bullet>
                  </div>

                  {/* ✅ MOBILE: espaçamento melhor + label não estoura + último item trocado */}
                  <div className="mt-12 grid grid-cols-3 gap-3 sm:gap-4">
                    <MiniStat number="10+" label="Anos" />
                    <MiniStat number="100%" label="Ética" />
                    <MiniStat number="12+" label="Áreas" />
                  </div>

                  <div className="mt-10 h-px bg-white/10" />

                  <p className="mt-6 text-white/65 leading-relaxed">
                    Aqui, cada sorriso é tratado com respeito, técnica e acabamento de alto padrão.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
