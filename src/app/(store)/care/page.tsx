import type { Metadata } from "next";
import { Emblem } from "@/components/brand/emblem";

export const metadata: Metadata = {
  alternates: { canonical: "/care" },
  title: "Cuidado y compatibilidad",
  description: "Consejos para elegir, instalar y cuidar los repuestos de freno de FRENOSHOP en Santa Cruz.",
};

const TIPS = [
  {
    title: "Confirma tu vehículo",
    body: "Antes de pedir, ten a mano la marca, modelo, año y motor de tu vehículo. Así encontramos la pieza exacta para tu sistema de frenos.",
  },
  {
    title: "Pastillas y discos",
    body: "Cambia las pastillas cuando el desgaste llegue al límite y revisa los discos: una superficie rayada o muy delgada también debe reemplazarse.",
  },
  {
    title: "Líquido de frenos",
    body: "Usa el tipo correcto (DOT 3, DOT 4 o DOT 5.1 según tu vehículo). El líquido absorbe humedad con el tiempo: respeta el intervalo de cambio del fabricante.",
  },
  {
    title: "Instalación profesional",
    body: "La mayoría de estos repuestos requiere herramientas y experiencia. Recomendamos instalarlos en un taller de confianza y revisar el sistema completo.",
  },
  {
    title: "Kits y sellos",
    body: "Cuando reparamos un cilindro o bomba, sustituimos siempre los sellos del kit: reutilizar sellos viejos es la causa más común de fugas.",
  },
  {
    title: "¿Un problema con tu pedido?",
    body: "Escríbenos por WhatsApp con tu número de pedido y lo resolvemos. Tu compra está respaldada.",
  },
];

export default function CarePage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-16">
      <div className="text-center">
        <Emblem size={40} className="mx-auto text-brand" accent="var(--color-accent)" />
        <span className="eyebrow mt-3 block">Ayuda</span>
        <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-ink">
          Cuidado y compatibilidad
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-muted">
          Todo lo que necesitas saber para elegir el repuesto adecuado y mantener tus frenos en buen estado.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {TIPS.map((t) => (
          <div key={t.title} className="rounded-xl border border-[var(--line)] bg-cream-soft p-6">
            <h2 className="font-display text-xl font-bold text-ink">{t.title}</h2>
            <p className="mt-2 text-sm text-ink/80">{t.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
