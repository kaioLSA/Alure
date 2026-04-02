import React, { useEffect, useMemo, useRef, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const rafRef = useRef(null);

  const navLinks = useMemo(
    () => [
      { label: "Home", id: "home" },
      { label: "Sobre", id: "sobre" },
      { label: "Serviços", id: "servicos" },
      { label: "Portfólio", id: "portfolio" },
      { label: "Contato", id: "contato" },
    ],
    []
  );

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const hero = document.getElementById("home");
      if (hero) {
        const heroBottom = hero.offsetTop + hero.offsetHeight;
        setPastHero(window.scrollY + 100 >= heroBottom);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  const smoothScrollTo = (targetY, duration = 700) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const startY = window.pageYOffset;
    const diff = targetY - startY;
    const start = performance.now();
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const step = (now) => {
      const t = Math.min(1, (now - start) / duration);
      window.scrollTo(0, startY + diff * easeOutCubic(t));
      if (t < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
  };

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const NAV_OFFSET = 96;
    const top = el.getBoundingClientRect().top + window.pageYOffset - NAV_OFFSET;
    setOpen(false);
    setTimeout(() => smoothScrollTo(top, 760), 60);
  };

  const goCTA = () => scrollToId("contato");

  return (
    <>
      <style>{`
        .center-underline {
          position: relative;
          display: inline-block;
        }
        .center-underline::after {
          content: "";
          position: absolute;
          left: 50%;
          bottom: -12px;
          height: 2px;
          width: 100%;
          background: linear-gradient(
            90deg,
            rgba(180,130,40,0) 0%,
            rgba(180,130,40,0.85) 50%,
            rgba(180,130,40,0) 100%
          );
          transform: translateX(-50%) scaleX(0);
          transform-origin: center;
          transition: transform 0.35s ease;
        }
        .center-underline:hover::after {
          transform: translateX(-50%) scaleX(1);
        }
      `}</style>

      {/* Overlay mobile */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[80] bg-black/40 backdrop-blur-[2px] transition-all duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      <header className="fixed top-0 left-0 w-full z-[90]">
        <nav
          className={`transition-all duration-500 ${
            pastHero
              ? "bg-zinc-950/95 backdrop-blur-2xl border-b border-zinc-800/60 shadow-lg"
              : scrolled
                ? "bg-white/90 backdrop-blur-2xl border-b border-gray-200/60 shadow-sm"
                : "bg-white/70 backdrop-blur-xl border-b border-transparent"
          }`}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid h-[76px] sm:h-[88px] items-center grid-cols-[1fr_auto] lg:grid-cols-[1fr_auto_1fr]">
              {/* LOGO */}
              <div className="justify-self-start">
                <button
                  onClick={() => scrollToId("home")}
                  className="flex items-center"
                  aria-label="Ir para o início"
                >
                  <img
                    src="/logo.svg"
                    alt="Logo"
                    className={`h-8 sm:h-9 w-auto object-contain transition-all duration-500 ${pastHero ? "brightness-0 invert" : ""}`}
                    draggable={false}
                  />
                </button>
              </div>

              {/* Links Desktop */}
              <div className="hidden lg:flex justify-self-center items-center gap-10">
                {navLinks.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => scrollToId(l.id)}
                    className={`center-underline transition text-[12px] tracking-[0.28em] uppercase ${
                      pastHero ? "text-zinc-400 hover:text-white" : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>

              {/* CTA Desktop */}
              <div className="hidden lg:flex justify-self-end">
                <button
                  onClick={goCTA}
                  className="inline-flex items-center gap-3 rounded-2xl px-6 py-3
                             bg-amber-500 hover:bg-amber-600
                             text-white
                             transition-all duration-300 hover:translate-y-[-1px]
                             shadow-md shadow-amber-500/20"
                >
                  <span className="text-[11px] tracking-[0.28em] uppercase font-semibold">
                    Agendar
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Botão Mobile */}
              <div className="lg:hidden justify-self-end">
                <button
                  className={`inline-flex items-center justify-center w-11 h-11 rounded-2xl border transition-all duration-500 ${
                    pastHero
                      ? "border-zinc-700 bg-zinc-800/60 text-zinc-300"
                      : "border-gray-200 bg-white/60 text-gray-700"
                  }`}
                  onClick={() => setOpen((s) => !s)}
                  aria-label={open ? "Fechar menu" : "Abrir menu"}
                >
                  {open ? <X size={22} /> : <Menu size={22} />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <div
            className={`lg:hidden overflow-hidden transition-all duration-500 ${
              open ? "max-h-[560px]" : "max-h-0"
            }`}
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 pb-6">
              <div className="rounded-3xl border border-gray-200 bg-white/95 backdrop-blur-2xl p-5 shadow-lg">
                <div className="flex flex-col gap-1">
                  {navLinks.map((l) => (
                    <button
                      key={l.id}
                      onClick={() => scrollToId(l.id)}
                      className="text-left rounded-2xl px-4 py-3
                                 text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-all duration-300"
                    >
                      <div className="text-[13px] tracking-[0.22em] uppercase">
                        {l.label}
                      </div>
                    </button>
                  ))}
                </div>

                <button
                  onClick={goCTA}
                  className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-4
                             bg-amber-500 hover:bg-amber-600
                             text-white
                             transition-all duration-300 shadow-md shadow-amber-500/20"
                >
                  <span className="text-[12px] tracking-[0.22em] uppercase font-semibold">
                    Agendar Consulta
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Spacer */}
      <div className="relative h-[76px] sm:h-[88px] bg-zinc-50 overflow-hidden" />
    </>
  );
}
