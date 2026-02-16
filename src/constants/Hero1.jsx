import React, { useEffect, useMemo, useRef, useState } from "react";

export default function Hero() {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setShow(e.isIntersecting), {
      threshold: 0.18,
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const pills = useMemo(
    () => [
      { a: "CANAL E EXTRAÇÃO", icon: "globe" },
      { a: "ESTÉTICA (FACETAS)", icon: "folder" },
      { a: "CLAREAMENTO", icon: "spark" },
    ],
    []
  );

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-[92vh] pb-14 md:pb-0 w-full overflow-hidden bg-[#05080f] text-white"
    >
      {/* background estático */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_20%_10%,rgba(212,175,55,0.14),transparent_60%),radial-gradient(900px_520px_at_80%_0%,rgba(255,255,255,0.06),transparent_55%),radial-gradient(900px_520px_at_70%_80%,rgba(212,175,55,0.10),transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:56px_56px]" />
        <div className="absolute -left-24 top-10 h-[520px] w-[520px] rounded-full bg-[#d4af37]/10 blur-3xl" />
        <div className="absolute -right-24 top-24 h-[520px] w-[520px] rounded-full bg-white/5 blur-3xl" />
      </div>

      {/* ✅ MOBILE: padding mais “premium” e respiração melhor (desktop igual) */}
      <div className="relative mx-auto w-full max-w-6xl px-4 pt-12 sm:px-6 sm:pt-14 md:px-6 md:pt-20">
        {/* top row */}
        <div className="grid grid-cols-1 items-start gap-8 md:gap-10 md:grid-cols-2">
          {/* left headline */}
          <div
            className={[
              "transition-all duration-[520ms] ease-out will-change-transform",
              show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
            ].join(" ")}
          >
            {/* ✅ MOBILE: headline menor e mais elegante (desktop igual) */}
            <h1 className="select-none text-[38px] leading-[0.98] tracking-tight sm:text-[44px] md:text-[58px]">
              <span className="block font-[500] text-white/95">Odonto</span>
              <span className="block font-[500] text-white/95">premium</span>
            </h1>

            <div className="mt-5 sm:mt-6">
              <button
                className="group relative inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.02] px-5 py-2.5 text-sm text-white/90 shadow-[0_0_0_1px_rgba(255,255,255,0.05)_inset] backdrop-blur-xl transition-all duration-200 hover:border-[#d4af37]/35 hover:bg-white/[0.04]"
                type="button"
              >
                <span className="relative z-10">Saiba Mais</span>
                <span className="relative z-10 transition-transform duration-200 group-hover:translate-x-0.5">
                  ↗
                </span>
                <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-200 group-hover:opacity-100 [background:radial-gradient(120px_60px_at_30%_50%,rgba(212,175,55,0.18),transparent_60%)]" />
              </button>
            </div>
          </div>

          {/* right mini area */}
          <div
            className={[
              "flex justify-start md:justify-end",
              "transition-all duration-[520ms] ease-out will-change-transform",
              show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
            ].join(" ")}
            style={{ transitionDelay: "80ms" }}
          >
            {/* ✅ MOBILE: max-w 100% e espaço pro texto “fora” não colidir */}
            <div className="relative w-full max-w-full md:max-w-[460px] overflow-visible">
              {/* ✅ MOBILE: sobe menos o texto e reduz tamanho (desktop igual) */}
              <p className="pointer-events-none absolute -top-10 right-1 text-right text-[12px] leading-snug text-white/60 sm:-top-12 sm:right-2 sm:text-[13px] md:-top-14 md:text-sm">
                Explore todo o potencial do
                <br />
                seu sorriso com tratamentos
                <br />
                personalizados para cada fase.
              </p>

              {/* CARD */}
              <div className="relative mt-6 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 shadow-[0_10px_50px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:px-5 sm:py-5 md:px-5 md:py-5">
                <div className="absolute -inset-px rounded-2xl opacity-60 [background:linear-gradient(135deg,rgba(212,175,55,0.14),transparent_40%,rgba(255,255,255,0.06))]" />

                {/* ✅ MOBILE: avatars um tiquinho menores e sempre dentro */}
                <div className="absolute right-4 top-4 flex -space-x-2 sm:right-5 sm:top-4">
                  <div className="h-7 w-7 sm:h-8 sm:w-8 overflow-hidden rounded-full border border-black/40 bg-white/10 shadow-[0_8px_18px_rgba(0,0,0,0.35)]">
                    <img
                      src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400&auto=format&fit=crop"
                      alt=""
                      className="h-full w-full object-cover"
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                  </div>
                  <div className="h-7 w-7 sm:h-8 sm:w-8 overflow-hidden rounded-full border border-black/40 bg-white/10 shadow-[0_8px_18px_rgba(0,0,0,0.35)]">
                    <img
                      src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=400&auto=format&fit=crop"
                      alt=""
                      className="h-full w-full object-cover"
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                  </div>
                  <div className="h-7 w-7 sm:h-8 sm:w-8 overflow-hidden rounded-full border border-black/40 bg-white/10 shadow-[0_8px_18px_rgba(0,0,0,0.35)]">
                    <img
                      src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=400&auto=format&fit=crop"
                      alt=""
                      className="h-full w-full object-cover"
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                  </div>
                </div>

                {/* ✅ MOBILE: dá mais espaço pro texto e evita “amassar” */}
                <div className="relative grid grid-cols-[1fr_1.35fr] gap-3 sm:gap-4 md:grid-cols-[1fr_1.25fr]">
                  <div className="flex flex-col">
                    <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-[10px] tracking-[0.22em] text-white/75 sm:text-[11px]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37] shadow-[0_0_14px_rgba(212,175,55,0.55)]" />
                      +10 ANOS
                    </div>

                    {/* ✅ MOBILE: loader menos “afastado” */}
                    <div className="mt-4 sm:mt-5 relative grid h-11 w-11 sm:h-12 sm:w-12 place-items-center rounded-2xl border border-white/10 bg-black/35">
                      <div className="h-6 w-6 sm:h-7 sm:w-7 rounded-full border border-white/15" />
                      <div className="pointer-events-none absolute inset-0 grid place-items-center">
                        <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-full border border-[#d4af37]/30 animate-[spin_1.25s_linear_infinite]" />
                      </div>
                    </div>
                  </div>

                  {/* ✅ MOBILE: remove o mt-14 no mobile (isso estraga). Só vale no desktop */}
                  <div className="flex items-center justify-end">
                    <p className="text-right text-[12px] leading-snug text-white/70 sm:text-[13px] md:text-sm md:mt-14">
                      Traga seu sorriso
                      <br />
                      para um novo nível.
                    </p>
                  </div>
                </div>
              </div>
              {/* fim card */}
            </div>
          </div>
        </div>

        {/* big card */}
        <div
          className={[
            "mt-9 sm:mt-10 md:mt-12",
            "transition-all duration-[520ms] ease-out will-change-transform",
            show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
          ].join(" ")}
          style={{ transitionDelay: "160ms" }}
        >
          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] shadow-[0_18px_70px_rgba(0,0,0,0.55)] backdrop-blur-2xl">
            <div className="absolute -inset-px rounded-[28px] opacity-70 [background:linear-gradient(135deg,rgba(255,255,255,0.06),transparent_35%,rgba(212,175,55,0.12))]" />

            {/* ✅ MOBILE: altura menor e mais proporcional */}
            <div className="relative h-[260px] sm:h-[300px] md:h-[360px] w-full">
              <div className="absolute inset-0">
                <video
                  className="h-full w-full object-cover opacity-95"
                  src="/hero.mp4"
                  poster="/hero-poster.jpg"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/25 to-black/10" />
                <div className="absolute inset-0 bg-[radial-gradient(900px_320px_at_25%_50%,rgba(0,0,0,0.55),transparent_60%)]" />
              </div>

              {/* ✅ MOBILE: card interno vira “full width” com margem; desktop igual */}
              <div className="absolute left-4 right-4 top-4 flex h-[calc(100%-32px)] w-auto flex-col justify-between rounded-2xl border border-white/12 bg-black/35 p-4 backdrop-blur-2xl sm:left-5 sm:right-5 sm:top-5 sm:h-[calc(100%-40px)] sm:p-5 md:left-7 md:top-7 md:right-auto md:h-[calc(100%-56px)] md:w-[420px] md:p-6">
                <div>
                  <div className="flex items-start justify-between">
                    <p className="text-lg sm:text-xl font-semibold tracking-tight text-white/95">
                      PREMIUM
                    </p>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="grid h-9 w-9 place-items-center rounded-full border border-white/12 bg-white/[0.02] text-white/80 transition-all duration-200 hover:border-[#d4af37]/35 hover:text-white"
                        aria-label="Anterior"
                      >
                        ←
                      </button>
                      <button
                        type="button"
                        className="grid h-9 w-9 place-items-center rounded-full border border-white/12 bg-white/[0.02] text-white/80 transition-all duration-200 hover:border-[#d4af37]/35 hover:text-white"
                        aria-label="Próximo"
                      >
                        →
                      </button>
                    </div>
                  </div>

                  {/* ✅ MOBILE: texto levemente menor pra caber sem “quebrar feio” */}
                  <p className="mt-3 sm:mt-4 text-[12.5px] sm:text-sm leading-relaxed text-white/70">
                    “Atendemos há mais de 10 anos com ética, transparência e cuidado
                    humanizado. Da parte básica à estética, unimos tecnologia e conforto
                    para entregar um resultado que você sente — e vê — em cada detalhe.”
                  </p>
                </div>

                <div className="mt-5 sm:mt-6 flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full border border-white/15 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.55),rgba(255,255,255,0.12))]" />
                  <div className="leading-tight">
                    <p className="text-sm text-white/85">Equipe Premium</p>
                    <p className="text-xs text-white/55">
                      Clínica odontológica • Todas as especialidades
                    </p>
                  </div>
                </div>
              </div>
              {/* fim overlay */}
            </div>
          </div>
        </div>

        {/* bottom pills */}
        <div
          className={[
            "mt-7 sm:mt-8 md:mt-10",
            "transition-all duration-[520ms] ease-out will-change-transform",
            show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
          ].join(" ")}
          style={{ transitionDelay: "220ms" }}
        >
          {/* ✅ MOBILE: 1 coluna (já), espaçamento mais bonito */}
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {pills.map((p) => (
              <div
                key={p.a}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-4 backdrop-blur-xl transition-all duration-200 hover:border-[#d4af37]/28 hover:bg-white/[0.03]"
              >
                <div className="absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100 [background:radial-gradient(280px_100px_at_50%_0%,rgba(212,175,55,0.14),transparent_65%)]" />
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-black/35 text-white/80">
                      {p.icon === "globe" && "⌁"}
                      {p.icon === "folder" && "⌂"}
                      {p.icon === "spark" && "✦"}
                    </span>
                    <span className="text-sm tracking-[0.12em] text-white/75">
                      {p.a}
                    </span>
                  </div>

                  <span className="text-white/30 transition-all duration-200 group-hover:text-[#d4af37]/80 group-hover:translate-x-0.5">
                    →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
}
