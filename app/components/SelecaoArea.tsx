"use client";

const areas = [
  "Comunicação",
  "Finanças",
  "TI",
  "Educação",
  "RH/\nAdministração",
  "Esporte",
  "Saúde",
  "Beleza",
];

interface SelecaoAreaProps {
  areaSelecionada: string;
  onSelecionar: (area: string) => void;
}

export default function SelecaoArea({ areaSelecionada, onSelecionar }: SelecaoAreaProps) {
  return (
    <section className="w-full bg-[#0a2647] py-16 px-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-white text-xl font-medium text-center mb-8">
          Escolha sua área de interesse:
        </h2>
        <div className="grid grid-cols-4 gap-4">
          {areas.map((area) => {
            const areaKey = area.replace("\n", " ");
            const ativo = areaSelecionada === areaKey;
            return (
              <button
                key={areaKey}
                onClick={() => onSelecionar(areaKey)}
                className={`
                  rounded-xl p-4 text-white text-sm font-medium text-left
                  transition-all cursor-pointer min-h-[80px]
                  ${ativo
                    ? "bg-[#1a5276] ring-2 ring-white"
                    : "bg-[#154360] hover:bg-[#1a5276]"
                  }
                `}
              >
                {area}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
