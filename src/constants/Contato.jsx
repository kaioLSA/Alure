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
      className="relative w-full py-28 bg-[#f8f6f1] overflow-hidden"
    >
      {/* Glow dourado suave */}
      <div className="absolute -top-40 -left-40 w-[400px] h-[400px] bg-yellow-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
        {/* LADO ESQUERDO */}
        <div
          className={`transition-all duration-1000 ease-out ${
            visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
          }`}
        >
          <p className="text-sm tracking-[4px] text-yellow-600 font-medium mb-4">
            FALE COM A ALLURE
          </p>

          <h2 className="text-4xl md:text-5xl font-semibold text-black leading-tight mb-6">
            Agende sua avaliação <br /> e receba um plano personalizado
          </h2>

          <p className="text-gray-600 mb-10 max-w-md">
            Aqui, saúde, beleza e bem-estar caminham juntos. Conte com uma equipe
            preparada para te orientar com segurança e foco em resultados naturais.
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
          <div className="bg-white shadow-2xl rounded-3xl p-10 border border-gray-100">
            <form className="space-y-6">
              {/* Nome */}
              <div>
                <label className="text-sm text-gray-600">Nome</label>
                <input
                  type="text"
                  placeholder="Seu nome completo"
                  className="w-full mt-2 px-4 py-3 rounded-xl 
                  border border-gray-200 
                  bg-white 
                  text-black 
                  placeholder-gray-400
                  focus:border-yellow-600 
                  focus:ring-2 
                  focus:ring-yellow-200 
                  outline-none transition-all"
                />
              </div>

              {/* Telefone */}
              <div>
                <label className="text-sm text-gray-600">Telefone</label>
                <input
                  type="text"
                  placeholder="(11) 99999-9999"
                  className="w-full mt-2 px-4 py-3 rounded-xl 
                  border border-gray-200 
                  bg-white 
                  text-black 
                  placeholder-gray-400
                  focus:border-yellow-600 
                  focus:ring-2 
                  focus:ring-yellow-200 
                  outline-none transition-all"
                />
              </div>

              {/* Mensagem */}
              <div>
                <label className="text-sm text-gray-600">Mensagem</label>
                <textarea
                  rows="4"
                  placeholder="Conte seu objetivo (facial, corporal ou capilar) e o melhor horário para contato."
                  className="w-full mt-2 px-4 py-3 rounded-xl 
                  border border-gray-200 
                  bg-white 
                  text-black 
                  placeholder-gray-400
                  focus:border-yellow-600 
                  focus:ring-2 
                  focus:ring-yellow-200 
                  outline-none transition-all resize-none"
                ></textarea>
              </div>

              {/* Botão */}
              <button
                type="submit"
                className="
                  w-full py-4 rounded-xl font-semibold tracking-wide
                  bg-gradient-to-r from-yellow-500 to-yellow-600
                  text-black
                  transition-all duration-500
                  hover:scale-[1.02]
                  hover:shadow-[0_10px_30px_rgba(234,179,8,0.4)]
                  active:scale-[0.98]
                "
              >
                Solicitar Avaliação
              </button>

              <p className="text-xs text-gray-500 leading-relaxed">
                Ao enviar, você autoriza nosso contato para confirmar seu atendimento e
                orientar os próximos passos.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
