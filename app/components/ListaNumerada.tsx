const itens = [
  "Texto texto texto Texto texto texto Texto texto texto Texto texto texto Texto texto texto Texto texto texto Texto texto texto",
  "Texto texto texto Texto texto texto Texto texto texto Texto texto texto Texto texto texto Texto texto texto Texto texto texto",
  "Texto texto texto Texto texto texto Texto texto texto Texto texto texto Texto texto texto Texto texto texto Texto texto texto",
  "Texto texto texto Texto texto texto Texto texto texto Texto texto texto Texto texto texto Texto texto texto Texto texto texto",
];

export default function ListaNumerada() {
  return (
    <section className="w-full bg-white py-16 px-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold text-[#0a2647] mb-10">Título</h2>
        <ol className="space-y-6">
          {itens.map((texto, i) => (
            <li key={i} className="flex items-start gap-4">
              <span className="flex-shrink-0 w-9 h-9 rounded-full border border-[#0a2647] flex items-center justify-center text-[#0a2647] font-medium text-sm">
                {i + 1}
              </span>
              <p className="text-gray-700 text-sm leading-relaxed pt-1">{texto}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
