import { useEffect, useRef, useState } from "react";

/* ============================
   Reveal Animation (entra e sai) — mais leve no mobile
============================ */
function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => setShow(entry.isIntersecting), {
      threshold: 0.15,
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`
        transition-all duration-700 ease-out will-change-transform
        ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
      `}
    >
      {children}
    </div>
  );
}

/* ============================
   FAQ Item — ✅ sem “lag” no mobile
   (usa height real com CSS var, em vez de max-h fixo)
============================ */
function FaqItem({ question, answer, index, openIndex, setOpenIndex }) {
  const isOpen = openIndex === index;
  const contentRef = useRef(null);
  const [h, setH] = useState(0);

  // mede a altura real do conteúdo (resolve travadinhas no mobile)
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const measure = () => setH(el.scrollHeight || 0);
    measure();

    // Recalcula em resize/orientação (iOS/Android)
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [answer]);

  return (
    <div className="border-b border-[#d4af37]/30">
      <button
        type="button"
        onClick={() => setOpenIndex(isOpen ? null : index)}
        className="w-full flex justify-between items-center py-6 text-left group"
      >
        <h3 className="text-lg md:text-xl font-medium text-black group-hover:text-[#b8962e] transition-colors duration-300">
          {question}
        </h3>

        <span
          className={`
            text-2xl text-[#b8962e]
            transition-transform duration-300 will-change-transform
            ${isOpen ? "rotate-45" : "rotate-0"}
          `}
        >
          +
        </span>
      </button>

      {/* ✅ animação suave usando height real */}
      <div
        style={{ height: isOpen ? h : 0 }}
        className={`overflow-hidden transition-[height] duration-300 ease-out`}
      >
        <div
          ref={contentRef}
          className={`pb-6 text-gray-700 leading-relaxed transition-opacity duration-200 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          {answer}
        </div>
      </div>
    </div>
  );
}

/* ============================
   FAQ Section — ALLURE
============================ */
export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  // ✅ Textos adaptados para sua clínica (Allure Estética Avançada)
  const faqs = [
    {
      question: "Os resultados ficam naturais?",
      answer:
        "Sim. Nosso foco é realçar sua beleza com harmonia e sofisticação, respeitando seus traços e objetivos. Cada plano é individual, sem exageros.",
    },
    {
      question: "Quais procedimentos vocês fazem?",
      answer:
        "Trabalhamos com procedimentos faciais e corporais: toxina botulínica (Dysport®), preenchimentos com ácido hialurônico (Juvederm®), bioestimuladores de colágeno (Sculptra®, Radiesse®, Ellansé®), skinbooster, microagulhamento, peelings e protocolos corporais.",
    },
    {
      question: "Bioestimulador é indicado para flacidez?",
      answer:
        "Sim. Bioestimuladores estimulam a produção natural de colágeno e ajudam na firmeza, textura e qualidade da pele. A indicação depende da avaliação e do seu objetivo.",
    },
    {
      question: "Como funciona a avaliação?",
      answer:
        "A avaliação é personalizada: entendemos suas queixas, histórico e objetivo, e montamos um plano seguro com etapas claras (procedimento + cuidados + acompanhamento).",
    },
    {
      question: "A clínica existe há quanto tempo?",
      answer:
        "Estamos há 2 anos oferecendo estética avançada com foco em segurança, resultados naturais e um atendimento cuidadoso do início ao pós-procedimento.",
    },
  ];

  return (
    <section id="faq" className="relative py-28 bg-[#f9f7f2] overflow-hidden">
      {/* Glow dourado de fundo */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#d4af37]/10 blur-[140px] rounded-full" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <Reveal>
          <div className="text-center mb-16">
            <span className="text-[#b8962e] tracking-widest uppercase text-sm">
              Dúvidas Frequentes
            </span>

            <h2 className="text-4xl md:text-5xl font-light text-black mt-4">
              Perguntas sobre nossos procedimentos
            </h2>

            <div className="w-24 h-[2px] bg-[#d4af37] mx-auto mt-6"></div>
          </div>
        </Reveal>

        <div className="space-y-2">
          {faqs.map((item, index) => (
            <Reveal key={index} delay={index * 80}>
              <FaqItem
                question={item.question}
                answer={item.answer}
                index={index}
                openIndex={openIndex}
                setOpenIndex={setOpenIndex}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
