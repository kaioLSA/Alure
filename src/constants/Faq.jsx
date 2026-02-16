import { useEffect, useRef, useState } from "react";

/* ============================
   Reveal Animation (entra e sai)
============================ */
function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => setShow(entry.isIntersecting),
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`
        transition-all duration-700 ease-out
        ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
      `}
    >
      {children}
    </div>
  );
}

/* ============================
   FAQ Item
============================ */
function FaqItem({ question, answer, index, openIndex, setOpenIndex }) {
  const isOpen = openIndex === index;

  return (
    <div
      className={`
        border-b border-[#d4af37]/30
        transition-all duration-500
      `}
    >
      <button
        onClick={() => setOpenIndex(isOpen ? null : index)}
        className="w-full flex justify-between items-center py-6 text-left group"
      >
        <h3 className="text-lg md:text-xl font-medium text-black group-hover:text-[#b8962e] transition-colors duration-300">
          {question}
        </h3>

        <span
          className={`
            text-2xl text-[#b8962e]
            transition-transform duration-500
            ${isOpen ? "rotate-45" : "rotate-0"}
          `}
        >
          +
        </span>
      </button>

      <div
        className={`
          overflow-hidden transition-all duration-500 ease-in-out
          ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <p className="pb-6 text-gray-700 leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
}

/* ============================
   FAQ Section
============================ */
export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "A clínica realiza tratamentos estéticos?",
      answer:
        "Sim. Trabalhamos com facetas em porcelana, clareamento dental e harmonização do sorriso utilizando tecnologia moderna e protocolos seguros.",
    },
    {
      question: "Vocês realizam tratamentos como canal e extração?",
      answer:
        "Sim. Atuamos em todas as especialidades da odontologia, incluindo tratamentos de canal, extrações e procedimentos restauradores com total conforto.",
    },
    {
      question: "A clínica possui tecnologia moderna?",
      answer:
        "Utilizamos equipamentos de última geração que proporcionam mais precisão, segurança e conforto durante todo o tratamento.",
    },
    {
      question: "Há quanto tempo a Premium está no mercado?",
      answer:
        "Estamos há mais de 10 anos promovendo saúde bucal de forma ética, humanizada e transparente para nossos pacientes.",
    },
  ];

  return (
    <section
      id="faq"
      className="relative py-28 bg-[#f9f7f2] overflow-hidden"
    >
      {/* Glow dourado de fundo */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#d4af37]/10 blur-[140px] rounded-full" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <Reveal>
          <div className="text-center mb-16">
            <span className="text-[#b8962e] tracking-widest uppercase text-sm">
              Dúvidas Frequentes
            </span>

            <h2 className="text-4xl md:text-5xl font-light text-black mt-4">
              Perguntas sobre nossos tratamentos
            </h2>

            <div className="w-24 h-[2px] bg-[#d4af37] mx-auto mt-6"></div>
          </div>
        </Reveal>

        <div className="space-y-2">
          {faqs.map((item, index) => (
            <Reveal key={index} delay={index * 100}>
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
