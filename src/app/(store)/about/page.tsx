import type { Metadata } from "next";
import Link from "next/link";
import { Emblem } from "@/components/brand/emblem";
import { SplitText } from "@/components/text-reveal";

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  title: "Nosotros",
  description: "FRENOSHOP — repuestos de frenos en Santa Cruz, Bolivia. Atención personalizada en Feria Barrio Lindo.",
};

const PILLARS = [
  { title: "Frenos, ante todo", body: "Pastillas, discos, cilindros y kits: todo lo que tu vehículo necesita para frenar seguro." },
  { title: "Atención de verdad", body: "Te ayudamos a encontrar la pieza correcta para tu marca y modelo. Sin vueltas, sin correteos." },
  { title: "Fácil de encontrar", body: "Estamos en Feria Barrio Lindo, Acronal B, pasillo D 316. Escríbenos por WhatsApp y te atendemos." },
];

export default function AboutPage() {
  return (
    <div className="bg-cream px-5 py-12">
      <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-[var(--line)] bg-panel">
        <div className="px-6 py-16 text-center sm:px-14">
          <Emblem size={52} className="mx-auto text-brand" accent="var(--color-accent)" />
          <span className="eyebrow mt-5 block">Quiénes somos</span>
          <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-ink text-balance sm:text-5xl">
            <SplitText text="Tu freno" />{" "}
            <span className="brand-text">en buenas manos</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-ink/80">
            FRENOSHOP nació en Santa Cruz para resolver lo que todo conductor conoce:
            encontrar el repuesto de freno correcto, rápido y sin complicaciones.
            Nos especializamos en pastillas, discos, tambores, cilindros, kits y
            líquidos para autos y camionetas.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-ink/80">
            Atendemos en persona en nuestro local de Feria Barrio Lindo y por
            WhatsApp. Si no sabes qué pieza necesitas, cuéntanos tu vehículo y te
            ayudamos a identificarla. Tu seguridad empieza por un buen freno.
          </p>
          <Link
            href="/shop"
            className="mt-7 inline-block rounded-full bg-accent px-8 py-3 text-sm font-semibold text-brand-deep shadow-[0_14px_32px_-16px_rgba(245,179,1,0.9)] transition duration-300 hover:-translate-y-0.5 hover:bg-accent-soft"
          >
            Ver el catálogo
          </Link>
        </div>
      </div>

      <section className="mx-auto mt-16 grid max-w-4xl gap-8 sm:grid-cols-3">
        {PILLARS.map((p) => (
          <div key={p.title} className="text-center">
            <h3 className="font-display text-xl font-bold text-ink">{p.title}</h3>
            <p className="mt-2 text-sm text-muted">{p.body}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
