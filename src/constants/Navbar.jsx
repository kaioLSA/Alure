import React, { useEffect, useMemo, useRef, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  // 🔥 Scroll suave premium
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

    const NAV_OFFSET = 96;
    const top =
      el.getBoundingClientRect().top + window.pageYOffset - NAV_OFFSET;

    setOpen(false);
    setTimeout(() => smoothScrollTo(top, 760), 60);
  };

  const goCTA = () => scrollToId("contato");

  return (
    <>
      {/* 🔥 Underline do centro */}
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
            rgba(212,175,55,0) 0%,
            rgba(212,175,55,0.95) 50%,
            rgba(212,175,55,0) 100%
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
        className={`fixed inset-0 z-[80] bg-black/70 backdrop-blur-[2px] transition-all duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      <header className="fixed top-0 left-0 w-full z-[90]">
        <nav
          className={`transition-all duration-500 ${
            scrolled
              ? "bg-black/65 backdrop-blur-2xl border-b border-yellow-500/15"
              : "bg-transparent border-b border-transparent"
          }`}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6">

            {/* ✅ MOBILE = 2 COLUNAS | DESKTOP = 3 COLUNAS */}
            <div className="grid h-[76px] sm:h-[88px] items-center grid-cols-[1fr_auto] lg:grid-cols-[1fr_auto_1fr]">

              {/* Logo */}
              <div className="justify-self-start">
                <button
                  onClick={() => scrollToId("home")}
                  className="flex items-center gap-3"
                >
                  <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-black/40 border border-yellow-500/20">
                    <img
                      src="/logo.svg"
                      alt="Premium Clínica Odontológica"
                      className="w-8 h-8 object-contain"
                    />
                  </div>

                  {/* Texto some no mobile */}
                  <div className="hidden sm:block text-left leading-tight">
                    <div className="text-white font-semibold tracking-wide">
                      Premium
                    </div>
                    <div className="text-[11px] text-yellow-500/90 tracking-[0.22em] uppercase">
                      Clínica Odontológica
                    </div>
                  </div>
                </button>
              </div>

              {/* Links Desktop */}
              <div className="hidden lg:flex justify-self-center items-center gap-10">
                {navLinks.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => scrollToId(l.id)}
                    className="center-underline text-white/85 hover:text-white transition text-[12px] tracking-[0.28em] uppercase"
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
                             bg-yellow-500/10 border border-yellow-500/30
                             text-yellow-200 hover:text-yellow-100
                             transition-all duration-300 hover:translate-y-[-1px]"
                >
                  <span className="text-[11px] tracking-[0.28em] uppercase">
                    Agendar
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Botão Mobile (fica na direita agora) */}
              <div className="lg:hidden justify-self-end">
                <button
                  className="inline-flex items-center justify-center w-11 h-11 rounded-2xl border border-yellow-500/20 bg-black/40 text-white"
                  onClick={() => setOpen((s) => !s)}
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
              <div className="rounded-3xl border border-yellow-500/15 bg-black/75 backdrop-blur-2xl p-5">
                <div className="flex flex-col gap-3">
                  {navLinks.map((l) => (
                    <button
                      key={l.id}
                      onClick={() => scrollToId(l.id)}
                      className="text-left rounded-2xl px-4 py-3
                                 text-white/90 hover:text-white transition-all duration-300"
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
                             bg-yellow-500/10 border border-yellow-500/25
                             text-yellow-200 hover:text-yellow-100
                             transition-all duration-300"
                >
                  <span className="text-[12px] tracking-[0.22em] uppercase">
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
      <div className="relative h-[76px] sm:h-[88px] bg-[#05080f] overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_20%_10%,rgba(212,175,55,0.14),transparent_60%),radial-gradient(900px_520px_at_80%_0%,rgba(255,255,255,0.06),transparent_55%)]" />
      </div>
    </>
  );
}
