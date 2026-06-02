"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { useState } from "react";

const dadosPorArea: Record<string, string[]> = {
  "TI": [
    "Nome aqui",
    "Nome aqui",
    "Nome aqui",
    "Nome aqui",
    "Nome aqui",
    "Nome aqui",
    "Nome aqui",
    "Nome aqui",
  ],
  "Comunicação": ["Nome aqui", "Nome aqui", "Nome aqui"],
  "Finanças": ["Nome aqui", "Nome aqui", "Nome aqui", "Nome aqui"],
  "Educação": ["Nome aqui", "Nome aqui"],
  "RH/ Administração": ["Nome aqui", "Nome aqui", "Nome aqui"],
  "Esporte": ["Nome aqui", "Nome aqui"],
  "Saúde": ["Nome aqui", "Nome aqui", "Nome aqui"],
  "Beleza": ["Nome aqui", "Nome aqui"],
};

const todasAreas = Object.keys(dadosPorArea);

interface SecaoAccordionProps {
  areaInicial?: string;
}

export default function SecaoAccordion({ areaInicial = "TI" }: SecaoAccordionProps) {
  const [areaSelecionada, setAreaSelecionada] = useState(areaInicial);
  const itens = dadosPorArea[areaSelecionada] ?? [];

  return (
    <section className="w-full bg-[#0a2647] py-16 px-8 min-h-[500px]">
      <div className="max-w-lg mx-auto">
        {/* Dropdown seletor de área */}
        <div className="relative mb-6">
          <select
            value={areaSelecionada}
            onChange={(e) => setAreaSelecionada(e.target.value)}
            className="w-full bg-white text-gray-700 text-sm rounded px-3 py-2 appearance-none cursor-pointer focus:outline-none"
          >
            <option value="" disabled>
              Selecione sua área de interesse aqui
            </option>
            {todasAreas.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs">
            ▾
          </span>
        </div>

        {/* Cabeçalho com botão voltar e nome da área */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-white text-sm">‹</span>
          <span className="text-white font-semibold text-lg">{areaSelecionada}</span>
        </div>

        {/* Lista de accordions */}
        <Accordion.Root type="multiple" className="space-y-1">
          {itens.map((nome, i) => (
            <Accordion.Item
              key={i}
              value={`item-${i}`}
              className="bg-[#154360] rounded overflow-hidden"
            >
              <Accordion.Trigger className="w-full flex items-center justify-between px-4 py-3 text-white text-sm font-medium hover:bg-[#1a5276] transition-colors group">
                <span>{nome}</span>
                <span className="text-white/70 text-xs transition-transform group-data-[state=open]:rotate-180">
                  ∨
                </span>
              </Accordion.Trigger>
              <Accordion.Content className="px-4 pb-3 text-white/80 text-sm">
                Conteúdo do item {nome}.
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}
