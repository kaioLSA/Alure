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
        ${
          visible
            ? "opacity-100 translate-y-0 blur-0"
            : "opacity-0 translate-y-10 blur-[6px]"
        }
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
    <div className="group rounded-2xl border-2 border-black/20 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-center gap-3">
        <span className="h-2 w-2 rounded-full bg-[#d4af37]" />
        <p className="text-base font-semibold text-black">{title}</p>
      </div>
      <p className="mt-3 text-sm text-black/65 leading-relaxed">{desc}</p>
    </div>
  );
}

/* ============================= */
/* SOBRE SECTION (ALLURE) */
/* ============================= */
export default function Sobre() {
  return (
    <section id="sobre" className="relative bg-white overflow-hidden">
      {/* Glow dourado superior */}
      <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-[400px] w-[400px] rounded-full bg-[#d4af37]/15 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-20">
        {/* Header */}
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="h-px w-12 bg-[#d4af37]" />
            <p className="uppercase tracking-[0.45em] text-xs text-black/60">
              Sobre a Allure
            </p>
          </div>
        </Reveal>

        <div className="mt-8 grid lg:grid-cols-12 gap-10 items-start">
          {/* ================= LEFT SIDE ================= */}
          <div className="lg:col-span-7">
            <Reveal delay={100}>
              <h2 className="text-3xl md:text-4xl font-light leading-tight text-black">
                Estética avançada há{" "}
                <span className="relative font-medium">
                  mais de 9 anos
                  <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
                </span>
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <p className="mt-5 text-base text-black/70 leading-relaxed max-w-2xl">
                Há mais de 9 anos transformando autoestima e qualidade de vida com
                responsabilidade, acolhimento e resultados reais. Nossos protocolos
                faciais e corporais são pensados individualmente — sem exageros,
                com foco em naturalidade, segurança e confiança.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                <InfoChip
                  title="Faciais completos"
                  desc="Limpeza de pele, peelings, microagulhamento, rejuvenescimento, lifting sem cirurgia e fios (PDO) — com protocolos seguros e personalizados."
                />
                <InfoChip
                  title="Injetáveis premium"
                  desc="Botox, preenchimentos (Belotero®, Restylane®, Juvéderm®, Perfectha®), skinbooster e harmonização facial com naturalidade."
                />
                <InfoChip
                  title="Colágeno & firmeza"
                  desc="Bioestimuladores (Bioplus®, Sculptra®, Radiesse®) para firmeza, flacidez e qualidade da pele de forma progressiva."
                />
                <InfoChip
                  title="Corporal & capilar"
                  desc="Lipo Reduz, drenagem linfática, massagem modeladora, protocolos de emagrecimento e mesoterapia capilar para crescimento e fortalecimento."
                />
              </div>
            </Reveal>

            <Reveal delay={400}>
              <div className="mt-8 rounded-2xl border-2 border-black/20 bg-white p-6">
                <p className="text-xs uppercase tracking-[0.4em] text-black/50">
                  Nossa missão
                </p>
                <p className="mt-3 text-base text-black/75 leading-relaxed">
                  Cuidar de pessoas e transformar autoestima com responsabilidade.
                  Cada atendimento é personalizado, seguro e com acompanhamento
                  do início ao pós-procedimento — priorizando ética, transparência
                  e resultados que fazem a diferença na vida de quem nos escolhe.
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

                <div className="relative p-7 sm:p-8">
                  <p className="text-[11px] tracking-[0.45em] uppercase text-white/50">
                    Por que escolher a Allure
                  </p>

                  <h3 className="mt-4 text-2xl font-light leading-snug">
                    Mais de 9 anos de{" "}
                    <span className="text-[#d4af37] font-medium">excelência</span>, com
                    resultados naturais e zero intercorrências.
                  </h3>

                  <div className="mt-6 space-y-3">
                    <Bullet>Avaliação detalhada e plano 100% personalizado</Bullet>
                    <Bullet>Foco em harmonia e naturalidade, sem exageros</Bullet>
                    <Bullet>Acompanhamento próximo antes, durante e após cada procedimento</Bullet>
                    <Bullet>Atendimento acolhedor, humano e com explicações claras</Bullet>
                  </div>

                  {/* stats */}
                  <div className="mt-8 grid grid-cols-3 gap-3">
                    <MiniStat number="9+" label="Anos" />
                    <MiniStat number="0" label="Intercor." />
                    <MiniStat number="100%" label="Natural" />
                  </div>

                  <div className="mt-6 h-px bg-white/10" />

                  <p className="mt-6 text-white/65 leading-relaxed">
                    Aqui, cada detalhe é pensado para valorizar sua beleza com
                    segurança, acolhimento e um cuidado que vai além da estética.
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
