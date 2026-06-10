"use client";

import { useState } from "react";
import HeroSection from "./components/HeroSection";
import SecaoAccordion from "./components/SecaoAccordion";
import Footer from "./components/Footer";

export default function Home() {
  const [areaSelecionada, setAreaSelecionada] = useState("");

  return (
    <main className="w-full">
      <HeroSection />
      <SecaoAccordion areaSelecionada={areaSelecionada} />
      <Footer />
    </main>
  );
}
