"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

const BASE = import.meta.env.BASE_URL;

/* ─── Reveal (once) ─── */
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShow(true); obs.disconnect(); } },
      { threshold: 0.1, rootMargin: "80px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-[700ms] ease-[cubic-bezier(.16,1,.3,1)] will-change-transform ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════
   PORTFOLIO CAROUSEL
═══════════════════════════════ */
export default function PortfolioCarousel() {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragX, setDragX] = useState(0);
  const trackRef = useRef(null);
  const videoRef = useRef(null);
  const dragStart = useRef(null);
  const autoPlayRef = useRef(null);

  const items = useMemo(() => {
    const data = [
      {
        video: "armonizacao-facial", title: "Harmonização Facial",
        desc: "A harmonização facial é um conjunto de procedimentos estéticos que busca equilibrar as proporções do rosto, realçando a beleza natural de cada paciente. Utilizamos técnicas como preenchimento com ácido hialurônico, bioestimuladores e toxina botulínica para criar um resultado harmonioso, natural e personalizado.",
      },
      {
        video: "bioestimuladores", title: "Bioestimuladores",
        desc: "Os bioestimuladores de colágeno — como Sculptra® e Radiesse® — estimulam a produção natural de colágeno pela pele, devolvendo firmeza, sustentação e viço ao longo do tempo. O resultado é progressivo e duradouro, ideal para quem busca rejuvenescimento sem parecer artificial.",
      },
      {
        video: "botox", title: "Botox",
        desc: "A toxina botulínica é o procedimento mais realizado no mundo para suavizar linhas de expressão. Com aplicação precisa e personalizada, reduz rugas na testa, entre as sobrancelhas e ao redor dos olhos, mantendo a expressão facial natural e a movimentação saudável do rosto.",
      },
      {
        video: "fiospdo", title: "Fios PDO",
        desc: "Os fios de PDO promovem um lifting facial sem cirurgia, reposicionando os tecidos e estimulando a produção de colágeno. O procedimento é minimamente invasivo, com recuperação rápida, e oferece um efeito tensor imediato que continua melhorando ao longo dos meses.",
      },
      {
        video: "armonizacao-de-gluteo", title: "Glúteo",
        desc: "O tratamento estético para glúteos utiliza bioestimuladores e preenchimentos para melhorar o contorno, volume e firmeza da região. É uma alternativa segura e eficaz à cirurgia, com resultados naturais que valorizam as curvas e a silhueta de forma harmoniosa.",
      },
      {
        video: "liporedux", title: "Lipo Redux",
        desc: "A Lipo Redux é um tratamento de redução de gordura localizada não invasivo, que utiliza ultrassom de alta potência para destruir as células de gordura. Ideal para abdômen, flancos e culotes, oferece resultados visíveis já nas primeiras sessões, sem cortes e sem tempo de recuperação.",
      },
      {
        video: "microagulhamento", title: "Microagulhamento",
        desc: "O microagulhamento cria microcanais na pele que estimulam a regeneração celular e a produção de colágeno e elastina. Indicado para tratar cicatrizes de acne, poros dilatados, manchas e flacidez, é um procedimento que transforma a textura e a luminosidade da pele progressivamente.",
      },
    ];
    const arr = [];
    for (let n = 0; n < data.length; n++) {
      arr.push({
        id: `case-${n}`,
        title: data[n].title,
        subtitle: "Antes & Depois",
        desc: data[n].desc,
        img: `${BASE}${n + 6}.jpg`,
        video: `${BASE}video/${data[n].video}.mp4`,
      });
    }
    return arr;
  }, []);

  /* ── Responsive visible count ── */
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const VISIBLE = isMobile ? 1 : 3;
  const maxSlide = Math.max(0, items.length - VISIBLE);

  const goTo = useCallback((idx) => {
    const clamped = Math.max(0, Math.min(idx, maxSlide));
    setIsTransitioning(true);
    setCurrentSlide(clamped);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [maxSlide]);

  const goNext = useCallback(() => goTo(currentSlide + 1), [currentSlide, goTo]);
  const goPrev = useCallback(() => goTo(currentSlide - 1), [currentSlide, goTo]);

  /* ── Auto-play ── */
  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      setCurrentSlide((prev) => {
        const next = prev + 1;
        return next > maxSlide ? 0 : next;
      });
    }, 4000);
    return () => clearInterval(autoPlayRef.current);
  }, [maxSlide]);

  const pauseAutoPlay = () => {
    clearInterval(autoPlayRef.current);
  };

  const resumeAutoPlay = () => {
    clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      setCurrentSlide((prev) => {
        const next = prev + 1;
        return next > maxSlide ? 0 : next;
      });
    }, 4000);
  };

  /* ── Touch / Drag ── */
  const dragXRef = useRef(0);

  const onTouchStart = (e) => {
    dragStart.current = { x: e.touches[0].clientX, time: Date.now() };
    dragXRef.current = 0;
    setIsDragging(true);
    setDragX(0);
    pauseAutoPlay();
  };

  const onTouchMove = (e) => {
    if (!dragStart.current) return;
    const dx = e.touches[0].clientX - dragStart.current.x;
    dragXRef.current = dx;
    setDragX(dx);
  };

  const onTouchEnd = () => {
    if (!dragStart.current) return;
    const threshold = 50;
    const dx = dragXRef.current;
    if (dx < -threshold) goNext();
    else if (dx > threshold) goPrev();
    dragStart.current = null;
    setIsDragging(false);
    setDragX(0);
    dragXRef.current = 0;
    resumeAutoPlay();
  };

  /* Desktop pointer drag */
  const onPointerDown = (e) => {
    if (isMobile) return;
    dragStart.current = { x: e.clientX, time: Date.now() };
    setIsDragging(true);
    setDragX(0);
    pauseAutoPlay();
  };

  const onPointerMove = (e) => {
    if (isMobile || !dragStart.current) return;
    const dx = e.clientX - dragStart.current.x;
    setDragX(dx);
  };

  const onPointerUp = () => {
    if (isMobile || !dragStart.current) return;
    const threshold = 60;
    if (dragX < -threshold) goNext();
    else if (dragX > threshold) goPrev();
    dragStart.current = null;
    setIsDragging(false);
    setDragX(0);
    resumeAutoPlay();
  };

  /* ── Modal ── */
  const stopVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.removeAttribute("src");
      videoRef.current.load();
    }
  };
  const openModal = (idx) => { setActiveIndex(idx); setOpen(true); pauseAutoPlay(); };
  const closeModal = () => { stopVideo(); setOpen(false); resumeAutoPlay(); };
  const prevModal = () => { stopVideo(); setActiveIndex((i) => (i - 1 + items.length) % items.length); };
  const nextModal = () => { stopVideo(); setActiveIndex((i) => (i + 1) % items.length); };

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") prevModal();
      if (e.key === "ArrowRight") nextModal();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, items.length]);

  const active = items[activeIndex];

  /* ── Carousel offset ── */
  const GAP = 16;
  const cardWidthPercent = 100 / VISIBLE;
  const dragPercent = isDragging ? (dragX / (trackRef.current?.offsetWidth || 1)) * 100 : 0;
  const gapOffset = isMobile ? currentSlide * GAP : currentSlide * GAP * (1 - 1 / VISIBLE);
  const translateX = -(currentSlide * cardWidthPercent) + dragPercent;

  return (
    <section
      id="portfolio"
      className="relative w-full overflow-hidden bg-zinc-950 text-white"
    >
      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_15%_20%,rgba(212,175,55,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(700px_400px_at_85%_80%,rgba(212,175,55,0.05),transparent_55%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        {/* Header + Navigation */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-6 mb-8 md:mb-10">
          <div className="max-w-xl">
            <Reveal>
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-10 bg-[#d4af37]" />
                <span className="text-[10px] tracking-[0.4em] uppercase text-white/50 font-medium">
                  Resultados reais
                </span>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <h2 className="text-[28px] sm:text-[34px] md:text-[40px] tracking-tight leading-[1.05] font-light text-white/95">
                Antes & Depois{" "}
                <span className="text-white/40">em casos reais.</span>
              </h2>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-4 text-[14px] leading-relaxed text-white/45 max-w-[52ch]">
                Cada resultado reflete nosso compromisso com naturalidade, segurança
                e cuidado. Toque em qualquer caso para assistir ao procedimento.
              </p>
            </Reveal>
          </div>

          {/* Arrow controls — desktop only */}
          <Reveal delay={200}>
            <div className="hidden md:flex items-center gap-3">
              {/* Counter */}
              <span className="text-[13px] tabular-nums text-white/40 mr-2">
                {String(currentSlide + 1).padStart(2, "0")}
                <span className="mx-1 text-white/20">/</span>
                {String(items.length - VISIBLE + 1).padStart(2, "0")}
              </span>

              <button
                type="button"
                onClick={() => { goPrev(); pauseAutoPlay(); resumeAutoPlay(); }}
                disabled={currentSlide === 0}
                className="grid h-11 w-11 place-items-center rounded-full border border-white/[0.1] bg-white/[0.03] text-white/70 hover:border-[#d4af37]/40 hover:text-white transition-all duration-300 active:scale-95 disabled:opacity-30 disabled:pointer-events-none"
                aria-label="Anterior"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M10 3L5 8L10 13" />
                </svg>
              </button>

              <button
                type="button"
                onClick={() => { goNext(); pauseAutoPlay(); resumeAutoPlay(); }}
                disabled={currentSlide >= maxSlide}
                className="grid h-11 w-11 place-items-center rounded-full border border-white/[0.1] bg-white/[0.03] text-white/70 hover:border-[#d4af37]/40 hover:text-white transition-all duration-300 active:scale-95 disabled:opacity-30 disabled:pointer-events-none"
                aria-label="Proximo"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 3L11 8L6 13" />
                </svg>
              </button>
            </div>
          </Reveal>
        </div>

        {/* ── Carousel Track ── */}
        <div
          className="relative overflow-hidden cursor-grab active:cursor-grabbing"
          onMouseEnter={pauseAutoPlay}
          onMouseLeave={resumeAutoPlay}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            ref={trackRef}
            className={`flex ${isDragging ? "" : "transition-transform duration-500 ease-[cubic-bezier(.25,.8,.25,1)]"}`}
            style={{
              gap: `${GAP}px`,
              transform: `translateX(calc(${translateX}% - ${gapOffset}px))`,
            }}
          >
            {items.map((item, index) => (
              <div
                key={item.id}
                className="flex-shrink-0"
                style={{ width: `calc((100% - ${(VISIBLE - 1) * GAP}px) / ${VISIBLE})` }}
              >
                <button
                  type="button"
                  onClick={() => !isDragging && openModal(index)}
                  className="group relative block w-full text-left overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-1"
                >
                  <div className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden bg-zinc-900">
                    <img
                      src={item.img}
                      alt={`Caso ${index + 1}`}
                      className="h-full w-full object-cover scale-[1.03] transition-transform duration-[800ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.08]"
                      loading="lazy"
                      draggable={false}
                    />

                    {/* Alure logo watermark */}
                    <div className="pointer-events-none absolute inset-x-0 bottom-[80px] flex justify-center z-10">
                      <img
                        src={`${BASE}logo.svg`}
                        alt=""
                        className="w-28 opacity-80 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]"
                        draggable={false}
                      />
                    </div>

                    {/* Gradient */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent" />

                    {/* Hover overlay */}
                    <div className="pointer-events-none absolute inset-0 bg-zinc-950/15 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                    {/* Play icon */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-400">
                      <span className="grid h-14 w-14 place-items-center rounded-full bg-white/10 border border-white/20 backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
                        <svg width="15" height="17" viewBox="0 0 15 17" fill="white" className="ml-0.5">
                          <path d="M14 8.5L1 16V1L14 8.5Z" />
                        </svg>
                      </span>
                    </div>

                    {/* Number badge */}
                    <div className="absolute top-3 right-3 h-8 w-8 rounded-full bg-zinc-950/50 border border-white/10 backdrop-blur-md flex items-center justify-center">
                      <span className="text-[11px] font-medium text-white/75 tabular-nums">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Bottom info */}
                    <div className="absolute bottom-0 inset-x-0 p-5">
                      <div className="flex items-center gap-1.5 mb-2">
                        <span className="h-[3px] w-3 rounded-full bg-[#d4af37]" />
                        <span className="text-[9px] tracking-[0.25em] uppercase text-[#d4af37]/80 font-medium">
                          {item.subtitle}
                        </span>
                      </div>
                      <p className="text-[15px] font-semibold text-white/95 leading-tight">
                        {item.title}
                      </p>
                      <p className="mt-1.5 text-[11px] text-white/40 group-hover:text-white/65 transition-colors duration-300">
                        Toque para ver o procedimento
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ── Mobile arrows + counter ── */}
        <div className="md:hidden flex items-center justify-center gap-4 mt-6">
          <button
            type="button"
            onClick={() => { goPrev(); pauseAutoPlay(); resumeAutoPlay(); }}
            disabled={currentSlide === 0}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/[0.12] bg-white/[0.05] text-white/70 active:scale-95 disabled:opacity-25 transition-all duration-200"
            aria-label="Anterior"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M10 3L5 8L10 13" />
            </svg>
          </button>

          <span className="text-[13px] tabular-nums text-white/50 min-w-[3ch] text-center">
            {String(currentSlide + 1).padStart(2, "0")}
            <span className="mx-1 text-white/20">/</span>
            {String(maxSlide + 1).padStart(2, "0")}
          </span>

          <button
            type="button"
            onClick={() => { goNext(); pauseAutoPlay(); resumeAutoPlay(); }}
            disabled={currentSlide >= maxSlide}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/[0.12] bg-white/[0.05] text-white/70 active:scale-95 disabled:opacity-25 transition-all duration-200"
            aria-label="Proximo"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 3L11 8L6 13" />
            </svg>
          </button>
        </div>

        {/* ── Desktop progress dots ── */}
        <div className="hidden md:flex mt-8 items-center gap-1.5 justify-center">
          {Array.from({ length: maxSlide + 1 }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => { goTo(i); pauseAutoPlay(); resumeAutoPlay(); }}
              className="group relative h-6 flex items-center justify-center px-0.5"
              aria-label={`Ir para slide ${i + 1}`}
            >
              <span
                className={`block rounded-full transition-all duration-500 ${
                  i === currentSlide
                    ? "w-7 h-[3px] bg-[#d4af37]"
                    : "w-[3px] h-[3px] bg-white/20 group-hover:bg-white/40"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* ═══ MODAL ═══ */}
      <div
        className={[
          "fixed inset-0 z-[200] transition-all duration-300",
          open ? "pointer-events-auto" : "pointer-events-none",
        ].join(" ")}
        aria-hidden={!open}
      >
        <button
          type="button"
          onClick={closeModal}
          className={[
            "absolute inset-0 bg-zinc-950/80 backdrop-blur-sm transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0",
          ].join(" ")}
          aria-label="Fechar"
        />

        <div
          className={[
            "absolute inset-0 flex items-center justify-center p-4 sm:p-6 transition-all duration-300",
            open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
          ].join(" ")}
        >
          <div className="relative w-full max-w-4xl overflow-hidden rounded-[24px] border border-white/[0.08] bg-zinc-950 text-white shadow-[0_25px_80px_rgba(0,0,0,0.6)] max-h-[92svh] overflow-y-auto md:max-h-none md:overflow-visible">
            {/* Header */}
            <div className="relative flex items-center justify-between gap-3 border-b border-white/[0.06] px-5 py-4">
              <div className="min-w-0">
                <p className="text-[10px] tracking-[0.25em] text-white/40 uppercase">
                  Caso {activeIndex + 1} de {items.length}
                </p>
                <p className="mt-1 truncate text-sm font-medium text-white/85">
                  {active?.title}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prevModal}
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/[0.08] bg-white/[0.03] text-white/70 hover:border-[#d4af37]/30 hover:text-white transition-all duration-300 active:scale-[0.96]"
                  aria-label="Anterior"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8.5 3L4.5 7L8.5 11" /></svg>
                </button>
                <button
                  type="button"
                  onClick={nextModal}
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/[0.08] bg-white/[0.03] text-white/70 hover:border-[#d4af37]/30 hover:text-white transition-all duration-300 active:scale-[0.96]"
                  aria-label="Proximo"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5.5 3L9.5 7L5.5 11" /></svg>
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="ml-1 grid h-9 w-9 place-items-center rounded-full border border-white/[0.08] bg-white/[0.03] text-white/70 hover:border-white/15 hover:text-white transition-all duration-300 active:scale-[0.96]"
                  aria-label="Fechar"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 3L11 11M11 3L3 11" /></svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="relative grid grid-cols-1 md:grid-cols-2">
              {/* Video */}
              <div className="flex items-center justify-center bg-zinc-900 p-3 md:p-0">
                <div className="w-full aspect-[9/16] max-h-[50svh] md:max-h-none rounded-xl md:rounded-none overflow-hidden border border-white/[0.06] md:border-0">
                  {open && (
                    <video
                      ref={videoRef}
                      key={activeIndex}
                      src={active?.video}
                      controls
                      autoPlay
                      playsInline
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
              </div>

              {/* Info side */}
              <div className="p-4 md:p-6">
                {/* Before/After image */}
                <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-zinc-900">
                  <img
                    src={active?.img}
                    alt={`Caso ${activeIndex + 1}`}
                    className="h-auto w-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Procedure tag */}
                <div className="mt-4 flex items-center gap-2">
                  <span className="h-[3px] w-3 rounded-full bg-[#d4af37]" />
                  <span className="text-[10px] tracking-[0.2em] uppercase text-[#d4af37]/80 font-medium">
                    {active?.title}
                  </span>
                </div>

                {/* Description — desktop only */}
                <p className="hidden md:block mt-3 text-[13px] leading-relaxed text-white/50">
                  {active?.desc}
                </p>

                {/* CTA buttons */}
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <a
                    href="https://wa.me/5500000000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#d4af37] px-5 py-2.5 text-sm font-medium text-zinc-950 hover:bg-[#c9a430] transition-all duration-300 active:scale-[0.98]"
                  >
                    Agendar avaliacao
                  </a>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="rounded-full border border-white/[0.08] bg-white/[0.03] px-5 py-2.5 text-sm text-white/55 hover:text-white/80 transition-all duration-300 active:scale-[0.98]"
                  >
                    Fechar
                  </button>
                </div>

                <p className="mt-3 text-[11px] text-white/30 hidden md:block">
                  ESC fecha / setas navegam entre casos
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
