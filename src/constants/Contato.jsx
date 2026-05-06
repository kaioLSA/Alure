import { useEffect, useRef, useState } from "react";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Contato() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.2,
    });

    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="contato"
      ref={ref}
      className="relative w-full py-16 md:py-20 bg-[#f8f6f1] overflow-hidden"
    >
      {/* Glow dourado suave */}
      <div className="absolute -top-40 -left-40 w-[400px] h-[400px] bg-yellow-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-stretch">
        {/* LADO ESQUERDO */}
        <div
          className={`flex flex-col justify-center transition-all duration-1000 ease-out ${
            visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
          }`}
        >
          <p className="text-sm tracking-[4px] text-yellow-600 font-medium mb-4">
            FALE COM A ALLURE
          </p>

          <h2 className="text-3xl md:text-4xl font-semibold text-black leading-tight mb-4">
            Agende sua avaliação <br /> personalizada
          </h2>

          <p className="text-gray-600 mb-10 max-w-md">
            Aqui você encontra acolhimento, orientação clara e um plano feito
            sob medida para seus objetivos. Mais de 9 anos cuidando da autoestima
            de quem nos escolhe — com segurança e resultados naturais.
          </p>

          <div className="space-y-6 text-black">
            <div className="flex items-center gap-4">
              <MapPin className="text-yellow-600" size={22} />
              <span>Endereço da clínica</span>
            </div>

            <div className="flex items-center gap-4">
              <Phone className="text-yellow-600" size={22} />
              <span>WhatsApp / Telefone</span>
            </div>

            <div className="flex items-center gap-4">
              <Mail className="text-yellow-600" size={22} />
              <span>contato@allure.com.br</span>
            </div>
          </div>
        </div>

        {/* LADO DIREITO - FORM */}
        <div
          className={`transition-all duration-1000 delay-200 ease-out ${
            visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
          }`}
        >
          <div className="bg-white shadow-[0_8px_40px_rgba(0,0,0,0.08)] rounded-3xl p-8 sm:p-10 border border-gray-100/80 relative overflow-hidden">
            {/* Accent line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-500" />

            <h3 className="text-lg font-semibold text-gray-900 mb-1">Solicite sua avaliacao</h3>
            <p className="text-sm text-gray-400 mb-7">Preencha abaixo e entraremos em contato</p>

            <form className="space-y-5">
              {/* Nome */}
              <div className="relative">
                <label className="text-[11px] uppercase tracking-[0.15em] text-gray-400 font-medium">Nome</label>
                <div className="relative mt-1.5">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0112 0v1"/></svg>
                  </span>
                  <input
                    type="text"
                    placeholder="Seu nome completo"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl
                    border border-gray-200 bg-gray-50/50
                    text-sm text-black placeholder-gray-350
                    focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100 focus:bg-white
                    outline-none transition-all duration-300"
                  />
                </div>
              </div>

              {/* Telefone */}
              <div className="relative">
                <label className="text-[11px] uppercase tracking-[0.15em] text-gray-400 font-medium">Telefone</label>
                <div className="relative mt-1.5">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                  </span>
                  <input
                    type="text"
                    placeholder="(11) 99999-9999"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl
                    border border-gray-200 bg-gray-50/50
                    text-sm text-black placeholder-gray-350
                    focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100 focus:bg-white
                    outline-none transition-all duration-300"
                  />
                </div>
              </div>

              {/* Servico */}
              <div className="relative">
                <label className="text-[11px] uppercase tracking-[0.15em] text-gray-400 font-medium">Servico de interesse</label>
                <div className="relative mt-1.5">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 14l2 2 4-4"/></svg>
                  </span>
                  <select
                    defaultValue=""
                    className="w-full pl-11 pr-10 py-3.5 rounded-xl
                    border border-gray-200 bg-gray-50/50
                    text-sm text-black
                    focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100 focus:bg-white
                    outline-none transition-all duration-300
                    appearance-none cursor-pointer"
                  >
                    <option value="" disabled className="text-gray-400">Selecione um servico</option>
                    <option value="harmonizacao-facial">Harmonizacao Facial</option>
                    <option value="bioestimuladores">Bioestimuladores</option>
                    <option value="botox">Botox</option>
                    <option value="fios-pdo">Fios PDO</option>
                    <option value="gluteo">Gluteo</option>
                    <option value="lipo-redux">Lipo Redux</option>
                    <option value="microagulhamento">Microagulhamento</option>
                    <option value="outro">Outro</option>
                  </select>
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 6l4 4 4-4"/></svg>
                  </span>
                </div>
              </div>

              {/* Botao */}
              <button
                type="submit"
                className="
                  w-full py-4 rounded-xl font-semibold tracking-wide text-sm
                  bg-gradient-to-r from-yellow-500 to-yellow-600
                  text-black
                  shadow-[0_4px_20px_rgba(234,179,8,0.25)]
                  transition-all duration-500
                  hover:scale-[1.02]
                  hover:shadow-[0_8px_30px_rgba(234,179,8,0.4)]
                  active:scale-[0.98]
                "
              >
                Solicitar Avaliacao
              </button>

              <p className="text-[11px] text-gray-400 leading-relaxed text-center">
                Ao enviar, voce autoriza nosso contato para confirmar seu atendimento e
                orientar os proximos passos.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
