"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

export default function PortfolioVerticalVideo() {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  // ✅ modal
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const VIDEO_SRC = "/bbb.mp4";

  const items = useMemo(() => {
    const arr = [];
    for (let n = 6; n <= 12; n++) {
      arr.push({
        id: `case-${n}`,
        title: "Resultado real",
        subtitle: "Antes & Depois com naturalidade",
        img: `/${n}.jpg`, // se for .jpeg, troca aqui
        tag: "ANTES / DEPOIS",
      });
    }
    return arr;
  }, []);

  // ✅ reveal (UMA VEZ SÓ — não volta pra false)
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShow(true);
          obs.disconnect(); // ✅ para de observar pra não "sumir" depois
        }
      },
      {
        threshold: 0.12,
        rootMargin: "120px 0px", // ✅ ajuda a pegar antes e evita flicker
      }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const openModal = (idx) => {
    setActiveIndex(idx);
    setOpen(true);
  };
  const closeModal = () => setOpen(false);

  const prev = () =>
    setActiveIndex((i) => (i - 1 + items.length) % items.length);
  const next = () =>
    setActiveIndex((i) => (i + 1) % items.length);

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
  }, [open, items.length]);

  const active = items[activeIndex];

  return (
    <section
      id="portfolio"
      ref={ref}
      className="relative w-full overflow-hidden bg-[#05080f] text-white"
    >
      {/* fundo premium */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_20%_10%,rgba(212,175,55,0.14),transparent_60%),radial-gradient(900px_520px_at_80%_0%,rgba(255,255,255,0.06),transparent_55%),radial-gradient(900px_520px_at_70%_80%,rgba(212,175,55,0.10),transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:56px_56px]" />
        <div className="absolute -left-28 top-10 h-[520px] w-[520px] rounded-full bg-[#d4af37]/10 blur-3xl" />
        <div className="absolute -right-28 top-24 h-[520px] w-[520px] rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-4xl px-4 py-14 sm:px-6 sm:py-16 md:py-20">
        {/* header */}
        <div
          className={[
            "transition-all duration-[520ms] ease-out will-change-transform",
            show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          ].join(" ")}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-[10px] tracking-[0.22em] text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37] shadow-[0_0_14px_rgba(212,175,55,0.55)]" />
            PORTFÓLIO
          </div>

          <h2 className="mt-4 text-[34px] leading-[1.03] tracking-tight sm:text-[42px] md:text-[52px]">
            <span className="block font-[560] text-white/95">
              Antes & Depois
            </span>
            <span className="block font-[560] text-white/95">
              em casos reais.
            </span>
          </h2>

          <p className="mt-4 max-w-[62ch] text-[13px] leading-relaxed text-white/70 sm:text-sm">
            As fotos já estão com antes/depois na mesma imagem. Clique em
            qualquer caso para abrir o vídeo no pop-up.
          </p>
        </div>

        {/* lista 1 embaixo da outra */}
        <div className="mt-10 sm:mt-12 space-y-6">
          {items.map((it, idx) => (
            <button
              key={it.id}
              type="button"
              onClick={() => openModal(idx)}
              className={[
                "group w-full text-left",
                "transition-all duration-300 hover:-translate-y-0.5",
                show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
              ].join(" ")}
              style={{ transitionDelay: `${140 + idx * 70}ms` }}
            >
              <div className="relative overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.02] shadow-[0_18px_70px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
                <div className="absolute -inset-px rounded-[26px] opacity-0 transition-opacity duration-300 group-hover:opacity-80 [background:linear-gradient(135deg,rgba(255,255,255,0.06),transparent_35%,rgba(212,175,55,0.12))]" />

                {/* topo */}
                <div className="relative px-5 pt-5 sm:px-6 sm:pt-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[11px] tracking-[0.22em] text-white/60">
                        REALCE SUA BELEZA NATURAL
                      </p>
                      <p className="mt-2 text-sm sm:text-[15px] font-[620] text-white/92">
                        {it.title}
                      </p>
                      <p className="mt-1 text-[12.5px] leading-relaxed text-white/70">
                        {it.subtitle}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="rounded-full border border-[#d4af37]/30 bg-black/35 px-3 py-1 text-[10px] tracking-[0.22em] text-white/80 backdrop-blur-xl">
                        {it.tag}
                      </span>
                      <span className="hidden sm:inline-flex rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[10px] tracking-[0.18em] text-white/70 backdrop-blur-xl">
                        CLIQUE PARA VER VÍDEO ↗
                      </span>
                    </div>
                  </div>
                </div>

                {/* imagem */}
                <div className="relative mt-4 overflow-hidden px-4 pb-5 sm:px-6 sm:pb-6">
                  <div className="relative overflow-hidden rounded-[22px] border border-white/10 bg-black/25">
                    <img
                      src={it.img}
                      alt={`Caso ${idx + 1}`}
                      className="h-auto w-full object-cover transition-transform duration-[650ms] ease-out group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />

                    <div className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full border border-white/12 bg-black/45 px-4 py-2 text-[12px] text-white/85 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.05)_inset]">
                      <span className="grid h-7 w-7 place-items-center rounded-full bg-white/[0.06] border border-white/10">
                        ▶
                      </span>
                      <span className="tracking-[0.12em] text-[11px]">
                        VER VÍDEO
                      </span>
                    </div>
                  </div>

                  <p className="mt-3 text-[11px] text-white/45">
                    Dica: no pop-up use ← → para navegar.
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* MODAL */}
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
            "absolute inset-0 bg-black/70 backdrop-blur-[6px] transition-opacity duration-300",
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
          {/* ✅ ajuste do modal pra NÃO estourar no celular */}
          <div className="relative w-full max-w-4xl overflow-hidden rounded-[28px] border border-white/12 bg-[#05080f] text-white shadow-[0_25px_120px_rgba(0,0,0,0.65)] max-h-[92svh] overflow-y-auto md:max-h-none md:overflow-visible">
            <div className="relative flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-5 sm:py-4">
              <div className="min-w-0">
                <p className="text-[11px] tracking-[0.22em] text-white/60">
                  CASO {activeIndex + 1} • VÍDEO
                </p>
                <p className="mt-1 truncate text-sm font-[650] text-white/90">
                  {active?.title}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prev}
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/12 bg-white/[0.02] text-white/80 hover:border-[#d4af37]/35 hover:text-white"
                  aria-label="Anterior"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/12 bg-white/[0.02] text-white/80 hover:border-[#d4af37]/35 hover:text-white"
                  aria-label="Próximo"
                >
                  →
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="ml-1 grid h-9 w-9 place-items-center rounded-full border border-white/12 bg-white/[0.02] text-white/80 hover:border-white/20 hover:text-white"
                  aria-label="Fechar"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* ✅ MOBILE 1 coluna + vídeo com svh (não estoura) / DESKTOP 2 colunas normal */}
            <div className="relative grid grid-cols-1 md:grid-cols-2">
              <div className="flex items-center justify-center bg-black p-4 sm:p-5 md:p-0">
                <div
                  className={[
                    "w-full max-w-[92vw] aspect-[9/16] rounded-2xl overflow-hidden border border-white/10",
                    "max-h-[62svh]",
                    "md:max-h-none md:max-w-none md:rounded-none md:border-0",
                  ].join(" ")}
                >
                  <video
                    key={open ? `open-${activeIndex}` : "closed"}
                    src={VIDEO_SRC}
                    controls
                    autoPlay
                    playsInline
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              <div className="p-4 sm:p-6 md:p-6">
                <div className="overflow-hidden rounded-[22px] border border-white/10 bg-black/25">
                  <img
                    src={active?.img}
                    alt={`Caso ${activeIndex + 1}`}
                    className="h-auto w-full object-cover"
                    loading="lazy"
                  />
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-2 md:mt-6">
                  <button
                    type="button"
                    className="rounded-full border border-white/12 bg-white/[0.02] px-5 py-2.5 text-sm text-white/90 hover:border-[#d4af37]/35 hover:bg-white/[0.04]"
                  >
                    Agendar avaliação ↗
                  </button>

                  <button
                    type="button"
                    onClick={closeModal}
                    className="rounded-full border border-white/10 bg-black/30 px-5 py-2.5 text-sm text-white/75 hover:border-white/18 hover:text-white"
                  >
                    Fechar
                  </button>
                </div>

                <p className="mt-3 text-[11px] text-white/45">
                  Dica: ESC fecha • ← → navega
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}