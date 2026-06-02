"use client";

import { useState } from "react";
import HeroSection from "./components/HeroSection";
import ListaNumerada from "./components/ListaNumerada";
import SelecaoArea from "./components/SelecaoArea";
import SecaoAccordion from "./components/SecaoAccordion";

export default function Home() {
  const [areaSelecionada, setAreaSelecionada] = useState("TI");

  return (
    <main className="w-full">
      <HeroSection />
      <ListaNumerada />
      <SelecaoArea
        areaSelecionada={areaSelecionada}
        onSelecionar={setAreaSelecionada}
      />
      <SecaoAccordion areaInicial={areaSelecionada} />
    </main>
  );
}
