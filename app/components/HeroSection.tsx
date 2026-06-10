export default function HeroSection() {
  const beneficios = [
    {
      titulo: "Tome decisões mais inteligentes",
      subtitulo: "Use dados para crescer com estratégia",
    },
    {
      titulo: "Automatize tarefas repetitivas",
      subtitulo: "Reduza o tempo gasto no operacional",
    },
    {
      titulo: "Organize seu fluxo de trabalho",
      subtitulo: "Tenha mais controle e clareza nos processos",
    },
  ];

  return (
    <section className="w-full bg-[#0d2137] px-8 pt-12 pb-0">
      <div className="max-w-5xl mx-auto">
        {/* Topo: grid decorativo + texto */}
        <div className="flex items-start gap-8 mb-16">
          {/* Grade decorativa de quadrados */}
          <div className="flex-shrink-0 grid grid-cols-2 gap-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="w-12 h-12 rounded bg-[#1a3a5c] opacity-80"
              />
            ))}
          </div>

          {/* Título e subtítulo */}
          <div className="pt-2">
            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-3">
              IA: Sua Ferramenta Otimizadora de Processos
            </h1>
            <p className="text-white/70 italic text-base md:text-lg">
              Simplifique processos e foque no que gera valor!
            </p>
          </div>
        </div>

        {/* Cards de benefícios */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-12">
          {beneficios.map((b, i) => (
            <div
              key={i}
              className="bg-[#154360] rounded-xl p-5 flex flex-col gap-3"
            >
              {/* Ícone alvo */}
              <div className="w-10 h-10 flex items-center justify-center">
                <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
                  <circle cx="20" cy="20" r="18" stroke="white" strokeWidth="1.5" strokeOpacity="0.6" />
                  <circle cx="20" cy="20" r="13" stroke="white" strokeWidth="1.5" strokeOpacity="0.6" />
                  <circle cx="20" cy="20" r="8" stroke="white" strokeWidth="1.5" strokeOpacity="0.6" />
                  <circle cx="20" cy="20" r="3" fill="white" fillOpacity="0.7" />
                </svg>
              </div>
              <div>
                <p className="text-white font-bold text-sm leading-snug">{b.titulo}</p>
                <p className="text-white/60 italic text-xs mt-1">{b.subtitulo}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
