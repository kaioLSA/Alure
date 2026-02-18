import React, { useEffect, useMemo, useRef, useState } from "react";

export default function Portfolio() {
  const ref = useRef(null);
  const [show, setShow] = useState(false);
  const [filter, setFilter] = useState("Todos");

  // ✅ modal
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(([e]) => setShow(e.isIntersecting), {
      threshold: 0.18,
    });

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // ✅ tags da Allure (mantive enxuto)
  const tags = useMemo(
    () => ["Todos", "Facial", "Preenchimento", "Toxina", "Corporal"],
    []
  );

  // ✅ Coloque suas fotos reais depois:
  // imgBefore / imgAfter (pode ser do /public/portfolio/...)
  const items = useMemo(
    () => [
      {
        id: "p1",
        tag: "Toxina",
        title: "Toxina Botulínica (Dysport®)",
        desc: "Suaviza linhas com naturalidade.",
        badge: "ANTES / DEPOIS",
        imgBefore:
          "https://versatilis.com.br/wp-content/uploads/2023/10/equipamentos-para-clinica-de-estetica-2048x1365.jpg",
        imgAfter:
          "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=1400&auto=format&fit=crop",
        detail:
          "Aplicação com foco em prevenção e suavização, respeitando proporções e expressões naturais. Avaliação e pontos personalizados.",
      },
      {
        id: "p2",
        tag: "Preenchimento",
        title: "Preenchimento (Juvederm®)",
        desc: "Contorno e hidratação profunda.",
        badge: "RESULTADO",
        imgBefore:
          "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1400&auto=format&fit=crop",
        imgAfter:
          "https://images.unsplash.com/photo-1520473378652-85d9c4aee6cf?q=80&w=1400&auto=format&fit=crop",
        detail:
          "Ácido hialurônico para contorno, hidratação e sustentação — com técnica precisa e acabamento discreto.",
      },
      {
        id: "p3",
        tag: "Facial",
        title: "Microagulhamento",
        desc: "Textura, viço e uniformidade.",
        badge: "PELE",
        imgBefore:
          "https://images.unsplash.com/photo-1526045478516-99145907023c?q=80&w=1400&auto=format&fit=crop",
        imgAfter:
          "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1400&auto=format&fit=crop",
        detail:
          "Estimula renovação e melhora textura com protocolo seguro. Indicado para marcas, poros e luminosidade.",
      },
      {
        id: "p4",
        tag: "Facial",
        title: "Peelings + Revitalização",
        desc: "Pele mais lisa e iluminada.",
        badge: "GLOW",
        imgBefore:
          "https://images.unsplash.com/photo-1522338140262-f46f5913618a?q=80&w=1400&auto=format&fit=crop",
        imgAfter:
          "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=1400&auto=format&fit=crop",
        detail:
          "Sessões combinadas para uniformizar tom, melhorar textura e devolver viço — sempre respeitando a sensibilidade da pele.",
      },
      {
        id: "p5",
        tag: "Corporal",
        title: "Redução de Gordura Localizada",
        desc: "Contorno com protocolo personalizado.",
        badge: "CORPO",
        imgBefore:
          "https://images.unsplash.com/photo-1556228578-8c89e6adf883?q=80&w=1400&auto=format&fit=crop",
        imgAfter:
          "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1400&auto=format&fit=crop",
        detail:
          "Enzimas e protocolos corporais para contorno e melhora da aparência da pele. Indicação e avaliação individual.",
      },
      {
        id: "p6",
        tag: "Facial",
        title: "Skinbooster",
        desc: "Hidratação e glow natural.",
        badge: "HIDRATAÇÃO",
        imgBefore:
          "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1400&auto=format&fit=crop",
        imgAfter:
          "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1400&auto=format&fit=crop",
        detail:
          "Hidratação profunda para melhorar luminosidade e textura, com resultado refinado e natural.",
      },
    ],
    []
  );

  const filtered = useMemo(() => {
    if (filter === "Todos") return items;
    return items.filter((x) => x.tag === filter);
  }, [filter, items]);

  const openModalByItem = (itemId) => {
    const idx = filtered.findIndex((x) => x.id === itemId);
    setActiveIndex(Math.max(0, idx));
    setOpen(true);
  };

  const closeModal = () => setOpen(false);

  const prev = () =>
    setActiveIndex((i) => (i - 1 + filtered.length) % filtered.length);
  const next = () => setActiveIndex((i) => (i + 1) % filtered.length);

  // ✅ ESC fecha + setas navegam
  useEffect(() => {
    if (!open) return;

    const onKey = (e) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, filtered.length]);

  const active = filtered[activeIndex];

  return (
    <section
      id="portfolio"
      ref={ref}
      className="relative w-full overflow-hidden bg-[#05080f] text-white"
    >
      {/* background igual vibe do Hero */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_20%_10%,rgba(212,175,55,0.14),transparent_60%),radial-gradient(900px_520px_at_80%_0%,rgba(255,255,255,0.06),transparent_55%),radial-gradient(900px_520px_at_70%_80%,rgba(212,175,55,0.10),transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:56px_56px]" />
        <div className="absolute -left-24 top-10 h-[520px] w-[520px] rounded-full bg-[#d4af37]/10 blur-3xl" />
        <div className="absolute -right-24 top-24 h-[520px] w-[520px] rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-16 md:py-20">
        {/* header */}
        <div
          className={[
            "transition-all duration-[520ms] ease-out will-change-transform",
            show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          ].join(" ")}
        >
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-[10px] tracking-[0.22em] text-white/70">
                <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37] shadow-[0_0_14px_rgba(212,175,55,0.55)]" />
                RESULTADOS
              </div>

              <h2 className="mt-4 text-[34px] leading-[1.02] tracking-tight sm:text-[42px] md:text-[52px]">
                <span className="block font-[520] text-white/95">
                  Antes & Depois
                </span>
                <span className="block font-[520] text-white/95">
                  com naturalidade.
                </span>
              </h2>

              <p className="mt-4 max-w-[56ch] text-[13px] leading-relaxed text-white/70 sm:text-sm">
                Casos reais de protocolos faciais e corporais — com foco em
                harmonia, segurança e acabamento premium.
              </p>
            </div>

            {/* filtros */}
            <div className="flex flex-wrap items-center gap-2">
              {tags.map((t, idx) => {
                const activeTag = filter === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setFilter(t)}
                    className={[
                      "group relative overflow-hidden rounded-full border px-4 py-2 text-[12px] tracking-[0.12em] backdrop-blur-xl transition-all duration-200",
                      activeTag
                        ? "border-[#d4af37]/40 bg-white/[0.04] text-white"
                        : "border-white/10 bg-white/[0.02] text-white/75 hover:border-[#d4af37]/30 hover:text-white",
                      show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
                    ].join(" ")}
                    style={{ transitionDelay: `${120 + idx * 40}ms` }}
                  >
                    <span className="relative z-10">{t}</span>
                    <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100 [background:radial-gradient(180px_70px_at_50%_40%,rgba(212,175,55,0.16),transparent_60%)]" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* grid */}
        <div
          className={[
            "mt-10 sm:mt-12",
            "transition-all duration-[520ms] ease-out will-change-transform",
            show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
          ].join(" ")}
          style={{ transitionDelay: "160ms" }}
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((it, i) => (
              <article
                key={it.id}
                className={[
                  "group relative overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.02] shadow-[0_18px_70px_rgba(0,0,0,0.35)] backdrop-blur-2xl",
                  "transition-all duration-300 hover:-translate-y-1 hover:border-[#d4af37]/25 hover:bg-white/[0.03]",
                  show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
                ].join(" ")}
                style={{ transitionDelay: `${220 + i * 60}ms` }}
              >
                <div className="absolute -inset-px rounded-[26px] opacity-0 transition-opacity duration-300 group-hover:opacity-70 [background:linear-gradient(135deg,rgba(255,255,255,0.06),transparent_35%,rgba(212,175,55,0.12))]" />

                {/* imagem (ANTES / DEPOIS no hover) */}
                <div className="relative h-[210px] w-full overflow-hidden">
                  {/* BEFORE */}
                  <img
                    src={it.imgBefore}
                    alt={`${it.title} - Antes`}
                    className="absolute inset-0 h-full w-full object-cover opacity-95 transition-all duration-[650ms] ease-out group-hover:opacity-0 group-hover:scale-[1.03]"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                  {/* AFTER */}
                  <img
                    src={it.imgAfter}
                    alt={`${it.title} - Depois`}
                    className="absolute inset-0 h-full w-full object-cover opacity-0 transition-all duration-[650ms] ease-out group-hover:opacity-100 group-hover:scale-[1.06]"
                    loading="lazy"
                    onError={(e) => {
                      // se der erro no after, volta pra before
                      e.currentTarget.style.display = "none";
                    }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/5" />
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 [background:radial-gradient(520px_220px_at_50%_10%,rgba(212,175,55,0.14),transparent_60%)]" />

                  <div className="absolute left-4 top-4 flex items-center gap-2">
                    <span className="rounded-full border border-white/12 bg-black/35 px-3 py-1 text-[10px] tracking-[0.22em] text-white/75 backdrop-blur-xl">
                      {it.tag.toUpperCase()}
                    </span>
                    <span className="rounded-full border border-[#d4af37]/30 bg-black/35 px-3 py-1 text-[10px] tracking-[0.22em] text-white/80 backdrop-blur-xl">
                      {it.badge}
                    </span>
                  </div>

                  {/* hint (só desktop) */}
                  <div className="pointer-events-none absolute bottom-3 right-3 hidden sm:inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[10px] tracking-[0.18em] text-white/70 backdrop-blur-xl">
                    PASSE O MOUSE ↔
                  </div>
                </div>

                {/* conteúdo */}
                <div className="relative p-5">
                  <h3 className="text-[15px] font-[560] tracking-tight text-white/92">
                    {it.title}
                  </h3>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-white/70">
                    {it.desc}
                  </p>

                  <div className="mt-5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-9 w-9 rounded-full border border-white/12 bg-white/[0.03] shadow-[0_0_0_1px_rgba(255,255,255,0.05)_inset]" />
                      <div className="leading-tight">
                        <p className="text-xs text-white/80">Allure</p>
                        <p className="text-[11px] text-white/50">
                          Estética Avançada
                        </p>
                      </div>
                    </div>

                    {/* abre pop-up */}
                    <button
                      type="button"
                      onClick={() => openModalByItem(it.id)}
                      className="group/btn relative inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.02] px-4 py-2 text-[12px] text-white/80 shadow-[0_0_0_1px_rgba(255,255,255,0.05)_inset] backdrop-blur-xl transition-all duration-200 hover:border-[#d4af37]/35 hover:text-white"
                    >
                      <span className="relative z-10">Ver</span>
                      <span className="relative z-10 transition-transform duration-200 group-hover/btn:translate-x-0.5">
                        ↗
                      </span>
                      <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-200 group-hover/btn:opacity-100 [background:radial-gradient(120px_60px_at_30%_50%,rgba(212,175,55,0.18),transparent_60%)]" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* CTA bottom */}
        <div
          className={[
            "mt-10 sm:mt-12",
            "transition-all duration-[520ms] ease-out will-change-transform",
            show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
          ].join(" ")}
          style={{ transitionDelay: "320ms" }}
        >
          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] px-5 py-6 shadow-[0_18px_70px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:px-7 sm:py-7">
            <div className="absolute -inset-px rounded-[28px] opacity-70 [background:linear-gradient(135deg,rgba(212,175,55,0.14),transparent_40%,rgba(255,255,255,0.06))]" />
            <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-[560] text-white/92">
                  Quer ver casos reais parecidos com o seu objetivo?
                </p>
                <p className="mt-1 text-[12.5px] leading-relaxed text-white/70">
                  Fale com a gente e te mostramos exemplos de protocolos que combinam com você.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  className="group relative inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.02] px-5 py-2.5 text-sm text-white/90 shadow-[0_0_0_1px_rgba(255,255,255,0.05)_inset] backdrop-blur-xl transition-all duration-200 hover:border-[#d4af37]/35 hover:bg-white/[0.04]"
                >
                  <span className="relative z-10">Falar no WhatsApp</span>
                  <span className="relative z-10 transition-transform duration-200 group-hover:translate-x-0.5">
                    ↗
                  </span>
                  <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-200 group-hover:opacity-100 [background:radial-gradient(120px_60px_at_30%_50%,rgba(212,175,55,0.18),transparent_60%)]" />
                </button>

                <button
                  type="button"
                  className="rounded-full border border-white/10 bg-black/30 px-5 py-2.5 text-sm text-white/75 backdrop-blur-xl transition-all duration-200 hover:border-white/18 hover:text-white"
                >
                  Ver todos os casos
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ MODAL */}
      <div
        className={[
          "fixed inset-0 z-[200] transition-all duration-300",
          open ? "pointer-events-auto" : "pointer-events-none",
        ].join(" ")}
        aria-hidden={!open}
      >
        {/* overlay */}
        <button
          type="button"
          onClick={closeModal}
          className={[
            "absolute inset-0",
            "bg-black/70 backdrop-blur-[6px]",
            "transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0",
          ].join(" ")}
          aria-label="Fechar"
        />

        {/* dialog */}
        <div
          className={[
            "absolute inset-0 flex items-center justify-center p-4 sm:p-6",
            "transition-all duration-300",
            open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
          ].join(" ")}
        >
          <div className="relative w-full max-w-4xl overflow-hidden rounded-[28px] border border-white/12 bg-[#05080f] text-white shadow-[0_25px_120px_rgba(0,0,0,0.65)]">
            {/* fundo premium */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute inset-0 bg-[radial-gradient(900px_420px_at_20%_10%,rgba(212,175,55,0.14),transparent_60%),radial-gradient(700px_420px_at_80%_0%,rgba(255,255,255,0.06),transparent_55%)]" />
              <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:56px_56px]" />
            </div>

            {/* header modal */}
            <div className="relative flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-5 sm:py-4">
              <div className="min-w-0">
                <p className="text-[11px] tracking-[0.22em] text-white/60">
                  {active?.tag?.toUpperCase()} • {active?.badge}
                </p>
                <p className="mt-1 truncate text-sm font-[600] text-white/90">
                  {active?.title}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prev}
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/12 bg-white/[0.02] text-white/80 transition-all duration-200 hover:border-[#d4af37]/35 hover:text-white"
                  aria-label="Anterior"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/12 bg-white/[0.02] text-white/80 transition-all duration-200 hover:border-[#d4af37]/35 hover:text-white"
                  aria-label="Próximo"
                >
                  →
                </button>

                <button
                  type="button"
                  onClick={closeModal}
                  className="ml-1 grid h-9 w-9 place-items-center rounded-full border border-white/12 bg-white/[0.02] text-white/80 transition-all duration-200 hover:border-white/20 hover:text-white"
                  aria-label="Fechar"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* body modal */}
            <div className="relative grid grid-cols-1 gap-0 md:grid-cols-2">
              {/* imagem grande (AFTER por padrão, com toggle no hover no desktop) */}
              <div className="relative h-[260px] w-full md:h-[420px] overflow-hidden">
                {active?.imgAfter ? (
                  <>
                    <img
                      key={active?.imgAfter}
                      src={active.imgAfter}
                      alt={`${active.title} - Depois`}
                      className="absolute inset-0 h-full w-full object-cover opacity-100 transition-opacity duration-300 md:hover:opacity-0"
                    />
                    <img
                      src={active.imgBefore}
                      alt={`${active.title} - Antes`}
                      className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 md:hover:opacity-100"
                    />
                  </>
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />
              </div>

              {/* texto */}
              <div className="flex flex-col justify-between p-5 sm:p-6">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-[10px] tracking-[0.22em] text-white/70">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37] shadow-[0_0_14px_rgba(212,175,55,0.55)]" />
                    DETALHES
                  </div>

                  <p className="mt-4 text-[13px] leading-relaxed text-white/75">
                    {active?.detail || active?.desc}
                  </p>

                  <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 backdrop-blur-xl">
                      <p className="text-[10px] tracking-[0.22em] text-white/55">
                        PROCESSO
                      </p>
                      <p className="mt-2 text-sm text-white/80">
                        Avaliação • Plano • Execução
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 backdrop-blur-xl">
                      <p className="text-[10px] tracking-[0.22em] text-white/55">
                        DIFERENCIAL
                      </p>
                      <p className="mt-2 text-sm text-white/80">
                        Segurança • Naturalidade • Acabamento
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    className="group relative inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.02] px-5 py-2.5 text-sm text-white/90 shadow-[0_0_0_1px_rgba(255,255,255,0.05)_inset] backdrop-blur-xl transition-all duration-200 hover:border-[#d4af37]/35 hover:bg-white/[0.04]"
                  >
                    <span className="relative z-10">Agendar avaliação</span>
                    <span className="relative z-10 transition-transform duration-200 group-hover:translate-x-0.5">
                      ↗
                    </span>
                    <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-200 group-hover:opacity-100 [background:radial-gradient(120px_60px_at_30%_50%,rgba(212,175,55,0.18),transparent_60%)]" />
                  </button>

                  <button
                    type="button"
                    onClick={closeModal}
                    className="rounded-full border border-white/10 bg-black/30 px-5 py-2.5 text-sm text-white/75 backdrop-blur-xl transition-all duration-200 hover:border-white/18 hover:text-white"
                  >
                    Fechar
                  </button>
                </div>

                <p className="mt-3 text-[11px] text-white/45">
                  Dica: use ← → no teclado para navegar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
}
