import { useEffect, useRef, useState } from "react";
import { Sparkles, Smile, ShieldCheck, Gem } from "lucide-react";

function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => setShow(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      {children}
    </div>
  );
}

export default function Services() {
  // ✅ Textos ajustados para ALLURE Estética Avançada
  const services = [
    {
      icon: <ShieldCheck size={28} />,
      title: "Injetáveis Premium",
      desc: "Botox, preenchimentos com ácido hialurônico (Belotero®, Restylane®, Juvéderm®, Perfectha®), skinbooster e harmonização facial — sempre com foco em naturalidade e segurança.",
    },
    {
      icon: <Sparkles size={28} />,
      title: "Bioestimuladores de Colágeno",
      desc: "Bioplus®, Sculptra® e Radiesse® para estimular colágeno, melhorar firmeza, tratar flacidez e devolver qualidade à pele de forma progressiva e natural.",
    },
    {
      icon: <Smile size={28} />,
      title: "Procedimentos Faciais",
      desc: "Limpeza de pele, peelings, microagulhamento, rejuvenescimento, lifting sem cirurgia e fios (PDO) — protocolos seguros e personalizados para cada paciente.",
    },
    {
      icon: <Gem size={28} />,
      title: "Corporal & Capilar",
      desc: "Lipo Reduz, drenagem linfática, massagem modeladora, protocolos de emagrecimento e mesoterapia capilar para fortalecimento e crescimento dos fios.",
    },
  ];

  return (
    <section id="servicos" className="relative bg-white py-16 md:py-20 overflow-hidden">
      {/* detalhe dourado topo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-24 bg-gradient-to-b from-[#D4AF37] to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <Reveal>
          <div className="text-center mb-12">
            <p className="text-[#D4AF37] tracking-[0.3em] text-sm mb-3">
              NOSSOS PROCEDIMENTOS
            </p>
            <h2 className="text-3xl md:text-4xl font-light text-black mb-4">
              Resultados naturais, com segurança
            </h2>
            <div className="w-24 h-[2px] bg-[#D4AF37] mx-auto" />
          </div>
        </Reveal>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <Reveal key={index} delay={index * 150}>
              <div className="group relative p-6 md:p-7 border-2 border-neutral-300 rounded-2xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                {/* Glow dourado animado */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-[#D4AF37]/10 via-transparent to-[#D4AF37]/10 blur-2xl" />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-14 h-14 flex items-center justify-center rounded-full border border-[#D4AF37] text-[#D4AF37] mb-6 transition-all duration-500 group-hover:bg-[#D4AF37] group-hover:text-white">
                    {service.icon}
                  </div>

                  <h3 className="text-2xl font-medium text-black mb-4">
                    {service.title}
                  </h3>

                  <p className="text-neutral-600 leading-relaxed">
                    {service.desc}
                  </p>

                  {/* linha animada */}
                  <div className="mt-6 w-0 group-hover:w-16 h-[2px] bg-[#D4AF37] transition-all duration-500" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
