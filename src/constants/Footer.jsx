import React, { useEffect, useMemo, useRef, useState } from "react";
import { Instagram, MapPin, Phone, Mail, MessageCircle } from "lucide-react";

export default function Footer() {
  const ref = useRef(null);
  const rafRef = useRef(null);

  const [show, setShow] = useState(false);

  // ✅ animação ao aparecer
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => setShow(entry.isIntersecting),
      { threshold: 0.2 }
    );

    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  // ✅ mesma animação premium do Navbar
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

    const NAV_OFFSET = 96; // 🔥 igual seu Navbar
    const top = el.getBoundingClientRect().top + window.pageYOffset - NAV_OFFSET;

    // 🔥 mesmo delay premium do Navbar
    setTimeout(() => smoothScrollTo(top, 760), 60);
  };

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

  return (
    <footer
      ref={ref}
      className="relative w-full overflow-hidden text-white pt-20 pb-10"
      style={{
        background:
          "radial-gradient(circle at 20% 30%, rgba(212,175,55,0.08), transparent 40%), #050b14",
      }}
    >
      {/* underline do centro (mesma vibe do navbar) */}
      <style>{`
        .footer-center-underline {
          position: relative;
          display: inline-block;
        }
        .footer-center-underline::after {
          content: "";
          position: absolute;
          left: 50%;
          bottom: -10px;
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
        .footer-center-underline:hover::after {
          transform: translateX(-50%) scaleX(1);
        }
      `}</style>

      {/* Glow dourado */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-yellow-500/10 blur-[140px] rounded-full pointer-events-none" />

      <div
        className={`max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10 transition-all duration-1000 ${
          show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* LOGO */}
        <div>
          <img src="/logo.svg" alt="Premium Odontologia" className="w-40 mb-6" />
          <p className="text-gray-400 leading-relaxed text-sm">
            Há mais de 10 anos promovendo saúde bucal com ética, tecnologia avançada
            e atendimento humanizado.
          </p>
        </div>

        {/* NAVEGAÇÃO (AGORA COM SCROLL PREMIUM DO NAVBAR) */}
        <div>
          <h3 className="text-yellow-500 font-semibold mb-4 tracking-wider">
            Navegação
          </h3>

          <ul className="space-y-3 text-gray-400">
            {navLinks.map((item) => (
              <li key={item.id} className="w-fit">
                <button
                  onClick={() => scrollToId(item.id)}
                  className="footer-center-underline text-left text-white/85 hover:text-white transition text-[12px] tracking-[0.28em] uppercase"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* CONTATO */}
        <div>
          <h3 className="text-yellow-500 font-semibold mb-4 tracking-wider">
            Contato
          </h3>

          <ul className="space-y-4 text-gray-400 text-sm">
            <li className="flex items-center gap-3 hover:text-yellow-500 transition">
              <MapPin size={16} />
              Osasco - SP
            </li>

            <li className="flex items-center gap-3 hover:text-yellow-500 transition">
              <Phone size={16} />
              (11) 99999-9999
            </li>

            <li className="flex items-center gap-3 hover:text-yellow-500 transition">
              <Mail size={16} />
              contato@premium.com
            </li>
          </ul>
        </div>

        {/* REDES SOCIAIS */}
        <div>
          <h3 className="text-yellow-500 font-semibold mb-4 tracking-wider">
            Redes Sociais
          </h3>

          <div className="flex gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="w-11 h-11 flex items-center justify-center border border-yellow-500/30 rounded-full transition-all duration-500 hover:bg-yellow-500 hover:text-black hover:scale-110"
            >
              <Instagram size={18} />
            </a>

            <a
              href="https://wa.me/5511999999999"
              target="_blank"
              rel="noreferrer"
              className="w-11 h-11 flex items-center justify-center border border-yellow-500/30 rounded-full transition-all duration-500 hover:bg-yellow-500 hover:text-black hover:scale-110"
            >
              <MessageCircle size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Linha final */}
      <div className="border-t border-white/10 mt-14 pt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Premium Odontologia — Todos os direitos reservados.
      </div>
    </footer>
  );
}
